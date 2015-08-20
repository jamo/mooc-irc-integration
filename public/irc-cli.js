var socket = io();
socket.on('chat messages', function(msg){
  //$('#messages').append($('<li>').text(msg));
  var newRow = document.createElement("tr");
  var timestamp = document.createElement("td");
  var fromNode = document.createElement("td");
  var messageNode = document.createElement("td");
  var fromText = document.createTextNode(msg['from'].slice(0,10));
  var messageText = document.createTextNode(msg['message']);
  var timestampText = document.createTextNode(msg['timestamp']);
  newRow.appendChild(timestamp);

  timestamp.appendChild(timestampText);
  newRow.appendChild(fromNode);
  fromNode.appendChild(fromText);
  newRow.appendChild(messageNode);
  messageNode.appendChild(messageText);
  document.getElementById("messages").appendChild(newRow);
});

function processForm(e) {
  if (e.preventDefault) e.preventDefault();
  socket.emit('chat message', { from: document.getElementById("nick").value, message: document.getElementById('message').value });
  document.getElementById('message').value = "";
  return false;
}

var form = document.getElementById('irc-messages-form');

if (form.attachEvent) {
  form.attachEvent("submit", processForm);
} else {
  form.addEventListener("submit", processForm);
}

form.style.paddingTop = form.offsetHeight
