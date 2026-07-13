import ProductService from "./service/ProductService/index.js";
import CustomerService from "./service/CustomerService/index.js";
import OrderService from "./service/OrderService/index.js";
import Customer from "./models/Customer/index.js";
import Product from "./models/Product/index.js";
import { Order } from "./models/Order/index.js";

function init(): void {
    console.log("-----Start-----");
    const customerService: CustomerService = new CustomerService();
    const productService: ProductService = new ProductService();
    const orderService: OrderService = new OrderService(productService);

    //Create data
    const customer1: Customer = new Customer("Truong Thanh Le", "0969083655", "Da Nang");
    customerService.addCustomer(customer1);
    customerService.printCustomers();

    const macbook: Product = new Product("MacBook Pro M3", 40000000, 10);
    const iphone: Product = new Product("iPhone 15 Pro", 25000000, 20);
    productService.addProduct(macbook);
    productService.addProduct(iphone);
    productService.printProducts();

    //Order
    console.log("Create order");
    const myOrder: Order =orderService.createOrder(customer1);

    myOrder.printInvoice();

    orderService.addProduct(myOrder.getId(), iphone.getId(), 3);
    myOrder.printInvoice()
    orderService.addProduct(myOrder.getId(), macbook.getId(), 1);
    orderService.checkout(myOrder.getId());

    orderService.printOrders();
}

init();