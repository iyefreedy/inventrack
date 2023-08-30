import DefaultLayout from "@/Layouts/DefaultLayout";
import { InputValue, PageProps, Room } from "@/types";
import { FilterMatchMode } from "primereact/api";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { RouteParam, RouteParamsWithQueryOverload } from "ziggy-js";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { Message } from "primereact/message";

type RoomIndexPageProps = {
    rooms: Room[];
};

const Index = ({ rooms, auth, flash }: PageProps & RoomIndexPageProps) => {
    const dropdownRoomTypeValues: InputValue[] = [
        { name: "Ruang Kelas", value: "CLASSROOM" },
        { name: "Ruang Kerja", value: "STAFF_ROOM" },
        { name: "Ruang LAB", value: "LAB" },
        { name: "Lainnya", value: "OTHER" },
    ];

    const dropdownFloorValues: InputValue[] = [
        { name: "Lantai B2", value: "B2" },
        { name: "Lantai B1", value: "B1" },
        { name: "Lantai 1", value: "1" },
        { name: "Lantai 2", value: "2" },
        { name: "Lantai 3", value: "3" },
        { name: "Lantai 4", value: "4" },
        { name: "Lantai 5", value: "5" },
        { name: "Lantai 6", value: "6" },
        { name: "Lantai 7", value: "7" },
    ];

    let emptyRoom: Room = {
        id: null,
        code: "",
        name: "",
        floor: undefined,
        type: undefined,
    };

    const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        floor: { value: null, matchMode: FilterMatchMode.EQUALS },
        type: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<Room[]>>(null);
    const [data, setData] = useState<Room[]>([]);
    const [room, setRoom] = useState<Room>(emptyRoom);
    const [selectedRooms, setSelectedRooms] = useState<Room[]>([]);
    const [deleteRoomDialog, setDeleteRoomDialog] = useState<boolean>(false);
    const [deleteRoomsDialog, setDeleteRoomsDialog] = useState<boolean>(false);

    useEffect(() => {
        setData([...rooms]);
    }, []);

    const hideDeleteRoomDialog = () => {
        setDeleteRoomDialog(false);
    };

    const hideDeleteRoomsDialog = () => {
        setDeleteRoomsDialog(false);
    };

    const confirmDeleteRoom = (room: Room) => {
        setRoom(room);
        setDeleteRoomDialog(true);
    };

    const confirmDeleteSelected = () => {
        setDeleteRoomsDialog(true);
    };

    const deleteRoom = async () => {
        const _room = { ...room };
        const request = await window.axios.delete(
            route("rooms.destroy", _room as unknown as RouteParam)
        );

        const response = request.data;
        if (response.status) {
            let _data = data.filter((val) => val.id !== room.id);

            toast.current?.show({
                severity: "success",
                summary: "Successful",
                detail: response.message,
                life: 3000,
            });

            setData([..._data]);
        } else {
            toast.current?.show({
                severity: "error",
                summary: "Failed",
                detail: response.message,
                life: 3000,
            });
        }

        setDeleteRoomDialog(false);
        setRoom(emptyRoom);
    };

    const deleteSelectedRooms = () => {
        let _data = data.filter((val) => !selectedRooms.includes(val));

        selectedRooms.forEach(async (val) => {
            const _room = { ...val };
            await window.axios.delete(
                route(
                    "rooms.destroy",
                    _room as unknown as RouteParamsWithQueryOverload
                )
            );
        });

        setDeleteRoomsDialog(false);
        setSelectedRooms([]);
        toast.current?.show({
            severity: "success",
            summary: "Successful",
            detail: "Rooms Deleted",
            life: 3000,
        });

        setData([..._data]);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Link href={route("rooms.create")}>
                    <Button label="New" icon="pi pi-plus" severity="success" />
                </Link>

                <Button
                    label="Delete"
                    icon="pi pi-trash"
                    severity="danger"
                    onClick={confirmDeleteSelected}
                />
            </div>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Rooms</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    placeholder="Search..."
                    onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        setGlobalFilterValue(target.value);
                    }}
                />
            </span>
        </div>
    );

    const nameBodyTemplate = (rowData: Room) => {
        return rowData.name ?? "-";
    };

    const codeBodyTemplate = (rowData: Room) => {
        return `${rowData.code}`;
    };

    const floorBodyTemplate = (rowData: Room) => {
        return `Lantai ${rowData.floor}`;
    };

    const roomTypeBodyTemplate = (rowData: Room) => {
        switch (rowData.type) {
            case "CLASSROOM":
                return "Ruang Kelas";
            case "LAB":
                return "Lab Komputer";
            case "STAFF_ROOM":
                return "Ruang Kerja";
            case "OTHER":
                return "Lainnya";
        }
    };

    const roomTypeRowFilterTemplate = (
        options: ColumnFilterElementTemplateOptions
    ) => {
        return (
            <Dropdown
                value={options.value}
                options={dropdownRoomTypeValues}
                optionValue="value"
                optionLabel="name"
                onChange={(e) => options.filterCallback(e.value)}
                placeholder="Pilih jenis ruang"
                className="p-column-filter"
                showClear
            />
        );
    };

    const floorRowFilterTemplate = (
        options: ColumnFilterElementTemplateOptions
    ) => {
        return (
            <Dropdown
                value={options.value}
                options={dropdownFloorValues}
                optionValue="value"
                optionLabel="name"
                onChange={(e: DropdownChangeEvent) =>
                    options.filterCallback(e.value)
                }
                placeholder="Pilih lantai"
                className="p-column-filter"
                showClear
            />
        );
    };

    const deleteRoomDialogFooter = (
        <React.Fragment>
            <Button
                label="No"
                icon="pi pi-times"
                outlined
                onClick={hideDeleteRoomDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                severity="danger"
                onClick={deleteRoom}
            />
        </React.Fragment>
    );

    const deleteRoomsDialogFooter = (
        <React.Fragment>
            <Button
                label="No"
                icon="pi pi-times"
                outlined
                onClick={hideDeleteRoomsDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                severity="danger"
                onClick={deleteSelectedRooms}
            />
        </React.Fragment>
    );

    const actionBodyTemplate = (rowData: Room) => {
        return (
            <React.Fragment>
                <Link
                    href={route("rooms.edit", rowData as unknown as RouteParam)}
                >
                    <Button
                        icon="pi pi-pencil"
                        rounded
                        outlined
                        className="mr-2"
                    />
                </Link>

                <Button
                    icon="pi pi-trash"
                    rounded
                    outlined
                    severity="danger"
                    onClick={() => confirmDeleteRoom(rowData)}
                />
            </React.Fragment>
        );
    };

    return (
        <DefaultLayout user={auth.user}>
            <Head title="Rooms" />
            <div className="grid">
                <div className="col-12">
                    <Toast ref={toast} />
                    <div className="card">
                        <Toolbar start={leftToolbarTemplate} />

                        <div className="col-12">
                            {flash.message ? (
                                <Message
                                    severity="success"
                                    text={flash.message}
                                />
                            ) : null}
                            {flash.error ? (
                                <Message severity="error" text={flash.error} />
                            ) : null}
                        </div>

                        <DataTable
                            ref={dt}
                            value={data}
                            dataKey="id"
                            paginator
                            rows={10}
                            rowsPerPageOptions={[5, 10, 25]}
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} rooms"
                            header={header}
                            filters={filters}
                            globalFilter={globalFilterValue}
                            emptyMessage="Data ruang tidak ditemukan"
                            selection={selectedRooms}
                            onSelectionChange={(e) => {
                                if (Array.isArray(e.value)) {
                                    setSelectedRooms(e.value);
                                }
                            }}
                            selectionMode="multiple"
                        >
                            <Column
                                selectionMode="multiple"
                                exportable={false}
                                headerStyle={{ width: "3rem" }}
                            ></Column>
                            <Column
                                field="code"
                                header="Kode Ruang"
                                body={codeBodyTemplate}
                                filter
                                filterPlaceholder="Cari berdasarkan kode ruang"
                            />
                            <Column
                                field="name"
                                header="Nama Ruang"
                                body={nameBodyTemplate}
                                filter
                                filterPlaceholder="Cari berdasarkan nama ruang"
                            />
                            <Column
                                field="floor"
                                header="Lantai"
                                body={floorBodyTemplate}
                                filter
                                filterElement={floorRowFilterTemplate}
                            />
                            <Column
                                field="type"
                                header="Jenis Ruang"
                                body={roomTypeBodyTemplate}
                                filter
                                filterElement={roomTypeRowFilterTemplate}
                            />
                            <Column
                                body={actionBodyTemplate}
                                exportable={false}
                                style={{ minWidth: "12rem" }}
                                bodyStyle={{ textAlign: "center" }}
                            ></Column>
                        </DataTable>
                    </div>
                </div>
            </div>

            {/* Delete room dialog */}
            <Dialog
                visible={deleteRoomDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Confirm"
                modal
                footer={deleteRoomDialogFooter}
                onHide={hideDeleteRoomDialog}
            >
                <div className="confirmation-content">
                    <i
                        className="pi pi-exclamation-triangle mr-3"
                        style={{ fontSize: "2rem" }}
                    />
                    {room && (
                        <span>
                            Apakah anda yakin ingin menghapus{" "}
                            <b>
                                {room.code}-{room.name ?? `(${room.name})`}
                            </b>
                            ?
                        </span>
                    )}
                </div>
            </Dialog>

            {/* Delete multiple rooms dialog */}
            <Dialog
                visible={deleteRoomsDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Confirm"
                modal
                footer={deleteRoomsDialogFooter}
                onHide={hideDeleteRoomsDialog}
            >
                <div className="confirmation-content">
                    <i
                        className="pi pi-exclamation-triangle mr-3"
                        style={{ fontSize: "2rem" }}
                    />
                    {room && (
                        <span>
                            Are you sure you want to delete the selected rooms?
                        </span>
                    )}
                </div>
            </Dialog>
        </DefaultLayout>
    );
};

export default Index;
