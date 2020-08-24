import { Router } from 'express';
import sessionsRouter from './sessions.routes';

import usersRouter from './user.routes';
import ProfilesRouter from './profiles.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/profiles', ProfilesRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
