'use strict';
var NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'greenblack', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARD_COUNT = 4;
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var userDialog = document.querySelector('.setup');
// показывает диалог

var showUserDialog = function () {
  userDialog.classList.remove('hidden');
};

// получает случайный элемент массива

var getRandomElement = function (array) {
  var i = Math.floor(Math.random() * (array.length - 1));
  return array[i];
};

// получает данные волшебника

var getWizardData = function (names, surnames, coatColor, eyesColor) {
  var nameAndSurname = getRandomElement(names) + ' ' + getRandomElement(surnames);
  var randomCoatColor = getRandomElement(coatColor);
  var randomEyesColor = getRandomElement(eyesColor);

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
    wizards.push(getWizardData(NAMES, SURNAMES, COAT_COLORS, EYES_COLORS));
  }

  return wizards;
};

// получает фрагмент с волшебником

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// вставляет фрагменты в DOM

var generateWizardsList = function (wizards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  return fragment;
};

// показывает блок с волшебниками

var showWizards = function () {
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
};

var insertWizardsList = function (wizardsList) {
  var similarListElement = userDialog.querySelector('.setup-similar-list');

  similarListElement.appendChild(wizardsList);
};

var wizards = getWizards();
var wizardsList = generateWizardsList(wizards);

showUserDialog();

insertWizardsList(wizardsList);

showWizards();

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Нажатие на элемент .setup-open удаляет класс hidden
// у блока setup. Нажатие на элемент .setup-close, расположенный
// внутри блока setup возвращает ему класс hidden.
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Изменяет цвет мантии, глаз и фаербола по нажатию

var setupPlayer = document.querySelector('.setup-player'); // выбрал более гибкий селектор в качестве базового, чем .setup-wizard
var setupWizardCoat = setupPlayer.querySelector('.wizard-coat');
var setupWizardEyes = setupPlayer.querySelector('.wizard-eyes');
var setupFireBall = setupPlayer.querySelector('.setup-fireball-wrap');

var changeColor = function (colors) {
  var randomColor = getRandomElement(colors);
  return randomColor;
};

var changeWizardCoat = function (coatColors) {
  setupWizardCoat.style.fill = changeColor(coatColors);
};

var changeWizardEyes = function (eyesColors) {
  setupWizardEyes.style.fill = changeColor(eyesColors);
};

var changeFireBall = function (fireBalls) {
  setupFireBall.style.background = changeColor(fireBalls);
};

setupWizardCoat.addEventListener('click', function () {
  changeWizardCoat(COAT_COLORS);
});

setupWizardEyes.addEventListener('click', function () {
  changeWizardEyes(EYES_COLORS);
});

setupFireBall.addEventListener('click', function () {
  changeFireBall(FIREBALL_COLORS);
});
