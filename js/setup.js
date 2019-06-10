'use strict';
var NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'greenblack', 'red', 'blue', 'yellow', 'green'];
var WIZARD_COUNT = 4;
var USER_DIALOG = document.querySelector('.setup');

// показывает диалог

var showUserDialog = function () {
  USER_DIALOG.classList.remove('hidden');
};

// получает случайный элемент массива

var getRandomArrayIndex = function (array) {
  return Math.floor(Math.random() * (array.length - 1) + 1);
};

// получает данные волшебника

var getDataWizard = function (names, surnames, coatColor, eyesColor) {
  var nameAndSurname = names[getRandomArrayIndex(names)] + ' ' + surnames[getRandomArrayIndex(surnames)];
  var randomCoatColor = coatColor[getRandomArrayIndex(coatColor)];
  var randomEyesColor = eyesColor[getRandomArrayIndex(eyesColor)];

  return {
    name: nameAndSurname,
    coatColor: randomCoatColor,
    eyesColor: randomEyesColor
  };
};

// получает список с данными волшебников

var getWizards = function () {
  var wizards = [];

  for (var i = 0; i < WIZARD_COUNT; i++) {
    wizards.push(getDataWizard(NAMES, SURNAMES, COAT_COLORS, EYES_COLORS));
  }

  return wizards;
};

// получает фрагмент с волшебником

var renderWizard = function (wizard) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// вставляет фрагменты в DOM

var getListWizards = function (wizards) {
  var similarListElement = USER_DIALOG.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);

  return fragment;
};

// показывает блок с волшебниками

var showListWizards = function () {
  USER_DIALOG.querySelector('.setup-similar').classList.remove('hidden');
};

showUserDialog();

getListWizards(getWizards());

showListWizards();


