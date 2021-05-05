<?php include 'admin_session.php'; ?>

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
<?php include 'admin_header.php' ?> 

<?php
if (isset($_GET['submit'])) {

    $tripid = trim($_GET['tripid']);      
    $tripid = addslashes($tripid);


    @ $db = new mysqli($dbserver, $dbuser, $dbpass, $dbname);

    if ($db->connect_error) {
        echo "could not connect: " . $db->connect_error;
        printf("<br><a href=admin_index.php>Return to home page </a>");
        exit();
    }


        $stmt = $db->prepare("delete from trips where tripid = ?");
        $stmt->bind_param('s', $tripid);
        $response = $stmt->execute();
        printf("<br>Activity successfully deleted!");
        printf("<br><a href=admin_activites.php> Handle more activities </a>");
        printf("<br><a href=admin_index.php>Return to home page </a>");
    
    
    exit;
}


?> 

<p class="posttitle">Remove activity</p>
<form action="admin_remove_trip.php" method="GET">
    Are you sure you want to delete activity with the -ID:
    <?php

    $tripid = trim($_GET['tripid']);
    echo '<INPUT type="text" name="tripid" value=' . $tripid . '>';
    ?>
    ...?
    <INPUT type="submit" name="submit" value="Continue">
</form>




		
<footer class="footerv">
	<?php include 'admin_footer.php'; ?>
</footer>

</div>

</body>

</html>