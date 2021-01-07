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

const addEmployee = async () => {
    
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
                connection.end();
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
                connection.end();
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