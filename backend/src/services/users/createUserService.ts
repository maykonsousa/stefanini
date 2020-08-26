import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import ModelUser from '../../models/ModelUser';

interface RequestDTO {
    name: string;
    email: string;
    password?: string;
    profile: string;
}
class CreateUserService {
    public async execute({
        name,
        email,
        password,
        profile,
    }: RequestDTO): Promise<ModelUser> {
        const userRepository = getRepository(ModelUser);
        // verificar se email já não existe
        const chekuserExists = await userRepository.findOne({
            where: { email },
        });

        if (chekuserExists) {
            throw new Error('email address already used');
        }
        // se a senha não for informada setar para o valor 123456
        // quando o adm que criar o usuário
        if (!password) {
            password = '123456';
        }
        // se o profile nao for informado, setar para "user"
        // quando o usuário se cadastrar no site
        if (!profile) {
            profile = 'user';
        }

        const hashedPassword = await hash(password, 8);

        const user = userRepository.create({
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
