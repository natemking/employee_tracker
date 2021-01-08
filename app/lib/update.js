//** Dependencies ***//
//===================//
const inquirer = require('inquirer');
const chalk = require('chalk');

//*** Directories ***//
//===================//
const app = require('../../app');

//*** Modules ***//
//===============//
const pool = require('./mysql');

const updateEmpRole = () => {
    pool.query('SELECT role.id, role.title, CONCAT(employee.first_name," ", employee.last_name) AS employee, employee.role_id, employee.id AS employee_id FROM role LEFT JOIN employee on employee.role_id = role.id', async (err,res) => {
        if (err) throw err;
        const data = await inquirer.prompt(
            [
                {
                    type: 'list',
                    name: 'empChoice',
                    message: 'Whose role would you like to update',
                    choices: () => {
                        const employees = [];
                        res.filter(emp => {
                            if (typeof emp.employee === 'string'){ 
                                employees.push(emp.employee);
                            }
                        });
                        return employees;
                    }
                },
                {
                    type: 'list',
                    name: 'roleChoice',
                    message: 'What is their new role?',
                    choices: () => {
                        let result = res.map(role => role.title);
                        let noDupes = [...new Set(result)];
                        return noDupes;
                    }
                }
            ]
        );
        //Filter the role id from the user role choice
        let roleID;
        res.filter(role => {
            if (role.title === data.roleChoice) {
                roleID = role.id;
            }
        });
        //Filter the employee is from the name of the employee chosen
        let empID;
        res.filter(role => {
            if (role.employee === data.empChoice) {
                empID = role.employee_id;
            }
        });
        //Update the employees role in the DB
        pool.query('UPDATE employee SET ? WHERE ?', 
        [
            {
                role_id: roleID
            },
            {
                id: empID
            }
        ],
        (err, res) => {
            if (err) throw err;
            console.log(chalk.redBright(`\n${data.empChoice}'s role has been updated\n`));
            app.init();
        });
    });
};

const updateEmpMgr = () => {
  
};

module.exports = {
    updateEmpRole,
    updateEmpMgr
}