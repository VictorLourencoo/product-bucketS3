import { Request, Response } from 'express'
import { z } from 'zod'
import { HttpResponse } from '../../../../../Domain/product/interface'
import { BodyError } from '../../../../../Domain/functions/errors'
import { HTTP_RESPONSE } from '../../../../../Domain/constants/web'
import { uploadImageUseCase } from '../../../../../Application/usecases/upload/upload-use-case'
import { BucketContract } from '@/src/Infraestructure/Bucket/contracts'


export interface MulterRequest extends Request {
    file?: Express.Multer.File
}


export async function uploadImageHandle(req: MulterRequest, bucket: BucketContract): Promise<HttpResponse<{ link: string }>> {
    try {
        const { file } = req
        if (!file) {
            throw BodyError({ msg: 'No file uploaded' })
        }
        const validation = imageSchema.safeParse(file)
        if (!validation.success) {
            throw BodyError({ msg: validation.error.message })
        }
        const link = await uploadImageUseCase(file, bucket)
        return {
            status_code: HTTP_RESPONSE.CREATED.code,
            payload: { link }
        }
    } catch (error) {
        return {
            status_code: HTTP_RESPONSE.BAD_REQUEST.code,
            payload: { error: error }
        }
    }
}

const imageSchema = z.object({
    buffer: z.instanceof(Buffer, { message: 'Image buffer is required' }),
    mimetype: z.string().nonempty({ message: 'Mimetype is required' }).regex(/^image\//, { message: 'Invalid image type' })
})
