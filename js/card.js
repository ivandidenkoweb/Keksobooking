// Mодуль для отрисовки элемента на карточке

(function(){

  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

    window.card = {
    mapCards : [],
    map : document.querySelector('.map')
  };

  // Функция, которая возвращает карточку из обьекта cardObj
  var createMapCard = function(cardObj){
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

    h3.textContent = cardObj.offer.title;
    address.textContent = cardObj.offer.address;
    price.innerHTML = cardObj.offer.price + '&#x20bd;/ночь';
    typeOfHousing.textContent = (cardObj.offer.type === 'flat') ? 'Квартира' :
                                (cardObj.offer.type === 'house') ? 'Дом' :
                                'Бунгало';
    quantity.textContent =  ((cardObj.offer.rooms > 1) && (cardObj.offer.quests > 1)) ?
          cardObj.offer.rooms + ' комнаты для ' + cardObj.offer.quests + ' гостей' :
                            ((cardObj.offer.rooms === 1) && (cardObj.offer.quests === 1)) ?
          cardObj.offer.rooms + ' комната для ' + cardObj.offer.quests + ' гостя' :
                            ((cardObj.offer.rooms > 1) && (cardObj.offer.quests === 1)) ?
          cardObj.offer.rooms + ' комнаты для ' + cardObj.offer.quests + ' гостя' :
          cardObj.offer.rooms + ' комната для ' + cardObj.offer.quests + ' гостей';
    timeOfStay.textContent = 'Заезд после ' + cardObj.offer.checkin + ', выезд до ' + window.data[0].offer.checkout;
    while (popupFeatures.firstChild) {
      popupFeatures.removeChild(popupFeatures.firstChild);
    };
    for(var i = 0; i < cardObj.offer.features.length; i++){
      var  itemFeatures = document.createElement('li');
      var className = 'feature feature--' + cardObj.offer.features[i];
      itemFeatures.className = className;
      popupFeatures.appendChild(itemFeatures);
    };
    description.textContent = cardObj.offer.description;
    avatar.setAttribute('src', cardObj.author.avatar);
    mapCard.style.display = 'none';
    return mapCard;
  };

  // Создаем массив из карточек
  for(var i = 0; i < window.data.length; i++){
    window.card.mapCards.push(createMapCard(window.data[i]));
  };

  // Добавляем карточки на карту
  var fragment = document.createDocumentFragment();

  for(var i = 0; i < window.card.mapCards.length; i++){
    fragment.appendChild(window.card.mapCards[i]);
  };

  window.card.map.appendChild(fragment);
})();