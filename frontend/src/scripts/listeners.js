sendBtn.addEventListener('click', () => {
  if (!textarea.value) {
    return;
  }
  sendOnServer('addNewMessage', { date: new Date(), text: textarea.value });
  textarea.value = '';
});

sendPhoto.addEventListener('click', () => {
  avatarImage.src = image.getAttribute('src');
  avatarImage.style.width = `100%`;
  avatarImage.style.height = `100%`;
  avatarImage.style.display = 'block';
  avatarImage.parentElement.replaceChild(avatarImage, avatarImage.nextElementSibling);
  fileLoadPopup.style.display = 'none';
});

authBtn.addEventListener('click', () => {
  socket.send(JSON.stringify({ type: 'name', payload: nickname.value }));
  authPopup.style.display = 'none';
});

loadPhoto.addEventListener('click', () => {
  fileLoadPopup.style.display = 'block';
});
