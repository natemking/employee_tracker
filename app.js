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
const questions = require(`${LIB_DIR}/questions.js`);
const view = require(`${LIB_DIR}/view.js`);
const add = require(`${LIB_DIR}/add.js`);
const remove = require(`${LIB_DIR}/remove.js`);
const pool = require(`${LIB_DIR}/mysql.js`);

// Initialization function
const init = async () => {
  try {
    //Ask action question
    const data = await inquirer.prompt(questions()[0]);
   
    //Switch statement to determine what to do per user answers
    switch (data.action) {
        case 'View All Employees':
            view.all();
            break;
        case 'View All Employees by MGR':
            
            break;
        case 'View All Roles':
            view.allRole();
            break;
        case 'View All Departments':
            view.allDept();
            break;
        case 'Update Employee Role':
            
            break;
        case 'Update Employee MGR':

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

