<?php
session_start();

if (!$_SESSION['logged_in']) {
  header('Location: ../login.php');
} else {
  if (isset($_GET['logout'])) {
    unset($_SESSION['logged_in']);
    header('Location: ../index.php');
  } else {
    include '../config.php';
    @ $db = new mysqli($dbserver, $dbuser, $dbpassword, $dbname);
    if ($db->connect_error) {
      echo "could not connect: " . $db->connect_error;
      printf("<br><a href=index.php>Return to home page </a>");
      exit();
    }
    ?>

    <html>
    <head>
      <link rel="stylesheet" type="text/css" href="admin.css">
    </head>
    <body>
      <h1><?php echo $title ?></h1>
      <ul id="admin_menu">
        <li><a href="index.php" <?php if ($current_page =="admin_dashboard") { ?> class="active" <?php } ?>>Admin Dashboard</a></li>
        <li><a href="../index.php">Back to Library</a></li>
        <li><a href="addbook.php" <?php if ($current_page =="add_book") { ?> class="active" <?php } ?>>Add Book</a></li>
        <li><a href="uploadPictures.php" <?php if ($current_page =="upload_picture") { ?> class="active" <?php } ?>>Upload Picture</a></li>
        <li><a href="?logout">Logout</a></li>
      </ul>

    <?php
  }
}

?>