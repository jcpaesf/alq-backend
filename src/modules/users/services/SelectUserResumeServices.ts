import { inject, injectable } from 'tsyringe';
import UserResume from '../infra/typeorm/entities/UserResume';
import IUserResumesRepository from '../repositories/IUserResumesRepository';
import { classToClass } from 'class-transformer'

@injectable()
class SelectUserResumeServices {
    constructor(
        @inject('UserResumesRepository')
        private userResumesRepository: IUserResumesRepository
    ) { }

    public async execute(user_id: string): Promise<UserResume[]> {
        const userResumes = await this.userResumesRepository.findByUserId(user_id);

        return classToClass(userResumes);
    }
}

export default SelectUserResumeServices;