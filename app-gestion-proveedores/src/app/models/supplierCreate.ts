import { Contact } from "./contact";
import { Address } from "./address";

export interface SupplierCreate {
    code: string,
    business_name: string,
    sector: string,
    urlLogo: string,
    cuit: string,
    vatCondition: string,
    email: string,
    phone: string,
    web: string,
    address: Address,
    contact: Contact
}