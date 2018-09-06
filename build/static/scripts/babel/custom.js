"use strict";

/*jshint esversion: 6 */
var request = new XMLHttpRequest();
request.open('GET', 'static/assets/data/portfolio-items.json', true);

request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var portfolioItems = JSON.parse(request.responseText); // for (var item in portfolioItems) {
    //     document.querySelector('.portfolio-item-head a span').innerHTML = portfolioItems[item].head;
    //     console.log('test');
    // }

    var markup = "\n    <li class=\"portfolio-item\">\n        <ul class=\"portfolio-item-type\">\n            <li>".concat(portfolioItems.type, "</li>\n        </ul>\n        <p class=\"portfolio-item-head\">\n            <a href=\"\"><span>Headline goes here and is no longer than two lines</span></a>\n        </p>\n        <p class=\"portfolio-item-sub\">The description of the story goes here and should be no more than one sentence, three lines.</p>\n    </li>\n    ");
    console.log(markup);
    document.querySelector('.portfolio').innerHTML = markup;
  } else {// We reached our target server, but it returned an error
  }
};

request.onerror = function () {// There was a connection error of some sort
};

request.send();