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
import { Chart } from "primereact/chart";

const Dashboard = ({
    auth,
    pie,
}: PageProps & { pie: Record<number, Array<any>>; bar: any }) => {
    const [chartPieData, setChartPieData] = useState({});
    const { layoutConfig } = useContext(LayoutContext);

    useEffect(() => {
        const labels = [];
        const dataFloor = [];
        for (const key in pie) {
            labels.push(key);
            dataFloor.push(pie[key].length + 1);
        }

        const documentStyle = getComputedStyle(document.documentElement);
        const dataSet = {
            labels: labels,
            datasets: [
                {
                    data: dataFloor,
                    backgroundColor: [
                        documentStyle.getPropertyValue("--blue-500"),
                        documentStyle.getPropertyValue("--yellow-500"),
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue("--blue-400"),
                        documentStyle.getPropertyValue("--yellow-400"),
                    ],
                },
            ],
        };

        setChartPieData(dataSet);
    }, []);

    return (
        <DefaultLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="grid p-fluid">
                <div className="col-12 xl:col-6">
                    <div className="card flex flex-column align-items-center">
                        <h4 className="text-left w-full">
                            Computers on every floor
                        </h4>
                        <Chart type="pie" data={chartPieData} />
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Dashboard;
