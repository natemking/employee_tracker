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

const updateEmpRoleAndMGR = () => {
    pool.query('SELECT role.id, role.title, CONCAT(employee.first_name," ", employee.last_name) AS employee, employee.id AS employee_id, CONCAT(employee2.first_name, " ", employee2.last_name) AS manager, employee.manager_id FROM role LEFT JOIN employee on employee.role_id = role.id LEFT JOIN employee AS employee2 ON employee.manager_id = employee2.id;', async (err,res) => {
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
                },
                {
                    type: 'confirm',
                    name: 'updateMGR',
                    message: 'Would you like to change or remove their manager?'
                },
                {
                    type: 'list',
                    name: 'mgrChoice',
                    message: 'Please choose their manager',
                    when: answers => answers.updateMGR,
                    choices: () => {
                        let managers = ['Remove Manager'];
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
        //Filter the role id from the user role choice
        let roleID;
        res.filter(role => {
            if (role.title === data.roleChoice) {
                roleID = role.id;
            }
        });
        //Filter the employee id from the name of the employee chosen
        let empID;
        res.filter(emp => {
            if (emp.employee === data.empChoice) {
                empID = emp.employee_id;
            }
        });
        //Filter the manager id from the name of the manager
        let mgrID;
        res.filter(mgr => {
            if (mgr.manager === data.mgrChoice) {
                mgrID = mgr.manager_id;
            }
        });
        // Update the employees role in the DB
        await pool.query('UPDATE employee SET ? WHERE ?', 
        [
            {
                role_id: roleID,
                manager_id: mgrID
            },
            {
                id: empID
            }
        ],
        (err, res) => {
            if (err) throw err;
            //Mgr removed if the user chose so and user notified of update 
            else if (data.mgrChoice === 'Remove Manager') {
                pool.query('DELETE FROM employee WHERE ?', { manager_id: mgrID }, (err, res) => {
                    if (err) throw err;
                    console.log(chalk.redBright(`\n${data.empChoice}'s role has been updated and their manager removed\n`));
                    app.init();
                });
            //If mgr not removed user notified of update
            }else{
                console.log(chalk.redBright(`\n${data.empChoice}'s role has been updated\n`));
                app.init();
            }
        });
    });
};

module.exports = {
    updateEmpRoleAndMGR,
    
}