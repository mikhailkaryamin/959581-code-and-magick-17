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

  // Фильтр по алфавиту
  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  // Фильтр магов и создания массива
  var updateWizards = function () {
    var sameCoatAndEyesWizards = wizards.filter(function (it) {
      return it.colorCoat === coatColor &&
        it.colorEyes === eyesColor;
    });

    var sameCoatWizards = wizards.filter(function (it) {
      return it.coatColor === coatColor;
    });
    var sameEyesWizards = wizards.filter(function (it) {
      return it.eyesColor === eyesColor;
    });

    var filteredWizards = sameCoatAndEyesWizards;
    filteredWizards = filteredWizards.concat(sameCoatWizards);
    filteredWizards = filteredWizards.concat(sameEyesWizards);
    filteredWizards = filteredWizards.concat(wizards);

    var uniqueWizards =
    filteredWizards.filter(function (it, i) {
      return filteredWizards.indexOf(it) === i;
    });

    window.render.generateWizardsList(uniqueWizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
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
      window.debounce.delay(updateWizards);
    });

    setupWizardEyesElement.addEventListener('click', function () {
      eyesColor = changeWizardEyes(EYES_COLORS);
      inputEyesColorElement.value = eyesColor;

      window.debounce.delay(updateWizards);
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
