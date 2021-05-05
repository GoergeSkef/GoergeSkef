<?php include ('session_user.php'); ?>
<html>
<head>
	<title>
		The Adventure Club.
	</title>
	<link rel="stylesheet" type="text/css" href="../css/style.css">
	<link href="https://fonts.googleapis.com/css?family=Cormorant+Garamond:300,300i,400,400i,500,500i,600" rel="stylesheet">	
	<link href="https://fonts.googleapis.com/css?family=Lato:300,400,400i,700,900" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Roboto+Slab:100" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Amatic+SC|Playfair+Display|Cormorant+Garamond|Shadows+Into+Light" rel="stylesheet">
</head>
	<?php include '../config.php'; ?>
<body>
<div class="pagecontainer">

<?php include 'user_header.php' ?>

			
<h3 class="pagetitle">Activites and adventures</h3>


<p class="aboutpage">Here you can find all <a href="#weeklyactivities">weekly activites</a> and <a href="#tripsadventures">trips and adventures</a> organized by The Adventures Club and its members.</p>


<p class="posttitle">Weekly activites</p>
<div id="weeklyactivities">
	<img class="activitypic" src="../img/week.jpg">
	<p class="sidetext">Free activities everyday in the week arranged by employees of the club. Make sure to bring your own equipment or reserve it <a href="user_equipment.php">here</a>.</p>
</div>

<div class="triptable">
	<?php  
		@ $db = new mysqli($dbserver, $dbuser, $dbpass, $dbname);

		if ($db->connect_error) {
		    echo "could not connect: " . $db->connect_error;
		    printf("<br><a href=user_index.php>Return to home page </a>");
		    exit();
		}

		$query = "select actdate, acttype, location, descript, contact, activityid from activities";

		$stmt = $db->prepare($query);
		$stmt->bind_result($actdate, $acttype, $location, $descript, $contact, $activityid);
		$stmt->execute();

		echo '<table>';
		echo '<tr><th>Date</th> <th>Activity</th> <th>Location</th> <th>Info</th> <th>Contact</th> <th></th>  </tr>';

		while ($stmt->fetch()) {

		echo '<tr>';
		echo "<td> $actdate </td><td> $acttype </td><td> $location </td><td> $descript </td><td> $contact </td><td> </td>";

		}
		echo '</table>';
	?>	

</div>

<p class="posttitle">Trips and Adventures</p>
<div id="tripsadventures">
	<img class="activitypic" src="../img/box3.png">
	<p class="sidetext">Trips and adventures exploring all corners of the world. To gain more information about an adventure please contact the organizer. <br> Want to host your adventure here? Please contact us at: <a href="mailto:someone@example.com?Subject=questionsAC" target="_top">information@adventureclub.com</a>.</p>
</div>

<div class="triptable">
	<?php
		if ($db->connect_error) {
		    echo "could not connect: " . $db->connect_error;
		    printf("<br><a href=user_index.php>Return to home page </a>");
		    exit();
		}

		$queryt = "select dateof, activity, destination, infotxt, contact, tripid from trips";

		$stmt = $db->prepare($queryt);
		$stmt->bind_result($dateof, $activity, $destination, $infotxt, $contact, $tripid);
		$stmt->execute();

		echo '<table>';
		echo '<tr><th>Departure</th> <th>Activity</th> <th>Location</th> <th id="info">Info</th> <th id="contact">Contact</th> <th></th>  </tr>';

		while ($stmt->fetch()) {

		echo '<tr>';
		echo "<td> $dateof </td><td> $activity </td><td> $destination </td><td> $infotxt </td><td> $contact </td><td> </td>";

		}
		echo '</table>';
	?>	
</div>

			
<footer class="footerv">
	<?php include 'user_footer.php'; ?>
</footer>

</div>

</body>

</html>