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
	('Durazno Department', 2),
	('Montevideo Department', 2);


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
	('Belgrano', '101', '4004', 1, '2020-04-20', NULL),
	('Lima', '202', '5005', 1, '2020-05-25', NULL);

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
	('SAM001', 'Samsung', 2, 'https://seeklogo.com/images/S/samsung-logo-7FCC326D74-seeklogo.com.png', '30-98765432-9', 2, 'samsung_v@samsung.com', '+598 2 98765432', 'https://www.samsung.com/ar/', 5, 5, '2023-01-15', null, 0);

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
	(101, '2023-10-15', '2024-01-16', 'Received by Maria', 1, 1, '2023-10-15', null, 0, 2537960.00),
	(102, '2023-11-15', '2023-11-16', '', 2, 2, '2023-11-15', null, 0, 4244950),
	(103, '2023-11-20', '2023-11-21', 'Reception 9AM-3PM', 3, 3, '2023-11-20', '2023-11-20', 0, 169245.00),
	(104, '2023-11-23', '2023-11-25', '', 4, 2, '2023-11-15', null, 0, 10675);

INSERT INTO order_details (product_id, quantity, order_id, unit_price) VALUES
	(1, 20, 1, 84899.00),
	(2, 10, 1, 41999.00),
	(3, 10, 1, 41999.00),
	(4, 5, 2, 848990.00),
	(6, 20, 3, 4262.25),
	(8, 20, 3, 2100.00),
	(9, 20, 3, 2100.00),
	(11, 5, 4, 2135.00);

INSERT INTO users (name, email, password) VALUES
('Admin', 'admin@manager.com', 'Admin');