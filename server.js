const inquirer = require('inquirer');
// const db = require('./db/db.js');
const connection = require("./config/connection");

connection.connect(function(err){
    if (err) throw err
    console.log("db connected")
    promptOptions();
}
)


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
                    'Update an Employee Role',
                    'Exit'
                ]

            }
        )
        .then(selectionInput => {
            switch(selectionInput.managementOptions) {
                case 'View All Departments':
                   viewDepartments()
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
                case 'Exit':
                    connection.end()
                    console.log("Goodbye!")
            }
        });
};

function viewDepartments(){
    connection.query("SELECT * FROM department", (err, res)=> {
        if (err)throw err
        console.table(res)
        promptOptions()
    })
}
function viewRoles(){
    connection.query("SELECT * FROM role", (err, res)=> {
        if (err)throw err
        console.table(res)
        promptOptions()
    })
}
function viewEmployees(){
    connection.query("SELECT * FROM employee", (err, res)=> {
        if (err)throw err
        console.table(res)
        promptOptions()
    })
}

function addEmployee (){
    connection.query("SELECT * FROM role", (err, res)=> {
        if (err) throw err
        inquirer.prompt([
            {
                type:"input",
                name: "first_name",
                message:"Add first name of employee"
            },
            {
                type:"input",
                name: "last_name",
                message:"Add last name of employee"
            },
            {
                type:"list",
                name: "role_title",
                message:"What is the employee's role title?",
                choices:res.map(role => role.title)
            }
        ])
        .then(response => {
            const roleTitle = res.find(role => role.title === response.role_title)
            connection.query("INSERT INTO employee SET ?", 
            {
                first_name:response.first_name,
                last_name:response.last_name,
                role_id:roleTitle.id
            }
            )
            console.log("new employee added")
            promptOptions()
        })

    })
}
// DB.getCompany().then(function ([departments]) {
//     console.table(departments)
// })