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
('Draft', false),
('Pending Approval', true),
('Approved', false),
('Active', false),
('Partial Delivery', false),
('Complete Delivery', false),
('Pending Payment', false),
('Paid', false),
('Closed', false);

INSERT INTO users (name, email, password) VALUES
('Admin', 'admin@manager.com', 'Admin');