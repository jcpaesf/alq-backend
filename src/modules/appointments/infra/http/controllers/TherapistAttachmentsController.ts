import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SelectUserCertificateServices from '@modules/users/services/SelectUserCertificateServices';
import SelectUserEnvironmentServices from '@modules/users/services/SelectUserEnvironmentServices';
import SelectUserResumeServices from '@modules/users/services/SelectUserResumeServices';

export default class TherapistAttachmentsController {
    public async index(request: Request, response: Response): Promise<Response> {
        const selectUserCertificateServices = container.resolve(SelectUserCertificateServices);
        const selectUserEnvironmentServices = container.resolve(SelectUserEnvironmentServices);
        const selectUserResumeServices = container.resolve(SelectUserResumeServices);
        const therapist_id = request.params.id;

        const certificates = await selectUserCertificateServices.execute(therapist_id);
        const environments = await selectUserEnvironmentServices.execute(therapist_id);
        const resumes = await selectUserResumeServices.execute(therapist_id);

        return response.json({
            certificates,
            environments,
            resumes
        });
    }
}