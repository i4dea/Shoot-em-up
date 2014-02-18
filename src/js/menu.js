(function() {
  'use strict';

  function Menu() {
    this.titleTxt = null;
    this.startTxt = null;
    this.scoreTxt = null;
    this.mybutton = null;

  }

  Menu.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;



      this.titleTxt = this.add.bitmapText(x, y, 'SPACE SHOOTER', {font: '50px minecraftia', align: 'center'});
      this.titleTxt.anchor.setTo(0.5, 0.5);

      y = y + this.titleTxt.height + 5;
      this.startTxt = this.add.bitmapText(x, y, 'START', {font: '20px minecraftia', align: 'center'});
      this.startTxt.anchor.setTo(0.5, 0.5);

      this.mybutton = this.add.button(this.world.centerX , 340, 'button', function() { this.game.state.start('game');this.input.onDown.add(function(){4+4}, this); }, this, 2, 1, 0);
      this.mybutton.anchor.setTo(0.5, 0.5);

      this.mybutton = this.add.button(this.world.centerX , 420, 'button', function() { this.game.state.start('score');this.input.onDown.add(function(){4+4}, this); }, this, 2, 1, 0);
      this.mybutton.anchor.setTo(0.5, 0.5);

      //this.input.onDown.add(this.onDown, this);
    },

    update: function () {

    },

    /*onDown: function () {
      this.game.state.start('submenu');
    }*/
  };

  window['space-shooter'] = window['space-shooter'] || {};
  window['space-shooter'].Menu = Menu;

}());