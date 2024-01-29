import { Contact } from "./contact";
import { Address } from "./address";

export interface Supplier {
    id: number,
    code: string,
    business_name: string,
    sector: string,
    url_logo: string,
    cuit: string,
    vat_condition: string,
    email: string,
    phone: string,
    web: string,
    address: Address,
    contact: Contact,
    deleted: boolean
}