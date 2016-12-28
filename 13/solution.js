function solver(input) {
    var res = solve(input)
	return { 
		task1: res.res1,
		task2: res.res2
	}
}

function printMaze(m, w, h) {
    var maze = ''
	for (var i=0; i<h; i++) {
	    var str = '';
	    for (var j=0; j<w; j++) {
	        var c = '';
	        switch (m[i * w + j]) {
	            case 0:
	                c = '.';
	                break;
	            case 1:
	                c = '#';
	                break;
	            case 2:
	                c = 'O';
	                break;
	            default:
	                debugger;
	        }
	        
	        str += c;
	    }
	    
	    maze += str + "\n";
	}
	
	l(maze);
}

var mem = {};

function pathFinder(maze, target_x, target_y, w, h) {
    var arr = {};
    var found = false;
    
    while (!found) {
        var keys = Object.keys(mem);
    
        for (var i=0; i<keys.length; i++) {
            var x = mem[keys[i]].x;
            var y = mem[keys[i]].y;
            var dist = mem[keys[i]].d;
        
            if (x >= 1 && maze[y * w + x - 1] != 1) {
                // can go left
                arr[(x - 1) + '_' + y] = {x: x - 1, y: y, d: dist + 1};
            }
    
            if (x < w - 1 && maze[y * w + x + 1] != 1) {
                // can go right
                arr[(x + 1) + '_' + y] = {x: x + 1, y: y, d: dist + 1};
            }
    
            if (y >= 1 && maze[(y - 1) * w + x] != 1) {
                // can go up
                arr[x + '_' + (y - 1)] = {x: x, y: y - 1, d: dist + 1};
            }

            if (y < h - 1 && maze[(y + 1) * w + x] != 1) {
                // can go down
                arr[x + '_' + (y + 1)] = {x: x, y: y + 1, d: dist + 1};
            }
        }
        
        var arr_keys = Object.keys(arr);
        
        for (var i=0; i<arr_keys.length; i++) {
            var x = arr[arr_keys[i]].x;
            var y = arr[arr_keys[i]].y;
            var dist = arr[arr_keys[i]].d;
            
            if (mem[arr_keys[i]] === undefined) {
                mem[arr_keys[i]] = {x: x, y: y, d: dist};
            } else if (mem[arr_keys[i]].d > dist) {
                mem[arr_keys[i]].d = dist;
            }
        }
        
        if (mem[target_x + '_' + target_y] !== undefined) {
            found = true;
        }
    }
    
    return mem[target_x + '_' + target_y].d;
}

function distanceWalker(maze, maxdist, w, h) {
    var arr = {};
    var found = false;
    
    var c = 0;
    
    while (++c < 100 && !found) {
        var keys = Object.keys(mem);
    
        for (var i=0; i<keys.length; i++) {
            var x = mem[keys[i]].x;
            var y = mem[keys[i]].y;
            var dist = mem[keys[i]].d;
        
            if (x >= 1 && maze[y * w + x - 1] != 1) {
                // can go left
                arr[(x - 1) + '_' + y] = {x: x - 1, y: y, d: dist + 1};
            }
    
            if (x < w - 1 && maze[y * w + x + 1] != 1) {
                // can go right
                arr[(x + 1) + '_' + y] = {x: x + 1, y: y, d: dist + 1};
            }
    
            if (y >= 1 && maze[(y - 1) * w + x] != 1) {
                // can go up
                arr[x + '_' + (y - 1)] = {x: x, y: y - 1, d: dist + 1};
            }

            if (y < h - 1 && maze[(y + 1) * w + x] != 1) {
                // can go down
                arr[x + '_' + (y + 1)] = {x: x, y: y + 1, d: dist + 1};
            }
        }
        
        var arr_keys = Object.keys(arr);
        
        var mindist = maxdist;
        
        for (var i=0; i<arr_keys.length; i++) {
            var x = arr[arr_keys[i]].x;
            var y = arr[arr_keys[i]].y;
            var dist = arr[arr_keys[i]].d;
            
            if (mem[arr_keys[i]] === undefined) {
                mem[arr_keys[i]] = {x: x, y: y, d: dist};
                
                if (dist < mindist) {
                    mindist = dist;
                }
            } else if (mem[arr_keys[i]].d > dist) {
                mem[arr_keys[i]].d = dist;
                
                if (dist < mindist) {
                    mindist = dist;
                }
            }
        }
        
    }
    
    var keys = Object.keys(mem);
    var locations = 0;
    
    for (var i=0; i < keys.length; i++) {
        var l = mem[keys[i]];
        if (l.d <= maxdist) {
            maze[l.y * w + l.x] = 2;
            locations++;
        }
    }
    
    return locations;
}

function solve(input) {
	var arr = input.split("\n");
	var adder = parseInt(arr[0]);
	
	var maze = [];
	var w = 50;
	var h = 50;
	
	for (var i=0; i<h; i++) {
	    for (var j=0; j<w; j++) {
	        var muller = j*j + 3*j + 2*j*i + i + i*i;
	        var seed = muller + adder;
	        seed = seed - ((seed >>> 1) & 0x55555555);
	        seed = (seed & 0x33333333) + ((seed >>> 2) & 0x33333333);
            var bits = (((seed + (seed >> 4)) & 0x0F0F0F0F) * 0x01010101) >> 24;

            if (bits % 2 == 0) {
                maze.push(0);
            } else {
                maze.push(1);
            }
	    }
	}
	
    printMaze(maze, w, h);

	mem = { '31_39': { x: 31, y: 39, d: 0 } };
	var res1 = pathFinder(maze, 1, 1, w, h);

	mem = { '1_1': { x: 1, y: 1, d: 0 } };
	var res2 = distanceWalker(maze, 50, w, h);
	
	return { res1: res1, res2: res2 }
}

