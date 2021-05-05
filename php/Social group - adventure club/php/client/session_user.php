<?php
session_start();
if (!isset($_SESSION['username'])) {
    header("indexv.php");
} ?>