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
	('Buenos Aires', 1),
	('C�rdoba', 1),
	('Santa Fe', 1),
	('Mendoza', 2),
	('Montevideo', 2);


INSERT INTO localities (name, province_id) VALUES
	('La Plata', 1),
	('C�rdoba Capital', 2),
	('Rosario', 3),
	('Mendoza Capital', 4),
	('Centro', 5);

INSERT INTO addresses (street, number, postal_code, locality_id, created_at, updated_at)
VALUES 
	('Azcuenaga', '456', '2002', 1, '2020-02-10', NULL),
	('San Martin', '45', '2002', 2, '2020-02-10', NULL),
	('Rosas', '789', '3003', 3, '2020-03-15', NULL),
	('Belgrano', '101', '4004', 4, '2020-04-20', NULL),
	('Lima', '202', '5005', 5, '2020-05-25', NULL);

INSERT INTO VATconditions (name) VALUES
	('IVA Responsable Inscripto'),
	('IVA Responsable no Inscripto'),
	('IVA no Responsable'),
	('IVA Sujeto Exento'),
	('Consumidor Final'),
	('Responsable Monotributo'),
	('Sujeto no Categorizado'),
	('Proveedor del Exterior'),
	('Cliente del Exterior'),
	('IVA Liberado � Ley N� 19.640'),
	('IVA Responsable Inscripto � Agente de Percepci�n'),
	('Peque�o Contribuyente Eventual'),
	('Monotributista Social'),
	('Peque�o Contribuyente Eventual Social');


INSERT INTO sectors (name, created_at, updated_at) VALUES
	('Food Industry', '2023-01-15', null),
	('Electronics', '2023-01-15', null),
	('Fast-Moving Consumer Goods (FMCG)', '2023-01-15', '2023-01-16'),
	('Office Supplies', '2023-01-15', null),
	('Importers', '2023-01-15', null);

INSERT INTO contacts (first_name, last_name, email, phone, role, created_at, updated_at) VALUES
	('Enzo', 'Perez', 'enzo.p@arcor.com', '+54 221 22210054', 'Ventas', '2023-01-15', '2023-01-16'),
	('Marcela', 'Bella', 'marcelab@marolio.com', '+54 351 66300541', 'Ventas', '2023-01-15', null),
	('Nicolas', 'de la Rosa', 'ndelarosa@cokecomp.com', '+54 341 01291235', 'gerente de ventas', '2023-01-15', null),
	('Pablo', 'Fuentes', 'pfuentes@unilever.com', '+54 261 15708256', 'Ventas', '2023-01-15', null),
	('Mario', 'Carlos', 'mcarlos@samsungarg.com', '+598 2 50350431', 'Ventas', '2023-01-15', null);

INSERT INTO suppliers (code, business_name, sector_id, url_logo, cuit, VATcondition_id, email, phone, web, address_id, contact_id, created_at, updated_at) VALUES
	('ARC001', 'Arcor', 1, 'arcologo.jpg', '30-34567890-1', 1, 'arcor@arcor.com', '+54 221 23456789', 'www.arcor.com', 1, 1, '2023-01-15', '2023-01-16'),
	('MAR001', 'Marolio', 1, 'maroliologo.jpg', '30-78901234-7', 1, 'marolio@marolio.com', '+54 351 78901234', 'www.marolio.com', 2, 2, '2023-01-15', '2023-01-16'),
	('COC001', 'Coca-Cola', 1, 'cocacolalogo.jpg', '30-78901234-5', 1, 'cocacola@cokecomp.com', '+54 341 56789012', 'www.cocacola.com', 3, 3, '2023-01-15', null),
	('UNI001', 'Unilever', 3, 'unileverlogo.jpg', '30-67890123-6', 1, 'unilever@unilever.com', '+54 261 67890123', 'www.unilever.com', 4, 4, '2023-01-15', null),
	('SAM001', 'Samsung', 2, 'samsunglogo.jpg', '30-98765432-9', 1, 'samsung_v@samsung.com', '+598 2 98765432', 'www.samsung.com', 5, 5, '2023-01-15', null);

INSERT INTO categories (name, created_at, updated_at, deleted) VALUES
	('Snacks', '2023-01-15', NULL, 0),
	('Food', '2023-01-15', NULL, 0),
	('Drink', '2023-01-15', NULL, 0),
	('Cleaning supplies', '2023-01-15', NULL, 0),
	('Electronics', '2023-01-15', '2023-01-17', 0);


INSERT INTO products (SKU, name, supplier_id, category_id, description, price, URLimage, deleted, created_at, updated_at) VALUES
	('ARC001P01', 'Arcor Leche y Mani 25g', 1, 1, 'Arcor chocolate milk and peanut 25g', 180.00, 'chocolate.jpg', 0, '2023-01-15', null),
	('MAR001P01', 'Aceite girasol', 2, 2, 'Marolio Sunflower oil x 900cc', 1140.00, 'sunflower_oil.jpg', 0, '2023-01-15', '2023-01-17'),
	('COC001P01', 'Coca-Cola 500ml', 3, 3, 'Coca-Cola soda original flavor 500 Ml', 824.99, 'cocacola_can.jpg', 0, '2023-01-16', '2023-01-17'),
	('UNI001P01', 'Cif crema 250ml', 4, 4, 'Creamy cleaner with microparticles. Offers maximum cleaning of surfaces with minimal effort', 499.99, 'cif.jpg', 0, '2023-01-15', '2023-01-18'),
	('SAM001P01', 'Samsung Galaxy Watch5 44mm Azul', 5, 5, 'Galaxy Watch5 combines fitness, sleep, blood pressure, and heart rate tracking for everyday health and wellness goals.', 130000.00, 'samsung.jpg', 0, '2023-01-15',null),
	('ARC001P02', 'Butter Toffees Cafe 822g', 1, 1, 'Caramelos blandos sabor café 822g', 6264.00, null, 0, '2024-01-10', null);

INSERT INTO status (name) VALUES ('Active'), ('Completed'), ('Cancelled');

INSERT INTO orders (order_number, issue_date, delivery_date, details, supplier_id, status_id, created_at, updated_at) VALUES
	(12345, '2023-10-15', '2024-01-16', 'Received by Maria', 1, 1, '2023-10-15', null),
	(12312, '2023-11-15', '2023-11-16', '', 2, 2, '2023-11-15', null),
	(67890, '2023-11-20', '2023-11-21', 'Reception 9AM-3PM', 3, 3, '2023-11-20', '2023-11-20'),
	(12312, '2023-11-23', '2023-11-25', '', 4, 2, '2023-11-15', null),
	(12312, '2023-12-29', '2024-01-13', '', 5, 1, '2023-11-15', null);

INSERT INTO order_details (product_id, quantity, order_id, unit_price) VALUES
	(1, 100, 1, 180.00),
	(6, 10, 1, 6264.00),
	(2, 50, 2, 1140.00),
	(3, 100, 3, 824.99),
	(4, 50, 4, 499.99),
	(5, 5, 5, 130000.00);
