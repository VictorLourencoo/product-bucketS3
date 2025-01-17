import { Product } from "../../../Domain/product/interface";

export async function registerProductUseCase(product: Product) {
    return {
        idProduct: '39983932',
        product: product
    }
}