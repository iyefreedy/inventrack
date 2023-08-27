import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React from "react";

const RoomDialog = ({}) => {
    const saveRoom = () => {};

    const roomDialogFooter = (
        <React.Fragment>
            <Button
                label="Cancel"
                icon="pi pi-times"
                outlined
                onClick={hideDialog}
            />
            <Button label="Save" icon="pi pi-check" onClick={saveRoom} />
        </React.Fragment>
    );

    return (
        <Dialog
            header="Detail Ruang"
            visible={roomDialog}
            style={{ minWidth: "30vw" }}
            className="p-fluid mx-2"
            modal
            onHide={hideDialog}
            footer={roomDialogFooter}
        >
            <div className="field">
                <label htmlFor="name" className="font-bold">
                    Kode Ruang
                </label>
                <InputText
                    id="code"
                    value={room.code}
                    required
                    autoFocus
                    onChange={(e) => onInputChange(e, "code")}
                    className={classNames({
                        "p-invalid": submitted && !room.code,
                    })}
                />
                {submitted && !room.code && (
                    <small className="p-error">Kode ruang wajib diisi.</small>
                )}
            </div>

            <div className="field">
                <label htmlFor="name" className="font-bold">
                    Nama
                </label>
                <InputText
                    id="name"
                    value={room.name ?? ""}
                    onChange={(e) => onInputChange(e, "name")}
                />
            </div>

            <div className="field">
                <label className="mb-3 font-bold">Jenis Ruang</label>
                <div className="formgrid grid">
                    <div className="field-radiobutton col-6">
                        <RadioButton
                            inputId="type1"
                            name="type"
                            value="CLASSROOM"
                            checked={room.type === "CLASSROOM"}
                            onChange={onTypeChange}
                        />
                        <label htmlFor="type1">Ruang Kelas</label>
                    </div>
                    <div className="field-radiobutton col-6">
                        <RadioButton
                            inputId="type2"
                            name="type"
                            value="STAFF_ROOM"
                            checked={room.type === "STAFF_ROOM"}
                            onChange={onTypeChange}
                        />
                        <label htmlFor="type2">Ruang Kerja</label>
                    </div>
                    <div className="field-radiobutton col-6">
                        <RadioButton
                            inputId="type3"
                            name="type"
                            value="COMPUTER_LAB"
                            checked={room.type === "COMPUTER_LAB"}
                            onChange={onTypeChange}
                        />
                        <label htmlFor="type3">Ruang Lab</label>
                    </div>
                </div>
            </div>
            <div className="field">
                <label htmlFor="floor" className="font-bold">
                    Lantai
                </label>
                <Dropdown
                    id="floor"
                    value={room.floor}
                    onChange={onFloorChange}
                    options={dropdownFloorValues}
                    optionValue="code"
                    optionLabel="name"
                    placeholder="Pilih lantai"
                />
            </div>
        </Dialog>
    );
};

export default RoomDialog;
