import User from '../models/User';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface Request {
    email: string;
    password: string;
}

class AuthUserService {
    public async execute({ email, password }: Request): Promise<{ user: User, token: string }> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ 
            where: { email }
        });

        if(!user) {
            throw new Error('User or password not found');
        };

        const passwordMatched = compare(password, user.password);

        if(!passwordMatched) {
            throw new Error('User or password not found');
        };

        const token = sign({  }, 'c9876c4ddb13bea2d4b5bab20f733b4b', {
            subject: user.id,
            expiresIn: '1d'
        });

        return { user, token };
    }
}

export default AuthUserService;