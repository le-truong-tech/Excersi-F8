import type CustomerI from "./type.js";
import {v7} from "uuid";
import { cleanPhone, isPhone } from "../../utils/stringUtils.js";

export default class Customer implements CustomerI {

    private id: string;
    private name: string;
    private phone: string;
    private address: string;

    constructor(name: string, phone: string, address: string) {
        this.id = v7().toString();
        this.name = name;
        this.phone = phone;
        this.address = address;
    }

    getId() {return this.id;}
    getName() {return this.name;}
    getPhone() {return this.phone;}
    getAddress() {return this.address;}

    setName(name: string) {return this.name = name;}

    updatePhone(phone: string): void { 
        const cleanedPhone = cleanPhone(phone);

        if(isPhone(cleanedPhone)) this.phone = cleanedPhone;
        else throw new Error("Phone number format is invalid!");
    }
    updateAddress(address: string): void {
        if(address.trim().length === 0) throw new Error("Do not leave the address blank!");

        this.address = address;
    }
    toString(): string {
        return `Customer{id: ${this.id}, name: ${this.name}, phone: ${this.phone}, address: ${this.address}`
    }

}