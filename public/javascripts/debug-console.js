(function() {
  function array_to_str(arr) {
    if (typeof(arr) != 'array') return 'Error: non-array passed to array_to_str';

    var len = arr.length;
    var output = "[ ";
    for(var i = 0; i < len; ++i) {
      var item = arr[i];
      switch(typeof(item)) {
        case 'string':
          output += item;
          break;
        case 'number':
          output += item.toString();
          break;
        case 'object':
          output += obj_to_str(item);
          break;
        case 'array':
          output += array_to_str(item);
          break;
        default:
          console.log("Array contains something other than a string, array or object");
          console.log(obj[item]);
          continue;
      }
      output += ", ";
    }
    output += "] ";
    return output;
  }

  function obj_to_str(obj) {
    if (typeof(obj) != 'object') return 'Error: non-object passed to obj_to_str';
    var output = "{ ";
    for(item in obj) {
      output += item + ": ";
      switch(typeof(obj[item])) {
        case 'string':
          output += obj[item];
          break;
        case 'number':
          output += obj[item].toString();
          break;
        case 'object':
          output += obj_to_str(obj[item]);
          break;
        case 'array':
          output += array_to_str(obj[item]);
          break;
        default:
          console.log("Object item is something other than a string, array or object");
          console.log(obj[item]);
          continue;
      }
    }
    output += '} ';
    return output;
  }

  var _db_log = function(msg) {
    var log_message = null;
    switch(typeof(msg)) {
      case 'string':
        log_message = msg;
        break;
      case 'number':
        log_message = msg.toString();
        break;
      case 'object':
        log_message = obj_to_str(msg);
        break;
      case 'array':
        log_message = array_to_str(msg);
        break;
      default:
        console.log("Debugger sent something other than a string, object or array");
        console.log(msg);
        break;
    }

    if (log_message) {
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

      var newText = document.createTextNode(log_message);

      newEl.appendChild(newText);
      db_messages.appendChild(newEl);
      db_messages.scrollTop = db_messages.scrollHeight;
    }

  };

  window.debug = {
    log: _db_log,
    storage: { },
  };

})();

