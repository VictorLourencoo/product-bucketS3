import { HttpResponseCode } from "../types/web"

type DecimalString = string

export interface Product {
  name: string
  price: DecimalString,
  category: string
  code: string,
  photo: string,
  quantity_in_stock: number
  asset_for_sale: boolean
}

export interface HttpResponse<T = unknown> {
  status_code: number,
  payload: object
}

export interface DefaultError {
  code: number,
  error: string
} 