import { Supplier } from "./supplier";

export interface producto {
        id: number,
        SKU: string,
        name: string,
        description: string,
        price: number,
        url_image: string,
        deleted: boolean,
        supplier: Supplier,
        category: string
}