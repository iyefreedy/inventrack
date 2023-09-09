import DefaultLayout from "@/Layouts/DefaultLayout";
import { Accessory, Computer, PageProps } from "@/types";
import { Dialog } from "primereact/dialog";
import { Head, Link, router } from "@inertiajs/react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";

import {
    DataTable,
    DataTableExpandedRows,
    DataTableValueArray,
} from "primereact/datatable";
import { Message } from "primereact/message";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { RouteParam } from "ziggy-js";
import { Toast } from "primereact/toast";
import { autoTable } from "jspdf-autotable";

type ComputerIndexPageProps = {
    data: Computer[];
} & PageProps;

const Index = ({ data, auth, flash }: ComputerIndexPageProps) => {
    const [computers, setComputers] = useState<Computer[]>([]);
    const [computer, setComputer] = useState<Computer | null>(null);

    const [expandedRows, setExpandedRows] = useState<
        DataTableExpandedRows | DataTableValueArray | undefined
    >(undefined);

    const dt = useRef<DataTable<Computer[]>>(null);
    const toast = useRef<Toast>(null);

    const cols = [
        { field: "name", header: "Name" },
        { field: "room", header: "Room" },
        { field: "operating_system", header: "Operating System" },
    ];

    const exportColumns = cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
    }));

    useEffect(() => {
        setComputers([...data]);
    }, []);

    const confirmDeleteComputer = (computer: Computer | null) => {
        setComputer(computer);
    };

    const hideDeleteComputerDialog = () => {
        setComputer(null);
    };

    const deleteComputer = async () => {
        const _computer = { ...computer };
        const request = await window.axios.delete(
            route("computers.destroy", _computer as unknown as RouteParam)
        );

        const response = request.data;
        if (response.status) {
            let _computers = computers.filter((val) => val.id !== _computer.id);

            toast.current?.show({
                severity: "success",
                summary: "Successful",
                detail: response.message,
                life: 3000,
            });

            setComputers([..._computers]);
        } else {
            toast.current?.show({
                severity: "error",
                summary: "Failed",
                detail: response.message,
                life: 3000,
            });
        }

        setComputer(null);
    };

    const allowExpansion = (rowData: Computer) => {
        return rowData.accessories!.length > 0;
    };

    const exportPdf = () => {
        import("jspdf").then((jsPDF) => {
            import("jspdf-autotable").then(() => {
                const doc = new jsPDF.default("l", "cm");

                // autoTable(doc, {
                //     head: [["PC-Name", "Room", "Operating system"]],
                //     body: computers.map((computer) => {
                //         const { name, room, operating_system } = computer;

                //         return Object.values({
                //             name: name,
                //             room: room.code,
                //             operating_system: operating_system,
                //         });
                //     }),
                // });

                // doc.autoTable(exportColumns, computers, {
                //     didParseCell: function (data: CellHookData) {
                //         if (data.column.dataKey === "room") {
                //             data.cell.text = data.cell.raw.code;
                //         }
                //     },
                // }) as autoTable;
                doc.save("products.pdf");
            });
        });
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Link href={route("computers.create")}>
                    <Button label="New" icon="pi pi-plus" severity="success" />
                </Link>
            </div>
        );
    };

    const accessoryTypeBodyTemplate = (rowData: Accessory) => {
        switch (rowData.type) {
            case "COMMUNICATION":
                return "Communcation Device";
            case "INPUT":
                return "Input Device";
            case "NETWORKING":
                return "Networking Device";
            case "OUTPUT":
                return "Output Device";
            case "STORAGE":
                return "Storage Device";
            case "OTHER":
                return "Other";
        }
    };

    const accessoryConditionBodyTemplate = (rowData: Accessory) => {
        return <Rating value={rowData.condition} cancel={false} />;
    };

    const rightToolbarTemplate = () => {
        return (
            <Button
                label="Export"
                icon="pi pi-upload"
                className="p-button-help"
                onClick={exportPdf}
            />
        );
    };

    const rowExpansionTemplate = (data: Computer) => {
        return (
            <React.Fragment>
                <div className="p-2 ml-8">
                    <h5 className="text-sm">{data.name} Additional Devices</h5>
                    <DataTable value={data.accessories}>
                        <Column
                            field="name"
                            header="Nama"
                            bodyStyle={{ padding: "0.5rem 0.5rem" }}
                            sortable
                        />
                        <Column
                            field="type"
                            header="Jenis"
                            bodyStyle={{ padding: "0.5rem 0.5rem" }}
                            sortable
                            body={accessoryTypeBodyTemplate}
                        />
                        <Column
                            field="condition"
                            header="Condition"
                            bodyStyle={{ padding: "0.5rem 0.5rem" }}
                            body={accessoryConditionBodyTemplate}
                        />
                    </DataTable>
                </div>
                <div className="p-2 ml-8">
                    <h5 className="text-sm">{data.name} Installed Software</h5>
                    <DataTable value={data.softwares}>
                        <Column
                            field="name"
                            header="Nama"
                            bodyStyle={{ padding: "0.5rem 0.5rem" }}
                            sortable
                        />
                    </DataTable>
                </div>
            </React.Fragment>
        );
    };

    const actionBodyTemplate = (rowData: Computer) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-eye"
                    rounded
                    outlined
                    severity="info"
                    className="mr-2"
                    onClick={() => confirmDeleteComputer(rowData)}
                />
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

                <Button
                    icon="pi pi-trash"
                    rounded
                    outlined
                    severity="danger"
                    onClick={() => confirmDeleteComputer(rowData)}
                />
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

    const conditionBodyTemplate = (rowData: Computer) => {
        return <Rating value={rowData.condition} cancel={false} />;
    };

    const deleteComputerdialogFooter = (
        <React.Fragment>
            <Button
                label="No"
                icon="pi pi-times"
                outlined
                onClick={hideDeleteComputerDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                severity="danger"
                onClick={deleteComputer}
            />
        </React.Fragment>
    );

    return (
        <DefaultLayout user={auth.user}>
            <Head title="Computers" />
            <div className="grid">
                <div className="col-12">
                    <div className="card">
                        <Toast ref={toast} />
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
                            <Column field="name" header="PC Name" sortable />
                            <Column field="room.code" header="Room" />
                            <Column
                                field="operating_system"
                                header="Operating System"
                                body={operatingSystemBodyTemplate}
                            />
                            <Column
                                field="condition"
                                header="Condition"
                                body={conditionBodyTemplate}
                            />
                            <Column
                                body={actionBodyTemplate}
                                style={{ minWidth: "12rem" }}
                            />
                        </DataTable>

                        {/** Show computer dialog */}

                        {/** End of show computer dialog */}

                        {/* Delete computer dialog */}
                        <Dialog
                            visible={computer !== null}
                            style={{ width: "32rem" }}
                            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                            header="Confirm"
                            modal
                            footer={deleteComputerdialogFooter}
                            onHide={hideDeleteComputerDialog}
                        >
                            <div className="confirmation-content">
                                <i
                                    className="pi pi-exclamation-triangle mr-3"
                                    style={{ fontSize: "2rem" }}
                                />
                                {computer && (
                                    <span>
                                        Apakah anda yakin ingin menghapus{" "}
                                        <b>{computer.name}</b>?
                                    </span>
                                )}
                            </div>
                        </Dialog>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Index;
