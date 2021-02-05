export default interface IFindAllAppointmentsDTO {
    page: number;
    id?: string;
    filter: {
        therapist_name: string | undefined;
        user_name: string | undefined;
        specialtie_name: string | undefined;
        initial_date: string;
        final_date: string;
    }
}