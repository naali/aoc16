function solver(input) {
	return { 
		task1: solve1(input),
		task2: solve2(input)
	}
}

function solve1(input) {
	var arr = input.split("\n");

/*	var arr = [
		'5-8',
		'0-2',
		'4-7',
		''
	];
*/	
	var re = /(\d+)-(\d+)/;
	var bl = [];
	
	for (var i=0; i<arr.length && arr[i].length > 0; i++) {
		var m = arr[i].match(re);
		
		if (!m) {
			continue;
		}
		
		var b = parseInt(m[1]);
		var e = parseInt(m[2]);
		
		var clipped = false;
		
		for (var j=0; j<bl.length && !clipped; j++) {
			if (bl[j].begin <= e) {
				bl[j].begin = b;
				clipped = true;
			}
		}
		
		if (!clipped) {
			bl.push({ begin: b, end: e });
		}
		
		l(bl);
		
	}
	
	return "asd";
}

function solve2(input) {
	var arr = input.split("\n");
	return "bar";
}

