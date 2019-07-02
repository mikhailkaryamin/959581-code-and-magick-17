'use strict';

(function () {
  var wizards = [];
  var coatColor;
  var eyesColor;

  // получает случайный элемент массива
  var getRandomValueFrom = function (array) {
    var i = Math.floor(Math.random() * (array.length - 1));
    return array[i];
  };

  // Рейтинг магов
  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  // Фильтр магов и создания массива
  var updateWizards = function () {
    window.render.generateWizardsList(wizards.slice().
    sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      }
      return rankDiff;
    }));
  };

  // Изменяет цвет мантии, глаз и фаербола по нажатию
  var editApperance = function () {
    var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
    var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'greenblack', 'red', 'blue', 'yellow', 'green'];
    var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

    var setupPlayerElement = document.querySelector('.setup-player');
    var setupWizardCoatElement = setupPlayerElement.querySelector('.wizard-coat');
    var setupWizardEyesElement = setupPlayerElement.querySelector('.wizard-eyes');
    var setupFireBallElement = setupPlayerElement.querySelector('.setup-fireball-wrap');
    var inputCoatColorElement = setupPlayerElement.querySelector('input[name=coat-color]');
    var inputEyesColorElement = setupPlayerElement.querySelector('input[name=eyes-color]');
    var inputFireBallColorElement = setupFireBallElement.querySelector('input[name=fireball-color]');

    var debounceSortWizards = window.debounce(updateWizards);

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
      coatColor = changeWizardCoat(COAT_COLORS);
      inputCoatColorElement.value = coatColor;
      debounceSortWizards();
    });

    setupWizardEyesElement.addEventListener('click', function () {
      eyesColor = changeWizardEyes(EYES_COLORS);
      inputEyesColorElement.value = eyesColor;

      debounceSortWizards();
    });

    setupFireBallElement.addEventListener('click', function () {
      var colorFireBall = changeFireBall(FIREBALL_COLORS);

      inputFireBallColorElement.value = colorFireBall;
    });
  };

  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };
  editApperance();
  var errorLoad = window.setup.errorHandler;
  window.backend.load(successHandler, errorLoad);

})();
