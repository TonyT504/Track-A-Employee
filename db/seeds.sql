USE employeedb;

INSERT INTO department (dept_name)
    VALUES
        ("Sales"),
        ("IT"),
        ("Ops");

INSERT INTO role (title, salary, department_id)
    VALUES
        ("Manager", 50000, 1),
        ("Engineer", 75000, 2),
        ("Analyst", 45000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES
        ("Tony", "Tran",1, NULL),
        ("John", "Doe", 2, NULL),
        ("Beth", "Doe", 3, NULL);