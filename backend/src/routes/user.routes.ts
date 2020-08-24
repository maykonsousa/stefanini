import { Router } from 'express';
import CreateUserService from '../services/createUserService';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
    try {
        const { username, name, email, password } = req.body;

        const createUser = new CreateUserService();
        const user = await createUser.execute({
            username,
            name,
            email,
            password,
        });
        return res.json(user);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

export default usersRouter;
