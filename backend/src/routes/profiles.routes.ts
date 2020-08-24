import { Router } from 'express';
import CreateProfileService from '../services/profiles/createProfileService';

const profileRoutes = Router();

profileRoutes.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        const createProfile = new CreateProfileService();
        const profile = await createProfile.execute({
            name,
        });
        return res.json(profile);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

export default profileRoutes;
