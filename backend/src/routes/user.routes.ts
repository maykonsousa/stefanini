import { Router } from 'express';
import { getRepository } from 'typeorm';
import CreateUserService from '../services/users/createUserService';
import DeleteUserService from '../services/users/deleteUserService';
import UpdateUserService from '../services/users/updateUserService';
import Authorization from '../middlewares/Authentication';
import ModelUser from '../models/ModelUser';

const usersRouter = Router();

// criar usuário

usersRouter.post('/', async (req, res) => {
    try {
        const { username, name, email, password, profile } = req.body;

        const createUser = new CreateUserService();
        const user = await createUser.execute({
            username,
            name,
            email,
            password,
            profile,
        });
        return res.json(user);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});
// a partir daqui somente usuários logados
usersRouter.use(Authorization);

// deletar um usuário

usersRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = new DeleteUserService();
        await deleteUser.execute({ id });
        return res.status(204).send();
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

// listar usuários

usersRouter.get('/', async (req, res) => {
    const userRepository = getRepository(ModelUser);
    const users = await userRepository.find();

    return res.json(users);
});

// atualizar usuários

usersRouter.put('/:id', async (req, res) => {
    try {
        const { username, name, email, password, profile } = req.body;
        const id = req.params;
        const updateUser = new UpdateUserService();
        const user: ModelUser = await updateUser.execute({
            id,
            username,
            name,
            email,
            password,
            profile,
        });
        return res.json(user);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

export default usersRouter;
