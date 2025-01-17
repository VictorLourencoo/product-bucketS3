import { Express } from 'express';
import { productRouters } from './Http/product/index';
import { Dependencies } from '@/src/dependences';
import { uploadRouters } from './Http/upload';

export const setupRoutes = (app: Express, dependencies: Dependencies): void => {
    productRouters(app); // Registrar as rotas dentro de productRouters
    uploadRouters(app, dependencies["BUCKET"])
};