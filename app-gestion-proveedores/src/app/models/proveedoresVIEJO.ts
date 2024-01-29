import { direccion } from "./direccion";
import { contacto } from "./contacto";

export interface proveedor {
    id: string,
    codigo: string,
    business_name: string,
    rubro: string,
    URLlogo: string,
    CUIT: string,
    vat_condition: string,
    email: string,
    telefono: string,
    web: string,
    direccion: direccion,
    contacto: contacto,
    deleted: boolean
}