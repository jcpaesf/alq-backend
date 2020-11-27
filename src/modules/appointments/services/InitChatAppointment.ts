import { inject, injectable } from 'tsyringe';
import IChatRoomsRepository from '../repositories/IChatRoomsRepository';

@injectable()
class InitChatAppointment {
    constructor(
        @inject('ChatRoomRepository')
        private chatRoomRepository: IChatRoomsRepository
    ) { }

    public async execute(): Promise<void> {

    }
}

export default InitChatAppointment;