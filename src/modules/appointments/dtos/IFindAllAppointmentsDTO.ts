export default interface IFindAllAppointmentsDTO {
    page: number;
    filter: {
        therapist_name: string | undefined;
        user_name: string | undefined;
        initial_date: string;
        final_date: string;
    }
}