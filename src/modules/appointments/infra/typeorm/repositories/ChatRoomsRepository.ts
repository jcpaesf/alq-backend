import { Repository, getRepository } from 'typeorm';
import ChatRoom from '../entities/ChatRoom';
import ICreateChatRoomDTO from '@modules/appointments/dtos/ICreateChatRoomDTO';
import IChatRoomsRepository from '@modules/appointments/repositories/IChatRoomsRepository';

class ChatRoomsRepository implements IChatRoomsRepository {
    private ormRepository: Repository<ChatRoom>;

    constructor() {
        this.ormRepository = getRepository(ChatRoom);
    }

    public async find(): Promise<ChatRoom[]> {
        const chatRooms = await this.ormRepository.find();

        return chatRooms;
    }

    public async findById(id: string): Promise<ChatRoom | undefined> {
        const chatRoom = await this.ormRepository.findOne(id);

        return chatRoom;
    }

    public async findByRoom(room: string): Promise<ChatRoom | undefined> {
        const chatRoom = await this.ormRepository.findOne({
            where: { room }
        });

        return chatRoom;
    }

    public async findByAppointment(appointment_id: string): Promise<ChatRoom | undefined> {
        const chatRoom = await this.ormRepository.findOne({
            where: { appointment_id }
        });

        return chatRoom;
    }

    public async create(dto: ICreateChatRoomDTO): Promise<ChatRoom> {
        const chatRoom = this.ormRepository.create(dto);

        await this.ormRepository.save(chatRoom);

        return chatRoom;
    }

    public async save(chatRoom: ChatRoom): Promise<ChatRoom> {
        return await this.ormRepository.save(chatRoom);
    }
}

export default ChatRoomsRepository;