const connection = require("../config/connection.js");

class DB {
    constructor (connection){
        this.connection = connection;

    }
    getDepartments(){
        return this.connection.promise().query("SELECT * FROM department")
    }
    getCompany(){
        return this.connection.promise().query("SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id")
    }
}
module.exports = new DB(connection);