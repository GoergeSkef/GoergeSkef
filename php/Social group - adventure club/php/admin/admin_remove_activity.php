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

    $activityid = trim($_GET['activityid']);      
    $activityid = addslashes($activityid);

    
    @ $db = new mysqli($dbserver, $dbuser, $dbpass, $dbname);

    if ($db->connect_error) {
        echo "could not connect: " . $db->connect_error;
        printf("<br><a href=admin_index.php>Return to home page </a>");
        exit();
    }

    
        $stmt = $db->prepare("delete from activities where activityid = ?");
        $stmt->bind_param('s', $activityid);
        $response = $stmt->execute();
        printf("<br>Activity successfully deleted!");
        printf("<br><a href=admin_activites.php> Handle more activities </a>");
        printf("<br><a href=admin_index.php>Return to home page </a>");
    
    
    exit;
}


?> 

<p class="posttitle">Remove activity</p>
<form action="admin_remove_activity.php" method="GET">
    Are you sure you want to delete activity with the activity-ID:
    <?php
  
    $activityid = trim($_GET['activityid']);
    echo '<INPUT type="text" name="activityid" value=' . $activityid . '>';
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