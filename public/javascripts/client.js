var fire;

$(document).ready(function () {
  $('#new_debug').click(function() {
    debug.log($('#debug_this').val());
  });

  debug.log('Debug Console launched.');

  fire = new Firebase('http://demo.firebase.com/sharedcinema');

});
