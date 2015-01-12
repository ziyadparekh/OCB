'use strict';

//The Globals
var BaseConfig = require('configs/BaseButtonConfig');
var BaseView = require('views/UIBaseButtonView');
var BaseCard = require('views/UIBaseCardView');
var baseView = new BaseView(BaseConfig);
var baseCard = new BaseCard(BaseConfig);
var $ = require('jquery');
// var KeyMap = new keymap();
$("#canvas").html(baseCard.render().el);
