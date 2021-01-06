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


// Initialization function
const init = async () => {
  try {
    //Call logo art
    logo();
    //Ask action question
    const data = await inquirer.prompt(questions[0]);
    console.log(data);
    //Switch statement to determine what to do per user answers
    switch (data.action) {
        case 'View All Employees':
            const question2 = await inquirer.prompt(questions[1]);
            console.log(question2);
            break;
        case 'View All Employees by Dept.':
            
            break;
        case 'View All Employees by MGR':
            
            break;
        case 'Add Employee':
            
            break;   
        case 'Remove Employee':
            
            break;
        case 'Update Employee Role':
            
            break;
        case 'Update Employee MGR':
            
            break;
        default:
            break;
    }
    
      
  }catch(err) {
      console.log(err);
  }
}

//Initialization of app
init();