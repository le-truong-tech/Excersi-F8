import type { OrderItemI } from "./type.js";
import Product from "../Product/index.js";

export class OrderItem implements OrderItemI {

    private product: Product;
    private quantity: number;
    private price: number;

    constructor(product: Product, quantity: number, price: number) {
        this.product = product;
        this.quantity = quantity;
        this.price = price;
    }

    getProduct(): Product {return this.product}
    getQuantity(): number {return this.quantity}
    getPrice(): number{return this.price}

    increaseQuantity(quantity: number) {
        if(quantity > 0) this.quantity += quantity;
        else throw new Error("quantity update > 0");
    }

    decreaseQuantity(quantity: number) {
        if(quantity >= 1) {
            if(this.quantity >= quantity) this.quantity -= quantity
            else throw new Error(`${this.quantity} items remaining in item order`)
        }
        else throw new Error("quantity >= 1 !");
    }
     
    getTotal(): number {
        return this.quantity * this.price
    }
}