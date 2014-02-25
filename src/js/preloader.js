(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {

    preload: function () {
      this.asset = this.add.sprite(640, 960, 'preloader');
      this.asset.anchor.setTo(0.5, 0.5);

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);
      this.load.spritesheet("player", "assets/player-24.PNG", 70, 70);
      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
      this.load.spritesheet('button', 'assets/button_sprite_sheet.png', 193, 71);
      this.load.image('bullet', 'assets/bullet-blue.PNG');
      this.load.image('starfield', 'assets/fondo-todo-grande.PNG');
      this.load.image('particle', 'assets/particle-blue.PNG');
      this.load.spritesheet("enemmy", "assets/enemmy-red-24.PNG", 80, 80);
      this.load.audio('musicLoop', 'assets/musicLoop.mp3');
      this.load.audio('tryAgain', 'assets/voice_tryagain.mp3');
      this.load.audio('laser1', 'assets/laser1.mp3');

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
