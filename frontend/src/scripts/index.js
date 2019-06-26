var name = prompt('Ваше имя');

var socket = new WebSocket('ws://localhost:8081');
var button = document.querySelector('#add');
var clients_wrapper = document.querySelector('.clients_wrapper');
var chat = document.querySelector('.chat');
var textarea = document.querySelector('#text');
var name_wrapper = document.querySelector('#name');
var clients_header = document.querySelector('#clients_header');
socket.onopen = function() {
  console.log('Соединение установлено.');
  sendOnServer('name', name);
};
if (name) {
  name_wrapper.innerHTML = name;
}
socket.onclose = function(event) {
  if (event.wasClean) {
    alert('Соединение закрыто чисто');
  } else {
    alert('Обрыв соединения'); // например, "убит" процесс сервера
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

function clientsRender(clients) {
  var content = '';
  clients.forEach(element => {
    content += `<div>${element.name ? element.name : ''}</div>`;
  });
  clients_wrapper.innerHTML = content;
  clients_header.innerHTML = `Участники (${clients.length})`;
}

function sendOnServer(type, payload) {
  socket.send(JSON.stringify({ type, payload }));
}

function addNewMessage(message) {
  var el = document.createElement('div');
  el.innerHTML = `<h3>${message.name}</h3><div>${message.message}</div>`;
  chat.appendChild(el);
}

button.addEventListener('click', () => {
  if (!textarea.value) {
    return;
  }
  sendOnServer('addNewMessage', textarea.value);
});
var logo = document.getElementById('logo');

// Optional.   Show the copy icon when dragging over.  Seems to only work for chrome.
dropZone.addEventListener('dragover', function(e) {
  e.stopPropagation();
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
});

// Get file data on drop
dropZone.addEventListener('drop', function(e) {
  e.stopPropagation();
  e.preventDefault();
  var files = e.dataTransfer.files; // Array of all files

  for (var i = 0, file; (file = files[i]); i++) {
    if (file.type.match(/image.*/)) {
      var reader = new FileReader();

      reader.onload = function(e2) {
        // finished reading file data.
        var img = document.createElement('img');
        img.src = e2.target.result;
        logo.appendChild(img);
        logo.style.backgroundImage = e2.target.result;
      };

      reader.readAsDataURL(file); // start reading the file data.
    }
  }
});
