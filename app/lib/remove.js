//** Dependencies ***//
//===================//
const inquirer = require('inquirer');
const chalk = require('chalk');

//*** Modules ***//
//===============//
const pool = require('./mysql');
const app = require('../../app');

//*** Remove data functions ***//
//===========================//
//Function to remove an employee
const removeEmployee = () => {
    //Get employees frm db
    pool.query('SELECT id, CONCAT(first_name," ",last_name) AS name FROM employee', async (err, res) => {
        if (err) throw err;
        //Prompt to choose an employee to delete
        const data = await inquirer.prompt(
            [
                {
                    type: 'list',
                    name: 'removeEmp',
                    message: 'Please choose and employee to remove',
                    choices: () => {
                        return res.map(emp => emp.name);
                    }
                }
            ]
        );
        //Filter the employee name to get employee id
        let empID;
        res.filter(emp => {
            if (emp.name === data.removeEmp) {
                empID = emp.id;
            }
        });
        //Delete the chosen employee
        pool.query('DELETE FROM employee WHERE ?',
        {
            id: empID
        },
        (err, res) => {
            if (err) throw err;
            //Success message
            console.log(chalk.redBright(`\n${data.removeEmp} has been removed\n`));
            app.init();
        })
    });
};

//Function to remove a role
const removeRole = async () => {
    //Get roles from DB
    pool.query('SELECT title FROM role ORDER BY title asc', async (err, res) => {
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
        pool.query('DELETE FROM role WHERE ?',
            {
                title: data.removeRole
            },
            (err, res) => {
                if (err) throw err;
                //Success message
                console.log(chalk.redBright(`\n${data.removeRole} has been removed from roles\n`));
                app.init();
            }
        );
    });
};

//Function to remove a dept
const removeDept = () => {
    //Get departments from DB
    pool.query('SELECT name FROM department ORDER BY name asc;', async (err, res) => {
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
        pool.query('DELETE FROM department WHERE ?',
            {
                name: data.removeDept
            },
            (err, res) => {
                if (err) throw err;
                //Success message
                console.log(chalk.redBright(`\n${data.removeDept} has been removed from departments\n`));
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