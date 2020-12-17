import ICreateUserCertificateDTO from '../dtos/ICreateUserCertificateDTO';
import UserCertificate from '../infra/typeorm/entities/UserCertificate';

export default interface IUserCertificatesRepository {
    find(): Promise<UserCertificate[]>;
    findById(id: string): Promise<UserCertificate | undefined>;
    findByUserId(user_id: string): Promise<UserCertificate[]>;
    create(dto: ICreateUserCertificateDTO): Promise<UserCertificate>;
    save(UserCertificate: UserCertificate): Promise<UserCertificate>;
    delete(id: string): Promise<void>;
}