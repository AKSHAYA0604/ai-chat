-- SQLite
-- CREATE TABLE employees (
--    id INTEGER PRIMARY KEY AUTOINCREMENT,
--    name TEXT,
--    salary REAL
--);


--INSERT INTO employees (name, salary) VALUES ('Alice', 60000);
--INSERT INTO employees (name, salary) VALUES ('Bob', 75000);
--INSERT INTO employees (name, salary) VALUES ('Charlie', 65000);

--CREATE TABLE departments (
--    id INTEGER PRIMARY KEY AUTOINCREMENT,
--    name TEXT UNIQUE
--);

--CREATE TABLE projects (
--    id INTEGER PRIMARY KEY AUTOINCREMENT,
--    name TEXT UNIQUE,
--    start_date DATE,
--    end_date DATE
--);

--CREATE TABLE employee_projects (
--    employee_id INTEGER,
--    project_id INTEGER,
--    role TEXT,
--    FOREIGN KEY (employee_id) REFERENCES employees(id),
--    FOREIGN KEY (project_id) REFERENCES projects(id),
--    PRIMARY KEY (employee_id, project_id) 
--);


INSERT INTO departments (name) VALUES ('Finance');
INSERT INTO departments (name) VALUES ('Human Resources');

UPDATE employees SET department_id = 1 WHERE name = 'Alice'; -- Marketing
UPDATE employees SET department_id = 2 WHERE name = 'Bob';   -- Sales
UPDATE employees SET department_id = 1 WHERE name = 'Charlie'; -- Marketing

INSERT INTO employees (name, department_id, salary) VALUES ('Diana', 3, 70000);  -- Engineering
INSERT INTO employees (name, department_id, salary) VALUES ('Edward', 2, 85000); -- Sales
INSERT INTO employees (name, department_id, salary) VALUES ('Fiona', 4, 55000);   -- Finance
INSERT INTO employees (name, department_id, salary) VALUES ('George', 1, 72000); -- Marketing
INSERT INTO employees (name, department_id, salary) VALUES ('Hannah', 3, 95000);  -- Engineering
INSERT INTO employees (name, department_id, salary) VALUES ('Ivy', 5, 60000);     -- Human Resources