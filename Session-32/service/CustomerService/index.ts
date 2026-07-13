import type Customer from "../../models/Customer/index.js";
import type { CustomerUpdateDTO } from "../../models/Customer/type.js";
import type CustomerServiceI from "./type.js";
import { cleanPhone } from "../../utils/stringUtils.js";

export default class CustomerService implements CustomerServiceI {

    private customers: Customer[] = [];

    addCustomer(customer: Customer): void {
        this.customers.push(customer);
    }
    updateCustomer(id: string, data: CustomerUpdateDTO): void {
        const customer: Customer | undefined = this.findById(id);
        if(customer) {
            if(data) {
                if(data.name) customer.setName(data.name);
                if(data.phone) customer.updatePhone(data.phone);
                if(data.address) customer.updateAddress(data.address);
            } else throw new Error("Error data!")
        } else throw new Error (`Not found id: ${id}`);
    }
    deleteCustomer(id: string): void {
        this.customers = this.customers.filter(c => c.getId() !== id);
    }
    findById(id: string): Customer | undefined {
        return this.customers.find(c => c.getId() === id);
    }
    findByPhone(phone: string): Customer[] {
        const cleanedPhone = cleanPhone(phone);

        return this.customers.filter(c => c.getPhone() === cleanedPhone);
    }
    getAllCustomers(): Customer[] {
        return this.customers;
    }
    printCustomers(): void {
        console.log("---Customers list:---");
        this.customers.forEach(c => console.log(c.toString()));
    }
}