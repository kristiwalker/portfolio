/*jshint esversion: 6 */

const request = new XMLHttpRequest();
request.open("GET", "assets/data/portfolio-items.json", true);

request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var portfolioItems = JSON.parse(request.responseText);

    const markup = `${portfolioItems
      .map(
        (item) =>
          `<li class="portfolio-item">
           <ul class="portfolio-item-type">
            <li>${item.types}</li>
           </ul>
           <p class="portfolio-item-head">
               ${
                 item.url.length
                   ? `<a href="${item.url}" onclick="trackOutboundLink('${item.url}); return false;" target="_blank"><span>${item.head}</span></a>`
                   : `${item.head}`
               }
           </p>
           <p class="portfolio-item-sub">${item.sub}</p>
       </li>`
      )
      .join("")}`;

    document.querySelector(".portfolio").innerHTML = markup;
  }
};

request.send();
