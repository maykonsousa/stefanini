import { getRepository } from 'typeorm';
import ModelFunctionality from '../../models/ModelFunctionalities';

interface RequestDTO {
    name: string;
    profile: string;
}

class CreateFunctionalitiesService {
    public async execute({
        name,
        profile,
    }: RequestDTO): Promise<ModelFunctionality> {
        const FunctionalityRepository = getRepository(ModelFunctionality);
        const fucntionalityExists = await FunctionalityRepository.findOne({
            where: { name },
        });

        // verificar se a funcinalidade já nao existe
        if (fucntionalityExists) {
            throw new Error('Functionality already exists');
        }
        const functionality = FunctionalityRepository.create({ name, profile });

        await FunctionalityRepository.save(functionality);

        return functionality;
    }
}
export default CreateFunctionalitiesService;
