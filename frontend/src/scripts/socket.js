socket.onopen = function() {
  console.log('Соединение установлено.');
  sendOnServer('name', name);
};

socket.onclose = function(event) {
  if (event.wasClean) {
    console.log('Соединение закрыто чисто');
  } else {
    console.log('Обрыв соединения');
  }
  console.log('Код: ' + event.code + ' причина: ' + event.reason);
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
    case 'history':
      message.payload.forEach(element => addNewMessage(element));
      return;
  }
};

socket.onerror = function(error) {
  console.log('Ошибка ' + error.message);
};
