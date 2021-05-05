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
<body>

<div class="pagecontainer">

<?php include 'admin_header.php' ?>
<?php include('../config.php') ?>

<p class="posttitle">Weekly activities</p>
<p class="aboutBE">To add new activity enter necessary information in the fields. To remove activity from list press <span style="color: red"> remove </span> in the list. 
</p> 

    <?php
    if (isset($_POST['newactdate'])) {

        $newactdate = trim($_POST['newactdate']);
        $newacttype = trim($_POST['newacttype']);
        $newlocation = trim($_POST['newlocation']);
        $newdescript = trim($_POST['newdescript']);
        $newcontact = trim($_POST['newcontact']);

        
        if (!$newactdate || !$newacttype || !$newlocation || !$newdescript || !$newcontact) {
            printf("You must enter all fields to add a new activity");
            printf("<br><a href=admin_index.php>Return to home page </a>");
            exit();
        }


        $newactdate = addslashes($newactdate);
        $newacttype = addslashes($newacttype);
        $newlocation = addslashes($newlocation);
        $newdescript = addslashes($newdescript);
        $newcontact = addslashes($newcontact);

        $newactdate = htmlentities($newactdate);
        $newacttype = htmlentities($newacttype);
        $newlocation = htmlentities($newlocation);
        $newdescript = htmlentities($newdescript);
        $newcontact = htmlentities($newcontact);


    @ $db = new mysqli($dbserver, $dbuser, $dbpass, $dbname);
        
        if ($db->connect_error) {
            echo "could not connect: " . $db->connect_error;
            printf("<br><a href=admin_index.php>Return to home page </a>");
            exit();
        }

        
        $stmt = $db->prepare("insert into activities values (?, ?, ?, ?, ?, null)");
        $stmt->bind_param('sssss',$newactdate, $newacttype, $newlocation, $newdescript, $newcontact);
        $stmt->execute();
        printf("<br>Activity succesfully added!");
        printf("<br><a href=admin_activites.php>Add more activites </a>");
        printf("<br><a href=admin_index.php>Return to home page </a>");
        exit;
    }

    ?>

    <p class="subtitle" ><u>Add new activity.</u></p>
        <form action="admin_activites.php" method="POST">
            <table class="addform">
                <tbody>
                    <tr>
                        <td>Date:</td>
                        <td><INPUT type="text" name="newactdate"></td>
                    </tr>
                    <tr>
                        <td>Type:</td>
                        <td><INPUT type="text" name="newacttype"></td>
                	</tr>
                    <tr>
                        <td>Location:</td>
                        <td><INPUT type="text" name="newlocation"></td>
                    </tr>               
                    <tr>
                    	<td>Description:</td>
                        <td><INPUT type="text" name="newdescript"></td>
                    </tr>
                    <tr>
                        <td>Contact:</td>
                        <td><INPUT type="text" name="newcontact"></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><INPUT type="submit" name="submit" value="Add activity"></td>
                    </tr>
                </tbody>
            </table>
        </form>



<div class="triptable">

    <p class="subtitle" ><u>Remove activity.</u></p>

    <?php  
        @ $db = new mysqli($dbserver, $dbuser, $dbpass, $dbname);

        if ($db->connect_error) {
            echo "could not connect: " . $db->connect_error;
            printf("<br><a href=visitor_index.php>Return to home page </a>");
            exit();
        }

        $query = "select actdate, acttype, location, descript, contact, activityid from activities";

        $stmt = $db->prepare($query);
        $stmt->bind_result($actdate, $type, $location, $descript, $contact, $activityid);
        $stmt->execute();

        echo '<table>';
        echo '<tr><th>Date</th> <th>Activity</th> <th>Location</th> <th>Info</th> <th>Contact</th> <th>ID</th> <th>Remove</th></tr>';

        while ($stmt->fetch()) {

        echo '<tr>';
        echo "<td> $actdate </td><td> $type </td><td> $location </td><td> $descript </td><td> $contact </td><td> $activityid </td>";
        echo '<td><a id="remove" href="admin_remove_activity.php?activityid=' . urlencode($activityid) . '">Remove </a></td>';
        echo "</tr>";
        }

        echo '</table>';
    ?>  

 </div> 

<p class="posttitle">Trips and Adventures</p>
<p class="aboutBE">To add a new activity in the trips and adventures list enter necessary information in the textfields. To remove an activity from the trips and adventures list, press <span style="color: red"> remove </span>.</p> 

<?php
    if (isset($_POST['newdateof'])) {

        $newdateof = trim($_POST['newdateof']);
        $newactivity = trim($_POST['newactivity']);
        $newdestination = trim($_POST['newdestination']);
        $newinfotxt = trim($_POST['newinfotxt']);
        $newcontact = trim($_POST['newcontact']);
        

        if (!$newdateof || !$newactivity || !$newdestination || !$newinfotxt || !$newcontact) {
            printf("You must enter all fields to add a new activity");
            printf("<br><a href=admin_index.php>Return to home page </a>");
            exit();
        }


        $newdateof = addslashes($newdateof);
        $newactivity = addslashes($newactivity);
        $newdestination = addslashes($newdestination);
        $newinfotxt = addslashes($newinfotxt);
        $newcontact = addslashes($newcontact);

        $newdateof = htmlentities($newdateof);
        $newactivity = htmlentities($newactivity);
        $newdestination = htmlentities($newdestination);
        $newinfotxt = htmlentities($newinfotxt);
        $newcontact = htmlentities($newcontact);

        
    @ $db = new mysqli($dbserver, $dbuser, $dbpass, $dbname);
        
        
        if ($db->connect_error) {
            echo "could not connect: " . $db->connect_error;
            printf("<br><a href=admin_index.php>Return to home page </a>");
            exit();
        }

        
        $stmt = $db->prepare("insert into trips values (?, ?, ?, ?, ?, null)");
        
        $stmt->bind_param('sssss',$newdateof, $newactivity, $newdestination, $newinfotxt, $newcontact);
        $stmt->execute();
        printf("<br>Activity succesfully added!");
        printf("<br><a href=admin_activites.php>Add more activites </a>");
        printf("<br><a href=admin_index.php>Return to home page </a>");
        exit;
    }

    
    ?>
    <p class="subtitle" ><u>Add new activity.</u></p>
        <form action="admin_activites.php" method="POST">
            <table class="addform">
                <tbody>
                    <tr>
                        <td>Departure:</td>
                        <td><INPUT type="text" name="newdateof"></td>
                    </tr>
                    <tr>
                        <td>Activity:</td>
                        <td><INPUT type="text" name="newactivity"></td>
                    </tr>
                    <tr>
                        <td>Destination:</td>
                        <td><INPUT type="text" name="newdestination"></td>
                    </tr>               
                    <tr>
                        <td>Description:</td>
                        <td><INPUT type="text" name="newinfotxt"></td>
                    </tr>
                    <tr>
                        <td>Contact:</td>
                        <td><INPUT type="text" name="newcontact"></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><INPUT type="submit" name="submit" value="Add activity"></td>
                    </tr>
                </tbody>
            </table>
        </form>

<div class="triptable">
    <p class="subtitle"><u>Remove Activity.</u></p>
    <?php
        if ($db->connect_error) {
            echo "could not connect: " . $db->connect_error;
            printf("<br><a href=admin_index.php>Return to home page </a>");
            exit();
        }

        $queryt = "select dateof, activity, destination, infotxt, contact, tripid from trips";

        $stmt = $db->prepare($queryt);
        $stmt->bind_result($dateof, $activity, $destination, $infotxt, $contact, $tripid);
        $stmt->execute();

        echo '<table>';
        echo '<tr><th>Departure</th> <th>Activity</th> <th>Location</th> <th id="info">Info</th> <th id="contact">Contact</th> <th>ID</th><th id="removequip">Remove</th>';

        while ($stmt->fetch()) {

        echo '<tr>';
        echo "<td> $dateof </td><td> $activity </td><td> $destination </td><td> $infotxt </td><td> $contact </td><td> $tripid </td>";
        echo '<td><a id="remove" href="admin_remove_trip.php?tripid=' . urlencode($tripid) . '">Remove </a></td>';
        echo "</tr>";
        }
        echo '</table>';
    ?>  
</div>

			
<footer class="footerv">
	<?php include 'admin_footer.php'; ?>
</footer>

</div>

</body>

</html>