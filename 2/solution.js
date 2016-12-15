function solver(input) {

	return { 
		task1: solve1(input),
		task2: solve2(input)
	}
}

function solve2(input) {
	var arr = input.split("\n");
	
	var keypad = new Array(25);
	for (var i=0; i<keypad.length; i++) { keypad[i] = -1; }
	
	keypad[2] = '1';
	keypad[6] = '2';
	keypad[7] = '3';
	keypad[8] = '4';
	keypad[10] = '5';
	keypad[11] = '6';
	keypad[12] = '7';
	keypad[13] = '8';
	keypad[14] = '9';
	keypad[16] = 'A';
	keypad[17] = 'B';
	keypad[18] = 'C';
	keypad[22] = 'D';
	
	var x = 0;
	var y = 2;
	var str = '';
	
	function xy2keypad(x, y) {
		if (x < 0 || x > 4 || y < 0 || y > 4) {
			return -1;
		}
		
		return keypad[y * 5 + x];
	}
	
	for (var i=0; i<arr.length && arr[i].length > 0; i++) {
		for (var j=0; j<arr[i].length; j++) {
			switch (arr[i].charAt(j)) {
				case 'L':
					if (xy2keypad(x-1, y) != -1) {
						x -= 1;
					}
					break;
				case 'U':
					if (xy2keypad(x, y-1) != -1) {
						y -= 1;
					}
					break;
				case 'D':
					if (xy2keypad(x, y+1) != -1) {
						y += 1;
					}
					break;
				case 'R':
					if (xy2keypad(x+1, y) != -1) {
						x += 1;
					}
					break;
				default:
					l("wtf");
			}
		}
		
		str = str + "" + xy2keypad(x, y);
	}
	
	return str;
}

function solve1(input) {
	var arr = input.split("\n");
	
	var keypad = new Array(9);
	var x = 1;
	var y = 1;
	
	var str = '';	
	
	for (var i=0; i<arr.length && arr[i].length > 0; i++) {
		for (var j=0; j<arr[i].length; j++) {
			switch (arr[i].charAt(j)) {
				case 'L':
					x -= 1;
					break;
				case 'U':
					y -= 1;
					break;
				case 'D':
					y += 1;
					break;
				case 'R':
					x += 1;
					break;
				default:
					l("wtf");
			}
			
			if (x < 0) {
				x = 0;
			} else if (x > 2) {
				x = 2;
			}
			
			if (y < 0) {
				y = 0;
			} else if (y > 2) {
				y = 2;
			}
		}
		
		str = str + '' + ((y * 3 + x) + 1)
	}
	
	return str;
}