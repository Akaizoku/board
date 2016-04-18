$(function () {
  "use strict";
  // Cache of DOM
  var $board = $('#board');
  var $refresh = $('#refresh');
  var $discard = $('#discard');
  var $save = $('#save');
  var $alert = $('#alert');
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
  // Alert user of errors
  function errorReport(error) {
    // TODO mustache alert
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
    request.done(function (response) {
      displayContent(response);
    });
    // Else if request failed
    request.fail(function (error) {
      console.log(error);
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
    request.done(function (response) {
      if (response) console.log('Data successfully committed.');
      else console.log("Error.");
    });
    request.fail(function (error) {
      console.log(error);
    });
  }
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
