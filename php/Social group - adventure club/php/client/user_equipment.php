
<!DOCTYPE html>
<html>
<head>
	<title>
		The Adventure Club.
	</title>
	<?php include ('session_user.php'); ?>
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

			
<h3 class="pagetitle">Equipment for adventurers!</h3> 
		
<img class="pageimg" src="../img/equipment.jpg">

<div class="informationblock">
			<p class="titleabout">How does it work?</p>
			<p class="textabout"> All members of the club have free access to the clubs equipment. To make sure the equipment you want to use is available, reserve it below and note the reservation ID before coming in. For more information and long-term loaning contact us at:<br> <a href="mailto:someone@example.com?Subject=questionsAC" target="_top">information@adventureclub.com</a> <br>
			<a href="tel:554-535-5535">554-455-5455</a></p></p> 
		</div>
		<div>	
			<table class="infotable">
				<tr><th>Opening hours</th></tr>
				<tr><td>Monday:</td><td>8.00 - 20.00</td></tr>
				<tr><td>Tuesday:</td><td>8.00 - 20.00</td></tr>
				<tr><td>Wednesday:</td><td>8.00 - 20.00</td></tr>
				<tr><td>Thursday:</td><td>8.00 - 20.00</td></tr>
				<tr><td>Friday:</td><td>8.00 - 20.00</td></tr>
				<tr><td>Saturday:</td><td>8.00 - 20.00</td></tr>
				<tr><td>Sunday:</td><td>8.00 - 20.00</td></tr>
			</table>
		</div>

	<div id="equipmentform">
		
		

		<p class="titleabout">Search and reserve equipment</p>
		<p class="textabout">Browse all of our equipment by type or model name. Reserve your equipment by pressing the reserve-button.<br> Note your reservation ID and bring it with you to collect your equipment. </p>
				<form action="user_equipment.php" method="POST">
					<table class="searchequip">
					<tbody>
						<tr>
							<td>Type:</td>
							<td><input type="text" name="searchtype"></td>
						</tr>
						<tr>
							<td>Model:</td>
							<td><input type="text" name="searchmodel"></td>
						</tr>
						<tr>
							<td></td>
							<td><input type="submit" name="submit" value="search"></td>
						</tr>					
					</tbody>
					</table>
				</form>
	</div>

<div class="triptable">

<?php 
$searchtype = "";
$searchmodel = "";

if (isset($_POST) && !empty($_POST)) {

    $searchtype = trim($_POST['searchtype']);
    $searchmodel = trim($_POST['searchmodel']);
}



$searchtype = addslashes($searchtype);
$searchmodel = addslashes($searchmodel);


@ $db = new mysqli($dbserver, $dbuser, $dbpass, $dbname);

if ($db->connect_error) {
    echo "could not connect: " . $db->connect_error;
    printf("<br><a href=user_index.php>Return to home page </a>");
    exit();
}



$query = " select season, type, model, description, onloan, bookingref from equipmentlist";  
if ($searchtype && !$searchmodel) { 
    $query = $query . " where type like '%" . $searchtype . "%'";  
}
if (!$searchtype && $searchmodel) { 
    $query = $query . " where model like '%" . $searchmodel . "%'"; 
}
if ($searchtype && $searchmodel) { 
    $query = $query . " where type like '%" . $searchtype . "%' and model like '%" . $searchmodel . "%'"; 
}


 

 

    $stmt = $db->prepare($query); 
    $stmt->bind_result($season, $type, $model, $description, $onloan, $bookingref); 
    $stmt->execute();  

    echo '<table>';
    echo '<tr><th>Season</th> <th>Type</th> <th>Model</th> <th>Description</th> <th>Availibility</th> <th>Reserve</th> <th> </th>  </tr>';

    while ($stmt->fetch()) {
    	if($onloan == 0){ 
    	$onloan='<span class="avail">Available</span>';
        echo "<tr>";
        echo "<td> $season </td><td> $type </td><td> $model </td><td> $description </td><td> $onloan </td>";
        echo '<td><a href="user_reserve.php?bookingref=' . urlencode($bookingref) . '"> Reserve </a></td>';
        echo '<td> </td>';
        echo "</tr>";    	
    }	  
    	else { 
    	$onloan='<span class="reserve">Not Available</span>'; 
    	$bookingref='';
      	echo "<tr>";
        echo "<td> $season </td><td> $type </td><td> $model </td><td> $description </td><td> $onloan </td><td> $bookingref </td>";
        echo '<td> </td>';
        echo "</tr>";     
    } }
    echo "</table>";


    ?>
</div>


<footer class="footerv">
	<?php include 'user_footer.php'; ?>
</footer>

</div>

</body>

</html>