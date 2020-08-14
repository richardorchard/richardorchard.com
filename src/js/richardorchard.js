
function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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


function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'images.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}




loadJSON(function (response) {
    // Parse JSON string into object
    let imageData = JSON.parse(response);
    createImageGrid(imageData);

});




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



var msnry = new Masonry(grid, {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true
});

imagesLoaded(grid).on('progress', function () {
    msnry.layout();
});