import { Express, Request, Response } from 'express';
import { registerProductHandle } from './handles/register-product';


export function productRouters(app: Express): void {
    app.post('/register', async (req: Request, res: Response) => {
        try {
            const response = await registerProductHandle(req);
            res.status(response.status_code).json(response.payload);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};
