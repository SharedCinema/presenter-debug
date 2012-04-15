var fire = new Firebase('http://demo.firebase.com/sharedcinema');

$(document).ready(function () {
  $('#new_debug').click(function() {
    debug.log($('#debug_this').val());
  });

  debug.log('Debug Console launched.');

});


fire.on('value', function(snap) {
  debug.log("firebase updated:");
  debug.log(snap.exportVal());
});


