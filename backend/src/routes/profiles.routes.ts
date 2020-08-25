import { Router } from 'express';
import { getRepository } from 'typeorm';
import CreateProfileService from '../services/profiles/createProfileService';
import authentication from '../middlewares/Authentication';
import ModelProfile from '../models/ModelProfile';
import UpdateProfileService from '../services/profiles/updateProfileService';
import DeleteProfileService from '../services/profiles/deleteProfileService';

interface Data {
    id: string;
    name: string;
}

const profileRoutes = Router();

profileRoutes.use(authentication);

// criar perfil
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

// listar perfis
profileRoutes.get('/', async (req, res) => {
    const profileRepository = getRepository(ModelProfile);
    const profiles = await profileRepository.find();

    return res.json(profiles);
});

// atualizar perfil
profileRoutes.put('/:id', async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const updateProfile = new UpdateProfileService();
        const profile = await updateProfile.execute({
            name,
            id,
        });
        return res.json(profile);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// deletar perfil

profileRoutes.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteProfile = new DeleteProfileService();
        await deleteProfile.execute({ id });
        return res.status(200).json({ message: 'Profile deleted' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

export default profileRoutes;
