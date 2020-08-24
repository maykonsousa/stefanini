import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import ModelUser from '../models/ModelUser';
import AuthConfig from '../config/auth';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: ModelUser;
    token: string;
}

class CreateSessionService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(ModelUser);

        const user = await usersRepository.findOne({ where: { email } });
        // verifica se o email existe
        if (!user) {
            throw new Error('incorrect email or password');
        }
        // compara se a senha digitada comfere com a senha criptografada
        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new Error('incorrect email or password');
        }
        // remove a senha do retorno
        delete user.password;

        const { secret, expiresIn } = AuthConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return {
            user,
            token,
        };
    }
}

export default CreateSessionService;
