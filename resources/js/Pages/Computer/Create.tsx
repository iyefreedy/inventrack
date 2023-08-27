import DefaultLayout from "@/Layouts/DefaultLayout";
import {
    Accessory,
    AccessoryType,
    Computer,
    InputValue,
    PageProps,
    Room,
    Software,
} from "@/types";
import { useForm } from "@inertiajs/react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Rating, RatingChangeEvent } from "primereact/rating";
import { SelectButtonChangeEvent } from "primereact/selectbutton";
import {
    FormEventHandler,
    JSXElementConstructor,
    ReactElement,
    ReactNode,
    ReactPortal,
    useEffect,
    useState,
} from "react";

const Create = ({ auth }: PageProps) => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const { data, setData, processing, post } = useForm<Computer>({
        name: "",
        condition: 0,
        processor: "",
        ram: "",
        room_id: undefined,
        user: "",
        storage: "",
        workgroup: "",
        motherboard: "",
        case: "",
        operating_system: "",
        operating_system_activation: false,
        power_supply: "",
        accessories: [],
        softwares: [],
    });
    const [accessories, setAccessories] = useState<Accessory[]>([
        ...data.accessories,
    ]);
    const [softwares, setSoftwares] = useState<Software[]>([
        ...data.accessories,
    ]);

    const operatingSystemDropdownValues = [
        {
            label: "Microsoft Windows",
            items: [
                {
                    label: "Windows 11",
                    value: "WINDOWS_11",
                },
                {
                    label: "Windows 10",
                    value: "WINDOWS_10",
                },
                {
                    label: "Windows 8",
                    value: "WINDOWS_8",
                },
                {
                    label: "Windows 7",
                    value: "WINDOWS_7",
                },
                {
                    label: "Windows XP",
                    value: "WINDOWS_XP",
                },
            ],
        },
        {
            label: "macOS",
            items: [
                {
                    label: "macOS Ventura",
                    value: "VENTURA",
                },
                {
                    label: "macOS Monterey",
                    value: "MONTEREY",
                },
                {
                    label: "macOS Big Sur",
                    value: "BIG_SUR",
                },
                {
                    label: "macOS Catalina",
                    value: "CATALINA",
                },
            ],
        },
        {
            label: "Linux",
            items: [
                {
                    label: "Ubuntu",
                    value: "UBUNTU",
                },
                {
                    label: "Debian",
                    value: "DEBIAN",
                },
            ],
        },
    ];

    const accessoryTypeDropdownValues: InputValue[] = [
        {
            name: "Input Device",
            value: "INPUT",
        },
        {
            name: "Output Device",
            value: "OUTPUT",
        },
        {
            name: "Communication Device",
            value: "COMMUNICATION",
        },
        {
            name: "Networking Device",
            value: "NETWORKING",
        },
        {
            name: "Lainnya",
            value: "OTHER",
        },
    ];

    useEffect(() => {
        window.axios
            .get(route("rooms.index"))
            .then((response) => setRooms(response.data.data));
    }, []);

    // Event functions
    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("computers.store"));
    };

    const onChangeConditionRating = (e: RatingChangeEvent) => {
        setData("condition", e.value!);
    };

    const onChangeOperatingSystem = (e: DropdownChangeEvent) => {
        console.log(e.value);
        setData("operating_system", e.value);
    };

    const onClickAddAccessories = () => {
        const _accesories = [...accessories];
        const accessory: Accessory = {
            name: "",
            type: undefined,
            condition: 0,
        };
        _accesories.push(accessory);
        setAccessories(_accesories);
        setData("accessories", _accesories);
    };

    const onClickAddSoftware = () => {
        const _softwares = [...softwares];
        const software: Software = {
            name: "",
        };
        _softwares.push(software);
        setSoftwares(_softwares);
        setData("softwares", _softwares);
    };

    const onChangeAccessoryName = (index: number, value: string) => {
        const _accesories = [...accessories];
        const _accesory: Accessory = {
            ..._accesories[index],
            name: value,
        };

        _accesories[index] = _accesory;

        setAccessories(_accesories);
        setData("accessories", _accesories);
    };

    const onChangeAccessoryType = (index: number, value: AccessoryType) => {
        const _accesories = [...accessories];
        const _accesory: Accessory = {
            ..._accesories[index],
            type: value,
        };

        _accesories[index] = _accesory;

        setAccessories(_accesories);
        setData("accessories", _accesories);
    };

    const onChangeAccessoryCondition = (index: number, value: number) => {
        const _accesories = [...accessories];
        const _accesory: Accessory = {
            ..._accesories[index],
            condition: value,
        };

        _accesories[index] = _accesory;

        setAccessories(_accesories);
        setData("accessories", _accesories);
    };

    const onChangeSoftwareName = (index: number, value: string) => {
        const _softwares = [...softwares];
        const _accesory: Software = {
            ..._softwares[index],
            name: value,
        };

        _softwares[index] = _accesory;

        setSoftwares(_softwares);
        setData("softwares", _softwares);
    };

    // Templating
    const roomDropdownItemTemplate = (room: Room) => {
        return (
            <span>
                {room.name
                    ? `${room.name} (R-${room.code})`
                    : `Ruang ${room.code}`}
            </span>
        );
    };

    const groupedItemTemplate = (option: {
        label:
            | string
            | number
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | ReactPortal
            | null
            | undefined;
    }) => {
        return <h6>{option.label}</h6>;
    };

    return (
        <DefaultLayout user={auth.user}>
            <div className="grid">
                <div className="col-12">
                    <div className="card">
                        <form onSubmit={onSubmit}>
                            <h5>Detail Komputer</h5>
                            <div className="p-fluid formgrid grid">
                                <div className="field col-12 md:col-3">
                                    <label htmlFor="name">Nama Komputer</label>
                                    <InputText
                                        id="name"
                                        type="text"
                                        required
                                        placeholder="E.g: PC-001, PC-002"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        autoFocus
                                    />
                                </div>
                                <div className="field col-12 md:col-3">
                                    <label htmlFor="roomId">Ruang</label>
                                    <Dropdown
                                        id="roomId"
                                        value={data.room_id}
                                        onChange={(e) =>
                                            setData("room_id", e.value)
                                        }
                                        itemTemplate={roomDropdownItemTemplate}
                                        options={rooms}
                                        optionLabel="name"
                                        optionValue="id"
                                        placeholder="Select One"
                                    ></Dropdown>
                                </div>

                                <div className="field col-12 md:col-3">
                                    <label htmlFor="user">Pengguna</label>
                                    <InputText
                                        id="user"
                                        type="text"
                                        placeholder="Nama Pengguna PC"
                                        required
                                        value={data.user}
                                        onChange={(e) =>
                                            setData("user", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="field col-12 md:col-3">
                                    <label htmlFor="workgroup">Workgroup</label>
                                    <InputText
                                        id="workgroup"
                                        type="text"
                                        placeholder="E.g: PC-GROUP"
                                        value={data.workgroup}
                                        onChange={(e) =>
                                            setData("workgroup", e.target.value)
                                        }
                                    />
                                </div>
                                <div className="field col-12 md:col-4">
                                    <label htmlFor="processor">Processor</label>
                                    <InputText
                                        id="processor"
                                        type="text"
                                        placeholder="E.g: Intel Core i5, AMD Ryzen 9"
                                        required
                                        value={data.processor}
                                        onChange={(e) =>
                                            setData("processor", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="field col-12 md:col-4">
                                    <label htmlFor="ram">RAM</label>
                                    <InputText
                                        id="ram"
                                        type="text"
                                        placeholder="E.g: DDR 8GB"
                                        value={data.ram}
                                        onChange={(e) =>
                                            setData("ram", e.target.value)
                                        }
                                    />
                                </div>
                                <div className="field col-12 md:col-4">
                                    <label htmlFor="storage">Penyimpanan</label>
                                    <InputText
                                        id="storage"
                                        type="text"
                                        placeholder="E.g: 256GB"
                                        onChange={(e) =>
                                            setData("storage", e.target.value)
                                        }
                                    />
                                </div>
                                <div className="field col-12 md:col-4">
                                    <label htmlFor="motherboard">
                                        Motherboard
                                    </label>
                                    <InputText
                                        id="motherboard"
                                        type="text"
                                        placeholder="E.g: Mobo"
                                        onChange={(e) =>
                                            setData(
                                                "motherboard",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="field col-12 md:col-4">
                                    <label htmlFor="powerSupply">
                                        Power Supply
                                    </label>
                                    <InputText
                                        id="powerSupply"
                                        type="text"
                                        placeholder="E.g: PSU-123"
                                        onChange={(e) =>
                                            setData(
                                                "power_supply",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="field col-12 md:col-4">
                                    <label htmlFor="case">Case</label>
                                    <InputText
                                        id="case"
                                        type="text"
                                        placeholder="E.g: Case 129-RTX"
                                        onChange={(e) =>
                                            setData("case", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="field col-12 md:col-4">
                                    <label htmlFor="operatingSystem">
                                        Sistem Operasi
                                    </label>
                                    <Dropdown
                                        id="operatingSystem"
                                        value={data.operating_system}
                                        onChange={onChangeOperatingSystem}
                                        options={operatingSystemDropdownValues}
                                        optionGroupChildren="items"
                                        optionGroupLabel="label"
                                        optionLabel="label"
                                        optionValue="value"
                                        optionGroupTemplate={
                                            groupedItemTemplate
                                        }
                                        placeholder="Pilih OS"
                                    ></Dropdown>
                                </div>

                                <div className="field col-12 mb-6">
                                    <div className="flex align-items-center">
                                        <Checkbox
                                            id="operatingSystemActivation"
                                            onChange={(e) =>
                                                setData(
                                                    "operating_system_activation",
                                                    e.checked ?? false
                                                )
                                            }
                                            checked={
                                                data.operating_system_activation
                                            }
                                        ></Checkbox>
                                        <label
                                            htmlFor="operatingSystemActivation"
                                            className="ml-2"
                                        >
                                            Aktivasi Sistem Operasi
                                        </label>
                                    </div>
                                </div>

                                {accessories.length > 0 ? (
                                    <div className="field col-12">
                                        <h6 className="text-lg">
                                            Aksesoris Tambahan
                                        </h6>
                                    </div>
                                ) : null}

                                {accessories.map((accessory, index) => (
                                    <div
                                        className="formgrid grid col-12 mb-4 border-b border-gray-400"
                                        key={index}
                                    >
                                        <h6>{`Aksesoris ${index + 1}`}</h6>
                                        <div className="field col-12">
                                            <label
                                                htmlFor={`accessoryName-${index}`}
                                            >
                                                Nama
                                            </label>
                                            <InputText
                                                id={`accessoryName-${index}`}
                                                type="text"
                                                placeholder="E.g: Monitor, Soundcard, Speaker"
                                                value={accessory.name}
                                                onChange={(e) =>
                                                    onChangeAccessoryName(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="field col-12">
                                            <label
                                                htmlFor={`accessoryType-${index}`}
                                            >
                                                Jenis
                                            </label>
                                            <Dropdown
                                                id={`accessoryType-${index}`}
                                                placeholder="Pilih jenis aksesoris"
                                                value={accessory.type}
                                                options={
                                                    accessoryTypeDropdownValues
                                                }
                                                optionLabel="name"
                                                optionValue="value"
                                                onChange={(
                                                    e: DropdownChangeEvent
                                                ) =>
                                                    onChangeAccessoryType(
                                                        index,
                                                        e.value
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="field col-12">
                                            <label htmlFor="accessoryCondition">
                                                Kondisi Perangkat
                                            </label>

                                            <Rating
                                                id="accessoryCondition"
                                                className="flex-wrap text-xs"
                                                value={accessory.condition}
                                                cancel={false}
                                                onChange={(e) =>
                                                    onChangeAccessoryCondition(
                                                        index,
                                                        e.value!
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                ))}

                                <div className="field col-12">
                                    <Button
                                        label="Add Accessories"
                                        icon="pi pi-plus"
                                        type="button"
                                        className="w-full"
                                        onClick={onClickAddAccessories}
                                    />
                                </div>

                                {softwares.length > 0 ? (
                                    <div className="field col-12">
                                        <h6 className="text-lg">
                                            Software Terinstall
                                        </h6>
                                    </div>
                                ) : null}

                                {softwares.map((software, index) => (
                                    <div
                                        className="formgrid grid col-12 mb-4 border-b border-gray-400"
                                        key={index}
                                    >
                                        <h6>{`Software ${index + 1}`}</h6>
                                        <div className="field col-12">
                                            <label
                                                htmlFor={`softwareName-${index}`}
                                            >
                                                Nama
                                            </label>
                                            <InputText
                                                id={`softwareName-${index}`}
                                                type="text"
                                                placeholder="E.g: Office 2016, Adobe Reader"
                                                value={software.name}
                                                onChange={(e) =>
                                                    onChangeSoftwareName(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                ))}

                                <div className="field col-12">
                                    <Button
                                        label="Add Software"
                                        icon="pi pi-plus"
                                        type="button"
                                        className="w-full mt-4"
                                        onClick={onClickAddSoftware}
                                    />
                                </div>

                                <div className="field col-12">
                                    <label htmlFor="condition">
                                        Kondisi Keseluruhan
                                    </label>

                                    <Rating
                                        id="condition"
                                        className="flex-wrap text-xs"
                                        value={data.condition}
                                        cancel={false}
                                        onChange={onChangeConditionRating}
                                    />
                                </div>

                                <div className="field col-12">
                                    <Button
                                        disabled={processing}
                                        label="Submit"
                                        type="submit"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Create;
