export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    flash: {
        message: string | undefined;
        error: string | undefined;
    };
};

export type InputValue = {
    name: string;
    value: string;
};

export type RoomType = "CLASSROOM" | "STAFF_ROOM" | "LAB" | "OTHER";

export interface Room {
    id?: bigint | null;
    code: string;
    name: string;
    type: RoomType | undefined;
    floor: string | undefined;
}

export type AccessoryType =
    | "INPUT"
    | "OUTPUT"
    | "STORAGE"
    | "COMMUNICATION"
    | "NETWORKING"
    | "OTHER";

export type OperatingSystem =
    | "WINDOWS_7"
    | "WINDOWS_8"
    | "WINDOWS_10"
    | "WINDOWS_11"
    | "WINDOWS_XP"
    | "WINDOWS_SERVER"
    | "UBUNTU"
    | "DEBIAN"
    | "VENTURA"
    | "MONTEREY"
    | "BIG_SUR"
    | "CATALINA";

export interface Computer {
    id?: bigint | null;
    room_id: bigint | undefined;
    user: string;
    name: string;
    workgroup: string;
    processor: string;
    ram: string;
    storage: string;
    motherboard: string;
    power_supply: string;
    condition: number;
    operating_system: OperatingSystem | undefined;
    operating_system_activation: boolean;
    accessories: Accessory[];
    case: string;
    softwares: Software[];
}

export interface Accessory {
    id?: bigint | null;
    name: string;
    type: AccessoryType | undefined;
    condition: number;
}

export interface Software {
    id?: bigint | null;
    name: string;
}
