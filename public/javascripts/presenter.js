var fire = new Firebase('http://demo.firebase.com/sharedcinema');
var cinema = new Firebase('http://demo.firebase.com/sharedcinema/kevin_demo/cinema');
var queue = new Firebase('http://demo.firebase.com/sharedcinema/kevin_demo/cinema/queue');

$(document).ready(function () {
  $('#new_debug').click(function() {
    debug.log($('#debug_this').val());
  });

  debug.log('Debug Console launched.');

  var queueQuery = queue.limit(10);
  //create the queue
  queueQuery.on('value', function(snapshot) {
    var q = snapshot.val();
    console.log("this is the queue:");
    console.log(q);
//    $('#rankedQueue').
  });

  $('#submit-new-video').click(function() {
    var title = $('#new-video-title').val();
    var youtube = $('#new-video-id').val();

    queueVideo(title, youtube);

  });


});


fire.on('value', function(snap) {
  console.log(snap);
  console.log(snap.exportVal());
});


cinema.on('value', function(snapshot) {
  var c = snapshot.val();
  console.log("cinema snapshot:");
  console.log(c)
  console.log(snapshot.exportVal());
  debug.log("cinema updated:");
  debug.log(snapshot.exportVal());

});

function queueVideo(title, youtube_id) {
  var queueItem = queue.push({'title': title, 'youtube_id': youtube_id, 'votes': 1}, function(successful) {
    if (successful) {
      queueItem.setPriority(1);
    }
  });
}


