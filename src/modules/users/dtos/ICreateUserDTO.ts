enum TypeUser {
    User = 'user',
    Therapist = 'therapist',
    Admin = 'admin'
}

export default interface ICreateUserDTO {
    name: string;
    email: string;
    password: string;
    phone: string;
    city: string;
    neighborhood: string;
    postal_code: string;
    state: string;
    street: string;
    work_presential: boolean;
    work_online: boolean;
    type: TypeUser;
    aproved: boolean;
    confirm_email: boolean;
}