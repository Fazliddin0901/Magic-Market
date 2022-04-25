module.exports = function (html, obj) {
  let out = html.replace("{image}", obj.image);
  out = out.replace("{productName}", obj.productName);
  out = out.replace("{price}", obj.price);
  out = out.replace("{buyed}", obj.buyed);
  out = out.replace("{category}", obj.category);
  out = out.replace("{id}", obj.id);
  out = out.replace("{reyting}", obj.reyting);
  out = out.replace("{description}", obj.description);
  return out;
};
