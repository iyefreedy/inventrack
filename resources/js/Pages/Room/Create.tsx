import DefaultLayout from "@/Layouts/DefaultLayout";
import { InputValue, PageProps, Room } from "@/types";
import { InputText } from "primereact/inputtext";
import { Head, useForm } from "@inertiajs/react";
import { classNames } from "primereact/utils";
import { RadioButton } from "primereact/radiobutton";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { FormEventHandler } from "react";

const Create = ({ auth }: PageProps) => {
    const { data, setData, errors, post, processing } = useForm<Room>();

    const dropdownFloorValues: InputValue[] = [
        { name: "Lantai B2", value: "B2" },
        { name: "Lantai B1", value: "B1" },
        { name: "Lantai 1", value: "1" },
        { name: "Lantai 2", value: "2" },
        { name: "Lantai 3", value: "3" },
        { name: "Lantai 4", value: "4" },
        { name: "Lantai 5", value: "5" },
        { name: "Lantai 6", value: "6" },
        { name: "Lantai 7", value: "7" },
    ];

    const confirm: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(e);
        confirmDialog({
            message: "Are you sure you want to proceed?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept,
        });
    };

    const accept = () => {
        post(route("rooms.store"));
    };

    return (
        <DefaultLayout user={auth.user}>
            <Head title="Create Room" />
            <ConfirmDialog />
            <form onSubmit={confirm}>
                <div className="card">
                    <h6 className="text-xl">Create Room</h6>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-4">
                            <label htmlFor="code">Kode Ruang</label>
                            <InputText
                                id="code"
                                value={data.code}
                                required
                                autoFocus
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setData("code", e.target.value)}
                                className={classNames({
                                    "p-invalid": errors.code,
                                })}
                            />
                            {errors.code ? (
                                <small className="p-error">{errors.code}</small>
                            ) : null}
                        </div>
                        <div className="field col-12 md:col-4">
                            <label htmlFor="name">Nama Ruang</label>
                            <InputText
                                id="name"
                                value={data.name}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setData("name", e.target.value)}
                                className={classNames({
                                    "p-invalid": errors.name,
                                })}
                            />
                            {errors.name ? (
                                <small className="p-error">{errors.name}</small>
                            ) : null}
                        </div>

                        <div className="field col-12 md:col-4">
                            <label htmlFor="floor" className="font-bold">
                                Lantai
                            </label>
                            <Dropdown
                                id="floor"
                                value={data.floor}
                                onChange={(e) => setData("floor", e.value)}
                                options={dropdownFloorValues}
                                optionValue="value"
                                optionLabel="name"
                                placeholder="Pilih lantai"
                            />
                        </div>

                        <div className="field col-12 md:col-4">
                            <label className="mb-3 font-bold">
                                Jenis Ruang
                            </label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-6">
                                    <RadioButton
                                        inputId="type1"
                                        name="type"
                                        value="CLASSROOM"
                                        checked={data.type === "CLASSROOM"}
                                        onChange={(e) =>
                                            setData("type", e.value)
                                        }
                                    />
                                    <label htmlFor="type1">Ruang Kelas</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton
                                        inputId="type2"
                                        name="type"
                                        value="STAFF_ROOM"
                                        checked={data.type === "STAFF_ROOM"}
                                        onChange={(e) =>
                                            setData("type", e.value)
                                        }
                                    />
                                    <label htmlFor="type2">Ruang Kerja</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton
                                        inputId="type3"
                                        name="type"
                                        value="LAB"
                                        checked={data.type === "LAB"}
                                        onChange={(e) =>
                                            setData("type", e.value)
                                        }
                                    />
                                    <label htmlFor="type3">Ruang Lab</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton
                                        inputId="type4"
                                        name="type"
                                        value="OTHER"
                                        checked={data.type === "OTHER"}
                                        onChange={(e) =>
                                            setData("type", e.value)
                                        }
                                    />
                                    <label htmlFor="type4">Lainnya</label>
                                </div>
                            </div>
                        </div>

                        <div className="field col-12 p-0">
                            <div className="field-button col-12 md:col-4">
                                <Button
                                    type="submit"
                                    label="Submit"
                                    icon="pi pi-check"
                                    iconPos="right"
                                    loading={processing}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </DefaultLayout>
    );
};

export default Create;
