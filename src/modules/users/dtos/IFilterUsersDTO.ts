export default interface IFilterUsersDTO {
    id?: string;
    page: number;
    nameFilter?: string;
    typeFilter: string;
    nameSpecialtie?: string;
    isUser: boolean;
}