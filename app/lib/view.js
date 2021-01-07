//** Dependencies ***//
//===================//
const inquirer = require('inquirer');
const mysql = require('mysql');

//*** Directories ***//
//===================//
const app = require('../../app');

//*** Modules ***//
//===============//
const questions = require(`./questions.js`);

//*** DB connection ***//
//===================//
 const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'employee_db'
});

//*** View data functions ***//
//===========================//

//View all employees
const all = () => {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, title, salary, name, CONCAT(employee2.first_name," ", employee2.last_name) AS manager_id FROM employee INNER JOIN role on employee.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT JOIN employee AS employee2 ON employee.manager_id = employee2.id;', (err, res) => {
        if (err) throw err;
        //Map returned data 
        const data = res.map(role => [role.id, role.first_name, role.last_name, role.title, role.salary, role.name, role.manager_id]);
        //Display data
        console.log('\n');
        console.table(['ID', 'First Name', 'Last Name', 'Role', 'Salary', 'Department', 'Manager'], data);
        console.log('\n');
        app.init();
    });
}
//View all employees by mgr
const allByMgr = async () => {
    console.log('View All by MGR');

    connection.query('SELECT manager_id, CONCAT(first_name, " ", last_name) FROM employee WHERE manager_id IS NOT null;', async (err, res) => {
        if (err) throw err;
        console.log(res);
        const data = await inquirer.prompt(questions()[1])
    } )

   
    
}
//View all roles
const allRole = () => {
    connection.query('SELECT role.id, title, salary, name FROM role INNER JOIN department ON role.department_id = department.id ORDER BY title ASC;', (err, res) => {
        if (err) throw err;
        //Map returned data 
        const data = res.map(role => [role.id, role.title, role.salary, role.name]);
        //Display data
        console.log('\n');
        console.table(['ID', 'Role', 'Salary', 'Department'], data);
        console.log('\n');
        app.init();
    });
}
//View all departments
const allDept = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        //Map returned data 
        const data = res.map(dept => [dept.id, dept.name]);
        //Display data
        console.log('\n');
        console.table(['ID', 'Department'], data); 
        console.log('\n');
        app.init();
    });
}


module.exports = {
    all,
    allByMgr,
    allRole,
    allDept
}