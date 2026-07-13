import Customer from "../../models/Customer/index.js";
import type { CustomerUpdateDTO } from "../../models/Customer/type.js";

export default interface CustomerServiceI {
    addCustomer(customer: Customer): void;
    updateCustomer(id: string, data: CustomerUpdateDTO): void;
    deleteCustomer(id: string): void;
    findById(id: string): Customer | undefined;
    findByPhone(phone: string): Customer[];
    getAllCustomers(): Customer[];
    printCustomers(): void;
}
