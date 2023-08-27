import DefaultLayout from "@/Layouts/DefaultLayout";
import { Computer, PageProps } from "@/types";
import { Link } from "@inertiajs/react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import {
    DataTable,
    DataTableExpandedRows,
    DataTableValueArray,
} from "primereact/datatable";
import { Toolbar } from "primereact/toolbar";
import React from "react";
import { useEffect, useRef, useState } from "react";

type ComputerIndexPageProps = {
    data: Computer[];
} & PageProps;

const Index = ({ data, auth }: ComputerIndexPageProps) => {
    const [computers, setComputers] = useState<Computer[]>([]);
    const [expandedRows, setExpandedRows] = useState<
        DataTableExpandedRows | DataTableValueArray | undefined
    >(undefined);

    const dt = useRef<DataTable<Computer[]>>(null);

    useEffect(() => {
        setComputers([...data]);
    }, []);

    const allowExpansion = (rowData: Computer) => {
        return rowData.accessories!.length > 0;
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Link href={route("computers.create")}>
                    <Button label="New" icon="pi pi-plus" severity="success" />
                </Link>
                <Button label="Delete" icon="pi pi-trash" severity="danger" />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <Button
                label="Export"
                icon="pi pi-upload"
                className="p-button-help"
                onClick={(e) => dt.current?.exportCSV()}
            />
        );
    };

    const rowExpansionTemplate = (data: Computer) => {
        return (
            <React.Fragment>
                <div className="p-2 ml-8">
                    <h5 className="text-sm">
                        Aksesoris/Device Tambahan {data.name}
                    </h5>
                    <DataTable value={data.accessories}>
                        <Column field="name" header="Nama" sortable />
                        <Column field="type" header="Jenis" sortable />
                    </DataTable>
                </div>
                <div className="p-2 ml-8">
                    <h5 className="text-sm">Software Terinstall {data.name}</h5>
                    <DataTable value={data.softwares}>
                        <Column field="name" header="Nama" sortable />
                    </DataTable>
                </div>
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button icon="pi pi-plus" label="Expand All" text />
            <Button icon="pi pi-minus" label="Collapse All" text />
        </div>
    );

    return (
        <DefaultLayout user={auth.user}>
            <div className="grid">
                <div className="col-12">
                    <div className="card">
                        <Toolbar
                            start={leftToolbarTemplate}
                            end={rightToolbarTemplate}
                        />
                        <DataTable
                            ref={dt}
                            header={header}
                            dataKey="id"
                            value={computers}
                            expandedRows={expandedRows}
                            rowExpansionTemplate={rowExpansionTemplate}
                            onRowToggle={(e) => setExpandedRows(e.data)}
                            tableStyle={{ minWidth: "60rem" }}
                        >
                            <Column
                                expander={allowExpansion}
                                style={{ width: "5rem" }}
                            />
                            <Column field="name" header="Nama PC" sortable />
                            <Column field="room.code" header="Ruang" />
                            <Column field="processor" header="Processor" />
                            <Column field="ram" header="RAM" />
                        </DataTable>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Index;
