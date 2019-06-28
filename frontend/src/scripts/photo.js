dropZone.addEventListener('dragover', function(e) {
  stopDefaultEvents(e);
  e.dataTransfer.dropEffect = 'copy';
});

dropZone.addEventListener('drop', function(e) {
  stopDefaultEvents(e);
  var files = e.dataTransfer.files;
  for (var i = 0, file;
    (file = files[i]); i++) {
    console.log(file)
    if (file.type.match(/image.*/)) {
      var reader = new FileReader();

      reader.onload = function(e2) {
        image.src = e2.target.result;
        image.style.width = `100%`;
        image.style.height = `100%`;
        image.style.display = 'block';
      };

      reader.readAsDataURL(file);
    }
  }
});

function stopDefaultEvents(e) {
  e.stopPropagation();
  e.preventDefault();
}