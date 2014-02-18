(function() {
  'use strict';

  function SubMenu() {
    this.titleTxt = null;
    this.startTxt = null;
    this.scoreTxt = null;
  }

  SubMenu.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;


      this.titleTxt = this.add.bitmapText(x, y, 'SPACE SHOOTER', {font: '50px minecraftia', align: 'center'});
      this.titleTxt.anchor.setTo(0.5, 0.5);

      y = y + this.titleTxt.height + 5;
      this.startTxt = this.add.bitmapText(x, y, 'STARTsssssssssssssssssss', {font: '20px minecraftia', align: 'center'});
      this.startTxt.anchor.setTo(0.5, 0.5);

       y = y + this.startTxt.height + 5;
      this.scoreTxt = this.add.bitmapText(x, y, 'SCOREsssssssss', {font: '20px minecraftia', align: 'center'});
      this.scoreTxt.anchor.setTo(0.5, 0.5);

      this.input.onDown.add(this.onDown, this);
    },

    update: function () {

    },

    onDown: function () {
      this.game.state.start('game');
    }
  };

  window['space-shooter'] = window['space-shooter'] || {};
  window['space-shooter'].SubMenu = SubMenu;

}());
