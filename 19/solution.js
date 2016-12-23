function solver(input) {
	return { 
		task1: solve1(input),
		task2: solve2(input)
	}
}

function solve1(input) {
	var arr = input.split("\n");
	var ec = parseInt(arr[0]);
	
	// Watching Numberfile pays off :)
	return 2 * (ec - Math.pow(2, Math.floor(Math.log2(ec)))) + 1;
}

function solve2(input) {
	var arr = input.split("\n");
	var ec = parseInt(arr[0]);
	
	ec = 7;
	l(elves);
	
	var elves = new Array(ec);
	
	for (var i=0; i<ec; i++) {
		elves[i] = { id: i + 1 };
	}

	var eptr = 0;

	do {
		var p = eptr % elves.length;
		var half = Math.floor(p + elves.length / 2) % elves.length;
		
		l(elves[p].id + " kills " + elves[half].id);
		var removed = elves.splice(half, 1);
		
		eptr++;
		
	} while (elves.length > 1);
	
	l(elves[0].id);
	
	return elves[0].id;

}

