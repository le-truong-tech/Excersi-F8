import Product from "../Product/index.js";

export interface OrderItemUpdateDTO {
    product?: Product;
    quantity?: number;
    price?: number;
}

export interface OrderItemI {
    getTotal(): number
}