import DefaultLayout from "@/Layouts/DefaultLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

const Maintenance = ({ auth }: PageProps) => {
    return (
        <DefaultLayout user={auth.user}>
            <Head title="Maintenance" />

            <div className="card">
                <h4>
                    Hello. This feature is on going. Please take your coffee and
                    relax!
                </h4>
            </div>
        </DefaultLayout>
    );
};

export default Maintenance;
