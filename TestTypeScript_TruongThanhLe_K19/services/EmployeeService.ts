import { v7 } from "uuid";
import type { EmployeeI} from "../models/Employee";
import { Employee } from "../models/Employee";

export interface EmployeeServiceI {
    create(employee: Omit<Employee, "id">): EmployeeI;
    findById(id: string): EmployeeI | null;
    updateById(id: string, data: Partial<EmployeeI>): EmployeeI | null;
}

export class EmployeeService implements EmployeeServiceI {
    private employees: EmployeeI[] = [];
    
    create(employee: Omit<EmployeeI, "id" | "receiveNoti">): EmployeeI {
        const newEmployee: EmployeeI = new Employee(employee.name);
        this.employees.push(newEmployee);
        return newEmployee;
    }
    findById(id: string): EmployeeI | null {
        const employee = this.employees.find(e => e.id === id);
        if(!employee)return null;
        return employee;
    }
    updateById(id: string, data: Partial<EmployeeI>): EmployeeI | null {
        const employee = this.findById(id);
        if(!employee) return null;

        if(data.name !== undefined) employee.name = data.name;
        
        return employee;
    }

}