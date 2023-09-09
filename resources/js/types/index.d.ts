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
    id?: bigint;
    code?: string;
    name?: string;
    type?: RoomType;
    floor?: string;
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
    id?: bigint;
    room_id?: bigint;
    user?: string;
    name?: string;
    workgroup?: string;
    processor?: string;
    ram?: string;
    storage?: string;
    motherboard?: string;
    power_supply?: string;
    condition?: number;
    operating_system?: OperatingSystem;
    operating_system_activation?: boolean;
    case?: string;
    accessories?: Accessory[];
    softwares?: Software[];
}

export interface Accessory {
    id?: bigint;
    name?: string;
    type?: AccessoryType;
    condition?: number;
}

export interface Software {
    id?: bigint;
    name?: string;
}
