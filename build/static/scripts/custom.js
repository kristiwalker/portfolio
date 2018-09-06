/*jshint esversion: 6 */

var request = new XMLHttpRequest();
request.open('GET', 'static/assets/data/portfolio-items.json', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var portfolioItems = JSON.parse(request.responseText);
    //
    // for (var item in portfolioItems) {
    //     var object = portfolioItems[item];
    //     console.log(object.type);
    //
    // }

    const markup = `${portfolioItems.map((item, i) =>
        `<li class="portfolio-item">
           <ul class="portfolio-item-type">
               <li>${item.type}</li>
           </ul>
           <p class="portfolio-item-head">
               <a href="${item.url}"><span>${item.head}</span></a>
           </p>
           <p class="portfolio-item-sub">${item.sub}</p>
       </li>`
     ).join('')}`;

    document.querySelector('.portfolio').innerHTML = markup;


  } else {
    // We reached our target server, but it returned an error
  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();
