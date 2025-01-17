import { Request, Response } from 'express';
import { z } from "zod"
import { HttpResponse, Product } from '../../../Domain/product/interface';
import { registerProductUseCase } from '../../usecases/product/register-product-use-case';

export interface productRegisterHandle extends Product { }

export interface productRegisterResponse {
  idProduct: string,
  product: Product,
}

export async function registerProductHandle(req: Request): Promise<HttpResponse<productRegisterResponse>> {
  try {
    const product = req.body as productRegisterHandle
    if (!validationProduct(product)) {
      BodyError({ msg: "product is invalid" })
    }
    const response = await registerProductUseCase(product)

    return {
      status_code: HTTP_RESPONSE.CREATED.code,
      payload: response
    }

  } catch (error) {
    return {
      status_code: HTTP_RESPONSE.BAD_REQUEST.code,
      payload: {
        error: error
      }
    }

  }
};

const PRODUCT_SCHEMA = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  code: z.string().min(1, "Code is required"),
  quantity_in_stock: z.number().min(0, "Stock quantity must be 0 or greater"),
  asset_for_sale: z.boolean(),
});

export function validationProduct(body: object) {
  const validation = PRODUCT_SCHEMA.safeParse(body)
  return validation.success
} 