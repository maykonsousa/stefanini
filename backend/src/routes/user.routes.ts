import { Router } from 'express';
import CreateUserService from '../services/users/createUserService';
import DeleteUserService from '../services/users/deleteUserService';
import Authorization from '../middlewares/Authentication';

const usersRouter = Router();

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

usersRouter.use(Authorization);

usersRouter.delete('/:id', (req, res) => {
    try {
        const user_id = req.params;
        const actionUser = req.user;
        const deleteUser = new DeleteUserService();
        const user = deleteUser.execute({
            user_id,
            actionUser,
        });
        console.log(user);
        return res.json(actionUser);
    } catch (error) {
        return res.send();
    }
});

export default usersRouter;
