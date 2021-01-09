# Employee Tracker
Homework #12 MySQL: Employee Tracker

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://github.com/natemking/employee_tracker/blob/main/LICENSE)

![node.js badge](https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white)
![mysql badge](https://img.shields.io/badge/mysql-%2300f.svg?&style=for-the-badge&logo=mysql&logoColor=white)

[App Demo Video] (https://youtu.be/YDzjLP-YvEA)

---
## Table of Contents
 * [Description](#description)
    + [Scope of Work](#scope-of-work)
    + [MySQL Functionality](#mysql-functionality)
    + [Node.js functionality](#nodejs-functionality)
  * [Screenshots](#screenshots)
  * [License](#license)
  * [Credits](#credits)

## Description

### Scope of Work
The client is looking for a way to track their employees using a CLI interface. They are requesting multiple levels of functionality. They would like to add, view, remove, and update their employees, roles, and departments. 

### MySQL Functionality
The data for the company is stored in a MySQL database. There are three tables. A department, role, and employee table. Each table has an id that is matched with another table allowing them to be joined for better querying. The department table contains the department id and the department name. The role table includes the role id, role title, role salary, and a department id column to indicate what department that role is in. Lastly, the employee table contains the employee id, employee first and last name, corresponding role id, and the manager id of that employee.

### Node.js Functionality
The app is built with node.js and uses the inquirer npm package to be able to interface with the user. Other npm packages used are chalk, for adding color to my outputs, and cfonts, for creating the app opening logo. 

We were asked to, at the very least, make sure you can add, view, and update. This app goes further and can update employee managers, view employees by manager, remove all datasets, and view a total utilized budget per department. 

When the app initializes the user is presented with a list of options on what actions they can perform. The operation is straightforward for the user. Most times the user is choosing what they need to do from lists that are assembled from data return from the database. There are only inputs where they are necessary. 

I broke this app into modules according to the actions that were needed. There is a view module that contains all the view functionality, an add module for adding data functionality, etc... I also created a MySql pool which allowed me to modularize the connection and traffic to the database.

Every function follows the same formula, though the specific actions are different for each. Each function begins by calling a query to the database then prompting the user for information finally manipulating the database as per the users instructions. When a user is done with one function they can continue on as the initialize function is called recursively in all of the functions. When the user is done they can choose quit to leave the app.


## Screenshots

<summary><strong></strong></summary>
<br>


![app gif](app/assets/images/screenshots/employee_tracker.gif?raw=true)
<br>
_App functionality_
<br>

## License
Licensed under the GNU GPLv3.0 License. Copyright © 2020

## Credits

* [Module Export more that one function](https://stackoverflow.com/questions/16631064/declare-multiple-module-exports-in-node-js/50692464)

* [Concatenating MySQL results](https://stackoverflow.com/questions/4494775/mysql-concat-function)

* [Pooling MySQL connection](https://stackoverflow.com/questions/18496540/node-js-mysql-connection-pooling)

* [Node, MySql, & Async/Await](https://codeburst.io/node-js-mysql-and-async-await-6fb25b01b628) 

* [Remove duplicates from an array](https://www.javascripttutorial.net/array/javascript-remove-duplicates-from-array/)


