module.exports =  [
   [    //Initial action question
       {
            type: 'list',
            name: 'action',
            message: 'What do you want to do?',
            choices: [
                'View All Employees',
                'View All Employees by Dept.',
                'View All Employees by MGR',
                'Add Employee',
                'Remove Employee',
                'Update Employee Role',
                'Update Employee MGR',
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

