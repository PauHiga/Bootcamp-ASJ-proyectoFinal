import { productoCantidad } from "./productoCantidad"

export interface orden {
    id: string,
    numeroOrden: number,
    fechaEmision: string,
    fechaEntrega: string,
    informacionRecepcion: string,
    proveedor: string,
    productos: productoCantidad[],
    total: number,
    estado: 'NO CANCELADO'|'CANCELADO'
}