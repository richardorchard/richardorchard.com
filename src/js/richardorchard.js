
(function () {



  function shuffleArray(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }


  function loadJSON(callback, urlOfJson) {

    let request = new XMLHttpRequest();
    request.overrideMimeType("application/json");
    request.open('GET', urlOfJson, true);
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == "200") {
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        callback(request.responseText);
      }
    };
    request.send(null);
  }




  loadJSON(function (response) {
    // Parse JSON string into object
    let imageData = JSON.parse(response);
    createImageGrid(imageData);

  }, "images.json");



  let grid = document.querySelector('.grid');



  function createImageGrid(imageData) {

    let images = shuffleArray(imageData.images);
    let numberOfImages = images.length;


    for (let index = 0; index < numberOfImages; index++) {

      let div = document.createElement("Div");
      div.className = 'grid-item';

      let img = document.createElement('img');
      img.src = images[index].src;
      img.alt = images[index].description;
      img.title = images[index].description;

      img.onmouseover = function () {
        description.innerHTML = (img.title);
      }

      div.appendChild(img);

      grid.appendChild(div);
    }

  }





  imagesLoaded( grid, function() {
    // init Isotope after all images have loaded
    msnry = new Masonry( grid, {
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true
    });
  });




}());
