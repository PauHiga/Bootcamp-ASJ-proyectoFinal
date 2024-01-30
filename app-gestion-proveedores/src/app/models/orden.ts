import { productoCantidad } from "./OrderDetailDisplay"

export interface orden {
    id: string,
    numeroOrden: number,
    fechaEmision: string,
    fechaEntrega: string,
    informacionRecepcion: string,
    proveedor: string,
    productos: productoCantidad[],
    total: number,
    estado: boolean
}