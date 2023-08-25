import DefaultLayout from "@/Layouts/DefaultLayout";
import { PageProps } from "@/types";
import { options } from "@fullcalendar/core/preact.js";
import { useForm } from "@inertiajs/react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Button } from "primereact/button";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";

type InputValue = {
    name: string;
    code: string;
};

type RoomType = "CLASSROOM" | "STAFF_ROOM" | "COMPUTER_LAB";
interface Room {
    id: bigint;
    code: string;
    name?: string;
    type: RoomType;
    floor: string;
}
type RoomIndexProps = {
    rooms: Room[];
};

const Index = ({ rooms, auth }: PageProps & RoomIndexProps) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        code: "",
        name: "",
        floor: null,
        type: null,
    });

    const dropdownFloorValues: InputValue[] = [
        { name: "Lantai B2", code: "B2" },
        { name: "Lantai B1", code: "B1" },
        { name: "Lantai 1", code: "1" },
        { name: "Lantai 2", code: "2" },
        { name: "Lantai 3", code: "3" },
        { name: "Lantai 4", code: "4" },
        { name: "Lantai 5", code: "5" },
        { name: "Lantai 6", code: "6" },
        { name: "Lantai 7", code: "7" },
    ];

    const dropdownRoomTypeValues: InputValue[] = [
        { name: "Ruang Kelas", code: "CLASSROOM" },
        { name: "Ruang Kerja", code: "STAFF_ROOM" },
        { name: "Ruang LAB", code: "COMPUTER_LAB" },
    ];

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("rooms.store"));
    };

    const [showAddRoomModal, setShowAddRoomModal] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
    const [filters, setFilters] = useState<DataTableFilterMeta>({});

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            code: {
                constraints: [
                    {
                        value: null,
                        matchMode: FilterMatchMode.STARTS_WITH,
                    },
                ],
                operator: FilterOperator.AND,
            },
            name: {
                operator: FilterOperator.AND,
                constraints: [
                    { value: null, matchMode: FilterMatchMode.CONTAINS },
                ],
            },
            type: {
                operator: FilterOperator.OR,
                constraints: [
                    {
                        value: null,
                        matchMode: FilterMatchMode.EQUALS,
                    },
                ],
            },
            floor: {
                operator: FilterOperator.OR,
                constraints: [
                    {
                        value: null,
                        matchMode: FilterMatchMode.EQUALS,
                    },
                ],
            },
        });
        setGlobalFilterValue("");
    };

    const clearFilter = () => {
        initFilters();
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters1 = { ...filters };
        (_filters1["global"] as any).value = value;

        setFilters(_filters1);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <Button
                    type="button"
                    icon="pi pi-plus"
                    label="Add room"
                    onClick={() => setShowAddRoomModal(true)}
                />

                <div className="flex gap-2">
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText
                            value={globalFilterValue}
                            onChange={onGlobalFilterChange}
                            placeholder="Keyword Search"
                        />
                    </span>

                    <Button
                        type="button"
                        icon="pi pi-filter-slash"
                        label="Clear"
                        outlined
                        onClick={clearFilter}
                    />
                </div>
            </div>
        );
    };

    const nameBodyTemplate = (rowData: Room) => {
        return rowData.name ?? "-";
    };

    const codeBodyTemplate = (rowData: Room) => {
        return `R-${rowData.code}`;
    };

    const floorBodyTemplate = (rowData: Room) => {
        return `Lantai ${rowData.floor}`;
    };

    const roomTypeBodyTemplate = (rowData: Room) => {
        switch (rowData.type) {
            case "CLASSROOM":
                return "Ruang Kelas";
            case "COMPUTER_LAB":
                return "Lab Komputer";
            case "STAFF_ROOM":
                return "Ruang Kerja";
        }
    };

    const roomTypeFilterTemplate = (
        options: ColumnFilterElementTemplateOptions
    ) => {
        return (
            <Dropdown
                value={options.value}
                options={dropdownRoomTypeValues}
                optionValue="code"
                optionLabel="name"
                onChange={(e) => options.filterCallback(e.value, options.index)}
                placeholder="Pilih jenis ruang"
                className="p-column-filter"
                showClear
            />
        );
    };

    const onHideAddRoomModal = () => {
        setShowAddRoomModal(false);
        reset();
    };

    const header = renderHeader();

    useEffect(() => {
        initFilters();
    }, []);

    return (
        <DefaultLayout user={auth.user}>
            <div className="grid">
                <div className="col-12">
                    <div className="card">
                        <h5>Data Ruang</h5>
                        <Dialog
                            header="Add Room"
                            visible={showAddRoomModal}
                            style={{ width: "30vw" }}
                            modal
                            onHide={onHideAddRoomModal}
                        >
                            <form onSubmit={onSubmit}>
                                <div className="p-2 p-fluid">
                                    <span className="p-float-label mb-4">
                                        <InputText
                                            id="code"
                                            type="text"
                                            value={data.code}
                                            onChange={(e) =>
                                                setData("code", e.target.value)
                                            }
                                            required
                                        />
                                        <label htmlFor="code">Kode Ruang</label>
                                        {errors.code ? (
                                            <small
                                                style={{
                                                    color: "var(--red-400)",
                                                }}
                                            >
                                                {errors.code}
                                            </small>
                                        ) : null}
                                    </span>

                                    <span className="p-float-label mb-4">
                                        <InputText
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                        />
                                        <label htmlFor="name">
                                            Nama Ruang (Opsional)
                                        </label>

                                        {errors.name ? (
                                            <small
                                                style={{
                                                    color: "var(--red-400)",
                                                }}
                                            >
                                                {errors.name}
                                            </small>
                                        ) : null}
                                    </span>

                                    <div className="mb-4">
                                        <Dropdown
                                            id="floor"
                                            value={data.floor}
                                            onChange={(e) =>
                                                setData("floor", e.value)
                                            }
                                            optionValue="code"
                                            options={dropdownFloorValues}
                                            optionLabel="name"
                                            placeholder="Lantai"
                                        />
                                        {errors.floor ? (
                                            <small
                                                style={{
                                                    color: "var(--red-400)",
                                                }}
                                            >
                                                {errors.floor}
                                            </small>
                                        ) : null}
                                    </div>

                                    <div className="mb-4">
                                        <Dropdown
                                            id="type"
                                            optionLabel="name"
                                            optionValue="code"
                                            value={data.type}
                                            onChange={(e) =>
                                                setData("type", e.value)
                                            }
                                            options={dropdownRoomTypeValues}
                                            placeholder="Jenis Ruang"
                                        />

                                        {errors.type ? (
                                            <small
                                                style={{
                                                    color: "var(--red-400)",
                                                }}
                                            >
                                                {errors.type}
                                            </small>
                                        ) : null}
                                    </div>

                                    <Button
                                        type="submit"
                                        raised={true}
                                        label="Submit"
                                        disabled={processing}
                                    />
                                </div>
                            </form>
                        </Dialog>
                        <DataTable
                            value={rooms}
                            dataKey="id"
                            rows={10}
                            paginator
                            header={header}
                            filters={filters}
                            filterDisplay="row"
                            globalFilterFields={[
                                "code",
                                "name",
                                "floor",
                                "type",
                            ]}
                            emptyMessage="Data ruang tidak ditemukan"
                        >
                            <Column
                                field="code"
                                header="Kode Ruang"
                                filter
                                filterPlaceholder="Cari berdasarkan kode ruang"
                                body={codeBodyTemplate}
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
                                filter
                                body={floorBodyTemplate}
                            />
                            <Column
                                field="type"
                                header="Jenis Ruang"
                                filter
                                filterElement={roomTypeFilterTemplate}
                                body={roomTypeBodyTemplate}
                            />
                        </DataTable>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Index;
