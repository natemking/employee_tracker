//** Dependencies ***//
//===================//
const inquirer = require('inquirer');
const mysql = require('mysql');
const chalk = require('chalk');

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
//Function to add an employee
const addEmployee = () => {
    connection.query('SELECT role.id, role.title, CONCAT(employee2.first_name," ", employee2.last_name) AS manager, employee.manager_id FROM role LEFT JOIN employee on employee.role_id = role.id LEFT JOIN employee AS employee2 ON employee.manager_id = employee2.id;', async (err, res) => {
       console.log(res);
       
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
                        return res.map(role => role.title)
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
                        const managers = [];
                        res.filter(role => {
                            if (typeof role.manager === 'string') {
                                managers.push(role.manager)
                            }
                        });
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
        console.log(managerID)
        //Add the employee as specified 
        connection.query('INSERT INTO employee SET ?',
            {
                first_name: data.addFirst,
                last_name: data.addLast,
                role_id: roleID,
                manager_id: managerID

            },
            (err, res) => {
                if (err) throw err;
                console.log(chalk.redBright(`\n${data.addFirst} ${data.addLast} has been added as an employee\n`));
                app.init();
            }
        );
    });
};
//Function to add a role
const addRole = () => {
    //Get Departments from DB
    connection.query('SELECT * FROM department ORDER BY id asc;', async (err, res) => {
        //Prompt the user for what role they want to add
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
                        return res.map(dept => `${dept.id} ${dept.name}`);
                    }
                }
            ]
        );
        //Add the role that the user has specified
        connection.query('INSERT INTO role SET ?', 
            {
                title: data.addRole,
                salary: data.addSalary,
                department_id: parseFloat(data.addRoleDept[0])
            },
            (err, res) => {
                if (err) throw err;
                console.log(chalk.redBright(`\n${data.addRole} has been added to roles\n`));
                app.init();
            }
        );
    });
}
//Function to add a department
const addDept = () => {
    //Get departments from DB
    connection.query('SELECT name FROM department', async (err,res) => {
        //Prompt user for what dept they want to add
        const data = await inquirer.prompt(
            [  
                {
                    type: 'input',
                    name: 'addDept',
                    message: 'What department would you like too add?',
                    // validate: (value) => {
                    //    let pass = res.filter(dept => {
                    //         if (dept.name !== value ){
                    //             return true
                    //         }
                    //     });
                    // }
                }
            ]
        );
        //Add the new dept to the DB
        connection.query('INSERT INTO department SET ?',
            {
                name: data.addDept
            },
            (err, res) => {
                if (err) throw err;
                console.log(chalk.redBright(`\n${data.addDept} has been added to departments\n`));
                app.init();
            }
        );
    });    
};

module.exports = {
    addEmployee,
    addRole,
    addDept,
}