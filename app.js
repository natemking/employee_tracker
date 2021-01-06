//** Dependencies ***//
//===================//
const inquirer = require('inquirer');
const mysql = require('mysql');
const path = require('path');

//*** Directories ***//
//===================//
const LIB_DIR = path.resolve(__dirname, './app/lib');


//*** Modules ***//
//===============//
const logo = require(`${LIB_DIR}/logo.js`);
const questions = require(`${LIB_DIR}/questions.js`);
const connect = require(`${LIB_DIR}/db-connect.js`);

const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "employee_db"
});

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
    const data = await inquirer.prompt(questions[0]);
    console.log(data);
    //Switch statement to determine what to do per user answers
    switch (data.action) {
        case 'View All Employees':
            connection.query("SELECT * FROM employee", function (err, res) {
                if (err) throw err;
                // Log all results of the SELECT statement
                console.log(res); 
            });
            init();
            break;
        case 'View All Employees by MGR':
            
            break;
        case 'View All Roles':
            
            break;
        case 'View All Departments':

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
        
            break;   
        case 'Remove Employee':
            
            break;
        case 'Remove Role':
            
            break;
        case 'Remove Department':
            
            break;
        case 'View a Dept. Total Utilized Budget':

            break;
        default:
            connection.end();
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