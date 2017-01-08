function solver(input) {
	return { 
	 	task1: solve(input, 'abcdefgh', false),
		task2: solve(input, 'fbgdceah', true)
	}
}

function swapLetter(a, b, arr) {
    var a_ptr = -1;
    while (arr[++a_ptr] != a);
    
    var b_ptr = -1;
    while (arr[++b_ptr] != b);
    
    arr[a_ptr] = b;
    arr[b_ptr] = a;
    
    return arr;
}

function movePosition(a, b, arr) {
    var tmp = arr[a];
    arr.splice(a, 1);
    var ptr = -1;
    var tmparr = [];
    
    while (++ptr < arr.length) {
        if (ptr == b) {
            tmparr.push(tmp);
        }
        
        tmparr.push(arr[ptr]);
    }
    
    if (tmparr.length != arr.length + 1) {
        tmparr.push(tmp);
    }
    
    return tmparr;
}

function rotateRight(c, arr) {
    for (var j=0; j<c; j++) {
        var tmp = arr[arr.length - 1];
    
        for (var i=arr.length - 1; i>0; i--) {
            arr[i] = arr[i-1];
        }
    
        arr[0] = tmp;
    }
    
    return arr;
}

function rotateLeft(c, arr) {
    for (var j=0; j<c; j++) {
        var tmp = arr[0];
    
        for (var i=0; i<arr.length-1; i++) {
            arr[i] = arr[i+1];
        }
    
        arr[arr.length - 1] = tmp;
    }
    
    return arr;
}

function rotateOnPositionOf(a, arr, reverse) {
    if (reverse) {
        // position 0 1 2 3 4 5 6 7
        // goes to  1 3 5 7 2 4 6 0
        
        var ptr = arr.length;
    
        while (arr[--ptr] != a);
    
        switch (ptr) {
            case 0:
                ptr = 1;
                break;
            case 1:
                ptr = 1;
                break;
            case 2:
                ptr = 6;
                break;
            case 3:
                ptr = 2;
                break;
            case 4:
                ptr = 7;
                break;
            case 5:
                ptr = 3;
                break;
            case 6:
                ptr = 0;
                break;
            case 7:
                ptr = 4;
                break;
            default:
                debugger;
        }
        
        return rotateLeft(ptr, arr);
    } else {
        var ptr = -1;
    
        while (arr[++ptr] != a);
    
        if (ptr >= 4) {
            ptr++;
        }
    
        ptr++;
    
        return rotateRight(ptr, arr);
    }
}

function reversePositions(a, b, arr) {
    if (a > b) {
        var tmp = b;
        b = a;
        a = tmp;
    }

    while (a < b) {
        var tmp = arr[a];
        arr[a] = arr[b];
        arr[b] = tmp;
        a++; b--;
    }
    
    return arr;
}

function swapPositions(a, b, arr) {
    var tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
    return arr;
}

function solve(input, string, reverse) {
	var arr = input.split("\n");
	var re = /(swap letter ([a-z]) with letter ([a-z]))|(move position (\d+) to position (\d+))|(rotate based on position of letter ([a-z]))|(rotate (left|right) (\d+) step[s]?)|(reverse positions (\d+) through (\d+))|(swap position (\d+) with position (\d+))/;

	if (reverse) {
	    arr = arr.reverse();
	}

	var strarr = string.split('');
	
	for (var i=0; i<arr.length; i++) {
	    l(strarr);
        
	    if (arr[i].length > 0) {
	        var m = arr[i].match(re);
	        l(m[0]);
	        switch (m[0]) {
	            case m[1]:
	                // (swap letter ([a-z]) with letter ([a-z]))
	                strarr = swapLetter(m[2], m[3], strarr);
	                break;
	                
	            case m[4]:
	                // (move position (\d+) to position (\d+))
	                if (reverse) {
    	                strarr = movePosition(parseInt(m[6]), parseInt(m[5]), strarr);
    	            } else {
    	                strarr = movePosition(parseInt(m[5]), parseInt(m[6]), strarr);
    	            }
	                break;
	                
	            case m[7]:
	                // (rotate based on position of letter ([a-z])
	                strarr = rotateOnPositionOf(m[8], strarr, reverse);
	                break;
	                
	            case m[9]:
	                // rotate (left|right) (\d+) step[s]?)
	                if (reverse) {
                        if (m[10] == 'right') {
                            strarr = rotateLeft(parseInt(m[11]), strarr);
                        } else {
                            strarr = rotateRight(parseInt(m[11]), strarr);
                        }
                    } else {
                        if (m[10] == 'left') {
                            strarr = rotateLeft(parseInt(m[11]), strarr);
                        } else {
                            strarr = rotateRight(parseInt(m[11]), strarr);
                        }
                    }
	                break;
	                
	            case m[12]:
	                // (reverse positions (\d+) through (\d+))
	                strarr = reversePositions(parseInt(m[13]), parseInt(m[14]), strarr);
	                break;
	                
	            case m[15]:
	                // (swap position (\d+) with position (\d+))
	                strarr = swapPositions(parseInt(m[16]), parseInt(m[17]), strarr);
	                break;
	        
	            default:
	                debugger;
	                break;
	        }
	        
	    }
	}
	
	return strarr.join('');
}

