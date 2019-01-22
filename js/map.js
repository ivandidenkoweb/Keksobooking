// модуль, который работает с картой

(function(){
  var mainMapPin = document.querySelector('.map__pin--main');
  
  // При поднятии кнопки мышки на главном пине открываеться карта с пинами и включаеться форма
  mainMapPin.addEventListener('mouseup', function(){
    window.card.map.classList.remove('map--faded');
    window.form.noticeForm.classList.remove('notice__form--disabled');
    var mapPinCollection = document.querySelectorAll('.map__pin');
    var mapCards = document.querySelectorAll('.map__card');
    var popupClose = document.querySelectorAll('.popup__close');

    for(var i = 1; i < mapPinCollection.length; i++){
      mapPinCollection[i].style.display = 'block';
    };
    for(var j = 0; j < window.form.noticeFormFieldsets.length; j++){
      window.form.noticeFormFieldsets[j].removeAttribute('disabled');
    };

    // Функция, которая срабатывает при нажатии на пин
    var onButtonMapPinClick = function(button, n){
      button.addEventListener('click', function(){
        var mapPinActive = document.querySelector('.map__pin--active');
        if(mapPinActive != null){
          mapPinActive.classList.remove('map__pin--active');
        }; 
        button.classList.add('map__pin--active');
        for(var k = 0; k < mapCards.length; k++){
          mapCards[k].style.display = 'none';
        };
         mapCards[n - 1].style.display = 'block';
        document.addEventListener('keydown', function(evt){
          if (evt.keyCode === 27){
            mapCards[n -1].style.display = 'none';
            button.classList.remove('map__pin--active');
          }
          if (evt.keyCode === 13){
            mapCards[n -1].style.display = 'none';
            button.classList.remove('map__pin--active');
          }
        });
      });
    };

    for(var n = 1; n < mapPinCollection.length; n++){
      var button = mapPinCollection[n];
      onButtonMapPinClick(button, n);
    };

    // Функция, которая срабатывает при нажатии на кнопку закрытия карточки
    var onButtonPopupCloseClick = function(button, a){
      button.addEventListener('click', function(){
        mapCards[a].style.display = 'none';
        mapPinCollection[a + 1].classList.remove('map__pin--active');
      });
    };

    for(var a = 0; a < popupClose.length; a++){
      var button = popupClose[a];
      onButtonPopupCloseClick(button, a);
    };
  });

  // Даем возможность перемещаться главному пину
  var mainMapPinImage = mainMapPin.querySelector('img');
  mainMapPinImage.setAttribute('draggable', 'true');

  mainMapPin.addEventListener('mousedown', function(evt){
    evt.preventDefault();

    var address = document.querySelector('#address');

    address.value = 'x: ' + 600 + ' , y: ' + 425;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function(moveEvt){
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var x = parseInt(mainMapPin.style.left);
      var y = parseInt(mainMapPin.style.top) + 50;

      if(parseInt(mainMapPin.style.top) < 100){
        y = 150;
        mainMapPin.style.top = 100 + 'px';
      } else if(parseInt(mainMapPin.style.top) > 500){
        y = 550;
        mainMapPin.style.top = 500 + 'px';
      }

      mainMapPin.style.zIndex = 1000;
      mainMapPin.style.top = (mainMapPin.offsetTop - shift.y) + 'px';
      mainMapPin.style.left = (mainMapPin.offsetLeft - shift.x) + 'px';
      address.value = 'x: ' + x + ' , y: ' + y;
    };

    var onMouseUp = function(upEvt){
      upEvt.preventDefault();

      window.card.map.removeEventListener('mousemove', onMouseMove);
      window.card.map.removeEventListener('mouseup', onMouseUp);
    };

    window.card.map.addEventListener('mousemove', onMouseMove);
    window.card.map.addEventListener('mouseup', onMouseUp);
  });
})();