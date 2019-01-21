// Модуль, который создает данные

(function(){
  // Функция, которая возвращает массив случайных чисел от min до max
  var getArrayOfNumbers = function(min, max){
    var arr = []
    var k = 0
    for(var i = min; i <= max; i++){
      arr[k] = i;
      k++;
    };
    return arr;
  };

  // Создаем пустой массив data, где будут храниться данные
  window.data = [];

  var arrayOfXX = getArrayOfNumbers(1, 8);
  var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var type = ['flat', 'house', 'bungalo'];
  var times = ['12:00', '13:00', '14:00'];

  // Функция, которая возвращает случайное число от min до max
  var getRandomNumber = function(min, max){
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  };

  // Функция, которая возвращает случайное число из массива arrayOfXX типа 0X и удаляет его сразу из этого же массива
  var getXX = function(){
    var index = getRandomNumber(0, arrayOfXX.length - 1);
    var xx = arrayOfXX[index];
    arrayOfXX.splice(index, 1);
    return '0' + xx;
  };

  // Функция, которая возвращает случайный заголовок обьявления из массива titles и зразу удаляет уго из этого же массива
  var getTitle = function(){
    var titleIndex = getRandomNumber(0, titles.length - 1);
    var title = titles[titleIndex];
    titles.splice(titleIndex, 1);
    return title
  };

  // Функция, которая возвращает массив случайных строк из features
  var getFeatures = function(){
    var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    for(var i = 0; i <= getRandomNumber(0, features.length - 2); i++){
      var index = getRandomNumber(0, features.length - 1);
      features.splice(index, 1);
    };
    return features;
  };

  // Добавляем в randomArrOfObj 8 случайных обьектов
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
    window.data.push(Obj);
  };

})();