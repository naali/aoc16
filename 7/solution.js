function solver(input) {
	return { 
		task1: solve1(input),
		task2: solve2(input)
	}
}

function solve1(input) {
	var arr = input.split("\n");
	var re = /([a-z]+)|(\[[a-z]+\])/g;
	
	var count = 0;
	
	for (var i=0; i<arr.length; i++) {
		if (arr[i].length > 0) {
			var m = arr[i].match(re);
			
			var out_abba_found = false;
			var in_abba_found = false;
			
			for (var j=0; j<m.length && !in_abba_found; j++) {
				if (m[j].charAt(0) == '[' && abbaCheck(m[j])) {
					in_abba_found = true;
				} else if (abbaCheck(m[j])) {
					out_abba_found = true;
				}
			}
			
			if (out_abba_found && !in_abba_found) {
				++count;
			}
		}
	}

	return count;
}

function abbaCheck(str) {
	var found = false;
	for (var i=0; i<str.length - 3; i++) {
		if (str.charAt(i) == str.charAt(i+3) && 
			str.charAt(i+1) == str.charAt(i+2) && 
			str.charAt(i) != str.charAt(i+1)) {
			return true;
		}
	}
	
	return false;
}

function solve2(input) {
	var arr = input.split("\n");
	var re = /([a-z]+)|(\[[a-z]+\])/g;
	
	var count = 0;
	
	for (var i=0; i<arr.length; i++) {
		if (arr[i].length > 0) {
			var m = arr[i].match(re);
			
			var ABAs = [];
			
			for (var j=0; j<m.length; j++) {
				if (m[j].charAt(0) != '[') {
					ABAs = ABAs.concat(findABAs(m[j]));
				}
			}
			
			var found = false;
			
			for (var j=0; j<m.length && !found; j++) {
				if (m[j].charAt(0) == '[') {
					for (var k=0; k<ABAs.length && !found; k++) {
						var BAB = ABAs[k].charAt(1) + ABAs[k].charAt(0) + ABAs[k].charAt(1);
						if (m[j].indexOf(BAB) != -1) {
							found = true;
						}
					}
				}
			}
			
			if (found) {
				++count;
			}
		}
	}

	return count;
}

function findABAs(str) {
	var arr = [];
	for (var i=0; i<str.length - 2; i++) {
		if (str.charAt(i) == str.charAt(i+2) && 
			str.charAt(i) != str.charAt(i+1)) {
			arr.push(str.charAt(i) + str.charAt(i+1) + str.charAt(i+2));
		}
	}
	
	return arr;
}