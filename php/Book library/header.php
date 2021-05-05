<?php
  include 'config.php';
  session_start();

  @ $db = new mysqli($dbserver, $dbuser, $dbpassword, $dbname);
  if ($db->connect_error) {
    echo "could not connect: " . $db->connect_error;
    printf("<br><a href=index.php>Return to home page </a>");
    exit();
  }

  // session counter
  if (!isset($_SESSION['counter'])) {
  	$sessionCounter = 0;
  } else {
  	$sessionCounter = $_SESSION['counter'];
  }
  $sessionCounter = $sessionCounter + 1;
  $_SESSION['counter'] = $sessionCounter;


  // cookie counter
  if(!isset($_COOKIE['counter'])) {
  	$cookieCounter = 0;
  } else {
  	$cookieCounter = $_COOKIE['counter'];
  }
  $cookieCounter = $cookieCounter + 1;
  setcookie('counter', $cookieCounter, time() + 24 * 3600);

?>
<!DOCTYPE html>
<html>
<head>
  <title>Book Club</title>
  <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
  <h1 class="title">Book Club</h1>
<?php
  include "mainmenu.php";
  include "headerImage.php";
?>