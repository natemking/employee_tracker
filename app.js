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
const action = require(`${LIB_DIR}/action.js`);

// Initialization function
const init = async () => {
  try {
    let data = await inquirer.prompt(action);

    switch (data.action) {
        case 'View All Employees':
            
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


init();