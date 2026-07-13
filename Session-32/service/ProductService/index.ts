import Product from "../../models/Product/index.js";
import type ProductServiceI from "./type.js";
import type { ProductUpdateDTO } from "../../models/Product/type.js";

export default class ProductService implements ProductServiceI {

    private products: Product[] = [];

    addProduct(product: Product): void {
        this.products.push(product);
    }
    updateProduct(id: string, data: ProductUpdateDTO): void {
        const product: Product | undefined = this.findById(id);
        
        if(product) {
            if(data.name) product.setName(data.name);
            if(data.price) product.setPrice(data.price);
        }
        else throw new Error(`Not found id: ${id}`);
    }
    deleteProduct(id: string): void {
        this.products = this.products.filter(p => p.getId() !== id);
    }
    findById(id: string): Product | undefined {
        return this.products.find(p => p.getId() === id);
    }
    findByName(keyword: string): Product[] {
        const cleanedKeyword = keyword.trim().toLocaleLowerCase();
        return this.products.filter(p => p.getName().trim().toLocaleLowerCase().includes(cleanedKeyword));
    }
    getAllProducts(): Product[] {
        return this.products;
    }
    printProducts(): void {
        console.log("---Products list:---");
        this.products.forEach(p => console.log(p.toString()));
    }
}