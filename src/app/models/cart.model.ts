import { Product } from "./product.model";
export interface Cart{
    product:Product;
    amount: number;
    subtotal:number;
}