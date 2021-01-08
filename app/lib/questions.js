module.exports =  () => [
   [    //Initial action question
       {
            type: 'list',
            name: 'action',
            message: 'What do you want to do?',
            choices: [
                'View All Employees',
                'View All Employees by MGR',
                'View All Roles',
                'View All Departments',
                'Update Employee Role and/or Manager',
                'Add Employee',
                'Add Role',
                'Add Department',
                'Remove Employee',
                'Remove Role',
                'Remove Department',
                'View a Dept. Total Utilized Budget',
                'Quit'
            ],
        }
    ]
]

