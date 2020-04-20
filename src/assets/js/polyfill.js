if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}
(function (e) {
  e.closest = e.closest || function (css) {
      var node = this;

      while (node) {
          if (node.matches(css)) return node;
          else node = node.parentElement;
      }
      return null;
  }
})(Element.prototype);
if (!Element.prototype.matches) {
  Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function (s) {
          var matches = (this.document || this.ownerDocument).querySelectorAll(s),
              i = matches.length;
          while (--i >= 0 && matches.item(i) !== this) { }
          return i > -1;
      };
}
(function (arr) {
  arr.forEach(function (item) {
      if (item.hasOwnProperty('append')) {
          return;
      }
      Object.defineProperty(item, 'append', {
          configurable: true,
          enumerable: true,
          writable: true,
          value: function append() {
              var argArr = Array.prototype.slice.call(arguments),
                  docFrag = document.createDocumentFragment();

              argArr.forEach(function (argItem) {
                  var isNode = argItem instanceof Node;
                  docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
              });

              this.appendChild(docFrag);
          }
      });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);