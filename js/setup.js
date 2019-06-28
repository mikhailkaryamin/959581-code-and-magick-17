'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'greenblack', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];


  var similarWizardTemplateElement = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  var userDialogElement = document.querySelector('.setup');

  // получает случайный элемент массива
  var getRandomValueFrom = function (array) {
    var i = Math.floor(Math.random() * (array.length - 1));
    return array[i];
  };

  // получает фрагмент с волшебником
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplateElement.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  // вставляет фрагменты в DOM
  var generateWizardsList = function (wizards) {
    var fragment = document.createDocumentFragment();
    var similarListElement = document.querySelector('.setup-similar-list');

    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    similarListElement.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('errorHadler');
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var form = userDialogElement.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    var data = new FormData(form);
    var onLoad = function () {
      userDialogElement.classList.add('hidden');
    };

    window.backend.save(data, onLoad, errorHandler);
    evt.preventDefault();
  });

  // Изменяет цвет мантии, глаз и фаербола по нажатию

  var editAppearance = function () {
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
  editAppearance();

  window.backend.load(generateWizardsList, errorHandler);

})();
