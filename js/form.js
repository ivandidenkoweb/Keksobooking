// Модуль, который работает с формой обьявления

(function(){
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var priceInput = document.querySelector('#price');
  var typeHousing = document.querySelector('#type');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  window.form = {
    noticeForm : document.querySelector('.notice__form'), 
    noticeFormFieldsets : document.querySelector('.notice__form').querySelectorAll('fieldset')
  };

  // Отключаем поля формы
  for(var i = 0; i < window.form.noticeFormFieldsets.length; i++){
    window.form.noticeFormFieldsets[i].setAttribute('disabled', 'disabled');
  };

  // При изменении время вьезда, автоматически изменяеться время выезда
  var onTimeInSelectChange = function(){
    var index;
    for(var i = 0; i < timeIn.options.length; i++){
      if(timeIn.options[i].selected){
        index = i;
      }
    }
    timeOut.options[index].selected = true;
  };

  timeIn.addEventListener('change', onTimeInSelectChange);

  // При вводе стоимости проживания, автоматически изменяеться тип жилья
  var onPriceInput = function(){
    (priceInput.value < 1000) ? typeHousing.options[1].selected = true :
    ((priceInput.value > 1000) && (priceInput.value < 5000)) ? typeHousing.options[0].selected = true :
    ((priceInput.value > 5000) && (priceInput.value < 10000)) ? typeHousing.options[2].selected = true : typeHousing.options[3].selected = true;
  };

  priceInput.addEventListener('input', onPriceInput);

  // При изменении количества комнат, автоматически меняеться количество гостей
  var onRoomNumberChange = function(){
    roomNumber.options[0].selected ? capacity.options[2].selected = true : 
    roomNumber.options[1].selected ? capacity.options[1].selected = true : 
    roomNumber.options[2].selected ? capacity.options[0].selected = true : capacity.options[3].selected = true;
  };

  roomNumber.addEventListener('change', onRoomNumberChange);

  // Проверяем форму на заполненность всех обязательных полей
  window.form.noticeForm.addEventListener('invalid', function(evt){
    evt.target.style.boxShadow = '0 0 4px 1px #ff6547';
  }, true);

})();