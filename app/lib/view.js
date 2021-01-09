//** Dependencies ***//
//===================//
const inquirer = require('inquirer');

//*** Modules ***//
//===============//
const pool = require('./mysql');
const app = require('../../app');

//*** View data functions ***//
//===========================//
//View all employees
const all = () => {
    pool.query('SELECT CONCAT(employee.first_name," " ,employee.last_name) AS full_name, title, salary, name, CONCAT(employee2.first_name," ", employee2.last_name) AS manager_id FROM employee INNER JOIN role on employee.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT JOIN employee AS employee2 ON employee.manager_id = employee2.id  ORDER BY full_name ASC;', (err, res) => {
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
        //Prompt use to select a manager
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
        //Filter the chosen manger and assign manager_id
        let mgrID;
        res.filter(emp => {
            if (emp.manager === data.managers) {
                mgrID = emp.manager_id;
            }
        });
        //Use the mgr id to select that mgr's employees
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
        });
    }); 
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

//View total utilized budget per department
const budget = () =>{
    pool.query('SELECT name FROM department', async (err, res) => {
        if(err) throw err;
        //Prompt to chose a department
        const data = await inquirer.prompt(
            [
                {
                    type: 'list',
                    name: 'budget',
                    message: 'Which dept\'s total utilized budget would you like to see?',
                    choices: () => {
                        return res.map(dept => dept.name);
                    }
                }
            ]
        );
        pool.query('SELECT employee.role_id, salary, department_id, department.name FROM role INNER JOIN employee on employee.role_id = role.id right JOIN department ON role.department_id = department.id WHERE ?;', 
        {name: data.budget}, 
        (err, res) => {
            if (err) throw err;
            //Map the dept's salaries then calculate for total 
            const total = res.map(dept => dept.salary).reduce((acc, val) => acc + val)
            //Display data
            console.log('\n');
            console.table(`${data.budget}'s Total Utilized Budget`, `$${total}`);
            console.log('\n');
            app.init();
        });
    });
}

module.exports = {
    all,
    allByMGR,
    allRole,
    allDept,
    budget
}