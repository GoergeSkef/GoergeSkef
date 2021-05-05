<?php

  $activePage = "contact";

  include "header.php";

?>

contact

<form>
  Email <input type="text" name="email">
  Name <input type="text" name="name">
  Text <textarea name="text"></textarea>
  <button type="submit">Send</button>
</form>


<?php
  include "footer.php";
?>