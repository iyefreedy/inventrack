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
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import { RouteParamsWithQueryOverload } from "ziggy-js";

type RoomIndexPageProps = {
    data: Room[];
};

const Index = ({ data, auth }: PageProps & RoomIndexPageProps) => {
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

    const [roomDialog, setRoomDialog] = useState<boolean>(false);
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
    const [rooms, setRooms] = useState<Room[]>([]);
    const [room, setRoom] = useState<Room>(emptyRoom);
    const [selectedRooms, setSelectedRooms] = useState<Room[]>([]);
    const [deleteRoomDialog, setDeleteRoomDialog] = useState<boolean>(false);
    const [deleteRoomsDialog, setDeleteRoomsDialog] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);

    useEffect(() => {
        setRooms([...data]);
    }, []);

    const openNew = () => {
        setRoom(emptyRoom);
        setSubmitted(false);
        setRoomDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setRoomDialog(false);
    };

    const hideDeleteRoomDialog = () => {
        setDeleteRoomDialog(false);
    };

    const hideDeleteRoomsDialog = () => {
        setDeleteRoomsDialog(false);
    };

    const editRoom = (room: Room) => {
        setRoom({ ...room });
        setRoomDialog(true);
    };

    const confirmDeleteRoom = (room: Room) => {
        setRoom(room);
        setDeleteRoomDialog(true);
    };

    const confirmDeleteSelected = () => {
        setDeleteRoomsDialog(true);
    };

    const saveRoom = async () => {
        setSubmitted(true);
        console.log(room);
        let _rooms = [...rooms];
        let _room = { ...room };

        if (room.id !== null) {
            console.log(`Update room : ${room}`);
            // Update room
            const request = await window.axios.patch(
                route(
                    "rooms.update",
                    _room as unknown as RouteParamsWithQueryOverload
                )
            );
            const response = request.data;

            if (response.status) {
                toast.current?.show({
                    severity: "success",
                    summary: "Successful",
                    detail: response.message,
                    life: 3000,
                });
            } else {
                toast.current?.show({
                    severity: "error",
                    summary: "Failed",
                    detail: response.message,
                    life: 3000,
                });
            }

            const index = findIndexById(room.id!);
            _rooms[index] = _room;
        } else {
            console.log(`Create room : ${room}`);
            // Create room
            const request = await window.axios.post(
                route("rooms.store"),
                _room
            );
            const response = request.data;

            if (response.status) {
                toast.current?.show({
                    severity: "success",
                    summary: "Successful",
                    detail: response.message,
                    life: 3000,
                });
            } else {
                toast.current?.show({
                    severity: "error",
                    summary: "Failed",
                    detail: response.message,
                    life: 3000,
                });
            }

            _rooms.push(_room);
        }

        setRooms(_rooms);
        setRoomDialog(false);
        setRoom(emptyRoom);
    };

    const deleteRoom = async () => {
        const _room = { ...room };
        const request = await window.axios.delete(
            route(
                "rooms.destroy",
                _room as unknown as RouteParamsWithQueryOverload
            )
        );

        const response = request.data;
        if (response.status) {
            let _rooms = rooms.filter((val) => val.id !== room.id);

            setRooms(_rooms);

            toast.current?.show({
                severity: "success",
                summary: "Successful",
                detail: response.message,
                life: 3000,
            });
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
        let _rooms = rooms.filter((val) => !selectedRooms.includes(val));

        selectedRooms.forEach(async (val) => {
            const _room = { ...val };
            await window.axios.delete(
                route(
                    "rooms.destroy",
                    _room as unknown as RouteParamsWithQueryOverload
                )
            );
        });

        setRooms(_rooms);
        setDeleteRoomsDialog(false);
        setSelectedRooms([]);
        toast.current?.show({
            severity: "success",
            summary: "Successful",
            detail: "Products Deleted",
            life: 3000,
        });
    };

    const findIndexById = (id: bigint) => {
        let index = -1;

        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const onTypeChange = (e: RadioButtonChangeEvent) => {
        console.log(e.value);
        let _room = { ...room };

        _room["type"] = e.value;
        setRoom(_room);
    };

    const onFloorChange = (e: DropdownChangeEvent) => {
        let _room = { ...room };

        _room["floor"] = e.value;
        setRoom(_room);
    };

    const onInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        name: string
    ) => {
        const val = (e.target && e.target.value) || "";
        let _room = { ...room };

        // @ts-ignore
        _room[`${name}`] = val;

        setRoom(_room);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button
                    label="New"
                    icon="pi pi-plus"
                    severity="success"
                    onClick={openNew}
                />
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

    const roomDialogFooter = (
        <React.Fragment>
            <Button
                label="Cancel"
                icon="pi pi-times"
                outlined
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" onClick={saveRoom} />
        </React.Fragment>
    );

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
                <Button
                    icon="pi pi-pencil"
                    rounded
                    outlined
                    className="mr-2"
                    onClick={() => editRoom(rowData)}
                />
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
            <div className="grid">
                <div className="col-12">
                    <Toast ref={toast} />
                    <div className="card">
                        <Toolbar start={leftToolbarTemplate} />
                        <DataTable
                            ref={dt}
                            value={rooms}
                            dataKey="code"
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

            {/* Create and edit dialog */}
            <Dialog
                header="Detail Ruang"
                visible={roomDialog}
                style={{ minWidth: "30vw" }}
                className="p-fluid mx-2"
                modal
                onHide={hideDialog}
                footer={roomDialogFooter}
            >
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Kode Ruang
                    </label>
                    <InputText
                        id="code"
                        value={room.code}
                        required
                        autoFocus
                        onChange={(e) => onInputChange(e, "code")}
                        className={classNames({
                            "p-invalid": submitted && !room.code,
                        })}
                    />
                    {submitted && !room.code && (
                        <small className="p-error">
                            Kode ruang wajib diisi.
                        </small>
                    )}
                </div>

                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Nama
                    </label>
                    <InputText
                        id="name"
                        value={room.name ?? ""}
                        onChange={(e) => onInputChange(e, "name")}
                    />
                </div>

                <div className="field">
                    <label className="mb-3 font-bold">Jenis Ruang</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton
                                inputId="type1"
                                name="type"
                                value="CLASSROOM"
                                checked={room.type === "CLASSROOM"}
                                onChange={onTypeChange}
                            />
                            <label htmlFor="type1">Ruang Kelas</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton
                                inputId="type2"
                                name="type"
                                value="STAFF_ROOM"
                                checked={room.type === "STAFF_ROOM"}
                                onChange={onTypeChange}
                            />
                            <label htmlFor="type2">Ruang Kerja</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton
                                inputId="type3"
                                name="type"
                                value="LAB"
                                checked={room.type === "LAB"}
                                onChange={onTypeChange}
                            />
                            <label htmlFor="type3">Ruang Lab</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton
                                inputId="type4"
                                name="type"
                                value="OTHER"
                                checked={room.type === "OTHER"}
                                onChange={onTypeChange}
                            />
                            <label htmlFor="type4">Lainnya</label>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="floor" className="font-bold">
                        Lantai
                    </label>
                    <Dropdown
                        id="floor"
                        value={room.floor}
                        onChange={onFloorChange}
                        options={dropdownFloorValues}
                        optionValue="value"
                        optionLabel="name"
                        placeholder="Pilih lantai"
                    />
                </div>
            </Dialog>

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
                                {room.code}-({room.name})
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
