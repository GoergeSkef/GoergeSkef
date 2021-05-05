<!DOCTYPE html>
<html>
<head>
	<title>
		The Adventure Club.
	</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link href="https://fonts.googleapis.com/css?family=Cormorant+Garamond:300,300i,400,400i,500,500i,600" rel="stylesheet">	
	<link href="https://fonts.googleapis.com/css?family=Lato:300,400,400i,700,900" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Roboto+Slab:100" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Amatic+SC|Playfair+Display|Cormorant+Garamond|Shadows+Into+Light" rel="stylesheet">
</head>
	<?php include 'config.php'; ?>
<body>
<div class="pagecontainer">

<?php include 'visitor_header.php'; ?>



<div>
<p class="imgtxt">All pictures taken by our members . </p>

<?php
$folderpath = 'gallery/'; 
$num_files = glob($folderpath . "*.{JPG,jpg,gif,png,bmp}", GLOB_BRACE);
$foldername = opendir($folderpath);

if($num_files > 0)
{
 while(false !== ($file = readdir($foldername))){
  $filepath = $folderpath.$file;
  $extension = strtolower(pathinfo($file ,PATHINFO_EXTENSION));
  if($extension=='jpg' || $extension =='png' || $extension == 'gif' || $extension == 'bmp')
  {
?>

<a href="<?php echo $filepath; ?>"><img src="<?php echo $filepath; ?>"  height="250" /></a>
<?php
  }
 }
}
else
{
 echo "empty folder";
}
closedir($foldername);
?>




<footer class="footerv">
	<?php include 'visitor_footer.php'; ?>
</footer>
</div>

</body>
</html>