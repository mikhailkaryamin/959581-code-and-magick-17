'use strict';
var ARRAY_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var ARRAY_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'greenblack', 'red', 'blue', 'yellow', 'green'];
var QUANTITY_WIZARD = 4;
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var randomElementArray = function (array) {
  return Math.floor(Math.random() * array.length + 1);
};

var getRandomWizard = function (names, surnames, coatColor, eyesColor) {
  var nameAndSurname = names[randomElementArray(names)] + ' ' + surnames[randomElementArray(surnames)];
  var randomCoatColor = coatColor[randomElementArray(coatColor)];
  var randomEyesColor = eyesColor[randomElementArray(eyesColor)];

  return {
    name: nameAndSurname,
    coatColor: randomCoatColor,
    eyesColor: randomEyesColor
  };
};

var getWizards = function () {
  var wizards = [];
  for (var i = 0; i < QUANTITY_WIZARD; i++) {
    wizards += getRandomWizard(ARRAY_NAMES, ARRAY_SURNAMES, COAT_COLOR, EYES_COLOR);
  }
  return wizards;
};


