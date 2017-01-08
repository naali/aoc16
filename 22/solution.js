function solver(input) {
	return { 
		task1: solve1(input),
		task2: solve2(input)
	}
}

function solve1(input) {
	var arr = input.split("\n");
	var re = /\/dev\/grid\/node\-x(\d+)\-y(\d+)\s+(\d+).\s+(\d+).\s+(\d+).\s+(\d+)./;
	
	var nodes = [];
	
	for (var i=0; i<arr.length; i++) {
	    var m = arr[i].match(re);
	    
	    if (m) {
	        var node = {
                x: parseInt(m[1]),
	            y: parseInt(m[2]),
	            size: parseInt(m[3]),
	            used: parseInt(m[4]),
	            avail: parseInt(m[5]),
	            usepct: parseInt(m[6])
	        };
	        
	        nodes.push(node);
	    }
	}
	
	var pairs = [];
	
	for (var i=0; i<nodes.length; i++) {
	    for (var j=0; j<nodes.length; j++) {
            var a = nodes[i];
            var b = nodes[j];
            
            if ((a.x != b.x || a.y != b.y) && a.used != 0 && a.used <= b.avail) {
                var pair = {
                    a: a,
                    b: b
                }
                
                pairs.push(pair);
            }
	    }
	}
	
	return pairs.length;
}

function solve2(input) {
	var arr = input.split("\n");
	return "bar";
}

