Element.prototype.hide = function() {
  this.style.display = 'none';
};
Element.prototype.show = function() {
  this.style.display = 'block';
};
String.prototype.toHHMMSS = function() {
  const date = new Date(this);

  return `${date.getHours()}:${date.getMinutes()}:${date.getMinutes()}`;
};
