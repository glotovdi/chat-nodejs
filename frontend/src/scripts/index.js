function clientsRender(clients) {
  var content = '';
  clients.forEach(element => {
    content += `<li>${element.name ? element.name : ''}</li>`;
  });
  usersList.innerHTML = content;
  clients_header.innerHTML = `Участники (${clients.length})`;
}

function sendOnServer(type, payload) {
  socket.send(JSON.stringify({ type, payload }));
}

function addNewMessage(message) {
  var el = document.createElement('div');
  el.innerHTML = `<li><h3 class="message_nickname">${message.name}</h3><div>${message.message.date.toHHMMSS()} ${
    message.message.text
  }</div></li>`;
  messages.appendChild(el);
}
