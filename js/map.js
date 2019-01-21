// модуль, который работает с картой

(function(){
  var mainMapPin = document.querySelector('.map__pin--main');
  var popupClose = document.querySelectorAll('.popup__close');

  // При поднятии кнопки мышки на главном пине открываеться карта с пинами и включаеться форма
  mainMapPin.addEventListener('mouseup', function(){
    window.card.map.classList.remove('map--faded');
    window.form.noticeForm.classList.remove('notice__form--disabled');
    for(var i = 1; i < window.pin.mapPinCollection.length; i++){
    window.pin.mapPinCollection[i].style.display = 'block';
    };
    for(var i = 0; i < window.form.noticeFormFieldsets.length; i++){
    window.form.noticeFormFieldsets[i].removeAttribute('disabled');
    };
  });

  // При клике на пине открываеться соответсвующая карточкв
  var onButtonMapPinClick = function(button, i){
    button.addEventListener('click', function(){
      var mapPinActive = document.querySelector('.map__pin--active');
      if(mapPinActive != null){
        mapPinActive.classList.remove('map__pin--active');
      }; 
      button.classList.add('map__pin--active');
      for(var k = 0; k < window.card.mapCards.length; k++){
        window.card.mapCards[k].style.display = 'none';
      };
       window.card.mapCards[i - 1].style.display = 'block';
      document.addEventListener('keydown', function(evt){
        if (evt.keyCode === 27){
          window.card.mapCards[i -1].style.display = 'none';
          button.classList.remove('map__pin--active');
        }
        if (evt.keyCode === 13){
          window.card.mapCards[i -1].style.display = 'none';
          button.classList.remove('map__pin--active');
        }
      });
    });
  };

  for(var i = 1; i < window.pin.mapPinCollection.length; i++){
    var button = window.pin.mapPinCollection[i];
    onButtonMapPinClick(button, i);
  };

  // При клике на кнопке закрытия карточки она прячеться
  var onButtonPopupCloseClick = function(button, i){
    button.addEventListener('click', function(){
      window.card.mapCards[i].style.display = 'none';
      window.pin.mapPinCollection[i + 1].classList.remove('map__pin--active');
    });
  };

  for(var i = 0; i < popupClose.length; i++){
    var button = popupClose[i];
    onButtonPopupCloseClick(button, i);
  };

  // Даем возможность перемещаться главному пину
  var mainMapPinImage = mainMapPin.querySelector('img');
  mainMapPinImage.setAttribute('draggable', 'true');

  mainMapPin.addEventListener('mousedown', function(evt){
    evt.preventDefault();

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

      mainMapPin.style.zIndex = 1000;
      mainMapPin.style.top = (mainMapPin.offsetTop - shift.y) + 'px';
      mainMapPin.style.left = (mainMapPin.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function(upEvt){
      upEvt.preventDefault();
      var x = parseInt(mainMapPin.style.left);
      var y = parseInt(mainMapPin.style.top) + 50;

      // Ограничиваем возможность установки пина по Y от 100 до 500
      if(parseInt(mainMapPin.style.top) < 100){
        y = 150;
        mainMapPin.style.top = 100 + 'px';
      } else if(parseInt(mainMapPin.style.top) > 500){
        y = 550;
        mainMapPin.style.top = 500 + 'px';
      }

      // Выводим координаты на карте в поле адресса
      var address = document.querySelector('#address');
      address.value = 'x: ' + x + ' , y: ' + y;

      window.card.map.removeEventListener('mousemove', onMouseMove);
      window.card.map.removeEventListener('mouseup', onMouseUp);

    };

    window.card.map.addEventListener('mousemove', onMouseMove);
    window.card.map.addEventListener('mouseup', onMouseUp);
  });

})();