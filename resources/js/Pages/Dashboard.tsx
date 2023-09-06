/* eslint-disable @next/next/no-img-element */
"use client";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../context/LayoutContext";

import { ChartOptions } from "chart.js";
import { Head } from "@inertiajs/react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { PageProps } from "@/types";
import { Maintenance, MaintenanceService } from "@/service/MaintenanceService";

const Dashboard = ({ auth }: PageProps) => {
    const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
    const [lineOptions, setLineOptions] = useState<ChartOptions>({});
    const { layoutConfig } = useContext(LayoutContext);

    const applyLightTheme = () => {
        const lineOptions: ChartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: "#495057",
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: "#495057",
                    },
                    grid: {
                        color: "#ebedef",
                    },
                },
                y: {
                    ticks: {
                        color: "#495057",
                    },
                    grid: {
                        color: "#ebedef",
                    },
                },
            },
        };

        setLineOptions(lineOptions);
    };

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: "#ebedef",
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: "#ebedef",
                    },
                    grid: {
                        color: "rgba(160, 167, 181, .3)",
                    },
                },
                y: {
                    ticks: {
                        color: "#ebedef",
                    },
                    grid: {
                        color: "rgba(160, 167, 181, .3)",
                    },
                },
            },
        };

        setLineOptions(lineOptions);
    };

    useEffect(() => {
        MaintenanceService.getMaintenances().then((data) =>
            setMaintenances(data)
        );
    }, []);

    useEffect(() => {
        if (layoutConfig.colorScheme === "light") {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [layoutConfig.colorScheme]);

    return (
        <DefaultLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="grid">
                <div className="col-12">
                    <div className="card">
                        <h5>Recent Maintenances</h5>
                        <DataTable value={maintenances} rows={5} paginator>
                            <Column field="room" header="Ruang" />
                            <Column
                                field="computer"
                                header="Komputer"
                                sortable
                            />
                            <Column
                                field="maintenance_date"
                                header="Tanggal Maintenance"
                                sortable
                            />
                            <Column header="Jenis Pemeliharaan" field="type" />
                            <Column
                                header="Keterangan"
                                field="description"
                                style={{ width: "35%" }}
                            />
                        </DataTable>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Dashboard;
