module.exports =  [
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
                'Update Employee Role',
                'Update Employee MGR',
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
    ],
    [   //If view all employees is chosen
        {
            type: 'list',
            name: 'test1',
            message: 'What do you want to do?',
            choices: [
                'Thing',
                'Thing by Dept.',
            ]
        },
        {
            type: 'input',
            name: 'test2',
            message: 'Employee name?',
        }
    ]
]

