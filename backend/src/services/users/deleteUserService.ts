import { getRepository } from 'typeorm';
import ModelUser from '../../models/ModelUser';

interface RequestDTO {
    user_id: object;
    actionUser: object;
}

class deleteUserService {
    public async execute({ user_id, actionUser }: RequestDTO): Promise<void> {
        const userRepository = await getRepository(ModelUser);
        const findActionuser = userRepository.findOne({
            where: { actionUser },
        });

        console.log(findActionuser);
    }
}

export default deleteUserService;
