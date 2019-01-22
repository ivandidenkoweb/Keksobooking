// Mодуль для отрисовки элемента на карточке

(function(){

    window.card = {
      map : document.querySelector('.map')
  };

  // Функция, которая возвращает карточку из обьекта cardObj
  var createAndDrawCards = function(data){
    var fragment = document.createDocumentFragment();
    for(var j = 0; j < data.length; j++){
      var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
      var mapCard = mapCardTemplate.cloneNode(true);
      var h3 = mapCard.querySelector('h3');
      var address = mapCard.querySelector('p > small');
      var price = mapCard.querySelector('.popup__price');
      var typeOfHousing = mapCard.querySelector('h4');
      var quantity = mapCard.querySelector('h4 + p');
      var timeOfStay = mapCard.querySelector('p:nth-of-type(4)');
      var popupFeatures = mapCard.querySelector('.popup__features');
      var description = mapCard.querySelector('p:nth-of-type(5)');
      var avatar = mapCard.querySelector('.popup__avatar');

      h3.textContent = data[j].offer.title;
      address.textContent = data[j].offer.address;
      price.innerHTML = data[j].offer.price + '&#x20bd;/ночь';
      typeOfHousing.textContent = (data[j].offer.type === 'flat') ? 'Квартира' :
                                  (data[j].offer.type === 'house') ? 'Дом' :
                                  'Бунгало';
      quantity.textContent =  ((data[j].offer.rooms > 1) && (data[j].offer.quests > 1)) ?
            data[j].offer.rooms + ' комнаты для ' + data[j].offer.quests + ' гостей' :
                              ((data[j].offer.rooms === 1) && (data[j].offer.quests === 1)) ?
            data[j].offer.rooms + ' комната для ' + data[j].offer.quests + ' гостя' :
                              ((data[j].offer.rooms > 1) && (data[j].offer.quests === 1)) ?
            data[j].offer.rooms + ' комнаты для ' + data[j].offer.quests + ' гостя' :
                              ((data[j].offer.rooms === 0) && (data[j].offer.quests === 1)) ?
            'Нету комнат для ' + data[j].offer.quests + ' гостя' :
                              ((data[j].offer.rooms === 0) && (data[j].offer.quests === 0)) ?
            'Нету комнат' :
                              ((data[j].offer.rooms === 0) && (data[j].offer.quests > 1)) ?
            'Нету комнат для ' + data[j].offer.quests + ' гостей' :
            data[j].offer.rooms + ' комната для ' + data[j].offer.quests + ' гостей';
      timeOfStay.textContent = 'Заезд после ' + data[j].offer.checkin + ', выезд до ' + data[j].offer.checkout;
      while (popupFeatures.firstChild) {
        popupFeatures.removeChild(popupFeatures.firstChild);
      };
      for(var i = 0; i < data[j].offer.features.length; i++){
        var  itemFeatures = document.createElement('li');
        var className = 'feature feature--' + data[j].offer.features[i];
        itemFeatures.className = className;
        popupFeatures.appendChild(itemFeatures);
      };
      description.textContent = data[j].offer.description;
      avatar.setAttribute('src', data[j].author.avatar);
      mapCard.style.display = 'none';
      fragment.appendChild(mapCard)
    }
    window.card.map.appendChild(fragment);
  };

  window.backend.load(function(response){
    createAndDrawCards(response);
  }, function(string){
    alert(string);
  });
})();