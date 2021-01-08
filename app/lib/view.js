//** Dependencies ***//
//===================//
const inquirer = require('inquirer');

//*** Directories ***//
//===================//
const app = require('../../app');

//*** Modules ***//
//===============//
const pool = require('./mysql');



//*** View data functions ***//
//===========================//

//View all employees
const all = () => {
    pool.query('SELECT CONCAT(employee.first_name," " ,employee.last_name) AS full_name, title, salary, name, CONCAT(employee2.first_name," ", employee2.last_name) AS manager_id FROM employee INNER JOIN role on employee.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT JOIN employee AS employee2 ON employee.manager_id = employee2.id  ORDER BY department.name ASC;', (err, res) => {
        if (err) throw err;
        //Display data
        console.log('\n');
        console.table(['Name', 'Role', 'Salary', 'Department', 'Manager'], res.map(role => [role.full_name, role.title, role.salary, role.name, role.manager_id]));
        console.log('\n');
        app.init();
    });
}
//View all employees by mgr
const allByMGR = () => {
    pool.query('SELECT CONCAT(employee2.first_name, " ", employee2.last_name) AS manager, employee.manager_id FROM employee INNER JOIN role on employee.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT JOIN employee AS employee2 ON employee.manager_id = employee2.id  ORDER BY department.name ASC;', async (err, res) => {
        if (err) throw err;
        let data = await inquirer.prompt(
            [
                {
                    type: 'list',
                    name: 'managers',
                    message: 'Please choose a manager',
                    choices: () => {
                        let managers = [];
                        res.filter(role => {
                            if (typeof role.manager === 'string') {
                                managers.push(role.manager)
                            }
                        });
                        managers = [...new Set(managers)]
                        return managers;
                    }
                }
            ]
        );
        let mgrID;
        res.filter(emp => {
            if (emp.manager === data.managers) {
                mgrID = emp.manager_id;
            }
        });
        
        pool.query('SELECT CONCAT(employee.first_name," " ,employee.last_name) AS full_name, manager_id FROM employee WHERE ? ORDER BY full_name ASC;', 
        {
            manager_id: mgrID
        },
        (err, res) => {
            if (err) throw err;
            //Display data
            console.log('\n');
            console.table([`${data.managers}'s Employees`], res.map(emp => [emp.full_name]));
            console.log('\n');
            app.init();
        })
    }) 
}
//View all roles
const allRole = () => {
    pool.query('SELECT title, salary, name FROM role INNER JOIN department ON role.department_id = department.id ORDER BY title ASC;', (err, res) => {
        if (err) throw err;
        //Display data
        console.log('\n');
        console.table(['Role', 'Salary', 'Department'], res.map(role => [role.title, role.salary, role.name]));
        console.log('\n');
        app.init();
    });
}
//View all departments
const allDept = () => {
    pool.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        //Display data
        console.log('\n');
        console.table(['Department'], res.map(dept => [dept.name])); 
        console.log('\n');
        app.init();
    });
}


module.exports = {
    all,
    allByMGR,
    allRole,
    allDept
}