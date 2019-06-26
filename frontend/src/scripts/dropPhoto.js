dropZone.addEventListener('dragover', function(e) {
  e.stopPropagation();
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
});

dropZone.addEventListener('drop', function(e) {
  e.stopPropagation();
  e.preventDefault();
  var files = e.dataTransfer.files;
  for (var i = 0, file; (file = files[i]); i++) {
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
