import { getRepository } from 'typeorm';
import ModelUser from '../../models/ModelUser';

interface RequestDTO {
    id: string;
}

class deleteUserService {
    public async execute({ id }: RequestDTO): Promise<void> {
        const userRepository = getRepository(ModelUser);

        const user = await userRepository.findOne(id);
        if (!user) {
            throw new Error('User not found');
        }
        await userRepository.remove(user);
    }
}

export default deleteUserService;
