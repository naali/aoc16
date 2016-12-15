<?php
	$day = 1;
	
	if (isset($_GET) && isset($_GET["d"])) {
		$d = intval($_GET["d"]);
		
		if ($d >= 1 && $d <= 24) {
			$day = $d;
		}
	}
	
	$task = 1;

	if (isset($_GET) && isset($_GET["t"])) {
		$t = intval($_GET["t"]);
		
		if ($t == 1 || $t == 2) {
			$task = $t;
		}
	}
	
	$input = file_get_contents("$day/input$task.txt");
	
	if ($input == null || strlen($input) == 0) {
		$input = "Not yet downloaded :|";
	}
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf8">
		<script src="lib/jquery-3.1.1.min.js"></script>
		<script src="framework/aoclib.js"></script>
		<script src="<?php echo "$day/solution.js"; ?>"></script>
		<script>
			$(document).ready(function() {
				var solution = solver($("#input").text());
				$("#output").html("task1: " + solution.task1 + "<br>" + "task2: " + solution.task2);
			});
		</script>
	</head>
	<body>
		<div class="container">
			<div class="header"><?php echo "Input for day $day, task $task:" ?></header>
			<div id="input"><?php echo "$input"; ?></div>
		</div>
		<div class="container">
			<div id="output"></div>
		</div>
	</body>
</html>
