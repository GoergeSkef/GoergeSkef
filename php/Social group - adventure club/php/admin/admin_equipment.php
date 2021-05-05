<?php include ('admin_session.php'); ?>
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

<p class="posttitle">Returning and removing equipment</p>
<p class="aboutBE">To update our list when members return equipment to the club press <span style="color: blue" blue>Return</span>. To completely remove broken or missing equipment from list, press <span style="color: red">Remove</span>. Search equipment by</p>
	<div class="equipmentform">
				<form action="admin_equipment.php" method="POST">
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
							<td><input type="submit" name="submit" value="submit"></td>
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
    printf("<br><a href=admin_index.php>Return to home page </a>");
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
    echo '<tr><th>season</th> <th>type</th> <th>model</th> <th id="description">description</th> <th>status</th> <th>b.ID</th> <th>return</th> <th>remove</th>  </tr>';
    while ($stmt->fetch()) {
    	if($onloan == 0){ 
    		$onloan='<span class="avail">Not reserved</span>'; 
        echo "<tr>";
        echo "<td> $season </td><td> $type </td><td> $model </td><td> $description </td><td> $onloan </td>";
        echo "<td> $bookingref </td>";
        echo '<td> </td>';
        echo '<td><a id="remove" href="admin_remove_equipment.php?bookingref=' . urlencode($bookingref) . '">Remove </a></td>';
        echo "</tr>";
    	}else {$onloan='<span class="reserve">Reserved</span>'; 

        echo "<tr>";
        echo "<td> $season </td><td> $type </td><td> $model </td><td> $description </td><td> $onloan </td>";
        echo "<td> $bookingref </td>";
        echo '<td><a href="admin_return.php?bookingref=' . urlencode($bookingref) . '"> Return </a></td>';
        echo '<td><a id="remove" href="admin_remove_equipment.php?bookingref=' . urlencode($bookingref) . '">Remove </a></td>';
        echo "</tr>";
    }}
    echo "</table>";
    ?>
</div>


<div>
	<p class="posttitle">Add New Equipment</p>
	<p class="aboutBE">To add new equipment enter all the fields with necessary information and press "add equipment".</p>

<?php
if (isset($_POST['newseason'])) {
    $newseason = trim($_POST['newseason']);
    $newtype = trim($_POST['newtype']);
    $newmodel = trim($_POST['newmodel']);
    $newdescript = trim($_POST['newdescript']);
    $newbookingref = trim($_POST['newbookingref']);
    
    if (!$newseason || !$newtype || !$newmodel || !$newdescript || !$newbookingref) {
        printf("You must specify all fields to add new equipment");
        printf("<br><a href=admin_equipment.php>Try again? </a>");
        exit();
    }

    
    $newseason = addslashes($newseason);
    $newtype = addslashes($newtype);
    $newmodel = addslashes($newmodel);
    $newdescript = addslashes($newdescript);
    $newbookingref = addslashes($newbookingref);

    $newseason = htmlentities($newseason);
    $newtype = htmlentities($newtype);
    $newmodel = htmlentities($newmodel);
    $newdescript = htmlentities($newdescript);
    $newbookingref = htmlentities($newbookingref);

    
    
    if ($db->connect_error) {
        echo "could not connect: " . $db->connect_error;
        printf("<br><a href=admin_index.php>Return to home page </a>");
        exit();
    }

    
    $stmt = $db->prepare("insert into equipmentlist values (null, ?, ?, ?, ?, false, ?)");
    
    $stmt->bind_param('sssss',$newseason, $newtype, $newmodel, $newdescript, $newbookingref);
    $stmt->execute();
    printf("<br>Equipment successfully added!");
    printf("<br><a href=admin_equipment.php>Add more equipment </a>");
    printf("<br><a href=admin_index.php>Return to home page </a>");
    exit;
} ?>

    <form action="admin_equipment.php" method="POST">
        <table class="addform">
            <tbody>
                <tr>
                    <td>Season:</td>
                    <td><INPUT type="text" name="newseason"></td>
                </tr>
                <tr>
                    <td>Type:</td>
                    <td><INPUT type="text" name="newtype"></td>
            	</tr>
                <tr>
                    <td>Model:</td>
                    <td><INPUT type="text" name="newmodel"></td>
                </tr>               
                <tr>
                	<td>Description:</td>
                    <td><INPUT type="text" name="newdescript"></td>
                </tr>
                <tr>
                    <td>Bookingref:</td>
                    <td><INPUT type="text" name="newbookingref"></td>
                </tr>
                <tr>
                    <td></td>
                    <td><INPUT type="submit" name="submit" value="Add equipment"></td>
                </tr>
            </tbody>
        </table>
    </form>
</div> 

			

			
<footer class="footerv">
	<?php include 'admin_footer.php'; ?>
</footer>

</div>

</body>

</html>