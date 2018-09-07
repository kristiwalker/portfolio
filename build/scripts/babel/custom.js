"use strict";

/*jshint esversion: 6 */
var request = new XMLHttpRequest();
request.open('GET', 'static/assets/data/portfolio-items.json', true);

request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var portfolioItems = JSON.parse(request.responseText); //
    // for (var item in portfolioItems) {
    //     var object = portfolioItems[item];
    //     console.log(object.type);
    //
    // }

    var markup = "".concat(portfolioItems.map(function (item, i) {
      return "<li class=\"portfolio-item\">\n           <ul class=\"portfolio-item-type\">\n               <li>".concat(item.type, "</li>\n           </ul>\n           <p class=\"portfolio-item-head\">\n               <a href=\"").concat(item.url, "\"><span>").concat(item.head, "</span></a>\n           </p>\n           <p class=\"portfolio-item-sub\">").concat(item.sub, "</p>\n       </li>");
    }).join(''));
    document.querySelector('.portfolio').innerHTML = markup;
  } else {// We reached our target server, but it returned an error
  }
};

request.onerror = function () {// There was a connection error of some sort
};

request.send();