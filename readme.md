Endpoints del Backend (Node.js)
Autenticación

POST /api/auth/login: Iniciar sesión de administrador/cajero
POST /api/auth/logout: Cerrar sesión
GET /api/auth/me: Obtener usuario actual

Productos y Categorías

GET /api/categorias: Listar todas las categorías
POST /api/categorias: Crear nueva categoría (admin)
PUT /api/categorias/:id: Actualizar categoría (admin)
DELETE /api/categorias/:id: Eliminar categoría (admin)
GET /api/productos: Listar todos los productos (con filtros)
GET /api/productos/:id: Obtener detalles de un producto
POST /api/productos: Crear nuevo producto (admin)
PUT /api/productos/:id: Actualizar producto (admin)
DELETE /api/productos/:id: Eliminar producto (admin)
GET /api/productos/:id/variaciones: Listar variaciones de un producto
POST /api/productos/:id/variaciones: Agregar variación a un producto (admin)
PUT /api/variaciones/:id: Actualizar variación (admin)
DELETE /api/variaciones/:id: Eliminar variación (admin)

Ingredientes e Inventario

GET /api/ingredientes: Listar todos los ingredientes
POST /api/ingredientes: Crear nuevo ingrediente (admin)
PUT /api/ingredientes/:id: Actualizar ingrediente (admin)
DELETE /api/ingredientes/:id: Eliminar ingrediente (admin)
GET /api/inventario: Obtener estado del inventario
POST /api/inventario/movimiento: Registrar movimiento de inventario
GET /api/inventario/movimientos: Listar movimientos de inventario

Pedidos

POST /api/pedidos: Crear nuevo pedido (público)
GET /api/pedidos: Listar pedidos (con filtros)
GET /api/pedidos/:id: Obtener detalles de un pedido
PUT /api/pedidos/:id/estado: Actualizar estado de un pedido
POST /api/pedidos/:id/whatsapp: Enviar mensaje WhatsApp con detalles del pedido

Zonas de Entrega

GET /api/zonas: Listar zonas de entrega
POST /api/zonas: Crear nueva zona (admin)
PUT /api/zonas/:id: Actualizar zona (admin)
DELETE /api/zonas/:id: Eliminar zona (admin)
POST /api/zonas/verificar: Verificar si una dirección está dentro de una zona de entrega

Reportes

GET /api/reportes/ventas/diario: Reporte de ventas del día
GET /api/reportes/ventas/mensual: Reporte de ventas mensual
GET /api/reportes/productos/populares: Productos más vendidos
GET /api/reportes/horas: Distribución de ventas por horas