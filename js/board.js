$(function() {
  'use strict';
  // Cache of DOM
  var $board    = $('#board'),
      $refresh  = $('#refresh'),
      $discard  = $('#discard'),
      $save     = $('#save'),
      $alert    = $('#alert');
  // Declaration of variables
  var request;
  // Add content
  function addContent(content) {
    $board.val(content);
  }
  // Reset content
  function resetContent() {
    $board.val('');
  }
  // Display Content
  function displayContent(content) {
    resetContent();
    addContent(content);
  }
  // Alert user of eventual errors
  function errorReport(error) {
    // TODO check if working properly
    Mustache.render($alert.html(), error);
  }
  // Get content from database
  function getContent() {
    // Clearing current request
    if (request) request.abort();
    // Define new request
    request = $.ajax({
      type: 'get',
      url: 'api/board.php',
      data: 'content'
    });
    // If data is received successfully
    request.done(function(response) {
      if (response) {
        displayContent(response);
        $board.focus();
      } else {
        var alert = {msg: "An error occured while fetching data form teh database: "+response};
        errorReport($alert.html(), alert);
      }
    });
    // Else if request failed
    request.fail(function(error) {
      var alert = {msg: error};
      errorReport(alert);
    });
  }
  // Post content to database
  function postContent(content) {
    if (request) request.abort();
    request = $.ajax({
      type: 'post',
      url: 'api/board.php',
      data: {'content': content}
    });
    // If query succeeded
    request.done(function(response) {
      if (response) {
        console.log('Data successfully committed.');
        $board.focus();
      } else {
        alert = {msg: "An error occurred: " + response};
        errorReport(alert);
      }
    });
    // Else if query failed
    request.fail(function(error) {
      alert = {msg: error};
      errorReport(alert);
    });
  }
  // Initialisation
  getContent();
  // Commit changes
  $save.click(function(e) {
    e.preventDefault();
    postContent($board.val());
  });
  // Discard last changes
  $discard.click(function(e) {
    e.preventDefault();
    getContent();
  });
  // Refresh content to lastest commit
  $refresh.click(function (e) {
    e.preventDefault();
    getContent();
  });
});
