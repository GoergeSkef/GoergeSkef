<?php
  $activePage = "gallery";
  include "header.php";

  echo '<h2>Gallery</h2>';

  $photos = scandir('uploadedfiles');
  $photos = array_diff($photos, array('.', '..'));

  foreach($photos as $photo) {
	  echo '<img src="uploadedfiles/'.$photo.'" style="height: 200px; padding: 10px;"/>';
  }

  include "footer.php";
 ?>