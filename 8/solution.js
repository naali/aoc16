function solver(input) {
	var res = solve(input);
	
	return { 
		task1: res.lit,
		task2: '<pre>' + res.display + '</pre>'
	}
}

function solve(input) {
	var arr = input.split("\n");
	
	var display = [];
	
	for (var j=0; j<6; j++) {
		var row = [];
		for (var i=0; i<50; i++) {
			row.push(0);
		}
		display.push(row);
	}
	
	var re = /(rect\ (\d+)x(\d+))|(rotate row y=(\d+) by (\d+)|(rotate column x=(\d+) by (\d+)))/;
	
	for (var i=0; i<arr.length; i++) {
		if (arr[i].length > 0) {
			var m = arr[i].match(re);
			
			if (m[0] == m[7]) {
				// rot column

				var x = parseInt(m[8]);
				var count = parseInt(m[9]);
				
				for (var c=0; c < count; c++) {
					var tmp = display[5][x];
					
					for (var y=5; y>0; --y) {
						display[y][x] = display[y-1][x];
					}
					
					display[0][x] = tmp;
				}
				
			} else if (m[0] == m[4]) {
				// rot row
				l(m[0]);
				var y = parseInt(m[5]);
				var count = parseInt(m[6]);
				
				for (var c=0; c < count; c++) {
					var tmp = display[y][49];
				
					for (var x=49; x>0; --x) {
						display[y][x] = display[y][x-1];
					}
					
					display[y][0] = tmp;
				}
				
			} else if (m[0] == m[1]) {
				// rect
				var w = parseInt(m[2]);
				var h = parseInt(m[3]);
				
				l(m[0]);

				for (var y=0; y < h; y++) {
					for (var x=0; x < w; x++) {
						display[y][x] = 1;
					}
				}

			}
		}
	}
	
	var lit = 0;

	for (var j=0; j<6; j++) {
		for (var i=0; i<50; i++) {
			lit += display[j][i];
		}
	}

	return { lit: lit, display: printDisplay(display) };
}

function printDisplay(display) {
	var str = '';
	for (var i=0; i<6; i++) {
		var row = ''
		for (var j=0; j<50; j++) {
			row += display[i][j] == 0 ? ' ' : 'X';
		}

		str += row + "\n";
	}

	return str;
}
