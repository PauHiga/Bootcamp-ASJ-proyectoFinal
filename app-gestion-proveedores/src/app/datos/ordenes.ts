import { orden } from "../models/orden";

export const ordenesEjemplo1 : orden[] = [
  {
    numeroOrden: 1,
    fechaEmision: '2023-01-01',
    fechaEntrega: '2023-01-10',
    informacionRecepcion: 'Recibido correctamente',
    proveedor: 'Proveedor A',
    productos: [
      { codigoProducto: 'ABC123', cantidad: 2 },
      { codigoProducto: 'XYZ789', cantidad: 1 }
    ],
    total: 150.00,
    estado: 'NO CANCELADO'
  },
  {
    numeroOrden: 2,
    fechaEmision: '2023-02-01',
    fechaEntrega: '2023-02-15',
    informacionRecepcion: 'Falta un artículo',
    proveedor: 'Proveedor B',
    productos: [
      { codigoProducto: 'DEF456', cantidad: 3 },
      { codigoProducto: 'GHI789', cantidad: 1 }
    ],
    total: 200.50,
    estado: 'NO CANCELADO'
  },
  {
    numeroOrden: 3,
    fechaEmision: '2023-03-01',
    fechaEntrega: '2023-03-20',
    informacionRecepcion: 'OK',
    proveedor: 'Proveedor C',
    productos: [
      { codigoProducto: 'JKL012', cantidad: 5 }
    ],
    total: 300.75,
    estado: 'CANCELADO'
  },
  ];
  