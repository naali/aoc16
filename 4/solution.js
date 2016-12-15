function solver(input) {
	var task1_result = solve1(input);

	return {
		task1: task1_result.checksum,
		task2: solve2(task1_result.real_rooms)
	}
}

function solve1(input) {
	var arr = input.split("\n");
	
	var re = /([a-z\-]+)+\-(\d+)\[([a-z]+)\]/;
	var real_rooms = [];
	
	var sid_sum = 0;
	
	for (var i=0; i<arr.length ; i++) {
		var m = arr[i].match(re);
		
		var str = m[1];
		var sid = parseInt(m[2]);
		var checksum = m[3];
		var chr_count = {};
		
		for (var j=0; j<str.length; j++) {
			var c = str.charAt(j);

			if (c != '-') {
				if (chr_count[c] !== undefined) {
					chr_count[c].count += 1;
				} else {
					chr_count[c] = { count: 1, key: c };
				}
			}
		}
		
		var tmparr = o2arr(chr_count);

		tmparr.sort(function(a, b) {
			return b.count - a.count;
		});
		
		var ptr = 0;
		var is_valid = true;
		
		var prev_count = -1;
		
		var groups = [];
		var currentgroup = undefined;
		
		for (var j=0; j<tmparr.length; j++) {
			var chr = tmparr[j]['chr'];
			var count = tmparr[j]['count'];
			
			if (count != prev_count) {
				prev_count = count;
				
				if (currentgroup !== undefined) {
					groups.push(currentgroup);
				}
				
				currentgroup = [ chr ];
			} else {
				currentgroup.push(chr);
			}
		}
		
		groups.push(currentgroup);
		
		var cs_matcher = "";
		var len = 0;
		
		for (var j=0; j<groups.length && len < 5; j++) {
			cs_matcher += '[';
			
			for (var k=0; k<groups[j].length; k++) {
				cs_matcher += groups[j][k];
				
				if (k + 1 < groups[j].length) {
					cs_matcher += '|';
				}
			}
			
			var tmp_l = groups[j].length;
			
			if (tmp_l + len > 5) {
				tmp_l = 5 - len;
			}
			
			len += tmp_l;
			cs_matcher += ']{' + tmp_l + '}';
		}
		
		var tester_re = new RegExp(cs_matcher);
		var tester_m = checksum.match(tester_re);
		
		if (tester_m && tester_m.length == 1 && tester_m[0] == checksum) {
			sid_sum += sid;
			real_rooms.push({ name: str, sid: sid });
		}
	}
	
	return { checksum: sid_sum, real_rooms: real_rooms };
}

function o2arr(o) {
	var arr = [];
	var keys = Object.keys(o);
	
	for (var i=0; i<keys.length; i++) {
		var key = keys[i];
		var obj = { count: o[key].count, chr: key };
		arr.push( obj );
	}
	
	return arr;
}

function solve2(input) {
	var room_name = "northpole object storage";
	
	for (var i=0; i<input.length; i++) {
		var name = input[i]['name'];
		var sid = input[i]['sid'];
		var shifter = sid % 26;
		var a_code = 97; // "a".charCodeAt(0);
		
		var str = "";
		
		for (var j = 0; j<name.length; j++) {
			var chr = name.charCodeAt(j);
			
			if (chr == 45) {
				str += ' ';
			} else {
				var rot_chr = String.fromCharCode( a_code + (((chr - a_code) + shifter) % 26) );
				str += rot_chr;
			}
		}
		
		if (str == room_name) {
			return sid;
		}
	}

	return "wtf";
}

