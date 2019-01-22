// Модуль для отрисовки пина и взаимодействия с ним

(function(){
  // Функция, которая coздает и рисует пины
  var createAndDrawPins = function(data){
    var mapPinButtonTemplate = document.querySelector('template').content.querySelector('.map__pin');
    var mapPins = [];
    for(var i = 0; i < data.length; i++){
      var mapPinButton = mapPinButtonTemplate.cloneNode(true);
      var image = mapPinButton.querySelector('img');
      var imageWidth = image.getAttribute('width');
      var imageHeight = image.getAttribute('height');
      var trueX = data[i].location.x - (0.5 * imageWidth);
      var trueY = data[i].location.y - imageHeight;
      mapPinButton.style.left = trueX + 'px';
      mapPinButton.style.top = trueY + 'px';
      mapPinButton.style.display = 'none';
      image.setAttribute('src', data[i].author.avatar);
      mapPins.push(mapPinButton);
    };

    var mapPinsList = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    for(var k = 0; k < mapPins.length; k++){
      fragment.appendChild(mapPins[k]);
    }
    mapPinsList.appendChild(fragment);
  };

  window.backend.load(function(response){
    createAndDrawPins(response);
  }, function(string){
    alert(string);
  });

})();