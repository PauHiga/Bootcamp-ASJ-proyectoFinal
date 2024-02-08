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
