import { v7 } from "uuid";

export interface EmployeeI {
    receiveNoti(message: string): void
}

export class Employee implements EmployeeI {

    id: string;
    name: string;

    constructor(name: string) {
        this.id = v7.toString();
        this.name = name;
    };

    receiveNoti(message: string): void {
        console.log(`[${this.id}] - [${this.name}] received notification: ${message}`);
    }
}