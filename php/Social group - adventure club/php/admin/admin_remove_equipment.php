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
    // We know the borrower so go ahead and check the book out
    # Get data from form
    $bookingref = trim($_GET['bookingref']);      // From the hidden field
    $bookingref = addslashes($bookingref);

    # Open the database using the "librarian" account
    @ $db = new mysqli($dbserver, $dbuser, $dbpass, $dbname);

    if ($db->connect_error) {
        echo "could not connect: " . $db->connect_error;
        printf("<br><a href=admin_index.php>Return to home page </a>");
        exit();
    }

    // Prepare an update statement based on chosen bookid from list and execute it(deleting book from DB) 
        $stmt = $db->prepare("delete from equipmentlist where bookingref = ?");
        $stmt->bind_param('s', $bookingref);
        $response = $stmt->execute();
        printf("<br>Equipment successfully deleted!");
        printf("<br><a href=admin_equipment.php> Handle more equipment </a>");
        printf("<br><a href=admin_index.php>Return to home page </a>");
    
    
    exit;
}


?> 

<p class="posttitle">Remove equipment</p>
<form action="admin_remove_equipment.php" method="GET">
    Are you sure you want to delete equipment with id:
    <?php
    //Getting bookid from chosen book
    $bookingref = trim($_GET['bookingref']);
    echo '<INPUT type="text" name="bookingref" value=' . $bookingref . '>';
    ?>
    ...?
    <INPUT type="submit" name="submit" value="Continue">
</form>










 

			

			
<footer class="footerv">
    <?php include("admin_footer.php"); ?>
</footer>

</div>

</body>

</html>