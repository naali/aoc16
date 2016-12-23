function solver(input) {
	return { 
		task1: solve1(input),
		task2: solve2(input)
	}
}

function solve1(input) {
	var arr = input.split("\n");
	
	var stats = [{}, {}, {}, {}, {}, {}, {}, {}];
	
	for (var i=0; i<arr.length; i++) {
		if (arr[i] != '') {
			var str = arr[i];
			
			for (var j=0; j<str.length; j++) {
				var chr = str.charAt(j);
				
				if (stats[j][chr] === undefined) {
					stats[j][chr] = 1;
				} else {
					stats[j][chr]++;
				}
			}
		}
	}
	
	var curr_chr = '';
	var largest = -1;
	var ret = '';
	
	for (var i=0; i<stats.length; i++) {
		var keys = Object.keys(stats[i]);
		
		largest = -1;
		curr_chr = '';
		
		for (var j=0; j<keys.length; j++) {
			if (stats[i][keys[j]] > largest) {
				largest = stats[i][keys[j]];
				curr_chr = keys[j];
			}
		}
		
		ret += curr_chr;
	}
	
	return ret;
}

function solve2(input) {
	var arr = input.split("\n");
	
	var stats = [{}, {}, {}, {}, {}, {}, {}, {}];
	
	for (var i=0; i<arr.length; i++) {
		if (arr[i] != '') {
			var str = arr[i];
			
			for (var j=0; j<str.length; j++) {
				var chr = str.charAt(j);
				
				if (stats[j][chr] === undefined) {
					stats[j][chr] = 1;
				} else {
					stats[j][chr]++;
				}
			}
		}
	}
	
	var curr_chr = '';
	var smallest = 10000000;
	var ret = '';
	
	for (var i=0; i<stats.length; i++) {
		var keys = Object.keys(stats[i]);
		
		smallest = 10000000;
		curr_chr = '';
		
		for (var j=0; j<keys.length; j++) {
			if (stats[i][keys[j]] < smallest) {
				smallest = stats[i][keys[j]];
				curr_chr = keys[j];
			}
		}
		
		ret += curr_chr;
	}
	
	return ret;
}
