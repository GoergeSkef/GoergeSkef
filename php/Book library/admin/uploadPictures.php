<?php
  $current_page = "upload_picture";
  $title = "Picture Upload";
  include "header.php";

  if (isset($_FILES['upload'])) {
    $allowedextensions = array('jpg', 'jpeg', 'gif', 'png');
    $extension = strtolower(substr($_FILES['upload']['name'], strrpos($_FILES['upload']['name'], '.') + 1));
    echo "Your file extension is: ".$extension;

    // errors
    $error = array ();
    if(in_array($extension, $allowedextensions) === false){
	    $error[] = 'This is not an image, upload is allowed only for images.';
    }
    if($_FILES['upload']['size'] > 10000000){
        $error[]='The file exceeded the upload limit';
    }

    if(empty($error)){
        move_uploaded_file($_FILES['upload']['tmp_name'], "../uploadedfiles/{$_FILES['upload']['name']}");
    }
  }

   if (isset($error)){
       if (empty($error)){
           echo '<a href="../uploadedfiles/' . $_FILES['upload']['name'] . '">Check file</a>';

       } else {
           foreach ($error as $err){
               echo $err;
           }

       }
   }

  ?>
<div>

   <form action="" method="POST" enctype="multipart/form-data">
       <input type="file" name="upload" /></br>
       <input  type="submit" value="submit" />
   </form>
  <?php

  include "footer.php";
 ?>