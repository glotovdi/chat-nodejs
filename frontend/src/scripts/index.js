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
  el.innerHTML = `<li><h3>${message.name}</h3><div>${message.message.date.toHHMMSS()} ${
    message.message.text
  }</div></li>`;
  messages.appendChild(el);
}

String.prototype.toHHMMSS = function() {
  var sec_num = parseInt(this, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return hours + ':' + minutes + ':' + seconds;
};
