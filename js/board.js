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
    // TODO show text only with active markup
    // FAILED activate cove view before insert then toggle off
    $(".btn-codeview").click();
    $board.summernote('editor.insertText', content);
    $(".btn-codeview").click();
  }
  // Reset content
  function resetContent() {
    $board.summernote('reset');
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
  // Initialisation
  $board.summernote({
    minHeight: 100, // minimum size
    focus: true // focus after init
  });
  getContent();
  // Commit changes
  $save.click(function(e) {
    e.preventDefault();
    var content = $board.summernote('code');
    postContent(content);
  });
  // Discard last changes
  $discard.click(function(e) {
    e.preventDefault();
    displayContent();
  });
  // Refresh content to lastest commit
  $refresh.click(function (e) {
    e.preventDefault();
    // displayContent();
    $(".btn-codeview").click();
  });
});
