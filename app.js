//** Dependencies ***//
//===================//
const cTable = require('console.table');
const inquirer = require('inquirer');
// const mysql = require('mysql');
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

// const connection = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "root",
//     database: "employee_db"
// });

// connect(connection);
// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("connected as id " + connection.threadId);
//     afterConnection();
// });

function afterConnection() {
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
}


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
            // await inquirer.prompt(questions()[1]);
            view.allByMgr();
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
            
            break;
        case 'Add Role':
        
            break;
        case 'Add Department':
            add.addDept();
            break;   
        case 'Remove Employee':
            
            break;
        case 'Remove Role':
            
            break;
        case 'Remove Department':
            remove.removeDept();
            break;
        case 'View a Dept. Total Utilized Budget':

            break;
        default:
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
