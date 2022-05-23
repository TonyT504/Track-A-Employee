const inquirer = require('inquirer');
const db = require('./db/db.js');

const promptOptions = () => {
    console.log(`
==================
Management Options
==================
    `)
    return inquirer
        .prompt(
            {
                type: 'list',
                name: 'managementOptions',
                choices: [
                    'View All Departments',
                    'View All Roles',
                    'View All Employees',
                    'Add a Department',
                    'Add a Role',
                    'Add an Employee',
                    'Update an Employee Role'
                ]
            }
        )
        .then(selectionInput => {
            switch(selectionInput.managementOptions) {
                case 'View All Departments':
                    db.getCompany().then(function ([departments]) {
                        console.table(departments)
                    });
                    break;
                case 'View All Roles':
                    viewRoles();
                    break;
                case 'View All Employees':
                    viewEmployees();
                    break;
                case 'Add a Department':
                    addDepartment();
                    break;
                case 'Add a Role':
                    addRole();
                    break;
                case 'Add an Employee':
                    addEmployee();
                    break;
                case 'Update an Employee Role':
                    updateEmployeeRole();
                    break;
            }
        });
};

promptOptions();

// DB.getCompany().then(function ([departments]) {
//     console.table(departments)
// })