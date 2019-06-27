function checkTime(i) {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}
function trim(string) {
  return string.replace(/(<([^>]+)>)/gi, '');
}

function sendOnEnter(source, target) {
  source.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      target.click();
    }
  });
}
