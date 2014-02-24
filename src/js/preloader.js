(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {

    preload: function () {
      this.asset = this.add.sprite(320, 240, 'preloader');
      this.asset.anchor.setTo(0.5, 0.5);

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);
      //this.load.image('player', 'assets/player.png');
      this.load.spritesheet("player", "assets/player-24.PNG", 70, 70);
      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
      this.load.spritesheet('button', 'assets/button_sprite_sheet.png', 193, 71);
      this.load.image('bullet', 'assets/bullet-blue.PNG');
      this.load.image('starfield', 'assets/fondo-1-grande.PNG');
      this.load.image('enemmy', 'assets/enemmy.png');
    },

    create: function () {
      this.asset.cropEnabled = false;
    },

    update: function () {
      if (!!this.ready) {
        this.game.state.start('menu');
      }
    },

    onLoadComplete: function () {
      this.ready = true;
    }
  };

  window['space-shooter'] = window['space-shooter'] || {};
  window['space-shooter'].Preloader = Preloader;

}());
