import Customer from "../../models/Customer/index.js";
import { Order } from "../../models/Order/index.js";
import type { OrderServiceI } from "./type.js";
import { OrderItem } from "../../models/OrderItem/index.js";
import Product from "../../models/Product/index.js";
import ProductService from "../ProductService/index.js";
import { OrderStatus } from "../../models/Order/index.js";

export default class OrderService implements OrderServiceI {

    private orders: Order[] = [];
    private productService: ProductService;

    constructor(productService: ProductService) {
        this.productService = productService;
    }

    createOrder(customer: Customer): Order {
        const order: Order = new Order(customer);
        this.orders.push(order);
        return order;
    }

    addProduct(orderId: string, productId: string, quantity: number): void {
        const existingOrder: Order | undefined = this.findOrder(orderId);

        if(!existingOrder) throw new Error(`Not found order id: ${orderId}`);
        if(existingOrder.getStatus() !== OrderStatus.NEW) throw new Error("Just change NEW status order");
        
        const product = this.productService.findById(productId);
        if(!product) throw new Error(`Not found product id ${productId}`);

        product.decreaseStock(quantity)

        const orderItem: OrderItem = new OrderItem(product, quantity, product.getPrice());
        existingOrder.addItem(orderItem);
    }
    removeProduct(orderId: string, productId: string): void {
        const existingOrder: Order | undefined = this.findOrder(orderId);

        if(!existingOrder) throw new Error(`Not found order id: ${orderId}`);
        if(existingOrder.getStatus() !== OrderStatus.NEW) throw new Error("Just change NEW status order");

        const itemToRemove: OrderItem | undefined = existingOrder.getItems().find(item => item.getProduct().getId() === productId);
        
        if(itemToRemove) {
            itemToRemove.getProduct().increaseStock(itemToRemove.getQuantity());
            existingOrder.removeItem(productId)
        }
    }
    checkout(orderId: string): void {
        const existingOrder: Order | undefined = this.findOrder(orderId);

        if(!existingOrder) throw new Error(`Not found order id: ${orderId}`);
        if(existingOrder.getStatus() !== OrderStatus.NEW) throw new Error("Just checkout NEW status order");

        existingOrder.setStatus(OrderStatus.PAID);

        console.log(`Success checkout order id ${orderId}`);
    }
    cancelOrder(orderId: string): void {
        const existingOrder: Order | undefined = this.findOrder(orderId);

        if(!existingOrder) throw new Error(`Not found order id: ${orderId}`);
        if(existingOrder.getStatus() === OrderStatus.CANCELLED) return;

        existingOrder.getItems().forEach(item => {
            item.getProduct().increaseStock(item.getQuantity())
        });
        
        existingOrder.setStatus(OrderStatus.CANCELLED);

        console.log(`Success cancel order id ${orderId}`);

    }
    findOrder(orderId: string): Order | undefined {
        return this.orders.find(order => order.getId() === orderId)   
    }
    getOrders(): Order[] {
        return this.orders
    }
    printOrders(): void {
        console.log("---List order: ---");
        this.orders.forEach(order => {
            console.log(`ID: ${order.getId()}, customer: ${order.getCustomer().getName()}, status: ${order.getStatus()}, total: ${order.calculateTotal().toLocaleString('vi')} VNĐ`)
        });
    }
}