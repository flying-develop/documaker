export interface ICheckLogin {
    login: string;
}

export interface ILogin {
    login?: string;
    id: number;
    password: string;
}

export interface IRegister {
    email: string;
    phone: string;
    name: string;
    password: string;
    confirmPassword: string;
}

export interface IForgot {
    email: string;
}

export interface IReset {
    email: string;
    token: string;
    password: string;
    confirmPassword: string;
}
