(function() {
  var _db_log = function(msg) {
    if (msg && typeof(msg) == 'string') { //ignore empty and non-string messages
      var db_console = document.getElementById('debug-console');
      var db_messages = document.getElementById('debug-message-history');

      var newEl = document.createElement('div');
      newEl.setAttribute('class', 'debug-message');

      var timeSpan = document.createElement('span');
      timeSpan.setAttribute('class', 'db');
      timeSpan.setAttribute('class', 'timestamp');

      var msgTime = new Date();
      var hours = msgTime.getHours();
      var meridian = hours > 12 ? "PM" : "AM";
      var normal_hours = (hours % 12) || 12;
      var timeStr = (normal_hours < 10 ? "0" : "") + normal_hours;
      timeStr += ":" + msgTime.getMinutes();
      var seconds = msgTime.getSeconds();
      timeStr += ":" + (seconds>9?'':'0') + seconds;
      timeStr += " " + meridian;

      var timeNode = document.createTextNode(timeStr);
      timeSpan.appendChild(timeNode);

      newEl.appendChild(timeSpan);

      var newText = document.createTextNode(msg);

      newEl.appendChild(newText);
      db_messages.appendChild(newEl);
      db_messages.scrollTop = db_messages.scrollHeight;
      db_console.scrollTop = db_console.scrollHeight;

    }
  };

  window.debug = {
    log: _db_log,
    storage: { },
  };

})();

