"use strict";

/*jshint esversion: 6 */
var request = new XMLHttpRequest();
request.open("GET", "assets/data/portfolio-items.json", true);

request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var portfolioItems = JSON.parse(request.responseText);
    var markup = "".concat(portfolioItems.map(function (item) {
      return "<li class=\"portfolio-item\">\n           <ul class=\"portfolio-item-type\">\n            <li>".concat(item.types, "</li>\n           </ul>\n           <p class=\"portfolio-item-head\">\n               ").concat(item.url.length ? "<a href=\"".concat(item.url, "\" onclick=\"trackOutboundLink('").concat(item.url, "); return false;\" target=\"_blank\"><span>").concat(item.head, "</span></a>") : "".concat(item.head), "\n           </p>\n           <p class=\"portfolio-item-sub\">").concat(item.sub, "</p>\n       </li>");
    }).join(""));
    document.querySelector(".portfolio").innerHTML = markup;
  }
};

request.send();