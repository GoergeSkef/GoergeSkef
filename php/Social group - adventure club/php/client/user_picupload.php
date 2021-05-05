<?php include ('session_user.php'); ?>
<!DOCTYPE html>
<html>
<head>
	<title>
		The Adventure Club.
	</title>
	<link rel="stylesheet" type="text/css" href="../css/style.css">
	<link href="https://fonts.googleapis.com/css?family=Cormorant+Garamond:300,300i,400,400i,500,500i,600" rel="stylesheet">	
	<link href="https://fonts.googleapis.com/css?family=Lato:300,400,400i,700,900" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Roboto+Slab:100" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Amatic+SC|Playfair+Display|Cormorant+Garamond|Shadows+Into+Light" rel="stylesheet">
</head>
	<?php include '../config.php'; ?>
<body>
<div class="pagecontainer">

<?php include 'user_header.php' ?>






			
<h3 class="pagetitle">Upload pictures!</h3>

<p class="aboutpage">Feel free to upload pictures from your adventures to our shared gallery, which can be viewed here: <a href="visitor_gallery.php"> shared gallery</a></p>

	<div>                
	   <form action="" method="POST" enctype="multipart/form-data">
	       <input type="file" name="upload" /></br>
	       <input  type="submit" value="submit" />
	   </form>                   
	</div>

<?php

 
if (isset($_FILES['upload'])){  
    
    
    $allowedextensions = array('jpg', 'jpeg', 'gif', 'png');
    
  
    $extension = strtolower(substr($_FILES['upload']['name'], strrpos($_FILES['upload']['name'], '.') + 1));
    
    
    
    
     
    $error = array ();
    
    
    if(in_array($extension, $allowedextensions) === false){
    
        $error[] = 'This is not an image, upload is allowed only for images.';        
    }
    
     
    if($_FILES['upload']['size'] > 1000000){
        
        
        $error[]='The file is to big';
    }
    
    
    
    
    if(empty($error)){
        
        
        
        move_uploaded_file($_FILES['upload']['tmp_name'], "../../gallery/{$_FILES['upload']['name']}");     
    }else{
    	print_r(array_values($error));
    }
    
}

?>


<footer class="footerv">
	<?php include 'user_footer.php'; ?>
</footer>

</div>

</body>

</html>




