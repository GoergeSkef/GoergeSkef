<?php
$cookie_name = "disscount";
$cookie_value = "<div class='imagecookie'> <img src='img/cookiead.png'></img></div>";
setcookie($cookie_name, $cookie_value, time() + (86400 * 1), "/");
?>

<!DOCTYPE html>
<html>
<body>
<div class="pagecontainer">
<?php
if(!isset($_COOKIE[$cookie_name])) {
     echo "Your 24 hour '" . $cookie_name . "' have ended!";
     echo '<br>';
     echo '<a href="visitor_index.php">Go back</a>';
} else {
     echo "Your 50% '" . $cookie_name . "' code ";
     echo "is: " . $_COOKIE[$cookie_name];
}
?>
</div>
</body>
</html>