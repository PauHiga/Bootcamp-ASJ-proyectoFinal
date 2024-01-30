import { OrderDetailDisplay } from "./OrderDetailDisplay"
import { Supplier } from "./supplier"

export interface OrderDisplay {
    id: number,
    order_number: number,
    issue_date: string,
    delivery_date: string,
    details: string,
    total: number,
    supplier: Supplier,
    productos?: OrderDetailDisplay[],
    status: string,
    deleted: boolean
}