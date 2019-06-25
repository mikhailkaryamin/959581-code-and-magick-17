'use strict';

(function () {
  var NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'greenblack', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARD_COUNT = 4;

  var similarWizardTemplateElement = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  // получает случайный элемент массива
  var getRandomValueFrom = function (array) {
    var i = Math.floor(Math.random() * (array.length - 1));
    return array[i];
  };

  // получает данные волшебника
  var getWizardData = function (names, surnames, coatColor, eyesColor) {
    var nameAndSurname = getRandomValueFrom(names) + ' ' + getRandomValueFrom(surnames);
    var randomCoatColor = getRandomValueFrom(coatColor);
    var randomEyesColor = getRandomValueFrom(eyesColor);

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
    var wizardElement = similarWizardTemplateElement.cloneNode(true);
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

  var insertWizardsList = function () {
    var similarListElement = document.querySelector('.setup-similar-list');
    var wizards = getWizards();
    var wizardsList = generateWizardsList(wizards);

    similarListElement.appendChild(wizardsList);
  };

  // Изменяет цвет мантии, глаз и фаербола по нажатию

  var editionAppearance = function () {
    var setupPlayerElement = document.querySelector('.setup-player');
    var setupWizardCoatElement = setupPlayerElement.querySelector('.wizard-coat');
    var setupWizardEyesElement = setupPlayerElement.querySelector('.wizard-eyes');
    var setupFireBallElement = setupPlayerElement.querySelector('.setup-fireball-wrap');
    var inputCoatColorElement = setupPlayerElement.querySelector('input[name=coat-color]');
    var inputEyesColorElement = setupPlayerElement.querySelector('input[name=eyes-color]');
    var inputFireBallColorElement = setupFireBallElement.querySelector('input[name=fireball-color]');

    var changeWizardCoat = function (coatColors) {
      var colorCoatCurrent = getRandomValueFrom(coatColors);

      setupWizardCoatElement.style.fill = colorCoatCurrent;

      return colorCoatCurrent;
    };

    var changeWizardEyes = function (eyesColors) {
      var colorEyesCurrent = getRandomValueFrom(eyesColors);

      setupWizardEyesElement.style.fill = colorEyesCurrent;

      return colorEyesCurrent;
    };

    var changeFireBall = function (fireBalls) {
      var colorFireBallCurrent = getRandomValueFrom(fireBalls);

      setupFireBallElement.style.background = colorFireBallCurrent;

      return colorFireBallCurrent;
    };

    setupWizardCoatElement.addEventListener('click', function () {
      var colorCoat = changeWizardCoat(COAT_COLORS);

      inputCoatColorElement.value = colorCoat;
    });

    setupWizardEyesElement.addEventListener('click', function () {
      var colorEyes = changeWizardEyes(EYES_COLORS);

      inputEyesColorElement.value = colorEyes;
    });

    setupFireBallElement.addEventListener('click', function () {
      var colorFireBall = changeFireBall(FIREBALL_COLORS);

      inputFireBallColorElement.value = colorFireBall;
    });
  };


  // Вызовы функций и обработчиков событий
  editionAppearance();

  insertWizardsList();

})();
