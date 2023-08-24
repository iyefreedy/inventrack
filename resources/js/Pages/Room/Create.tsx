import DefaultLayout from "@/Layouts/DefaultLayout";
import { useForm } from "@inertiajs/react";
import { Button } from "primereact/button";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, {
    BaseSyntheticEvent,
    FormEventHandler,
    SyntheticEvent,
} from "react";

interface InputValue {
    name: string;
    code: string;
}

const Create = () => {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
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

    return (
        <DefaultLayout user={undefined}>
            <div className="card p-fluid">
                <form onSubmit={onSubmit} method="post">
                    <h5>Horizontal</h5>
                    <div className="field grid">
                        <label
                            htmlFor="code"
                            className="col-12 mb-2 md:col-2 md:mb-0"
                        >
                            Kode Ruang
                        </label>
                        <div className="col-12 md:col-10">
                            <InputText
                                id="code"
                                name="code"
                                type="text"
                                placeholder="Contoh: 002, 521, 410"
                                required
                                onChange={(e) =>
                                    setData("code", e.target.value)
                                }
                            />
                            <small style={{ color: "var(--red-400)" }}>
                                * Kode ruang wajib diisi. Dan terdiri dari tiga
                                angka.
                            </small>
                        </div>
                    </div>
                    <div className="field grid">
                        <label
                            htmlFor="name"
                            className="col-12 mb-2 md:col-2 md:mb-0"
                        >
                            Nama Ruang
                            <span style={{ fontSize: "10px" }}>(Opsional)</span>
                        </label>
                        <div className="col-12 md:col-10">
                            <InputText
                                id="name"
                                name="name"
                                autoComplete="room-name"
                                type="text"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            {errors.name ? (
                                <small style={{ color: "var(--red-400)" }}>
                                    {errors.name}
                                </small>
                            ) : null}
                        </div>
                    </div>
                    <div className="field grid">
                        <label
                            htmlFor="floor"
                            className="col-12 mb-2 md:col-2 md:mb-0"
                        >
                            Lantai
                        </label>
                        <div className="col-12 md:col-10">
                            <Dropdown
                                id="floor"
                                value={data.floor}
                                onChange={onChangeFloorDropdown}
                                optionValue="code"
                                options={dropdownFloorValues}
                                optionLabel="name"
                                placeholder="Pilih lantai..."
                            />
                            {errors.floor ? (
                                <small style={{ color: "var(--red-400)" }}>
                                    {errors.floor}
                                </small>
                            ) : null}
                        </div>
                    </div>
                    <div className="field grid">
                        <label
                            htmlFor="type"
                            className="col-12 mb-2 md:col-2 md:mb-0"
                        >
                            Jenis Ruangan
                        </label>
                        <div className="col-12 md:col-10">
                            <Dropdown
                                id="type"
                                optionLabel="name"
                                optionValue="code"
                                value={data.type}
                                onChange={onChangeRoomTypeDropdown}
                                options={dropdownRoomTypeValues}
                                placeholder="Pilih jenis ruangan..."
                            />

                            {errors.type ? (
                                <small style={{ color: "var(--red-400)" }}>
                                    {errors.type}
                                </small>
                            ) : null}
                        </div>
                    </div>
                    <Button
                        type="submit"
                        raised={true}
                        label="Submit"
                        disabled={processing}
                    />
                </form>
            </div>
        </DefaultLayout>
    );
};

export default Create;
