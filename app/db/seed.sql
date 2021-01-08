INSERT INTO
  employee_db.department (name)
VALUES
  ('Development'),
  ('IT'),
  ('Marketing'),
  ('Data Analytics'),
  ('Human Resources'),
  ('Customer Service'),
  ('Accounting'),
  ('Facilities');
INSERT INTO
  employee_db.department (name)
VALUES
  ('C Suite');
INSERT INTO
  employee_db.role (title, salary, department_id)
VALUES
  ('Manager', 175000, 1),
  ('DevOps', 120000, 1),
  ('Senior Developer', 120000, 1),
  ('Junior Developer', 70000, 1),
  ('Senior Systems Admin', 100000, 2),
  ('Junior Systems Admin', 70000, 2),
  ('Help Desk Tech', 55000, 2),
  ('Manager', 90000, 3),
  ('Marketing Agent', 70000, 3),
  ('Manager', 175000, 4),
  ('Data Analyst', 120000, 4),
  ('Manager', 80000, 5),
  ('HR Coordinator', 60000, 5),
  ('Manager', 70000, 6),
  ('Representative', 50000, 6),
  ('Manager', 175000, 7),
  ('Controller', 120000, 7),
  ('Accountant', 60000, 7),
  ('Manager', 70000, 8),
  ('Office Manager', 50000, 8),
  ('Maintenance', 45000, 8);
INSERT INTO
  employee_db.role (title, salary, department_id)
VALUES
  ('CEO', 500000, 9),
  ('CFO', 450000, 9),
  ('COO', 450000, 9),
  ('CTO', 450000, 9);
UPDATE
  role
SET
  title = 'Technology MGR'
WHERE
  id = 1;
INSERT INTO
  employee_db.role (title, salary, department_id)
VALUES
  ('IT MGR', 150000, 2);
UPDATE
  role
SET
  department_id = 9
WHERE
  id = 20;
INSERT INTO
  employee_db.employee (first_name, last_name, manager_id, role_id)
VALUES
  ('Brad', 'Fitzpatrick', 1, 26);