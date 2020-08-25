import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import ModelUser from '../../models/ModelUser';

interface RequestDTO {
    id: string;
    username?: string;
    name?: string;
    email?: string;
    password?: string;
    profile?: string;
}

class UpdateUserService {
    public async execute({
        id,
        username,
        name,
        email,
        password,
        profile,
    }: RequestDTO): Promise<ModelUser> {
        const userRepository = getRepository(ModelUser);
        const user = await userRepository.findOne(id);
        // verificar se o usuário existe
        if (!user) {
            throw new Error('user not found');
        }
        if (username) {
            user.username = username;
        }
        if (name) {
            user.name = name;
        }
        if (email) {
            user.email = email;
        }
        if (password) {
            const hashedPassword = await hash(password, 8);
            user.password = hashedPassword;
        }

        if (profile) {
            user.profile = profile;
        }

        await userRepository.save(user);
        return user;
    }
}

export default UpdateUserService;
