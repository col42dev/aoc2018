'use strict';

let fs = require('fs');

let data = fs.readFileSync('./data/day04.txt', 'utf8');
data = data.toString().split('\r\n');

module.exports = {
    parts: [ 
        function()  {
            data.sort((a, b) => {
                let pattern = /\[(\d+)-(\d+)-(\d+) (\d+)\:(\d+)\] (.*)/;
                return [pattern.exec(a), pattern.exec(b)].reduce((prev, curr) => {
                    return dates.compare(new Date(Number(prev[1]), Number(prev[2]), Number(prev[3]), Number(prev[4]), Number(prev[5])), new Date(Number(curr[1]), Number(curr[2]), Number(curr[3]), Number(curr[4]), Number(curr[5])));
                });
            });

            let guards = {};

            let guardId = 0;
            let sleeps = 0;

            data.forEach(value => {
                let match = /\[(\d+)-(\d+)-(\d+) (\d+)\:(\d+)\] (.*)/.exec(value);

                let matchGuard = /Guard #(\d+) begins shift/.exec(match[6]);
                if (matchGuard) {
                    guardId = Number(matchGuard[1]);
                    if (!guards.hasOwnProperty(guardId)) {
                        guards[guardId] = [];
                    }
                } else if (match[6] == 'wakes up') {
                    let wakes = Number(match[5]);
                    guards[guardId].push(new Array(60).fill(0).fill(1, sleeps, wakes));
                } else if (match[6] == 'falls asleep') {
                    sleeps = Number(match[5]);
                }

            });

            let sleepiest = Object.keys(guards).sort((a, b) => {
                return guards[b].reduce((prev, curr) => 
                        prev  + curr.filter(x => x==1).length, guards[b].length > 0 ? guards[b][0].filter(x => x==1).length : 0) 
                    - guards[a].reduce((prev, curr) => 
                        prev  + curr.filter(x => x==1).length, guards[a].length > 0 ? guards[a][0].filter(x => x==1).length : 0);
            })[0];

            let mins = guards[sleepiest][0].map( (value, index) => {
                return guards[sleepiest].reduce((prev, curr) => {
                    return prev + curr[index];
                }, guards[sleepiest][0][index])
            });

            return sleepiest * mins.indexOf(Math.max(...mins));
        },
        
        function() {

            data.sort((a, b) => {
                let pattern = /\[(\d+)-(\d+)-(\d+) (\d+)\:(\d+)\] (.*)/;
                return [pattern.exec(a), pattern.exec(b)].reduce((prev, curr) => {
                    return dates.compare(new Date(Number(prev[1]), Number(prev[2]), Number(prev[3]), Number(prev[4]), Number(prev[5])), new Date(Number(curr[1]), Number(curr[2]), Number(curr[3]), Number(curr[4]), Number(curr[5])));
                });
            });

            let guards = {};

            let guardId = 0;
            let sleeps = 0;

            data.forEach(value => {
                let match = /\[(\d+)-(\d+)-(\d+) (\d+)\:(\d+)\] (.*)/.exec(value);

                let matchGuard = /Guard #(\d+) begins shift/.exec(match[6]);
                if (matchGuard) {
                    guardId = Number(matchGuard[1]);
                    if (!guards.hasOwnProperty(guardId)) {
                        guards[guardId] = [];
                    }
                } else if (match[6] == 'wakes up') {
                    let wakes = Number(match[5]);
                    guards[guardId].push(new Array(60).fill(0).fill(1, sleeps, wakes));
                } else if (match[6] == 'falls asleep') {
                    sleeps = Number(match[5]);
                }
            });     

            Object.keys(guards).forEach((guard, index)=> {
                guards[guard] = guards[guard].reduce((prev, curr) => {
                        return prev.map((value, index) => {
                            return value + curr[index];
                        });
                    }, guards[guard][0]);

                if (guards[guard] == undefined) {
                    guards[guard] = new Array(60).fill(0);
                }                   
            });

            Object.keys(guards).forEach((guard, index)=> { guards[guard] = guards[guard].indexOf(Math.max(...guards[guard])); });

            let guard = Object.keys(guards).sort((a, b) => guards[b] - guards[a])[0];

            return guard * guards[guard];

        }]    
}

// Source: http://stackoverflow.com/questions/497790
var dates = {
    convert:function(d) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp) 
        //   a string     : Any format supported by the javascript engine, like
        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //  an object     : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        return (
            d.constructor === Date ? d :
            d.constructor === Array ? new Date(d[0],d[1],d[2]) :
            d.constructor === Number ? new Date(d) :
            d.constructor === String ? new Date(d) :
            typeof d === "object" ? new Date(d.year,d.month,d.date) :
            NaN
        );
    },
    compare:function(a,b) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(a=this.convert(a).valueOf()) &&
            isFinite(b=this.convert(b).valueOf()) ?
            (a>b)-(a<b) :
            NaN
        );
    },
    inRange:function(d,start,end) {
        // Checks if date in d is between dates in start and end.
        // Returns a boolean or NaN:
        //    true  : if d is between start and end (inclusive)
        //    false : if d is before start or after end
        //    NaN   : if one or more of the dates is illegal.
        // NOTE: The code inside isFinite does an assignment (=).
       return (
            isFinite(d=this.convert(d).valueOf()) &&
            isFinite(start=this.convert(start).valueOf()) &&
            isFinite(end=this.convert(end).valueOf()) ?
            start <= d && d <= end :
            NaN
        );
    }
}