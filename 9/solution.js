function solver(input) {
	return { 
		task1: solve1(input),
		task2: solve2(input)
	}
}

function solve1(input) {
	var arr = input.split("\n");
	var output = '';
	
	for (var i=0; i<arr.length; i++) {
		if (arr[i].length > 0) {
			var compressed = arr[i];
			var cmp_ptr = 0;
			
			do {
				if (compressed.charAt(cmp_ptr) == '(') {
					var start_ptr = cmp_ptr + 1;
					var end_ptr = start_ptr;
					
					while (compressed.charAt(++end_ptr) != ')');
					
					var repeater = compressed.substring(start_ptr, end_ptr);
					
					var re = /(\d+)x(\d+)/;
					var m = repeater.match(re);
					var chr_count = parseInt(m[1]);
					var rep_count = parseInt(m[2]);
					
					cmp_ptr = end_ptr;
					
					for (var j=0; j<rep_count; j++) {
						for (var k=1; k<=chr_count; k++) {
							output += compressed.charAt(cmp_ptr + k);
						}
					}
					
					cmp_ptr += chr_count + 1;

				} else {
					output += compressed.charAt(cmp_ptr++);
				}
				
			} while (cmp_ptr < compressed.length);

		}
	}
	
	return output.length;
}

function solve2(input) {
//	var arr = input.split("\n");
	var arr = [
		'(3x3)XYZ',
		'X(8x2)(3x3)ABCY',
		'(27x12)(20x12)(13x14)(7x10)(1x12)A' /*,
		'(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN' */
	];
	
	
	
	for (var i=0; i<arr.length; i++) {
		var output = '';
		if (arr[i].length > 0) {
			var compressed = arr[i];
			var cmp_ptr = 0;
			
			decompress(arr[i]);
			
			function decompress(str) {
				l("DECOMP: " + str);
				var output = '';
				
				do {
					if (compressed.charAt(cmp_ptr) == '(') {
						var start_ptr = cmp_ptr + 1;
						var end_ptr = start_ptr;
					
						while (compressed.charAt(++end_ptr) != ')');
					
						var repeater = compressed.substring(start_ptr, end_ptr);
					
						var re = /(\d+)x(\d+)/;
						var m = repeater.match(re);
						var chr_count = parseInt(m[1]);
						var rep_count = parseInt(m[2]);
					
					
						cmp_ptr = end_ptr;
					
						for (var j=0; j<rep_count - 1; j++) {
//							for (var k=1; k<=chr_count; k++) {
								decompress(compressed.substring(cmp_ptr + 1, cmp_ptr + chr_count + 1));
//								var c = compressed.charAt(cmp_ptr + k);

//								output += compressed.charAt(cmp_ptr + k);
//							}
						}
					
						cmp_ptr += 1;

					} else {
						output += compressed.charAt(cmp_ptr++);
					}
				
				} while (cmp_ptr < compressed.length);
				
				l(output + ", len: " + output.length);
				return output;
			}

		}
		
	}
	
	return output.length;
}