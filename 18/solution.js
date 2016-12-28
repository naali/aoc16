function solver(input) {
	return { 
		task1: solve(input, 40),
		task2: solve(input, 400000)
	}
}

function printRogue(r, w, h) {
    var prnt = '';
    for (var i=0; i<h; i++) {
        var str = '';
        
        for (var j=0; j<w; j++) {
            str += r[i * w + j];
        }
        
        prnt += str + "\n";
    }
    
    l(prnt);
}

function solve(input, rows) {
	var arr = input.split("\n");
	var str = arr[0];
	
	var rogue = [];
	
	for (var i=0; i<str.length; i++) {
	    rogue.push(str.charAt(i));
	}
	
	for (var i=0; i<(rows-1); i++) {
	    for (var j=0; j<str.length; j++) {
	        var left = j==0 ? '.' : rogue[str.length * i + (j - 1)];
	        var center = rogue[str.length * i + j];
	        var right = j==str.length - 1? '.' : rogue[str.length * i + (j + 1)];

            var d = '' + left + center + right;
            var tile = '';
            
            switch (d) {
                case '^^.':
                case '.^^':
                case '^..':
                case '..^':
                    tile = '^';
                    break;
                default:
                    tile = '.';
                    break;
            }
            
            rogue.push(tile);

	    }
	    
	    if (i % 10000 == 1) {
	        l(i);
	    }
	}
	
    var safe = 0;
    
    for (var i=0; i<rogue.length; i++) {
        if (rogue[i] == '.') {
            safe++;
        }
    }
	
	return safe;
}

