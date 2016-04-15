<?php
  $host = "localhost";
  $database = "board";
  $username = "root";
  $password = "root";
  try {
    $dbh = new PDO("mysql:host=$host;dbname=$database", $username, $password);
    $dbh -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  } catch (PDOException $e) {
    print "Erreur de connexion.<br>".$e->getMessage()."<br/>";
    die();
  }
?>
