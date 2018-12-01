let _ = require('underscore');
let fs = require('fs');

console.log('aoc2018');
let day = [];
_.each(_.range(25), function(dayDatum, dayIndex, dayList) {
    
    let sourceFilename = './day' +
         function pad(n, width, z) {
            z = z || '0';
            n = n + '';
                return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
            }(dayDatum+1, 2) + '.js';

    if (fs.existsSync(sourceFilename)) {
        day.push(require(sourceFilename));
    }
});

let matches = process.argv.join(' ').match(/ (\d+)/g);  
if (matches && matches.length == 2) {
    let dayIndex = matches[0] - 1;
    if (dayIndex < 0 || dayIndex >= day.length) {
        console.log('day param value out of range');
        return;
    }
    console.log('day:' + (dayIndex + 1));

    let partIndex = parseInt(matches[1] - 1);
    if (partIndex < 0 || partIndex >= 2) {
        console.log('part param value out of range');
        return;
    }
    console.log('part:' + (partIndex + 1));
    
    let result = day[dayIndex].parts[partIndex]();
    console.log(result);
} else {
    console.log('usage:');
    console.log('   npm start <day> <part>');
    console.log('example:');
    console.log('   npm start 5 2');
}