var cinema = new Firebase('http://demo.firebase.com/sharedcinema/kevin_demo/cinema');
var queue = new Firebase('http://demo.firebase.com/sharedcinema/kevin_demo/cinema/queue');

$(document).ready(function () {
  $('#new_debug').click(function() {
    debug.log($('#debug_this').val());
  });

  debug.log('Debug Console launched.');

  var queueQuery = queue.limit(3);
  //create the queue
  queueQuery.on('value', function(snapshot) {
    var q = snapshot.val();
    console.log("this is the queue:");
    console.log(q);
//    $('#rankedQueue').
    
  });

  $('#submit-new-video').click(function() {
    var titleEl = $('#new-video-title');
    var youtubeEl = $('#new-video-id');

    queueVideo(titleEl.val(), youtubeEl.val());

    titleEl.val('');
    youtubeEl.val('');
  });

  $('.upvote').click(function(e) {
    console.log(this);
  });

});


cinema.on('value', function(snapshot) {
  var c = snapshot.exportVal();
  debug.log("cinema updated:");
  debug.log(snapshot.exportVal());
  printWholeQueue(c.queue);
});

function queueVideo(title, youtube_id) {
  var queueItem = queue.push({'title': title, 'youtube_id': youtube_id, 'votes': 1}, function(successful) {
    if (successful) {
      queueItem.setPriority(1);
    }
  });
}

function upvoteVideo(item_id, current_priority) {
  var itemRef = new Firebase('http://demo.firebase.com/sharedcinema/kevin_demo/cinema/queue/' + item_id);

  itemRef.setPriority(current_priority + 1);
}

function printWholeQueue(queue) {
  var queueHandle = $('#completeQueue');
  for (key in queue) {
    var item = queue[key];
    var html = '<li><a href="#" class="upvote" data-index="' + item.key + '" data-votes="' + item['.priority'] + '" >+1</a>&nbsp;&nbsp;';
    html += '(' + item['.priority'] +')&nbsp;&nbsp;';
    html += '<a href="http://www.youtube.com/watch?v=' + item.youtube_id + '">' + item.title + '</a> </li>';
    queueHandle.append(html);
  }
}


