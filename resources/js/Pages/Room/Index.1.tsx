import DefaultLayout from "@/Layouts/DefaultLayout";
import { useForm } from "@inertiajs/react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Button } from "primereact/button";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { RoomIndexProps } from "./Index";

export const Index = ({ rooms }: RoomIndexProps) => {
    const { data, setData, post, processing, errors } = useForm({
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

    const onChangeFloorDropdown = (e: DropdownChangeEvent) => {
        setData("floor", e.value);
    };

    const onChangeRoomTypeDropdown = (e: DropdownChangeEvent) => {
        setData("type", e.value);
    };

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("rooms.store"));
    };

    const [showAddRoomModal, setShowAddRoomModal] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [filters, setFilters] = useState<DataTableFilterMeta>({});

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            code: {
                value: null,
                matchMode: FilterMatchMode.EQUALS,
            },
            name: {
                operator: FilterOperator.AND,
                constraints: [
                    { value: null, matchMode: FilterMatchMode.STARTS_WITH },
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

    const onClickAddRoom = () => {};

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

    const header = renderHeader();

    return (
        <DefaultLayout user={undefined}>
            <div className="grid">
                <div className="col-12">
                    <div className="card">
                        <h5>Data Ruang</h5>
                        <Dialog
                            header="Dialog"
                            visible={showAddRoomModal}
                            style={{ width: "30vw" }}
                            modal
                            onHide={() => setShowAddRoomModal(false)}
                        >
                            <form method="post"></form>
                        </Dialog>
                        <DataTable header={header} value={rooms} />
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};
