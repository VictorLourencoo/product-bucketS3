import { Express, Request, Response } from 'express';
import { uploadImageHandle } from './handles/upload-handle';
import { BucketContract } from '../../../Bucket/contracts';
import multer from 'multer';
// Configura o Multer para não salvar arquivos no disco, apenas em memória
const storage = multer.memoryStorage();
const upload = multer({  });

export function uploadRouters(app: Express, bucket: BucketContract): void {
    app.post('/uploadImage', upload.single('file'), async (req: Request, res: Response) => {
        try {
            // Chama o handle passando a requisição e o bucket
            console.log(req)
            const response = await uploadImageHandle(req, bucket);

            res.status(response.status_code).json(response.payload);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
