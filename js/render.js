'use strict';

(function () {

  // получает фрагмент с волшебником
  var wizardTemplateElement = document.querySelector('#similar-wizard-template');

  var renderWizard = function (wizard) {
    var element = wizardTemplateElement.content.cloneNode(true);

    var wizardElement = element.querySelector('.wizard');
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    element.querySelector('.setup-similar-label').innerText = wizard.name;

    return element;
  };

  // вставляет фрагменты в DOM
  var generateWizardsList = function (data) {
    var similarElement = document.querySelector('.setup-similar');
    var similarListElement = document.querySelector('.setup-similar-list');

    var takeNumber = data.length > 4 ? 4 : data.length;
    similarListElement.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      similarListElement.appendChild(renderWizard(data[i]));
    }

    similarElement.classList.remove('hidden');
  };

  window.render = {
    generateWizardsList: generateWizardsList
  };
})();
