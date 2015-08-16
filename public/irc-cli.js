var socket = io();
socket.on('chat messages', function(msg){
  //$('#messages').append($('<li>').text(msg));
  var newRow = document.createElement("tr");
  var timestamp = document.createElement("td");
  var fromNode = document.createElement("td");
  var messageNode = document.createElement("td");
  var fromText = document.createTextNode(msg['from'] || msg['nick']);
  var messageText = document.createTextNode(msg['message']);
  newRow.appendChild(timestamp);
  timestamp.appendChild(document.createTextNode(new Date().toLocaleTimeString()));
  newRow.appendChild(fromNode);
  fromNode.appendChild(fromText);
  newRow.appendChild(messageNode);
  messageNode.appendChild(messageText);
  document.getElementById("messages").appendChild(newRow);
});

function processForm(e) {
  if (e.preventDefault) e.preventDefault();
  socket.emit('chat message', { nick: document.getElementById("nick").value, message: document.getElementById('message').value });
  document.getElementById('message').value = "";
  return false;
}

var form = document.getElementById('irc-messages');

if (form.attachEvent) {
  form.attachEvent("submit", processForm);
} else {
  form.addEventListener("submit", processForm);
}

form.style.paddingTop = form.offsetHeight
