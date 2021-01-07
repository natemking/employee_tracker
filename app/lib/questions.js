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
    [   //If view all employees by MGR is chosen
        {
            type: 'list',
            name: 'viewByMgr',
            message: 'Please select a manager?',
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
    ], 
    // [   //If add a dept is chosen
    //     {
    //         type: 'input',
    //         name: 'addDept',
    //         message: 'What department would you like too add?'
    //     }
    // ],
    [
        {
            type: 'list',
            name: 'removeDept',
            choices: ['somty'],
        }
    ]
]

