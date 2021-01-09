//** Dependencies ***//
//===================//
const inquirer = require('inquirer');
const chalk = require('chalk');

//*** Modules ***//
//===============//
const pool = require('./mysql');
const app = require('../../app');

//*** Add data functions ***//
//===========================//
//Function to add an employee
const addEmployee = () => {
    pool.query('SELECT role.id, role.title, CONCAT(employee2.first_name," ", employee2.last_name) AS manager, employee.manager_id FROM role LEFT JOIN employee on employee.role_id = role.id LEFT JOIN employee AS employee2 ON employee.manager_id = employee2.id;', async (err, res) => {
        if (err) throw err;
        //Prompt for employee data to add
        const data = await inquirer.prompt(
            [
                {
                    type: 'input',
                    name: 'addFirst',
                    message: 'What is their first name?',
                },
                {
                    type: 'input',
                    name: 'addLast',
                    message: 'What is their last name?',
                },
                {
                    type: 'list',
                    name: 'addRole',
                    message: 'What is their role?',
                    choices: () => {
                        let roles = res.map(role => role.title);
                        roles = [...new Set(roles)];
                        return roles;
                    }
                    
                },
                {
                    type: 'confirm',
                    name: 'hasMGR',
                    message: 'Will this employee be managed?'
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: 'Please choose their manager',
                    when: answers => answers.hasMGR,
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
        //Filter the chosen role to get its role_id
        let roleID;
        res.filter(role => {
            if(role.title === data.addRole){
                roleID = role.id;
            }
        });
        //Filter the chosen manger and assign manager_id
        let managerID;
        res.filter(role => {
            if (role.manager === data.manager){
                managerID = role.manager_id;
            }
        });
        //Add the employee as specified 
        pool.query('INSERT INTO employee SET ?',
            {
                first_name: data.addFirst,
                last_name: data.addLast,
                role_id: roleID,
                manager_id: managerID

            },
            (err, res) => {
                if (err) throw err;
                //Success message
                console.log(chalk.redBright(`\n${data.addFirst} ${data.addLast} has been added as an employee\n`));
                app.init();
            }
        );
    });
}

//Function to add a role
const addRole = () => {
    //Get Departments from DB
    pool.query('SELECT role.id, name, department_id, department.id FROM role RIGHT JOIN department ON role.department_id = department.id ORDER BY title ASC;', async (err, res) => {
        if (err) throw err;
        //Prompt for what role to add
        const data = await inquirer.prompt(
            [
                {
                    type: 'input',
                    name: 'addRole',
                    message: 'What role would you like too add?',
                }, 
                {
                    type: 'input',
                    name: 'addSalary',
                    message: 'What is this roles salary?',
                    validate: (value) => {
                        const pass = value.match(/^[0-9]*$/);
                        return pass ? true : 'Please enter a number'
                    }
                },
                {
                    type: 'list',
                    name: 'addRoleDept',
                    message: 'Which department is this for?',
                    choices: () => {
                        let roles = res.map(dept => dept.name);
                        roles = [...new Set(roles)];
                        return roles;
                    }
                }
            ]
        );
        //Filter the dept name to get dept_id
        let deptID;
        res.filter(dept => {
            if (dept.name === data.addRoleDept) {
                deptID = dept.id;
            }
        });
        //Add the role that the user has specified
        pool.query('INSERT INTO role SET ?', 
            {
                title: data.addRole,
                salary: data.addSalary,
                department_id: deptID
            },
            (err, res) => {
                if (err) throw err;
                //Success message
                console.log(chalk.redBright(`\n${data.addRole} has been added to roles\n`));
                app.init();
            }
        );
    });
}

//Function to add a department
const addDept = () => {
    //Get departments from DB
    pool.query('SELECT name FROM department', async (err,res) => {
        //Prompt for what dept to add
        if (err) throw err;
        const data = await inquirer.prompt(
            [  
                {
                    type: 'input',
                    name: 'addDept',
                    message: 'What department would you like too add?'
                }
            ]
        );
        //Add the new dept to the DB
        pool.query('INSERT INTO department SET ?',
            {
                name: data.addDept
            },
            (err, res) => {
                if (err) throw err;
                //Success message
                console.log(chalk.redBright(`\n${data.addDept} has been added to departments\n`));
                app.init();
            }
        );
    });    
}

module.exports = {
    addEmployee,
    addRole,
    addDept,
}