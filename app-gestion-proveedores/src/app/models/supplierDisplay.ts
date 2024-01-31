import { Contact } from "./contact";
import { AddressDisplay } from "./addressDisplay";

export interface SupplierDisplay {
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
    address: AddressDisplay,
    contact: Contact,
    deleted?: boolean
}