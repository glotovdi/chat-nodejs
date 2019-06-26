sendBtn.addEventListener('click', () => {
  if (!textarea.value) {
    return;
  }
  sendOnServer('addNewMessage', { date: new Date(), text: textarea.value });
  textarea.value = '';
});

sendPhoto.addEventListener('click', () => {
  const data = image.getAttribute('src');
  if (!data) {
    fileLoadPopup.hide();
    return;
  }
  avatarImage.src = image.getAttribute('src');
  avatarImage.style.width = `100%`;
  avatarImage.style.height = `100%`;
  avatarImage.show();
  avatarImage.parentElement.replaceChild(avatarImage, avatarImage.nextElementSibling);
  fileLoadPopup.hide();
});

authBtn.addEventListener('click', () => {
  if (!nickname.value) {
    return;
  }
  socket.send(JSON.stringify({ type: 'name', payload: nickname.value }));

  authPopup.hide();
  container.show();
});

loadPhoto.addEventListener('click', () => {
  fileLoadPopup.show();
});

cancel_button.addEventListener('click', () => fileLoadPopup.hide());
