//** Dependencies ***//
//===================//
const cfonts = require('cfonts');

//App text art displayed at initialization
module.exports = () => {
    console.log(
        '\n------------------------------------------------------------------------------------'
        );
    cfonts.say('Employee|Tracker', {
        font: 'block',
        colors: ['#696969', '#CFB53B'],
    });

    cfonts.say('v1.0.0 (c)2020 NMK', {
        font: 'console',
        align: 'center',
        space: false,
    });
    
    console.log(
        '------------------------------------------------------------------------------------\n'
        );
}