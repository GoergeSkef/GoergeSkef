<?php
  $activePage = "books";
  include "header.php";
?>
<form>
  <input type="text" placeholder="Title" name="title">
  <input type="text" placeholder="Author" name="author">
  <button type="submit">Submit</button>
</form>

Book list
<?php

$searchtitle = "";
$searchauthor = "";

if (isset($_GET) && !empty($_GET)) {
  if (isset($_GET['title'])) {
    $searchtitle = $db->real_escape_string(htmlentities(trim($_GET['title'])));
  }
  if (isset($_GET['author'])) {
    $searchauthor = $db->real_escape_string(htmlentities(trim($_GET['author'])));
  }
  // $query = " select * from books";
  $query = "SELECT books.bookid as bookid, books.title as title, books.onloan as onloan, authors.firstName as firstName, authors.lastName as lastName, books.duedate as duedate FROM authors
            LEFT JOIN book_authors ON book_authors.author_id = authors.id
            LEFT JOIN books ON book_authors.book_id = books.bookid";
  if ($searchtitle && !$searchauthor) { // Title search only
      $query = $query . " where title like '%" . $searchtitle . "%'";
  }
  if (!$searchtitle && $searchauthor) { // Author search only
      $query = $query . " where concat(authors.firstName, ' ', authors.lastName) like '%" . $searchauthor . "%'";
  }
  if ($searchtitle && $searchauthor) { // Title and Author search
      $query = $query . " where title like '%" . $searchtitle . "%' and concat(authors.firstName, ' ', authors.lastName) like '%" . $searchauthor . "%'"; // unfinished
  }
  $stmt = $db->prepare($query);
  $stmt->bind_result($bookid, $title, $onloan, $firstName, $lastName, $duedate);
  $stmt->execute();

  echo '<table><thead><th>ID</th><th>Title</th><th>Author</th><th>On Loan</th><th>Reserve</th></thead><tbody>';
  while ($stmt->fetch()) {
    echo "<tr>";
    echo "<td>$bookid</td><td>$title</td><td>$firstName $lastName</td><td>$onloan</td>";
    echo '<td><a href="reserveBook.php?bookid=' . urlencode($bookid) . '"> Reserve </a></td>';
    echo "</tr>";
  }
  echo "</tbody></table>";


} else {
  $query = "SELECT
    books.bookid as bookid,
    books.title as title,
    books.onloan as onloan,
    authors.firstName as firstName,
    authors.lastName as lastName,
     books.duedate as duedate
    FROM authors
            LEFT JOIN book_authors ON book_authors.author_id = authors.id
            LEFT JOIN books ON book_authors.book_id = books.bookid";
  $stmt = $db->prepare($query);
  $stmt->bind_result($bookid, $title, $onloan, $firstName, $lastName, $duedate);
  $stmt->execute();

  echo '<table><thead><th>ID</th><th>Title</th><th>Author</th><th>On Loan</th><th>Reserve</th>';
  if (isset($_SESSION['logged_in'])) {
    echo '<th>Delete</th>';
  }
  echo '</thead><tbody>';
  while ($stmt->fetch()) {
    echo '<tr>';
    echo "<td>$bookid</td><td>$title</td><td>$firstName $lastName</td><td>$onloan</td>";
    echo '<td><a href="reserveBook.php?bookid=' . urlencode($bookid) . '"> Reserve </a></td>';
    if (isset($_SESSION['logged_in'])) {
      echo '<td><a href="admin/deletebook.php?bookid=' . urlencode($bookid) . '"> Delete </a></td>';
    }
    echo '</tr>';
  }
  echo '</tbody></table>';
}
  include "footer.php";
?>