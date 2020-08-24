import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import ModelUser from '../../models/ModelUser';

interface RequestDTO {
    username: string;
    name: string;
    email: string;
    password: string;
    profile: string;
}
class CreateUserService {
    public async execute({
        username,
        name,
        email,
        password,
        profile,
    }: RequestDTO): Promise<ModelUser> {
        const userRepository = getRepository(ModelUser);

        const chekuserExists = await userRepository.findOne({
            where: { email },
        });

        if (chekuserExists) {
            throw new Error('email address already used');
        }

        const hashedPassword = await hash(password, 8);

        const user = userRepository.create({
            username,
            name,
            email,
            password: hashedPassword,
            profile,
        });

        await userRepository.save(user);

        return user;
    }
}

export default CreateUserService;
