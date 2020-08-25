import { Router } from 'express';
import { getRepository } from 'typeorm';
import authentication from '../middlewares/Authentication';
import ModelFunctionality from '../models/ModelFunctionalities';

import CreateFunctionalityService from '../services/Functionalities/CreateFunctionalitiesService';

const functionalitiesRoutes = Router();
functionalitiesRoutes.use(authentication);

// criar funcionalidade
functionalitiesRoutes.post('/', async (req, res) => {
    try {
        const { name, profile } = req.body;
        const createFunctionality = new CreateFunctionalityService();
        const functionality = await createFunctionality.execute({
            name,
            profile,
        });
        return res.json(functionality);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// listar funcionalidades
functionalitiesRoutes.get('/', async (req, res) => {
    const functionalityRepository = getRepository(ModelFunctionality);
    const functionalities = await functionalityRepository.find();
    return res.json(functionalities);
});

// editar funcionalidades
functionalitiesRoutes.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, profile } = req.body;
        const updateFunctionality = new UpdateFunctionalityService();
        const functionality = await updateFunctionality.execute();
    } catch (error) {}
});

export default functionalitiesRoutes;
