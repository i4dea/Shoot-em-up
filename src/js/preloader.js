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
      this.load.image('bulletblue', 'assets/bullet-blue.PNG');
      this.load.image('bulletgreen', 'assets/lazer-green.PNG');
      this.load.image('bulletorange', 'assets/bullet-orange.PNG');
      this.load.image('starfield', 'assets/fondo-todo-grande.PNG');
      this.load.image('particle', 'assets/particle-blue.PNG');
      this.load.spritesheet("enemyred", "assets/enemmy-red-24.PNG", 80, 80);
      this.load.spritesheet("enemygreen", "assets/enemmy-green-24.PNG", 80, 80);
      //this.load.spritesheet("enemyyellow", "assets/enemmy-yellow-24.PNG", 80, 80);
      //this.load.spritesheet("enemyblue", "assets/enemmy-blue-24.PNG", 80, 80);
      this.load.spritesheet("kaboom", "assets/explosion.PNG", 350, 350);
      this.load.audio('musicLoop', 'assets/musicLoop.mp3');
      this.load.audio('tryAgain', 'assets/voice_tryagain.mp3');
      this.load.audio('laser1', 'assets/laser1.mp3');
      this.load.spritesheet('pwpgreen', "assets/power-up-green.PNG", 50, 50);
      this.load.spritesheet("pwpblue", "assets/power-up-blue.PNG", 50, 50);
      this.load.spritesheet('pwporange', "assets/power-up-orange.PNG", 50, 50);

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
