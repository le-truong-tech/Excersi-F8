export default interface CustomerI {
    updatePhone(phone: string) : void
    updateAddress(address: string): void
    toString(): string
}
export interface CustomerUpdateDTO {
    name?: string;
    phone?: string;
    address?: string;
}