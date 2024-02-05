INSERT INTO VAT_conditions (name) VALUES
('IVA Responsable Inscripto'),
('IVA No Responsable'),
('IVA exento'),
('Responsable Monotributo');

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

INSERT INTO users (name, password) VALUES
('Admin', 'Admin');