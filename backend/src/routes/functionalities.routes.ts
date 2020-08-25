import { Router } from 'express';
import authentication from '../middlewares/Authentication';

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

export default functionalitiesRoutes;
