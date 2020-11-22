export default interface ICreateAppointmentDTO {
    therapist_id: string;
    user_id: string;
    date: Date;
    status: string;
    specialtie_id: string;
}