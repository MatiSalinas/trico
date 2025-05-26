export interface CreatePedidoDTO {
    nombre_cliente: string;
    telefono: string;
    direccion: string;
    latitud: number;
    longitud: number;
    zona_entrega: string;
    metodo_pago: string;
    origen: string;
    observaciones?: string;
    detalles: {
        producto_id: number;
        variacion_id: number;
        cantidad: number;
    }
}

export interface DetallePedidoCalculado {
    producto_id: number;
    variacion_id: number;
    cantidad: number;
    precio_unitario: number;
    subtotal: number;
}