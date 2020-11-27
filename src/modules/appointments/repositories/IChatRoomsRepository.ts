import ICreateChatRoomDTO from '../dtos/ICreateChatRoomDTO';
import ChatRoom from '../infra/typeorm/entities/ChatRoom';

export default interface IChatRoomsRepository {
    find(): Promise<ChatRoom[]>;
    findById(id: string): Promise<ChatRoom | undefined>;
    findByRoom(room: string): Promise<ChatRoom | undefined>;
    findByAppointment(appointment_id: string): Promise<ChatRoom | undefined>;
    create(dto: ICreateChatRoomDTO): Promise<ChatRoom>;
    save(chatRoom: ChatRoom): Promise<ChatRoom>;
}