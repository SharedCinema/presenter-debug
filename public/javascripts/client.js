$(document).ready(function () {
  $('#new_debug').click(function() {
    window.debug.log($('#debug_this').val());
  });

  window.debug.log('Debug Console launched.');
});
