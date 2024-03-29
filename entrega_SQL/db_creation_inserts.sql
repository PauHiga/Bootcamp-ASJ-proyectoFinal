CREATE DATABASE suppliers_manager;

GO 
USE suppliers_manager;


CREATE TABLE countries (
	id INT PRIMARY KEY IDENTITY,
	name VARCHAR(30) NOT NULL
);

CREATE TABLE provinces(
	id INT PRIMARY KEY IDENTITY,
	name VARCHAR(30) NOT NULL,
	country_id INT NOT NULL,
	FOREIGN KEY (country_id) REFERENCES countries(id)
);


CREATE TABLE localities(
	id INT PRIMARY KEY IDENTITY,
	name VARCHAR(30) NOT NULL,
	province_id INT NOT NULL,
	FOREIGN KEY (province_id) REFERENCES provinces(id)
);

CREATE TABLE addresses(
	id INT PRIMARY KEY IDENTITY,
	street VARCHAR(50) NOT NULL,
	number VARCHAR(10) NOT NULL,
	postal_code VARCHAR(15) NOT NULL,
	locality_id INT NOT NULL,
	created_at DATETIME NOT NULL,
	updated_at DATETIME
	FOREIGN KEY (locality_id) REFERENCES localities(id)
);

CREATE TABLE VATconditions(
	id INT PRIMARY KEY IDENTITY,
	name VARCHAR(50) NOT NULL
);

CREATE TABLE sectors (
	id INT PRIMARY KEY IDENTITY,
	name VARCHAR(50) NOT NULL,
	created_at DATETIME NOT NULL,
	updated_at DATETIME,
deleted BIT NOT NULL DEFAULT 0,
);

CREATE TABLE contacts (
	id INT PRIMARY KEY IDENTITY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	phone VARCHAR(20) NOT NULL,
	role VARCHAR(50) NOT NULL,
	created_at DATETIME NOT NULL,
	updated_at DATETIME
);

CREATE TABLE suppliers (
	id INT PRIMARY KEY IDENTITY,
	code VARCHAR(50) NOT NULL UNIQUE,
	business_name VARCHAR(50) NOT NULL,
	sector_id INT NOT NULL,
	url_logo VARCHAR(50),
	cuit VARCHAR(13) NOT NULL,
	VATcondition_id INT NOT NULL,
	email VARCHAR(50) NOT NULL,
	phone VARCHAR(20) NOT NULL,
	web VARCHAR(50),
	address_id INT NOT NULL,
	contact_id INT NOT NULL,
	deleted BIT NOT NULL DEFAULT 0,
	created_at DATETIME NOT NULL,
	updated_at DATETIME,
	FOREIGN KEY (sector_id) REFERENCES sectors(id),
	FOREIGN KEY (VATcondition_id) REFERENCES VATconditions(id),
	FOREIGN KEY (address_id) REFERENCES addresses(id),
	FOREIGN KEY (contact_id) REFERENCES contacts(id),
);

CREATE TABLE categories (
	id INT PRIMARY KEY IDENTITY,
	name VARCHAR(30) NOT NULL,
	created_at DATETIME NOT NULL,
	updated_at DATETIME,
	deleted BIT NOT NULL DEFAULT 0,
);

CREATE TABLE products (
	id INT PRIMARY KEY IDENTITY,
	SKU VARCHAR(20) NOT NULL UNIQUE,
	name VARCHAR(50) NOT NULL,
	supplier_id INT NOT NULL,
	category_id INT NOT NULL,
	description VARCHAR(1000),
	price DECIMAL NOT NULL,
	URLimage VARCHAR(200),
	deleted BIT NOT NULL DEFAULT 0,
	created_at DATETIME NOT NULL,
	updated_at DATETIME,
	FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
	FOREIGN KEY (category_id) REFERENCES categories(id),
);

CREATE TABLE status(
	id INT PRIMARY KEY IDENTITY,
	name VARCHAR(30) NOT NULL,
);

CREATE TABLE orders(
	id INT PRIMARY KEY IDENTITY,
	order_number INT NOT NULL UNIQUE,
    issue_date DATE NOT NULL,
	delivery_date DATE NOT NULL,
	details VARCHAR(500),
	supplier_id INT NOT NULL,
	status_id INT NOT NULL,
	created_at DATETIME NOT NULL,
	updated_at DATETIME,
	FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
	FOREIGN KEY (status_id) REFERENCES status(id)
);

CREATE TABLE order_details(
	id INT PRIMARY KEY IDENTITY,
	product_id INT NOT NULL,
	quantity INT NOT NULL,
	order_id INT NOT NULL,
	unit_price DECIMAL NOT NULL,
	FOREIGN KEY (product_id) REFERENCES products(id),
	FOREIGN KEY (order_id) REFERENCES orders(id),
);


INSERT INTO countries (name) VALUES 
	('Argentina'), 
	('Uruguay'), 
	('Chile'), 
	('Paraguay'), 
	('Brasil');

INSERT INTO provinces (name, country_id) VALUES
	('Córdoba Province', 1),
	('Mendoza', 1),
	('San Luis Province', 1),
	('Durazno', 2),
	('Montevideo', 2);


INSERT INTO localities (name, province_id) VALUES
	('Capital', 1),
	('Capital', 2),
	('Capital', 3),
	('Capital', 4),
	('Centro', 5);

INSERT INTO addresses (street, number, postal_code, locality_id, created_at, updated_at)
VALUES 
	('Azcuenaga', '456', '2002', 1, '2020-02-10', NULL),
	('San Martin', '45', '2002', 2, '2020-02-10', NULL),
	('Rosas', '789', '3003', 3, '2020-03-15', NULL),
	('Belgrano', '101', '4004', 4, '2020-04-20', NULL),
	('Lima', '202', '5005', 5, '2020-05-25', NULL);

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


INSERT INTO sectors (name, created_at, updated_at, deleted) VALUES
	('Sports', '2023-01-15', null, 0),
	('Technology', '2023-01-15', null, 0),
	('Food and Beverage', '2023-01-15', '2023-01-16', 0),
	('Containers and Storage', '2023-01-15', null, 0),
	('Importers', '2023-01-15', null, 0);

INSERT INTO contacts (first_name, last_name, email, phone, role, created_at, updated_at) VALUES
	('Enzo', 'Perez', 'enzo.p@adidas.com', '+54 221 22210054', 'Ventas', '2023-01-15', '2023-01-16'),
	('Marcela', 'Bella', 'marcelab@mylg.com', '+54 351 66300541', 'Ventas', '2023-01-15', null),
	('Nicolas', 'de la Rosa', 'ndelarosa@arcor.com', '+54 341 01291235', 'gerente de ventas', '2023-01-15', null),
	('Pablo', 'Fuentes', 'pfuentes@colombraro.com', '+54 261 15708256', 'Ventas', '2023-01-15', null),
	('Mario', 'Carlos', 'mcarlos@samsungarg.com', '+598 2 50350431', 'Ventas', '2023-01-15', null);

INSERT INTO suppliers (code, business_name, sector_id, url_logo, cuit, VATcondition_id, email, phone, web, address_id, contact_id, created_at, updated_at, deleted) VALUES
	('A001', 'Adidas', 1, 'https://1000marcas.net/wp-content/uploads/2019/11/Adidas-logo.jpg', '30-34567890-1', 1, 'info@adidas.com', '+54 221 23456789', 'https://www.adidas.com', 1, 1, '2023-01-15', '2023-01-16', 0),
	('A002', 'LG', 2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTlUrg4HC-VjdJH_p8PHfg1NgjQHgc5-SBPdkT4ygQ_A&s', '30-78901234-7', 1, 'info@mylg.com.ar', '+54 351 78901234', null, 2, 2, '2023-01-15', '2023-01-16', 0),
	('A003', 'Arcor', 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Arcor_logo.svg/581px-Arcor_logo.svg.png', '30-78901234-5', 1, 'info@arcor.com', '+54 341 56789012', 'https://www.arcor.com/ar/', 3, 3, '2023-01-15', null, 0),
	('A004', 'Colombraro', 4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-IF7mYPcWC5qSyoENNNo9ZiIYFteoV7ART5-zeWHQtg&s', '30-67890123-6', 1, 'info@colombraro.com', '+54 261 67890123', 'https://www.colombraro.com.ar/', 4, 4, '2023-01-15', null, 0),
	('SAM001', 'Samsung', 2, null, '30-98765432-9', 2, 'samsung_v@samsung.com', '+598 2 98765432', 'https://www.samsung.com/ar/', 1, 5, '2023-01-15', null, 0);

INSERT INTO categories (name, created_at, updated_at, deleted) VALUES
	('Sports', '2023-01-15', NULL, 0),
	('Clothes', '2023-01-15', NULL, 0),
	('Technology', '2023-01-15', NULL, 0),
	('Food', '2023-01-15', NULL, 0),
	('Beverage', '2023-01-15', '2023-01-17', 0),
	('Storage and Organization', '2023-01-15', '2023-01-17', 0);

INSERT INTO products (SKU, name, supplier_id, category_id, description, price, url_image, deleted, created_at, updated_at) VALUES
	('SKU001', 'Zapatillas Duramo Speed adidas Sport 78', 1, 1, 'La combinación de la parte superior de malla ligera y transpirable con una mediasuela LIGHTSTRIKE completa permite un movimiento más rápido. La suela resistente está pensada para corredores que quieren iniciarse en el mundo del running y avanzar al siguiente nivel.', 84899, 'https://http2.mlstatic.com/D_NQ_NP_2X_654822-MLA73864722968_012024-F.webp', 0, '2023-01-15', null),
	('SKU002', 'Remera adidas Moda Brandlove Hombre', 1, 2, 'Ajuste clásico. Cuello redondo acanalado. Tejido de punto jersey 100 % algodón. Producto hecho con Better Cotton. Color del artículo: Bronze Strata.', 41999, 'https://http2.mlstatic.com/D_NQ_NP_2X_729102-MLA74254856701_012024-F.webp', 0, '2023-01-15', null),
	('SKU005', 'Remera adidas Moda Brandlove Mujer', 1, 2, 'Ajuste clásico. Cuello redondo acanalado. Tejido de punto jersey 100 % algodón. Producto hecho con Better Cotton. Color del artículo: Bronze Strata.', 41999, 'https://www.moov.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dw36052ad3/products/ADGC6438/ADGC6438-1.JPG', 0, '2023-01-15', null),

	('SKU003', 'Televisor QNED de LG', 2, 3, 'Descubrí los Televisores QNED de LG y disfrutá de colores más vibrantes y precisos. Conocé la tecnología Quantum Dot de iluminación a base de Mini LEDs que mejoran los contrastes de color para crear imágenes más nítidas y naturales.', 848990.00, 'https://www.lg.com/ar/images/televisores/md07585445/Basic-350.jpg', 0, '2023-01-15', '2023-01-17'),
	('SKU004', 'Pote Helado Chocotorta', 3, 4, 'Este irresistible postre combina la suavidad de los helados Arcor con el sabor inconfundible de las Chocolinas, creando una experiencia única para tu paladar.', 2000, 'https://arcorencasa.com/wp-content/uploads/2023/11/20231128-14216.jpg', 0, '2023-01-16', '2023-01-17'),
	('SKU006', 'Arcor Surtido Chocolates Kiosco en Casa', 3, 4, '¡Descubre el delicioso mundo de los chocolates con el surtido Arcor Kiosco en Casa! Esta caja de 246 gramos está llena de chocolates irresistibles. Con una amplia variedad de sabores y texturas, cada bocado es una experiencia única. Disfruta de los clásicos chocolates Arcor en la comodidad de tu hogar. Perfecto para compartir con amigos y familiares o simplemente para darte un capricho. ¡No te resistas a la tentación y añade este surtido a tu carrito de compras ahora mismo!', 4262.25, 'https://arcorencasa.com/wp-content/uploads/2021/03/20210326-13137.jpg', 0, '2023-01-16', '2023-01-17'),
	('SKU007', 'Jugo en Polvo Arcor Sabor Pomelo Rosado', 3, 5, 'Jugo en Polvo Arcor Sabor Pomelo Rosado 18 u x 7gr', 3829.25, 'https://arcorencasa.com/wp-content/uploads/2023/07/20230718-13795.jpg', 0, '2023-01-16', '2023-01-17'),
	('SKU008', 'Barra de cereal Cereal Mix Frutilla Chocolate', 3, 4, ' Barra de cereal Cereal Mix Frutilla Chocolate 26gr pack x 4 unidades.', 2100, 'https://arcorencasa.com/wp-content/uploads/2023/08/20230803-13364.jpg', 0, '2023-01-16', '2023-01-17'),
	('SKU009', 'Barra Cereal Mix Manzana Light', 3, 4, ' Barra de cereal Cereal Mix Manzana Light 23gr pack x4 unidades.', 2100, 'https://arcorencasa.com/wp-content/uploads/2020/05/20230804-3792.jpg', 0, '2023-01-16', '2023-01-17'),
	('SKU010', 'Canasto/cesto Plástico Ratán Mediano Bajo X4', 4, 6, 'CESTO SIMIL RATÁN COLOMBRARO - TAMAÑO MEDIANO BAJO- Set x4 Unidades.', 28950, 'https://http2.mlstatic.com/D_NQ_NP_2X_654476-MLA31021191027_062019-F.webp', 0, '2023-01-15', '2023-01-18'),
	('SKU011', 'Cesto Residuos Reciclado 55 Lts Tapa Plana X 2u', 4, 6, 'Set x 2 Cesto De Residuos Basura/ Reciclado Tapa Plana De 55 Lts Colombraro. Medidas del producto (en cm): Alto 60 - Ancho 44 - Profundidad 34', 2135, 'https://http2.mlstatic.com/D_NQ_NP_2X_924771-MLA51458232534_092022-F.webp', 0, '2023-01-15', '2023-01-18');

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

INSERT INTO orders (order_number, issue_date, delivery_date, details, supplier_id, status_id, created_at, updated_at, deleted, total) VALUES
	(101, '2023-10-15', '2024-01-16', 'Received by Maria', 1, 1, '2023-10-15', null, 0, 100),
	(102, '2023-11-15', '2023-11-16', '', 2, 2, '2023-11-15', null, 0, 100),
	(103, '2023-11-20', '2023-11-21', 'Reception 9AM-3PM', 3, 3, '2023-11-20', '2023-11-20', 0, 100),
	(104, '2023-11-23', '2023-11-25', '', 4, 2, '2023-11-15', null, 0, 100),
	(105, '2023-12-29', '2024-01-13', '', 5, 1, '2023-11-15', null, 0, 100);

INSERT INTO order_details (product_id, quantity, order_id, unit_price) VALUES
	(1, 100, 1, 180.00),
	(6, 10, 1, 6264.00),
	(2, 50, 2, 1140.00),
	(3, 100, 3, 824.99),
	(4, 50, 4, 499.99),
	(5, 5, 5, 130000.00);

INSERT INTO users (name, email, password) VALUES
('Admin', 'admin@manager.com', 'Admin');