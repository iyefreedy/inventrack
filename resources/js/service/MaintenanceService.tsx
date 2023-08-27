export interface Maintenance {
    id: bigint;
    room: string;
    computer: string;
    condition: number;
    maintenance_date: string;
    created_at: string;
    updated_at: string;
    type: string;
    description: string;
}

export const MaintenanceService = {
    getMaintenances() {
        return fetch("/demo/data/maintenances.json", {
            headers: { "Cache-Control": "no-cache" },
        })
            .then((res) => res.json())
            .then((d) => d.data as Maintenance[]);
    },
};
