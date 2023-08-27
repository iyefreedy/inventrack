import DefaultLayout from "@/Layouts/DefaultLayout";
import { InputText } from "primereact/inputtext";

const Computer = () => {
    return (
        <DefaultLayout user={undefined}>
            <div className="card p-fluid">
                <h5>Horizontal</h5>
                <div className="field grid">
                    <label
                        htmlFor="name3"
                        className="col-12 mb-2 md:col-2 md:mb-0"
                    >
                        Name
                    </label>
                    <div className="col-12 md:col-10">
                        <InputText id="name3" type="text" />
                    </div>
                </div>
                <div className="field grid">
                    <label
                        htmlFor="email3"
                        className="col-12 mb-2 md:col-2 md:mb-0"
                    >
                        Email
                    </label>
                    <div className="col-12 md:col-10">
                        <InputText id="email3" type="text" />
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Computer;
