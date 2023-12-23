import { direccion } from "./direccion";
import { contacto } from "./contacto";

export interface proveedor {
    codigo: string,
    razonSocial: string,
    rubro: string,
    URLlogo: string,
    CUIT: string,
    condicionIva: string,
    email: string,
    telefono: string,
    web: string,
    direccion: direccion,
    contacto: contacto
}