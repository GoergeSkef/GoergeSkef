<ul id="mainmenu">
  <li><a href="index.php" <?php if ($activePage =="home") { ?> class="active" <?php } ?>>Home</a></li>
  <li><a href="about.php" <?php if ($activePage =="about") { ?> class="active" <?php } ?>>About</a></li>
  <li><a href="books.php" <?php if ($activePage =="books") { ?> class="active" <?php } ?>>Browse Books</a></li>
  <li><a href="mybooks.php" <?php if ($activePage =="mybooks") { ?> class="active" <?php } ?>>My Books</a></li>
  <li><a href="gallery.php" <?php if ($activePage =="gallery") { ?> class="active" <?php } ?>>Gallery</a></li>
  <li><a href="contact.php" <?php if ($activePage =="contact") { ?> class="active" <?php } ?>>Contact</a></li>
  <li>
    <?php
    if (isset($_SESSION['logged_in'])) {
    ?>
      <a href="admin/index.php">Admin</a>
    <?php
    } else {
    ?>
      <a href="login.php" <?php if ($activePage =="login") { ?> class="active" <?php } ?>>Login</a>
      <?php
    }
    ?>
  </li>
</ul>