function solver(input, taskid) {
	var arr = input.split(',');
	
	var bearing = 0;
	var x = 0;
	var y = 0;
	
	var re = /([L|R])(\d+)/;
	
	var bitmap = new Array(1000 * 1000);
	for (var i=0; i<1000*1000; i++) { bitmap[i] = 0; }
	
	var x2 = 0;
	var y2 = 0;
	var task2solved = false;
	
	for (var i=0; i<arr.length; i++) {
		var prev_x = x;
		var prev_y = y;

		var m = arr[i].match(re);
		
		if (m[1] == 'L') {
			bearing -= 90;
		} else if (m[1] == 'R') {
			bearing += 90;
		}
		
		if (bearing == 270) {
			bearing = -90;
		} else if (bearing == -180) {
			bearing = 180;
		}
		
		var d = parseInt(m[2]);
		
		switch (bearing) {
			case 0:
				y += d;
				break;
			case 90:
				x += d;
				break;
			case 180:
				y -= d;
				break;
			case -90:
				x -= d;
				break;
			default:
				return "wtf";
				break;
		}
		
		function flipBit(x, y, task2solved) {
			if (bitmap[(y + 500) * 1000 + (x + 500)] == 0) {
				bitmap[(y + 500) * 1000 + (x + 500)] = 1;
			} else if (!task2solved) {
				x2 = x;
				y2 = y;
				l(x2);
				l(y2);
				task2solved = true;
			}
			
			return task2solved;
		}
		
		if (prev_x != x) {
			var s = Math.sign(x - prev_x);

			for (var j = prev_x; j != x; j += s) {
				task2solved = flipBit(j, y, task2solved);			
			}
		} else if (prev_y != y) {
			var s = Math.sign(y - prev_y);

			for (var j = prev_y; j != y; j += s) {
				task2solved = flipBit(x, j, task2solved);
			}
		}
	}
	
	return { 
		task1: "x: " + x + ", y: " + y + ", dist: " + (Math.abs(x) + Math.abs(y)), 
		task2: "x: " + x2 + ", y: " + y2 + ", dist: " + (Math.abs(x2) + Math.abs(y2))
	}
}
