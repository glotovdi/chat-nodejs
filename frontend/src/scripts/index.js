function clientsRender(clients) {
  var content = '';
  clients.forEach(element => {
    var elementHtml = `<li class="users_item"><img class="user_avatar" src="${element.image}">${
      element.name ? element.name : ''
    }</li>`;
    if (!element.image) {
      elementHtml = `<li class="users_item">${element.name ? element.name : ''}</li>`;
    }
    content += elementHtml;
  });
  usersList.innerHTML = content;
  clients_header.innerHTML = `Участники (${clients.length})`;
}

function sendOnServer(type, payload) {
  socket.send(JSON.stringify({
    type,
    payload
  }));
}

function addNewMessage(message) {
  console.log(message.image);
  var el = document.createElement('div');
  el.innerHTML = `<li class="message_item"><div class="img_wrapper"></div><h4 class="message_nickname">${
    message.name
  }</h4><div  class="time">${message.message.date.toHHMMSS()}</div><div> ${message.message.text}</div></li>`;
  if (message.image) {
    el.innerHTML = `<li class="message_item"><div class="img_wrapper"><img class="user_avatar_message" src="${
      message.image
    }"></div><h4 class="message_nickname">${
      message.name
    }</h4><div class="time">${message.message.date.toHHMMSS()}</div> <div>${message.message.text}</div></li>`;
  }
  messages.appendChild(el);
}