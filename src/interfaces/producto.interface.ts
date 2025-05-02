export interface Usuario {
    id?: number;
    nombre: string;
    email: string;
    password: string;
    rol: 'admin' | 'cajero' | 'usuario';
    fecha_creacion?: Date;
    ultima_sesion?: Date;
}

export interface UsuarioAuth extends Omit<Usuario, 'password'> {
    id: number;
}

export interface Categoria {
    id?: number | null;
    nombre: string;
    descripcion?: string | null;
    orden?: number;
    activo?: boolean;
}

export interface Producto {
    id?: number;
    categoria_id: number;
    nombre: string;
    descripcion?: string | null;
    precio: number;
    imagen?: string | null;
    disponible: boolean;
    destacado: boolean;
    fecha_creacion?: Date;
    categoria?: Categoria;
    variaciones?: VariacionProducto[];
    ingredientes?: ProductoIngrediente[];
}

export interface ProductoConRelaciones extends Producto {
    categoria: Categoria;
    variaciones: VariacionProducto[];
    ingredientes: Array<ProductoIngrediente & { ingrediente: Ingrediente }>;
}

export interface VariacionProducto {
    id?: number;
    producto_id: number;
    nombre: string;
    precio_adicional: number;
    producto?: Producto;
}

export interface Ingrediente {
    id?: number;
    nombre: string;
    stock : number;
    unidad_medida: string;
    costo: number;
    productos?: ProductoIngrediente[];
}

export interface ProductoIngrediente {
    id?: number;
    producto_id: number;
    ingrediente_id: number;
    cantidad: number;
    producto?: Producto;
    ingrediente?: Ingrediente;
}

export interface Pedido {
    id?: Number;
    nombre_cliente: string;
    telefono: string;
    direccion?: string | null;
    latitud?: number | null;
    longitud?: number | null;
    zona_entrega: "retiro" | "cerca" | "media" | "lejos";
    costo_envio: number;
    subtotal: number;
    total: number;
    metodo_pago: "efectivo" | "transferencia" | "tarjeta" | "online" | "mixto";
    estado: "pendiente" | "confirmado" | "en_preparcion" | "enviado" | "entregado" | "cancelado";
    origen: "web" | "telefono" | "presencial";
    obervaciones?: string | null;
    fecha_pedido?: Date;
    usuario_id?: number | null;
    usuario?: Usuario;
    detalles?: DetallePedido[];
}

export interface PedidoConDetalles extends Pedido {
    detalles: Array< DetallePedido & {
        producto: Producto,
        variacion: VariacionProducto;
    }>
}

export interface DetallePedido {
    id?: number;
    pedido_id: number;
    producto_id: number;
    variacion_id: number;
    cantidad: number;
    precio_unitario: number;
    subtotal: number;
    observaciones?: string | null
}

export interface ZonaEntrega {
    id?: number;
    nombre: string;
    tipo: "retiro" | "cerca" | "media" | "lejos";
    costo: number;
    radio_km: number;
}

export interface MovimientoInventario {
    id?: number;
    ingrediente_id: number;
    cantidad: number;
    tipo: "entrada" | "salida" | "ajuste";
    motivo?: string | null;
    fecha?: Date;
    usuario_id?: number | null;
    ingrediente?: Ingrediente;
    usuario?: Usuario;
}
