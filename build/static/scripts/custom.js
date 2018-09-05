var request = new XMLHttpRequest();
request.open('GET', 'static/assets/data/portfolio-items.json', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var portfolioItems = JSON.parse(request.responseText);

    for (var item in portfolioItems) {
        document.querySelector('.portfolio-item-head a span').innerHTML = portfolioItems[item].head;
        console.log('test');
    }

  } else {
    // We reached our target server, but it returned an error
  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();
