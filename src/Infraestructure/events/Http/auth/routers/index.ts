import { Express, Request, Response } from 'express';
import { loginHandle } from '../handles/login';


export function LoginRouters(app: Express): void {
    app.post('/login', async (req: Request, res: Response) => {
        try {
            const response = await loginHandle(req);
            res.status(response.status_code).json(response.payload);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    
};
