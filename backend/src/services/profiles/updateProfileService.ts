import { getRepository } from 'typeorm';
import ModelProfile from '../../models/ModelProfile';

interface RequestDTO {
    id: string;
    name: string;
}

class UpdateProfileService {
    public async execute({ name, id }: RequestDTO): Promise<ModelProfile> {
        const profileRepository = getRepository(ModelProfile);
        // verificar se o perfil existe
        const profile = await profileRepository.findOne(id);

        if (!profile) {
            throw new Error('profile not found');
        }
        // verificar se o novo nome já não pertence a outro perfil
        const nameExists = await profileRepository.findOne({ where: { name } });
        if (nameExists) {
            throw new Error('This profile name already exists');
        }

        profile.name = name;
        await profileRepository.save(profile);

        return profile;
    }
}

export default UpdateProfileService;
