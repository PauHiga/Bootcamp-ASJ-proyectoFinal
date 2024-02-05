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


INSERT INTO status (name) VALUES
('Draft'),
('Pending Approval'),
('Approved'),
('Active'),
('Partial Delivery'),
('Complete Delivery'),
('Pending Payment'),
('Paid'),
('Closed');

INSERT INTO users (name, email, password) VALUES
('Admin', 'admin@manager.com', 'Admin');