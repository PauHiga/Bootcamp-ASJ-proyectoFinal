import { productoCantidad } from "./OrderDetailDisplay"

export interface OrderCreate {
    id: number,
    order_number: number,
    issue_date: string,
    delivery_date: string,
    details: string,
    supplier: string,
    // productos: productoCantidad[],
    status: string,
    //deleted should be replaced with status
    deleted: boolean
}