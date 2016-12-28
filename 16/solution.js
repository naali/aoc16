function solver(input) {
	return { 
		task1: solve(input, 272),
		task2: solve(input, 35651584)
	}
}

function dragonize(d) {
    var a = d;
    var b = '';
    
    for (var i=d.length - 1; i>=0; --i) {
        b += d.charAt(i) == '0' ? '1' : '0';
    }
    
    return a + '0' + b;
}

function checksum(str) {
    var cs = str;

    do {
        var tmpcs = '';
        
        for (var i=0; i<cs.length/2; i++) {
            var cp = '' + cs.charAt(i * 2) + cs.charAt(i * 2 + 1);
            switch (cp) {
                case '00':
                case '11':
                    tmpcs += '1';
                    break;
                case '01':
                case '10':
                    tmpcs += '0';
                    break;
                default:
                    // wtf
                    debugger;
            }
        }
        
        cs = tmpcs;
        
    } while (cs.length % 2 != 1)

    return cs;
}

function solve(input, disksize) {
	var arr = input.split("\n");
	var dragon = arr[0];
	
	do {
	    dragon = dragonize(dragon);
	} while (dragon.length <= disksize);
	
	dragon = dragon.substring(0, disksize);
	
	var cs = checksum(dragon);
	
	return cs;
}

