//** Dependencies ***//
//===================//
const mysql = require('mysql');

//*** Directories ***//
//===================//
const app = require('../../app');

//*** DB connection ***//
//===================//
 const connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "employee_db"
});

//*** View data functions ***//
//===========================//

//View all employees
const all = () => {
    console.log('View all');
}
//View all employees by mgr
const allByMgr = () => {
    console.log('View All by MGR');
}
//View all roles
const allRole = () => {
    connection.query("SELECT role.id, title, salary, name FROM role INNER JOIN department ON role.department_id = department.id ORDER BY title ASC;", function (err, res) {
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
    connection.query("SELECT * FROM department", function (err, res) {
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