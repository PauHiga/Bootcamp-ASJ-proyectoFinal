-- Primer paso: activar la base de datos

USE suppliers_manager;

--1) Obtener todos los productos, mostrando nombre del producto, categor�a, proveedor (raz�n social y codigo proveedor), precio.

SELECT 
	products.name AS 'Nombre del producto', 
	categories.name AS 'Categor�a', 
	suppliers.business_name AS 'Raz�n social proveedor', 
	suppliers.code AS 'C�digo del proveedor', 
	products.price AS 'Precio'
FROM products
INNER JOIN categories ON categories.id = products.category_id
INNER JOIN suppliers ON suppliers.id = products.supplier_id


--2)En el listado anterior, adem�s de los datos mostrados, traer el campo imagen aunque el producto NO tenga una. Si no tiene imagen, mostrar "-".

SELECT 
	products.name AS 'Nombre del producto', 
	categories.name AS 'Categor�a', 
	suppliers.business_name AS 'Raz�n social proveedor', 
	suppliers.code AS 'C�digo del proveedor', 
	products.price AS 'Precio', 
	CASE
		WHEN products.URLimage IS NULL THEN '-'
		ELSE products.URLimage
	END AS 'URL de imagen'
FROM products
INNER JOIN categories ON categories.id = products.category_id
INNER JOIN suppliers ON suppliers.id = products.supplier_id


--3)Mostrar los datos que se pueden modificar (en el front) del producto con ID = 2.
--Al editar un producto, mi front permite modificar el nombre del producto, la categor�a, la descripci�n, el precio y la URL de imagen

SELECT 
	products.name AS 'Nombre del producto', 
	categories.name AS 'Categor�a', 
	products.description AS 'Descripcion', 
	products.price AS 'Precio', 
	CASE
		WHEN products.URLimage IS NULL THEN '-'
		ELSE products.URLimage
	END AS 'URL de imagen'
FROM products
INNER JOIN categories ON categories.id = products.category_id
WHERE products.id = 2

-- 4)Listar todos los proveedores cuyo tel�fono tenga la caracter�stica de C�rdoba o que la provincia sea igual a alguna de las 3 con m�s proveedores.
-- Primero me aseguro de que el proveedor de C�rdoba tenga tel�fono de C�rdoba

UPDATE suppliers SET suppliers.phone = '+54 351 78901234' WHERE suppliers.id = 2;

SELECT 
	suppliers.business_name AS 'Raz�n Social', 
	suppliers.phone AS 'Tel�fono'
FROM suppliers
WHERE suppliers.phone LIKE '+54 351%'


--5) Traer un listado de todos los proveedores que no hayan sido eliminados , ordenados por razon social, codigo proveedor y fecha en que se di� de alta ASC. 
--De este listado mostrar los datos que correspondan con su tabla del front.

--Primero voy a eliminar un proveedor para que haya al menos un eliminado (Los eliminados son los que tienen deleted = 1)

UPDATE suppliers SET suppliers.deleted = 1 WHERE suppliers.id = 3;

SELECT
	suppliers.business_name AS 'Raz�n Social', 
	suppliers.code AS 'C�digo Proveedor', 
	suppliers.created_at AS 'Fecha de alta'
FROM suppliers
WHERE suppliers.deleted = 0
ORDER BY suppliers.business_name, suppliers.code, suppliers.created_at



--6) Obtener razon social, codigo proveedor, imagen, web, email, tel�fono y los datos del contacto del proveedor con m�s ordenes de compra cargadas.

--Como todos los proveedores tienen una sola orden, primero voy a crear una nueva orden de compra para el proveedor 1 y para el proveedor 2 para que aparezcan en el select:

INSERT INTO orders (order_number, issue_date, delivery_date, details, supplier_id, status_id, created_at, updated_at) VALUES
  (11245, '2024-01-10', '2024-01-20', null, 1, 1, '2024-01-10', null);

INSERT INTO orders (order_number, issue_date, delivery_date, details, supplier_id, status_id, created_at, updated_at) VALUES
  (1125, '2024-01-10', '2024-01-20', null, 2, 1, '2024-01-10', null);


SELECT 
	suppliers.business_name AS 'Raz�n Social', 
	suppliers.code AS 'C�digo Proveedor', 
	suppliers.url_logo AS 'Logo URL',
	CASE
		WHEN suppliers.web IS NULL THEN '-'
		ELSE suppliers.web
	END AS 'Web',
	suppliers.email AS 'Email',
	suppliers.phone AS 'Tel�fono',
	contacts.first_name AS 'Nombre contacto',
	contacts.last_name AS 'Apellido contacto',
	contacts.phone AS 'Tel�fono contacto',
	contacts.email AS 'Email contacto',
	COUNT(orders.id) AS 'Ordenes de compra'
FROM suppliers
INNER JOIN contacts ON suppliers.contact_id = contacts.id
INNER JOIN orders ON orders.supplier_id = suppliers.id
GROUP BY suppliers.business_name, suppliers.code, suppliers.url_logo, suppliers.web, suppliers.email, suppliers.phone, contacts.first_name,	contacts.last_name,	contacts.phone,	contacts.email
HAVING COUNT(orders.id) = (
	SELECT MAX(order_count)
	FROM (
		SELECT COUNT(id) AS order_count
		FROM orders
		GROUP BY supplier_id
	) AS order_counts
);

--7) Mostrar la fecha emisi�n, n� de orden, razon social y codigo de proveedor, y la cantidad de productos de cada orden.

SELECT 
	orders.issue_date AS 'Fecha de Emision',
	orders.order_number AS 'N� de Orden',
	suppliers.business_name AS 'Raz�n social proveedor',
	suppliers.code AS 'C�digo proveedor',
	SUM(order_details.quantity) AS 'Productos por orden'
FROM orders
INNER JOIN suppliers ON suppliers.id = orders.supplier_id
INNER JOIN order_details ON order_details.order_id = orders.id
GROUP BY orders.issue_date, 
	orders.order_number,
	suppliers.business_name,
	suppliers.code


--8) En el listado anterior, diferenciar cuando una orden est� Cancelada o no, y el total de la misma.

SELECT 
	orders.issue_date AS 'Fecha de Emision',
	orders.order_number AS 'N� de Orden',
	suppliers.business_name AS 'Raz�n social proveedor',
	suppliers.code AS 'C�digo proveedor',
	CASE
		WHEN status.name = 'Cancelled' THEN 'Orden Cancelada'
		ELSE 'Orden No Cancelada'
	END AS 'Estado',
	SUM(order_details.quantity) AS 'Productos por orden'
FROM orders
INNER JOIN suppliers ON suppliers.id = orders.supplier_id
INNER JOIN order_details ON order_details.order_id = orders.id
INNER JOIN status ON orders.status_id = status.id
GROUP BY orders.issue_date, 
	orders.order_number,
	suppliers.business_name,
	suppliers.code,
	status.name

--9) Mostrar el detalle de una orden de compra del proveedor 3, trayendo: SKU del producto, nombre producto, cantidad y subtotal.

--El proveedor 3 posee una orden de compra con id = 3 con un producto. 
--Primero voy a insertar un segundo producto para mostrar en la query

INSERT INTO products (SKU, name, supplier_id, category_id, description, price, URLimage, deleted, created_at, updated_at) VALUES
	('COC001P02', 'Coca-Cola 2l', 3, 3, 'Coca-Cola soda original 2l', 1200.00, 'cocacola_2l.jpg', 0, '2023-01-16', '2023-01-17');

INSERT INTO order_details (product_id, quantity, order_id, unit_price) VALUES
	(7, 100, 3, 1200.00);


SELECT 
	products.SKU AS 'SKU producto', 
	products.name AS 'Producto', 
	order_details.quantity AS Cantidad, 
	(order_details.quantity * order_details.unit_price) AS Subtotal
FROM products
INNER JOIN order_details ON products.id = order_details.product_id
WHERE order_details.order_id = 3


--10)Cambiar el estado a Cancelada y la fecha de modificaci�n a la orden de compra con ID = 4.

-- Nota: "Cancelada" es el status id = 3

UPDATE orders
SET 
    status_id = 3,
    updated_at = '2024-01-10'
WHERE id = 4;


--11) Escribir la sentencia para eliminar el producto con id = 1 (NO EJECUTAR, S�LO MOSTRAR SENTENCIA)

--DELETE FROM order_details
--WHERE order_details.product_id = 1;

--DELETE FROM products 
--WHERE products.id = 1;

