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

const addRole = () => {
    connection.query('SELECT role.id, title, salary, name FROM role INNER JOIN department ON role.department_id = department.id;'), async (err, res) => {
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
                }
            ]
        )
    }
};

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