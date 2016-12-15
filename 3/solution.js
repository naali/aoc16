function solver(input) {
	return { 
		task1: solve1(input),
		task2: solve2(input)
	}
}

function solve1(input) {
	var arr = input.split("\n");
	var re = /(\d+)\s+(\d+)\s+(\d+)/;
	
	var ok_tris = 0;
	
	for (var i=0; i<arr.length; i++) {
		var m = arr[i].match(re);
		if (m == null) {
			continue;
		}
		
		var a = parseInt(m[1]);
		var b = parseInt(m[2]);
		var c = parseInt(m[3]);
		
		if ((a + b) > c && (a + c) > b && (b + c) > a) {
			ok_tris++;
		}
	}
	
	return ok_tris;
}

function solve2(input) {
	var arr = input.split("\n");
	var re = /(\d+)\s+(\d+)\s+(\d+)/;
	
	var ok_tris = 0;
	var rotarr = [];
	
	for (var i=0; i<arr.length; i++) {
		var m = arr[i].match(re);
		if (m == null) {
			continue;
		}
		
		var a = parseInt(m[1]);
		var b = parseInt(m[2]);
		var c = parseInt(m[3]);
		
		rotarr.push(a);
		rotarr.push(b);
		rotarr.push(c);
	}
	
	for (var i=0; i<3; i++) {
		for (var j=0; j<rotarr.length/9; j++) {
			a = rotarr[j * 9 + i];
			b = rotarr[j * 9 + 3 + i];
			c = rotarr[j * 9 + 6 + i];
			
			if ((a + b) > c && (a + c) > b && (b + c) > a) {
				ok_tris++;
			}
		}
	}
	
	return ok_tris;
}
