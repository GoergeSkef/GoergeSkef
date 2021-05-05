<?php include ('session_user.php'); ?>
<!DOCTYPE html>
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

	<div class="navigation">
		<?php include 'user_header.php'  ?>
	</div>

	<section id="boxsection">

		<div class="box">
			<img class="boximg" src="../img/box4.jpg">				
			<h3 class="imgtitle">New kayaks</h3>
			<p class="imgtxt">New kayaks and other equipment to the club this vestibulum feugiat justo, vel ultricies nunc sagittis a. Nam eu ex et dolor vestibulum tempus. Etiam interdum erat et venenatis pulvinar.</p>
		</div>


		<div class="box">				
			<img class="boximg" src="../img/box6.jpg">
			<h3 class="imgtitle">Trips to the north</h3>
			<p class="imgtxt">This years club trip to the norhern parts of onec vestibulum feugiat justo, vel ultricies nunc sagittis a. Nam eu ex et dolor vestibulum tempus. Etiam interdum erat et.</p>		
		</div>


		<div class="box">				
			<img class="boximg" src="../../img/box5.jpg">
			<h3 class="imgtitle">The Hike..</h3>
			<p class="imgtxt">A new documentary about the amazing vestibulum feugiat justo, vel ultricies nunc sagittis a. Nam eu ex et dolor vestibulum tempus. Etiam interdum erat et venenatis pulvinar.</p>		
		</div>

	</section>
<footer class="footerv">
	<?php include 'user_footer.php'; ?>
</footer>

</div>

</body>

</html>