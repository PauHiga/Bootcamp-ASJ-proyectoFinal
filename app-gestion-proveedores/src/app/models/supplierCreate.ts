import { Contact } from "./contact";
import { Address } from "./address";

export interface SupplierCreate {
    id?: number,
    code: string,
    business_name: string,
    sector: string,
    urlLogo: string,
    cuit: string,
    vat_condition: string,
    email: string,
    phone: string,
    web: string,
    address: Address,
    contact: Contact,
    deleted?: boolean
}