import type { OrderItem } from "../OrderItem/index.js";
import type { OrderI } from "./type.js";
import Customer from "../Customer/index.js";
import { v7 } from "uuid";

export enum OrderStatus {
    NEW = "NEW",
    PAID = "PAID",
    CANCELLED = "CANCELLED"
}

export class Order implements OrderI {

    private id: string;
    private customer: Customer;
    private items: OrderItem[] = [];
    private createAt: Date;
    private status: OrderStatus;

    constructor(customer: Customer) {
        this.id = v7().toString();
        this.customer = customer;
        this.createAt = new Date();
        this.status = OrderStatus.NEW;
    }

    getId(): string {return this.id;}
    getCustomer(): Customer {return this.customer;}
    getItems(): OrderItem[] {return [...this.items];}
    getCreateAt(): Date {return this.createAt;}
    getStatus(): OrderStatus {return this.status;}

    setStatus(status: OrderStatus) {this.status = status;}

    addItem(item: OrderItem): void {
        const existingItem: OrderItem | undefined = this.items.find(i => i.getProduct().getId() === item.getProduct().getId());

        if(existingItem) existingItem.increaseQuantity(item.getQuantity())
        else this.items.push(item);
    }
    removeItem(productId: string): void {
        this.items = this.items.filter(i => i.getProduct().getId() !== productId);
    }
    calculateTotal(): number {
        return this.items.reduce((acc, curr) => acc += curr.getTotal(), 0);
    }
    printInvoice(): void {
        console.log(`---Order id${this.id}---`)
        console.log(`Customer: ${this.customer.getName()} - ${this.customer.getPhone()}`)
        this.items.forEach(i => {console.log(`Product: ${i.getProduct().getName()} - price: ${i.getPrice()} - quantity: ${i.getQuantity()} - amount: ${i.getTotal()}`)})
        console.log(`Total: ${this.calculateTotal().toLocaleString('vi')} VNĐ`);
    }
}