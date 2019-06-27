sendBtn.addEventListener('click', () => {
  if (!textarea.value) {
    return;
  }
  sendOnServer('addNewMessage', { date: new Date(), text: trim(textarea.value) });
  textarea.value = '';
});

sendPhoto.addEventListener('click', () => {
  const data = image.getAttribute('src');
  if (!data) {
    fileLoadPopup.hide();
    return;
  }
  sendOnServer('addImage', image.getAttribute('src'));
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
  socket.send(JSON.stringify({ type: 'name', payload: trim(nickname.value) }));
  authPopup.hide();
  container.show();
});

loadPhoto.addEventListener('click', () => {
  fileLoadPopup.show();
});

cancel_button.addEventListener('click', () => fileLoadPopup.hide());

sendOnEnter(textarea, sendBtn);
sendOnEnter(nickname, authBtn);
