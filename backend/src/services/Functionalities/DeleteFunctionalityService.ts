import { getRepository } from 'typeorm';
import ModelFunctionality from '../../models/ModelFunctionalities';

interface RequestDTO {
    id: string;
}

class DeleteFunctionalityService {
    public async execute({ id }: RequestDTO): Promise<void> {
        const functionalityRepository = getRepository(ModelFunctionality);
        const functionality = await functionalityRepository.findOne(id);
        if (!functionality) {
            throw new Error('functionality not found');
        }
        await functionalityRepository.remove(functionality);
    }
}
export default DeleteFunctionalityService;
