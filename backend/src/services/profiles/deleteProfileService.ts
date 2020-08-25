import { getRepository } from 'typeorm';
import ModelProfile from '../../models/ModelProfile';

interface RequestDTO {
    id: string;
}

class DeleteProfileService {
    public async execute({ id }: RequestDTO): Promise<void> {
        const profileRepository = getRepository(ModelProfile);
        const profile = await profileRepository.findOne(id);
        if (!profile) {
            throw new Error('profile not found');
        }
        await profileRepository.remove(profile);
    }
}

export default DeleteProfileService;
