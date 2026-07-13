import Product from "../../models/Product/index.js";
import type { ProductUpdateDTO } from "../../models/Product/type.js";

export default interface ProductServiceI {
    addProduct(product: Product) : void
    updateProduct(id:string, data: ProductUpdateDTO): void
    deleteProduct(id: string): void
    findById(id: string) : Product | undefined
    findByName(keyword: string): Product[]
    getAllProducts(): Product[]
    printProducts(): void
}

