<?php 
$url = $_SERVER['REQUEST_URI'];

$strings = explode('/', $url);

$current_page = end($strings);

$dbname = 'equipment';
$dbuser = 'root';
$dbpass = '';
$dbserver = 'localhost';
?>