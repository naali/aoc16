function solver(input) {
	return { 
		task1: solve(input, { a: 0, b: 0, c: 0, d: 0, ip: 0 }),
		task2: solve(input, { a: 0, b: 0, c: 1, d: 0, ip: 0 })
	}
}

function printProcessor(p) {
	l("a: " + p.a + ", b: " + p.b + ", c: " + p.c + ", d: " + p.d + ", ip: " + p.ip);
}

function parse(v) {
	if (v == 'a' || v == 'b' || v == 'c' || v == 'd') {
		return v;
	} else {
		return parseInt(v);
	}
}

function isReg(c) {
	return (c == 'a' || c == 'b' || c == 'c' || c == 'd')
}


function solve(input, processor) {
	var arr = input.split("\n");
	var cmdcount = 0;
	
	var p = processor;
	var halted = false;
	var re = /(cpy (\d+|[a-d]) ([a-d]))|(jnz ([\d+|a-d]) (-?[|\d+]))|((inc|dec) ([a-d]))|(hlt)/;

	do {	
		var m = arr[p.ip].match(re);
		
		if (m[0] == m[1]) {
			// cpy
			var src = parse(m[2]);
			var target = m[3];
			
			if (isReg(src)) {
				p[target] = p[src];
			} else {
				p[target] = src;
			}

			p.ip++;

		} else if (m[0] == m[4]) {
			// jnz
			var comp = parse(m[5]);
			var jmp = parse(m[6]);
			
			if (isReg(comp)) {
				if (p[comp] != 0) {
					p.ip += jmp;
				} else {
					p.ip++;
				}
			} else if (comp != 0) {
				p.ip += jmp;
			} else {
				p.ip++;
			}
			
		} else if (m[0] == m[7]) {
			// inc / dec
			var target = parse(m[9]);

			if (m[8] == 'dec') {
				p[target]--;
			} else {
				p[target]++;
			}
			
			p.ip++;
			
		} else {
			// hlt
			halted = true;
		}
		
		if (++cmdcount % 10000 == 0) {
			printProcessor(p);
		}
	} while (!halted && p.ip < arr.length);

	printProcessor(p);

	return p.a;
}
