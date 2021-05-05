<?php
  $activePage = "books";
  include "header.php";

  if(isset($_GET['bookid'])) {
  	$bookid = trim($_GET['bookid']);
  	$bookid = addslashes($bookid);

  	echo "You are returning the book with the ID:" .$bookid;

    $stmt = $db->prepare("UPDATE books SET onloan=0 WHERE bookid = ?");
    $stmt->bind_param('i', $bookid);
    $stmt->execute();
    printf("<br>Succesfully returned!");
    printf("<br><a href=books.php>Search and Book more Books </a>");
    printf("<br><a href=mybooks.php>Return to My Books </a>");
    printf("<br><a href=index.php>Return to home page </a>");
  }

  include "footer.php";
?>