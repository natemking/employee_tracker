//** Dependencies ***//
//===================//
const inquirer = require('inquirer');
const cTable = require('console.table');
const path = require('path');

//*** Directories ***//
//===================//
const LIB_DIR = path.resolve(__dirname, './app/lib');

//*** Modules ***//
//===============//
const logo = require(`${LIB_DIR}/logo.js`);
const action = require(`${LIB_DIR}/action.js`);
const view = require(`${LIB_DIR}/view.js`);
const add = require(`${LIB_DIR}/add.js`);
const remove = require(`${LIB_DIR}/remove.js`);
const update = require(`${LIB_DIR}/update.js`);
const pool = require(`${LIB_DIR}/mysql.js`);

// Initialization function
const init = async () => {
  try {
    //Ask action question
    const data = await inquirer.prompt(action()[0]);
   
    //Switch statement to determine what to do per user answers
    switch (data.action) {
        case 'View All Employees':
            view.all();
            break;
        case 'View All Employees by MGR':
            view.allByMGR();
            break;
        case 'View All Roles':
            view.allRole();
            break;
        case 'View All Departments':
            view.allDept();
            break;
        case 'Update Employee Role and/or Manager':
            update.updateEmpRoleAndMGR();
            break;
        case 'Add Employee': 
            add.addEmployee();
            break;
        case 'Add Role':
            add.addRole();
            break;
        case 'Add Department':
            add.addDept();
            break;   
        case 'Remove Employee':
            remove.removeEmployee();
            break;
        case 'Remove Role':
            remove.removeRole();
            break;
        case 'Remove Department':
            remove.removeDept();
            break;
        case 'View a Dept. Total Utilized Budget':
            view.budget();
            break;
        default:
            pool.end();
            break;
    }
  }catch(err) {
      console.log(err);
  }
}

//Call logo art
logo();
//Initialization of app
init();

//Export init function
module.exports.init = init;

