function solver(input) {
	var res = solve(input);
	
	return { 
		task1: res.part1,
		task2: res.part2
	}
}


var bots = {};

function valueToBot(value, bot) {
	if (bots[bot] === undefined) {
		bots[bot] = { low: value };
	} else {
		if (bots[bot].low === undefined) {
			if (bots[bot].high === undefined) {
				bots[bot].low = value;
			} else {
				if (bots[bot].high < value) {
					bots[bot].low = bots[bot].high;
					bots[bot].high = value;
				} else {
					bots[bot].low = value;
				}
			}
		} else {
			if (bots[bot].high === undefined) {
				if (bots[bot].low < value) {
					bots[bot].high = value;
				} else {
					bots[bot].high = bots[bot].low;
					bots[bot].low = value;
				}
			} else {
				if (bots[bot].low !== undefined) {
					l("how the fuck 1?");
					debugger;
				} else {
					l("how the fuck 2?");
					debugger;
				}
			}
		}
	}
	
//	l(bots);
	
	if (bots[bot].high !== undefined && bots[bot].low !== undefined) {
		if (bots[bot].high == 61 && bots[bot].low == 17) {	
			return true;
		}
	}
	
	return false;
}

function solve(input) {
	var arr = input.split("\n");
	var re = /(value (\d+) goes to bot (\d+))|(bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+))/;
	
	for (var i=0; i<arr.length && arr[i] != ''; i++) {
		var m = arr[i].match(re);
		
		if (m[0] == m[1]) {
			var value = parseInt(m[2]);
			var bot = parseInt(m[3]);
			
			valueToBot(value, bot);
		} else {
			// not a start value...
		}
	}
	
	var answer_1;
	var mul = [];
	
	while (answer_1 === undefined || mul[0] === undefined || mul[1] === undefined || mul[2] === undefined) {
	
		for (var i=0; i<arr.length && arr[i] != ''; i++) {
			var m = arr[i].match(re);

			if (m[0] == m[4]) {
				var bot = parseInt(m[5]);
				var low_output = m[6] == 'output';
				var low_target = parseInt(m[7]);
			
				var high_output = m[8] == 'output';
				var high_target = parseInt(m[9]);

				if (bots[bot] !== undefined && bots[bot].low !== undefined && bots[bot].high !== undefined) {
					if (low_output) {
						if (low_target < 3) {
							mul[low_target] = bots[bot].low;
						}
						
						l("Bot " + bot + " outputs low " + bots[bot].low + " to " + low_target);
						delete(bots[bot].low);
					} else {
						if (valueToBot(bots[bot].low, low_target) && answer_1 === undefined) {
							answer_1 = low_target;
						}
						
						delete(bots[bot].low);
					}
			
					if (high_output) {
						if (high_target < 3) {
							mul[low_target] = bots[bot].high;
						}
						
						l("Bot " + bot + " outputs high " + bots[bot].high + " to " + high_target);
						delete(bots[bot].high);
					} else {
						if (valueToBot(bots[bot].high, high_target) && answer_1 === undefined) {
							answer_1 = high_target;
						}
					
						delete(bots[bot].high);
					}
				}
			}
		}
	
	}
	
	return { part1: answer_1, part2: mul[0] * mul[1] * mul[2] };
}

