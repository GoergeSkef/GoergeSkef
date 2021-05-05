<?php
	session_start();
	$activePage = "login";
	include 'config.php';

	if (isset($_POST['username'], $_POST['password'])) {
		@ $db = new mysqli($dbserver, $dbuser, $dbpassword, $dbname);
		if ($db->connect_error) {
			echo "could not connect: " . $db->connect_error;
			printf("<br><a href=index.php>Return to home page </a>");
			exit();
		}
		$username = mysqli_real_escape_string($db, htmlentities($_POST['username']));
		$password = sha1($_POST['password']);

	    $query = ("SELECT * FROM users WHERE username = '{$username}' "."AND password = '{$password}'");

	    $stmt = $db->prepare($query);
	    $stmt->execute();
	    $stmt->store_result();

	    $isLogin = $stmt->num_rows();
        if (isset($isLogin)) {
	        if ($isLogin == 0) {
						include "header.php";
	          echo '<h2>wrong credentials!</h2>';
						include "footer.php";
	        } else {
	        	$_SESSION['logged_in'] = true;
            header('Location: admin/index.php');
	        }
        }
	} else {
		include "header.php";
?>

	<h2>Login</h2>
	<form method="post">
		<input type="text" placeholder="Username" name="username">
		<input type="password" placeholder="Password" name="password">
		<button type="submit">Login</button>
	</form>
<?php
	include "footer.php";
}
 ?>