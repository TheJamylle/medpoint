import { Router } from 'express';
import AuthUserService from '../services/AuthUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        const authUserService = new AuthUserService();

        const { user } = await authUserService.execute({ 
            email, 
            password
        });

        delete user.password;

        return response.json({ user });
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

export default sessionsRouter;