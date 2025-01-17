import { BucketContract } from '@/src/Infraestructure/Bucket/contracts';


export async function uploadImageUseCase(image: Express.Multer.File, bucket: BucketContract): Promise<string> {
    if (!image) {
        throw new Error('No file provided');
    }
    const imageUrl = await bucket.upload(image.buffer, image.originalname, image.mimetype);
    return imageUrl;
}
