export default interface ProductI {
    increaseStock(quantity: number): void
    decreaseStock(quantity: number): void
    toString(): string
}

export interface ProductUpdateDTO {
    name?: string;
    price?: number;
}