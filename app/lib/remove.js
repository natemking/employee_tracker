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

const removeEmployee = async () => {

};
//Function to remove a role
const removeRole = async () => {
    //Get roles from DB
    connection.query('SELECT title FROM role ORDER BY title asc', async (err, res) => {
        if (err) throw err;
        //Prompt what dept to be removed
        const data = await inquirer.prompt(
            [
                {
                    type: 'list',
                    name: 'removeRole',
                    message: 'Please select a role to remove',
                    choices: () => {
                        return res.map(dept => dept.title);
                    }
                }
            ]
        );
        //Delete the chosen role
        connection.query('DELETE FROM role WHERE ?',
            {
                title: data.removeRole
            },
            (err, res) => {
                if (err) throw err;
                console.log(chalk.redBright(`\n${data.removeRole} has been removed from roles\n`));
                connection.end();
                app.init();
            }
        );
    });
};
//Function to remove a dept
const removeDept = () => {
    //Get departments from DB
    connection.query('SELECT name FROM department ORDER BY name asc;', async (err, res) => {
        if (err) throw err;
        //Prompt what dept to be removed
        let data = await inquirer.prompt(
            [   
                {
                    type: 'list',
                    name: 'removeDept',
                    message: 'Please select a department to remove',
                    choices: () => {
                        return res.map(dept => dept.name);
                    }
                }
            ]
        ); 
        //Delete the chosen dept from DB
        connection.query('DELETE FROM department WHERE ?',
            {
                name: data.removeDept
            },
            (err, res) => {
                if (err) throw err;
                console.log(chalk.redBright(`\n${data.removeDept} has been removed from departments\n`));
                connection.end();
                app.init();
            }
        );
    });
}

module.exports = {
    removeEmployee,
    removeRole,
    removeDept,
}