import { OrderItem } from "../OrderItem/index.js"

export interface OrderI {
    addItem(item: OrderItem) : void;
    removeItem(productId: string): void;
    calculateTotal(): number;
    printInvoice(): void;
}