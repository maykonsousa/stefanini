import { getRepository } from 'typeorm';
import ModelProfile from '../../models/ModelProfile';

interface RequestDTO {
    name: string;
}

class CreateProfileService {
    public async execute({ name }: RequestDTO): Promise<ModelProfile> {
        const profileRepository = getRepository(ModelProfile);

        const checkProfileExists = await profileRepository.findOne({
            where: { name },
        });

        if (checkProfileExists) {
            throw new Error('profile name already exists');
        }

        const profile = profileRepository.create({ name });

        await profileRepository.save(profile);
        return profile;
    }
}

export default CreateProfileService;
