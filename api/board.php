<?php
  require("../includes/connect.php");
  // Declare variables
  $board = "public";
  // Post data
  function setContent($dbh, $board, $content) {
    $sql = "UPDATE board
            SET content = ?
            WHERE user = ?;";
    $query = $dbh -> prepare($sql);
    echo $query -> execute(array($content, $board));
  }
  // Get data
  function getContent($dbh, $board) {
    $sql = "SELECT content
            FROM board
            WHERE user = ?";
    $query = $dbh -> prepare($sql);
    $query -> execute(array($board));
    $res = $query -> fetch(PDO::FETCH_OBJ);
    $content = $res -> content;
    echo $content;
  }
  // Post request follow-up
  if (isset($_POST['content'])) {
    $content = $_POST['content'];
    return setContent($dbh, $board, $content);
  }
  // Get request
  if (isset($_GET['content'])) {
    return getContent($dbh, $board);
  }
?>
