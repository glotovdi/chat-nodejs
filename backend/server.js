var WebSocketServer = new require('ws');

// подключенные клиенты
var clients = [];
var history = [];
// WebSocket-сервер на порту 8081
var webSocketServer = new WebSocketServer.Server({
  port: 8081
});
webSocketServer.on('connection', function(ws) {
  var id = Math.random();
  clients.push({ id: id, ws: ws });
  broadcast('updateClients', clients);
  ws.send(JSON.stringify({ type: 'history', payload: history }));
  ws.on('message', function(message) {
    message = JSON.parse(message);
    switch (message.type) {
      case 'name':
        setName(id, message.payload);
        return;
      case 'addNewMessage':
        sendMessage(id, message.payload);
        return;
      case 'addImage':
        addImage(id, message.payload);
        return;
    }
  });

  ws.on('close', function() {
    var index = clients.findIndex(client => client.id === id);
    clients.splice(index, 1);
    broadcast('updateClients', clients);
  });
});

function broadcast(type, payload) {
  clients.forEach(client => client.ws.send(JSON.stringify({ type: type, payload })));
}

function setName(id, payload) {
  clients.find(client => client.id === id).name = payload;
  broadcast('updateClients', clients);
}
function addImage(id, payload) {
  clients.find(client => client.id === id).image = payload;
  broadcast('updateClients', clients);
}

function sendMessage(id, payload) {
  var sourceClientName = clients.find(client => client.id === id);
  var message = { ...sourceClientName, message: payload };
  history.push(message);
  broadcast('newMessage', message);
}
