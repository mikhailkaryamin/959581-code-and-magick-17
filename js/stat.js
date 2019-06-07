'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_GAP = 50;
var TEXT_GAP = 30;
var TEXT_HEIGHT = 20;
var BAR_WIDTH = 40;
var CHART_HEIGHT = 150;
var MAX_BAR_HEIGHT = (CHART_HEIGHT - TEXT_HEIGHT - 2 * GAP) * -1;
var TEXT_COLOR = '#000';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var printText = function (ctx) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + TEXT_GAP, CLOUD_Y + TEXT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + TEXT_GAP, CLOUD_Y + TEXT_GAP + TEXT_HEIGHT);
};

var printTime = function (ctx, time, i, currentBarHeight) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.fillText(Math.round(time), CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - BAR_GAP + currentBarHeight);
};

var printName = function (ctx, name, i) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.fillText(name, CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP);
};

var drawBar = function (ctx, i, currentBarHeight) {
  ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - TEXT_HEIGHT, BAR_WIDTH, currentBarHeight);
};

var getRandomColor = function () {
  return 'rgba(0, 0, 255, ' + Math.floor(Math.random() * 10 + 1) / 10 + ')';
};

var getBarColor = function (ctx, name) {
  var yourColor = ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  var сurrentBarColor = name === 'Вы' ? yourColor : getRandomColor();
  return сurrentBarColor;
};

var renderBars = function (ctx, names, times) {
  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var currentBarHeight = MAX_BAR_HEIGHT * times[i] / maxTime;
    printTime(ctx, times[i], i, currentBarHeight);
    printName(ctx, names[i], i);
    ctx.fillStyle = getBarColor(ctx, names[i]);
    drawBar(ctx, i, currentBarHeight);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  printText(ctx);
  renderBars(ctx, names, times);
};
