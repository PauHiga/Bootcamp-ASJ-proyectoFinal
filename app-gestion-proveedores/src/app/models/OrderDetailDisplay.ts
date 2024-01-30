import { OrderDisplay } from "./orderDisplay";
import { ProductDisplay } from "./productDisplay";

export interface OrderDetailDisplay {
    // id: number,
    product: ProductDisplay,
    quantity: number,
    unit_price: number,
    // order: OrderDisplay
}