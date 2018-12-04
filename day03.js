'use strict';

let fs = require('fs');

let data = fs.readFileSync('./data/day03.txt', 'utf8');
data = data.toString().split('\r\n');

module.exports = {
    parts: [ 
        function()  {
            let dim = data.map(value => {
                let match = /#(\d+) @ (\d+),(\d+)\: (\d+)x(\d+)/.exec(value);
                let x = Number(match[2]);
                let y = Number(match[3]);
                let w = Number(match[4]);
                let h = Number(match[5]);
                return [x + w, y + h];

            }).reduce((prev, curr) => {
                return [Math.max(prev[0], curr[0]), Math.max(prev[1], curr[1])];
            });

            const fabric = new Array(dim[0]).fill(0).map(() => new Array(dim[1]).fill(0));

            data.forEach(value => {
                let match = /#(\d+) @ (\d+),(\d+)\: (\d+)x(\d+)/.exec(value);
                let id = Number(match[1]);
                let x = Number(match[2]);
                let y = Number(match[3]);
                let w = Number(match[4]);
                let h = Number(match[5]);
                for (let i = x; i < x + w; i++) {
                    for (let j = y; j < y + h; j++) {
                        fabric[i][j] = id;
                    }
                }
            });

            let overlapCount = 0;
            for (let i = 0; i < dim[0]; i++) {
                for (let j = 0; j < dim[1]; j++) {
                    if (fabric[i][j] > 1) {
                        overlapCount ++; 
                    }
                }
            }

            return overlapCount;
        },
        function() {
            let dim = data.map(value => {
                let match = /#(\d+) @ (\d+),(\d+)\: (\d+)x(\d+)/.exec(value);
                let x = Number(match[2]);
                let y = Number(match[3]);
                let w = Number(match[4]);
                let h = Number(match[5]);
                return [x + w, y + h];

            }).reduce((prev, curr) => {
                return [Math.max(prev[0], curr[0]), Math.max(prev[1], curr[1])];
            });

            const fabric = new Array(dim[0]).fill(0).map(() => new Array(dim[1]).fill(0));

            data.forEach(value => {
                let match = /#(\d+) @ (\d+),(\d+)\: (\d+)x(\d+)/.exec(value);
                let id = Number(match[1]);
                let x = Number(match[2]);
                let y = Number(match[3]);
                let w = Number(match[4]);
                let h = Number(match[5]);
                for (let i = x; i < x + w; i++) {
                    for (let j = y; j < y + h; j++) {
                        if (fabric[i][j] == 0) {
                            fabric[i][j] = id;
                        } else {
                            fabric[i][j] = -1;
                        }
                    }
                }
            });

            return data.filter(value => {
                let match = /#(\d+) @ (\d+),(\d+)\: (\d+)x(\d+)/.exec(value);
                let id = Number(match[1]);
                let x = Number(match[2]);
                let y = Number(match[3]);
                let w = Number(match[4]);
                let h = Number(match[5]);

                for (let i = x; i < x + w; i++) {
                    for (let j = y; j < y + h; j++) {
                        if (fabric[i][j] != id) {
                            return false;
                        }
                    }
                }

                return true;
            });
        }]    
}

