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

<body>
<div class="pagecontainer">

<?php include 'admin_header.php' ?>

            
<h3 class="imgtitle">Returning equipment</h3> 
    





<?php

include("../frontend/config.php");

$bookingref = trim($_GET['bookingref']); 
echo '<INPUT type="hidden" name="bookingref" value=' . $bookingref . '>';

$bookingref = trim($_GET['bookingref']);  
$bookingref = addslashes($bookingref);

@ $db = new mysqli($dbserver, $dbuser, $dbpass, $dbname);

    if ($db->connect_error) {
        echo "could not connect: " . $db->connect_error;
        printf("<br><a href=admin_index.php>Return to home page </a>");
        exit();
    }

   echo "Equipment - BR:" . $bookingref;


    $stmt = $db->prepare("UPDATE equipmentlist SET onloan=0 WHERE bookingref = ?"); 
    $stmt->bind_param('i', $bookingref);
    $stmt->execute();
    printf("<br>Succesfully returned!");
    printf("<br><a href=admin_equipment.php>Return to equipment page</a>");
    printf("<br><a href=admin_index.php>Return to home page </a>");
    exit;

?>

</div>


            
<footer class="footerv">
    <?php include 'admin_footer.php'; ?>
</footer>

</div>

</body>

</html>