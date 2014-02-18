(function() {
  'use strict';

  function Score() {
    this.scoreTxt = null;
  }

  Score.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;


      this.scoreTxt = this.add.bitmapText(x, y, 'SCORE', {font: '50px minecraftia', align: 'center'});
      this.scoreTxt.anchor.setTo(0.5, 0.5);

      this.input.onDown.add(this.onDown, this);
    },

    update: function () {

    },

    onDown: function () {
      this.game.state.start('menu');
    }
  };

  window['space-shooter'] = window['space-shooter'] || {};
  window['space-shooter'].Score = Score;

}());
