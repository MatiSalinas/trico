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
    id?: number;
    nombre: string;
    descripcion?: string | null;
    orden: number;
    activo: boolean;
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