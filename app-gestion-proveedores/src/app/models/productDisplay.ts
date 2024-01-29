export interface ProductDisplay {
    id : number, 
    sku: string,
    name: string,
    description: string,
    price: number,
    url_image: string,
    supplier: {
        business_name: string,
        id: number
    },
    category: {
        name: string,
    },
    deleted: boolean
}