import DefaultLayout from "@/Layouts/DefaultLayout";
import { Computer, PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import {
    DataTable,
    DataTableExpandedRows,
    DataTableValueArray,
} from "primereact/datatable";
import { Message } from "primereact/message";
import { Toolbar } from "primereact/toolbar";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { RouteParam } from "ziggy-js";

type ComputerIndexPageProps = {
    data: Computer[];
} & PageProps;

const Index = ({ data, auth, flash }: ComputerIndexPageProps) => {
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

    const actionBodyTemplate = (rowData: Computer) => {
        return (
            <React.Fragment>
                <Link
                    href={route(
                        "computers.edit",
                        rowData as unknown as RouteParam
                    )}
                >
                    <Button
                        icon="pi pi-pencil"
                        rounded
                        outlined
                        className="mr-2"
                    />
                </Link>

                <Button icon="pi pi-trash" rounded outlined severity="danger" />
            </React.Fragment>
        );
    };

    const operatingSystemBodyTemplate = (rowData: Computer) => {
        switch (rowData.operating_system) {
            case "WINDOWS_XP":
                return "Windows XP";
            case "WINDOWS_7":
                return "Windows 7";
            case "WINDOWS_8":
                return "Windows 8";
            case "WINDOWS_10":
                return "Windows 10";
            case "WINDOWS_11":
                return "Windows 11";
            case "UBUNTU":
                return "Ubuntu";
            case "DEBIAN":
                return "Debian";
            case "BIG_SUR":
                "Mac Big Sur";
            case "CATALINA":
                return "Mac Catalina";
            case "MONTEREY":
                return "Monterey";
            case "VENTURA":
                return "Mac Ventura";
            case "WINDOWS_SERVER":
                return "Windows Server";
        }
    };

    const header = (
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button icon="pi pi-plus" label="Expand All" text />
            <Button icon="pi pi-minus" label="Collapse All" text />
        </div>
    );

    return (
        <DefaultLayout user={auth.user}>
            <Head title="Computers" />
            <div className="grid">
                <div className="col-12">
                    <div className="card">
                        <Toolbar
                            start={leftToolbarTemplate}
                            end={rightToolbarTemplate}
                        />

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
                                style={{ width: "4rem" }}
                            />
                            <Column field="name" header="Nama PC" sortable />
                            <Column field="room.code" header="Ruang" />
                            <Column field="processor" header="Processor" />
                            <Column field="ram" header="RAM" />
                            <Column
                                field="operating_system"
                                header="Operating System"
                                body={operatingSystemBodyTemplate}
                            />
                            <Column body={actionBodyTemplate} />
                        </DataTable>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Index;
