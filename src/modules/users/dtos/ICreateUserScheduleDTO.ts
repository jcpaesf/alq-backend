export default interface ICreateUserScheduleDTO {
    user_id: string;
    service_date: Date;
    start_time: number;
    end_time: number;
    start: string;
    end: string;
}