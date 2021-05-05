<?php
$title = "Add new book";
$current_page = "add_book";
include("header.php");
?>

<?php
if (isset($_POST['newbooktitle'])) {
    // This is the postback so add the book to the database
    # Get data from form
    $newbooktitle = trim($_POST['newbooktitle']);
    $newbookauthor = trim($_POST['newbookauthor']);

    if (!$newbooktitle || !$newbookauthor) {
        printf("You must specify both a title and an author");
        printf("<br><a href=index.php>Return to home page </a>");
        exit();
    }

    $newbooktitle = $db->real_escape_string(addslashes($newbooktitle));
    $newbookauthor = $db->real_escape_string(addslashes($newbookauthor));

    $query = "insert into books (title, onloan, author, duedate) values ('$newbooktitle', 0, '$newbookauthor', null)";
    $stmt = $db->query($query);
    printf("<br>Book Added!");
    printf("<br><a href=index.php>Return to home page </a>");
    exit;
}

// Not a postback, so present the book entry form
?>

<h3>Add a new book</h3>
<hr>
You must enter both a title and an author and other stuff you have in the database....
<form action="addbook.php" method="POST">
    <table bgcolor="#bdc0ff" cellpadding="6">
        <tbody>
            <tr>
                <td>Title:</td>
                <td><INPUT type="text" name="newbooktitle"></td>
            </tr>
            <tr>
                <td>Author:</td>
                <td><INPUT type="text" name="newbookauthor"></td>
            </tr>
            <tr>
                <td></td>
                <td><INPUT type="submit" name="submit" value="Add Book"></td>
            </tr>
        </tbody>
    </table>
</form>
<?php include("footer.php"); ?>