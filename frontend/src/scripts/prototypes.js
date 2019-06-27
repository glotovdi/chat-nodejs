Element.prototype.hide = function() {
  this.style.display = 'none';
};
Element.prototype.show = function() {
  this.style.display = 'block';
};
String.prototype.toHHMMSS = function() {
  const dateNow = new Date(this);

  return `${checkTime(dateNow.getHours())}:${checkTime(dateNow.getMinutes())}:${checkTime(dateNow.getSeconds())}`;
};
