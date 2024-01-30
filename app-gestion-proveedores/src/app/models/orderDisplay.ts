import { OrderDetailDisplay } from "./OrderDetailDisplay"
import { Supplier } from "./supplier"

export interface OrderDisplay {
    id: number,
    order_number: number,
    issue_date: string,
    delivery_date: string,
    details: string,
    supplier: Supplier,
    productos?: OrderDetailDisplay[],
    total: number,
    status: string,
    deleted: boolean
}