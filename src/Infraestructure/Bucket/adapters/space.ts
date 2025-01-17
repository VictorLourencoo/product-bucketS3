import { S3 } from 'aws-sdk';
import type { BucketContract, BucketConfig } from '../contracts';

// A função spaceBucket recebe a configuração do Bucket e retorna as operações disponíveis
export function spaceBucket(config: BucketConfig): BucketContract {
    const s3 = new S3({
        endpoint: config.config.DOS_ENDPOINT,
        accessKeyId: config.config.DOS_ACCESS_KEY_ID,
        secretAccessKey: config.config.DOS_SECRET_ACCESS_KEY,
        region: 'us-east-1', // Ou qualquer região compatível com o seu Space
        s3ForcePathStyle: true,
        signatureVersion: 'v4',
    });

    // Implementação de upload, você pode adicionar mais funções conforme necessário
    const upload = async (buffer: Buffer, fileName: string, mimeType: string): Promise<string> => {
        const params = {
            Bucket: config.config.DOS_BUCKET,
            Key: `products/uploads/${Date.now()}-${fileName}`,
            Body: buffer,
            ContentType: mimeType,
            ACL: 'public-read',
        };

        const result = await s3.upload(params).promise();
        return result.Location; // Retorna a URL do arquivo armazenado
    };

    // Implementação do delete, como exemplo
    const remove = async (fileName: string): Promise<void> => {
        const params = {
            Bucket: config.config.DOS_BUCKET,
            Key: fileName,
        };

        await s3.deleteObject(params).promise();
    };

    // Retorna o contrato com as funções disponíveis no bucket
    return {
        upload,
        remove,
        // Outras funções, como listar, copiar, etc., podem ser adicionadas aqui
    };
}
