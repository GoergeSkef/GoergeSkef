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

<?php include 'user_header.php' ?>

			
<h3 class="imgtitle">Equipment for adventurers!</h3> 
	



<?php



include ("config.php");


$bookingref = trim($_GET['bookingref']);  
echo '<INPUT type="hidden" name="bookingref" value=' . $bookingref . '>'; // 

$bookingref = trim($_GET['bookingref']);      
$bookingref = addslashes($bookingref);

@ $db = new mysqli($dbserver, $dbuser, $dbpass, $dbname);

    if ($db->connect_error) {
        echo "CONNECTION ERROR: could not connect: " . $db->connect_error;
        printf("<br><a href=user_index.php>Return to home page </a>");
        exit();
    }
    
   echo "Reservation successful! You have reserved equipment with the ID:"           .$bookingref; 
   echo "<br>Save the equipment ID as it will be used to collect your equipment.";

    
    $stmt = $db->prepare("UPDATE equipmentlist SET onloan=1 WHERE bookingref = ?"); 
    $stmt->bind_param('i', $bookingref);
    $stmt->execute();
    printf("<br><a href=user_equipment.php>Search and reserve more equipment </a>");
    printf("<br><a href=user_index.php>Return to home page </a>");
    exit; 

    ?>



</div>


			
<footer class="footerv">
	<?php include 'user_footer.php'; ?>
</footer>

</div>

</body>

</html>