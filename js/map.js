var generateRandomArrOfObj = function(){
  var getArrayOfNumbers = function(min, max){
    var arr = []
    var k = 0
    for(var i = min; i <= max; i++){
      arr[k] = i;
      k++;
    };
    return arr;
  };

  var randomArrOfObj = [];
  var arrayOfXX = getArrayOfNumbers(1, 8);
  var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var type = ['flat', 'house', 'bungalo'];
  var times = ['12:00', '13:00', '14:00'];
  

  var getRandomNumber = function(min, max){
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  };

  var getXX = function(){
    var index = getRandomNumber(0, arrayOfXX.length - 1);
    var xx = arrayOfXX[index];
    arrayOfXX.splice(index, 1);
    return '0' + xx;
  };

  var getTitle = function(){
    var titleIndex = getRandomNumber(0, titles.length - 1);
    var title = titles[titleIndex];
    titles.splice(titleIndex, 1);
    return title
  };

  var getFeatures = function(){
    var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    for(var i = 0; i <= getRandomNumber(0, features.length - 2); i++){
      var index = getRandomNumber(0, features.length - 1);
      features.splice(index, 1);
    };
    return features;
  };


  for(var i = 0; i < 8; i++){
    var x = getRandomNumber(300, 900);
    var y = getRandomNumber(100, 500);
    var Obj = {
      'author': {
        'avatar': 'img/avatars/user' + getXX() +'.png'
      },
      'offer': {
        'title': getTitle(),
        'address': x + ', ' + y,
        'price': getRandomNumber(1000, 1000000),
        'type': type[getRandomNumber(0, type.length - 1)],
        'rooms': getRandomNumber(1, 5),
        'quests': getRandomNumber(1, 5),
        'checkin': times[getRandomNumber(0, times.length - 1)],
        'checkout': times[getRandomNumber(0, times.length - 1)],
        'features': getFeatures(),
        'description': '',
        'photos': [],
      },
      'location': {
        'x': x,
        'y': y
      }
    };
    randomArrOfObj.push(Obj);
  };

  return randomArrOfObj;
};

var randomArrOfObj = generateRandomArrOfObj();

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var mapPinButtonTemplate = document.querySelector('template').content.querySelector('.map__pin');

var createMapPins = function(arr){
  var mapPins = [];
  for(var i = 0; i < arr.length; i++){
    var mapPinButton = mapPinButtonTemplate.cloneNode(true);
    var image = mapPinButton.querySelector('img');
    var imageWidth = image.getAttribute('width');
    var imageHeight = image.getAttribute('height');
    var trueX = arr[i].location.x - (0.5 * imageWidth);
    var trueY = arr[i].location.y - imageHeight;
    mapPinButton.style.left = trueX + 'px';
    mapPinButton.style.top = trueY + 'px';
    image.setAttribute('src', arr[i].author.avatar);
    mapPins.push(mapPinButton);
  };
  return mapPins
};

var mapPins = createMapPins(randomArrOfObj);
var mapPinsList = document.querySelector('.map__pins');

var drawMapPins = function(mapPins){
  var fragment = document.createDocumentFragment();
  for(var i = 0; i < mapPins.length; i++){
    fragment.appendChild(mapPins[i]);
  };
  mapPinsList.appendChild(fragment);
};

drawMapPins(mapPins);
var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

var createFirstMapCard = function(randomArrOfObj){
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

  h3.textContent = randomArrOfObj[0].offer.title;
  address.textContent = randomArrOfObj[0].offer.address;
  price.innerHTML = randomArrOfObj[0].offer.price + '&#x20bd;/ночь';
  typeOfHousing.textContent = (randomArrOfObj[0].offer.type === 'flat') ? 'Квартира' :
                              (randomArrOfObj[0].offer.type === 'flat') ? 'Дом' :
                              'Бунгало';
  quantity.textContent =  ((randomArrOfObj[0].offer.rooms > 1) && (randomArrOfObj[0].offer.quests > 1)) ?
        randomArrOfObj[0].offer.rooms + ' комнаты для ' + randomArrOfObj[0].offer.quests + ' гостей' :
                          ((randomArrOfObj[0].offer.rooms === 1) && (randomArrOfObj[0].offer.quests === 1)) ?
        randomArrOfObj[0].offer.rooms + ' комната для ' + randomArrOfObj[0].offer.quests + ' гостя' :
                          ((randomArrOfObj[0].offer.rooms > 1) && (randomArrOfObj[0].offer.quests === 1)) ?
        randomArrOfObj[0].offer.rooms + ' комнаты для ' + randomArrOfObj[0].offer.quests + ' гостя' :
        randomArrOfObj[0].offer.rooms + ' комната для ' + randomArrOfObj[0].offer.quests + ' гостей';
  timeOfStay.textContent = 'Заезд после ' + randomArrOfObj[0].offer.checkin + ', выезд до ' + randomArrOfObj[0].offer.checkout;
  while (popupFeatures.firstChild) {
    popupFeatures.removeChild(popupFeatures.firstChild);
  };
  for(var i = 0; i < randomArrOfObj[0].offer.features.length; i++){
    var  itemFeatures = document.createElement('li');
    var className = 'feature feature--' + randomArrOfObj[0].offer.features[i];
    itemFeatures.className = className;
    popupFeatures.appendChild(itemFeatures);
  };
  description.textContent = randomArrOfObj[0].offer.description;
  avatar.setAttribute('src', randomArrOfObj[0].author.avatar);
  return mapCard;
};

var firstMapCard = createFirstMapCard(randomArrOfObj);
map.appendChild(document.createDocumentFragment().appendChild(firstMapCard));