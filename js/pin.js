// Модуль для отрисовки пина и взаимодействия с ним

(function(){
  var mapPinButtonTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var mapPinsList = document.querySelector('.map__pins');

  // Функция, которая возвращает массив пинов из массива данных data
  var createMapPins = function(data){
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
      image.setAttribute('src', data[i].author.avatar);
      mapPins.push(mapPinButton);
    };
    return mapPins
  };

  var mapPins = createMapPins(window.data);

  // Функция, которая отрисовывает пины mapPins на карте
  var drawMapPins = function(mapPins){
    var fragment = document.createDocumentFragment();
    for(var i = 0; i < mapPins.length; i++){
      fragment.appendChild(mapPins[i]);
    }
    mapPinsList.appendChild(fragment);
  };
  drawMapPins(mapPins);

  // Скрываем все пины
  window.pin = {
    mapPinCollection : document.querySelectorAll('.map__pin')
  };
  
  for(var i = 1; i < window.pin.mapPinCollection.length; i++){
    window.pin.mapPinCollection[i].style.display = 'none';
  };

})();