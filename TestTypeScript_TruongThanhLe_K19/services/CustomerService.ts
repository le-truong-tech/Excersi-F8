import { v7 } from "uuid";
import type { CustomerI } from "../models/Customer";

export interface CustomerServiceI {
    create(customer: Omit<CustomerI, "id">): CustomerI;
    updateById(id: string, data: Partial<CustomerI>): CustomerI | null
}

export class CustomerService implements CustomerServiceI {
    private customers: CustomerI[] = [];
    
    create(customer: Omit<CustomerI, "id">): CustomerI {
        const newCustomer: CustomerI = {...customer, id: v7()}
        this.customers.push(newCustomer);
        return newCustomer;
    }
    updateById(id: string, data: Partial<CustomerI>): CustomerI | null {
        let customer: CustomerI | null = this.findById(id);
        if(!customer) return null;

        Object.assign(customer, data);

        return customer
    }
    findById(id: string) : CustomerI | null {
        const customer = this.customers.find(c => c.id === id);
        if(!customer) return null;
        return customer;
    }

}