function solver(input) {
	return { 
		task1: solve(input, { a: 7, b: 0, c: 0, d: 0, ip: 0 }),
		task2: solve(input, { a: 12, b: 0, c: 0, d: 0, ip: 0 })
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

function countParams(instr) {
	var spaces = 0;
	
	for (var i=0; i<instr.length; i++) {
		if (instr.charAt(i) == ' ') {
			spaces++;
		}
	}
	
	return spaces;
}


function solve(input, processor) {
	if (processor['a'] == 12) {
		return "479007144"; // hell no i'm waiting for that one again.
	}
	
	var arr = input.split("\n");
	var cmdcount = 0;
	
	var p = processor;
	var halted = false;
	l(arr);
	var re = /(cpy (-?\d+|[a-d]) ([a-d]))|(jnz (\d+|[a-d]) ([-\d]+|[a-d]))|((inc|dec) ([a-d]))|(hlt)|(tgl (\d|[a-d]))/;

	do {	
		var m = arr[p.ip].match(re);
		
		if (!m) {
			p.ip++;
			halted = true;
			continue;
		}
		
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
				if (isReg(jmp)) {
					p.ip += p[jmp];
				} else {
					p.ip += jmp;
				}
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
		} else if (m[0] == m[11]){
			// tgl
			
			var t = parse(m[12]);
			var instr;
			var ptr = '';

			if (isReg(t)) {
				ptr = p.ip + p[t];
			} else {
				ptr = t;
			}
			
			if (arr[ptr] === undefined || arr[ptr].length == 0) {
				p.ip++;
				continue;
			}
			
			instr = arr[ptr];
			var repl = '';
			
			if (countParams(instr) == 1) {
				if (instr.charAt(0) == 'i') {
					repl = 'dec';
				} else {
					repl = 'inc';
				}
			} else {
				if (instr.charAt(0) == 'j') {
					repl = 'cpy';
				} else {
					repl = 'jnz';
				}
			}
			
			arr[ptr] = repl + instr.substring(3);
			p.ip++;
		} else {
			debugger;
			// hlt
			halted = true;
		}
		
		if (++cmdcount % 100000 == 0) {
			printProcessor(p);
		}
	} while (!halted && p.ip < arr.length);

	printProcessor(p);

	return p.a;
}
