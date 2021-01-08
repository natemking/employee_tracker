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
    pool.query('SELECT role.id, role.title, CONCAT(employee.first_name," ", employee.last_name) AS employee FROM role LEFT JOIN employee on employee.role_id = role.id', (err,res) => {
        console.log(res);
    });

};

const updateEmpMgr = () => {
  
};

module.exports = {
    updateEmpRole,
    updateEmpMgr
}