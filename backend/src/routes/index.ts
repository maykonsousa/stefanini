import { Router } from 'express';
import sessionsRouter from './sessions.routes';

import usersRouter from './user.routes';
import ProfilesRouter from './profiles.routes';
import functionalitiesRouter from './functionalities.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/profiles', ProfilesRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/functionalities', functionalitiesRouter);

export default routes;
