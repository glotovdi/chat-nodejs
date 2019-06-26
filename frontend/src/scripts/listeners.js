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
  if (!nickname.value) {
    return;
  }
  socket.send(JSON.stringify({ type: 'name', payload: nickname.value }));
  closeUploadPhotoPopUp();
  container.style.display = 'block';
});

loadPhoto.addEventListener('click', () => {
  fileLoadPopup.style.display = 'block';
});
cancel_button.addEventListener('click', () => closeUploadPhotoPopUp());

function closeUploadPhotoPopUp() {
  authPopup.style.display = 'none';
}
