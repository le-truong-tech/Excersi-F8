import type { Customer } from "../models/Customer.js";
import { v7 } from "uuid";

export class CustomerService {

    private customers: Customer[] = [];
    
    create(customer: Omit<Customer, "id">): Customer {
        const newCustomer: Customer = {
            id: v7(),
            ...customer
        };

        this.customers.push(newCustomer);

        return newCustomer;
    }

    updateById(id: string, data: Partial<Customer>): Customer | null {
        const index: number = this.customers.findIndex(c => c.id === id);
        if(index === -1) return null;
        
        const oldCustomer = this.customers[index];
        if (!oldCustomer) return null;

        this.customers[index] = {...oldCustomer, ...data};

        return this.customers[index];
    }

}