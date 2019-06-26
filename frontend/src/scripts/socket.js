socket.onopen = function() {
  console.log('Соединение установлено.');
  sendOnServer('name', name);
};

socket.onclose = function(event) {
  if (event.wasClean) {
    alert('Соединение закрыто чисто');
  } else {
    alert('Обрыв соединения');
  }
  alert('Код: ' + event.code + ' причина: ' + event.reason);
};

socket.onmessage = function(event) {
  message = JSON.parse(event.data);
  switch (message.type) {
    case 'updateClients':
      clientsRender(message.payload);
      return;
    case 'newMessage':
      addNewMessage(message.payload);
      return;
  }
};

socket.onerror = function(error) {
  alert('Ошибка ' + error.message);
};
