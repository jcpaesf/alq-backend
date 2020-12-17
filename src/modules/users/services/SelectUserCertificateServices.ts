import { inject, injectable } from 'tsyringe';
import UserCertificate from '../infra/typeorm/entities/UserCertificate';
import IUserCertificatesRepository from '../repositories/IUserCertificatesRepository';
import { classToClass } from 'class-transformer'

@injectable()
class SelectUserCertificateServices {
    constructor(
        @inject('UserCertificatesRepository')
        private userCertificatesRepository: IUserCertificatesRepository
    ) { }

    public async execute(user_id: string): Promise<UserCertificate[]> {
        const userCertificates = await this.userCertificatesRepository.findByUserId(user_id);

        return classToClass(userCertificates);
    }
}

export default SelectUserCertificateServices;