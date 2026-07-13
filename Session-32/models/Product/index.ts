import type ProductI from "./type.js";
import {v7} from "uuid";

export default class Product implements ProductI {

    private id: string;
    private name: string;
    private price: number;
    private stock: number;

    constructor(name: string, price: number, stock: number) {
        this.id = v7().toString();
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    getId() {return this.id;}
    getName() {return this.name;}
    getPrice() {return this.price;}
    getStock() {return this.stock;}

    setName(name: string) {return this.name = name;}
    setPrice(price: number) {
        if(price < 0) throw new Error("price >= 0");
        return this.price = price;
    }


    increaseStock(quantity: number): void {
        if(quantity >= 1) this.stock += quantity;
        else throw new Error("quantity >= 1 !");
    }
    decreaseStock(quantity: number): void {
        if(quantity >= 1) {
            if(this.stock >= quantity) this.stock -= quantity
            else throw new Error(`${this.stock} items remaining in stock`)
        }
        else throw new Error("quantity >= 1 !");
    }
    toString(): string {
        return `Product{id: ${this.id}, name: ${this.name}, price: ${this.price}, stock: ${this.stock}`;
    }
}
