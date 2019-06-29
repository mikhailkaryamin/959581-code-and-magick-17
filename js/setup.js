'use strict';

(function () {
  var userDialogElement = document.querySelector('.setup');

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

  // Вызовы функций и обработчиков событий
  window.setup = {
    errorHandler: errorHandler
  };
})();
