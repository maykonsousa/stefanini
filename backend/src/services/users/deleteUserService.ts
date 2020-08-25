import { getRepository } from 'typeorm';
import ModelUser from '../../models/ModelUser';

interface RequestDTO {
    id: string;
}

class deleteUserService {
    public async execute({ id }: RequestDTO): Promise<void> {
        const userRepository = getRepository(ModelUser);
        // verificar se o usuário existe
        const user = await userRepository.findOne(id);
        if (!user) {
            throw new Error('User not found');
        }

        // deletar usuário
        await userRepository.remove(user);
    }
}

export default deleteUserService;
