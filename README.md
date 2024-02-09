# Proyect Integrador Final

Desarrollo de un *Sistema de Gestión Compras* para manejar información de Proveedores, Productos y Órdenes de compra.




## Ejecutar localmente

Pasos necesarios para correr el proyecto localmente

- Crear una base de datos llamada
```sql
  CREATE DATABASE suppliersmanager;
```

El proyecto está configurado con la opción spring.jpa.hibernate.ddl-auto=update para ser probado fácilmente. La información modelo se carga con los datos contenidos en el archivo data.sql

Este modo elimina los cambios que hubiera si se reinicia el backend de la aplicación.
Modificaciones a applications.properties en caso de querer conservar los cambios:

```
spring.jpa.hibernate.ddl-auto=update
spring.jpa.defer-datasource-initialization=false 
spring.sql.init.mode=never
```

### Inicio sin datos

En caso de usar la aplicación vacía (sin carga de datos inicial de proveedores, categorías, productos, etc):

Se deben precargar mínimamente las tablas **users**, **vat_conditions** y **status**. Estos son datos que no están bajo el control del usuario administrador.

```sql
INSERT INTO VAT_conditions (name) VALUES
('IVA Responsable Inscripto'),
('IVA Responsable no Inscripto'),
('IVA no Responsable'),
('IVA Sujeto Exento'),
('Consumidor Final'),
('Responsable Monotributo'),
('Sujeto no Categorizado'),
('Proveedor del Exterior'),
('Cliente del Exterior'),
('IVA Liberado – Ley Nº 19.640'),
('IVA Responsable Inscripto – Agente de Percepción'),
('Pequeño Contribuyente Eventual'),
('Monotributista Social'),
('Pequeño Contribuyente Eventual Social');

INSERT INTO status (name, default_status) VALUES
('Draft', 0),
('Pending Approval', 1),
('Approved', 0),
('Active', 0),
('Partial Delivery', 0),
('Complete Delivery', 0),
('Pending Payment', 0),
('Paid', 0),
('Closed', 0);

INSERT INTO users (name, email, password) VALUES
('Admin', 'admin@manager.com', 'Admin');
```



- Ejecutar el servidor de Angular (*puerto 4300*)

```bash
  ng start -o
```

- Usuario y contraseña

Usuario (email): admin@manager.com

Contraseña: Admin


- Ejecutar el servidor de Java (*puerto 8080*)

- Insertar algunas **Categorías** desde el FRONT

- Insertar algunas **Rubros** desde el FRONT

- Insertar algunas **Proveedores** desde el FRONT

- Insertar algunas **Productos** desde el FRONT

- Insertar algunas **Ordenes de Compra** desde el FRONT



## API Reference *(opcional)*

#### Obtener todos los proveedores

```http
  GET /suppliers
```


#### Obtener un proveedor

```http
  GET /suppliers/${id}
```

| Parámetro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Integer` | **Obligatorio**. ID del Proveedor a buscar |



#### Obtener todos los productos

```http
  GET /products
```


#### Obtener un producto

```http
  GET /products/${id}
```

| Parámetro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Integer` | **Obligatorio**. ID del Producto a buscar |


## Desarrollado por Paula Higa

Este proyecto fue desarrollado por: **Paula Higa**

