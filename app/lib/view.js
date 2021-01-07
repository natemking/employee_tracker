const mysql = require('mysql');
const app = require('../../app');

 const connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "employee_db"
});

//*** View functions ***//
//======================//


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
    console.log('View All Roles');
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