export interface Product {
    id : number, 
    sku: string,
    name: string,
    description: string,
    price: number,
    url_image: string,
    supplier_id: number,
    category: string,
    deleted: boolean
}