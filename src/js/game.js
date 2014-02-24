(function() {
  'use strict';

  function Game() {
    this.player = null;
    this.starfield=null;
    this.bullets = null;
    this.bullet = null;
    this.bulletTime = 0;
    this.bulletCounter = 0;
    this.starfield=null;
    this.enemmy = null;
    this.enemmies = null;
    this.enemmyTime = 0;
  }

  Game.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height-50;

      //Crea fondo del juego
      this.starfield = this.add.tileSprite(0, 0, 640, 960, 'starfield');
      
      this.input.onDown.add(this.onInputDown, this);

    //  Our bullet group
    this.bullets = this.game.add.group();
    //Bucle que crea el grupo de balas
    for (var i = 0; i < 10; i++)
    {
        var b = this.bullets.create(0, 0, 'bullet');
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.anchor.setTo(0.5, 0.5);
        b.events.onOutOfBounds.add(this.resetBullet, this);
    }

    //Crea "player"
    this.player = this.add.sprite(x, y, 'player');
    this.player.animations.add('fly');
    this.player.animations.play('fly', 24, true);
    this.player.anchor.setTo(0.5, 0.5);

    //Crea "enemmy"
    /*this.enemmy.body.velocity.x = -200;
    this.enemmy.body.velocity.y = +100;
    this.enemmy.anchor.setTo(0.5, 0.75);
    this.enemmy.name = 'enemmy';*/

    this.enemmies = this.game.add.group();
    //Bucle que crea el grupo de enemigos
    for (var i = 0; i < 10; i++)
    {
        var b = this.enemmies.create(0, 0, 'enemmy');
        b.name = 'enemmy' + i;
        b.exists = false;
        b.visible = false;
        b.anchor.setTo(0.5, 0.5);
        //b.events.onOutOfBounds.add(this.resetBullet, this);
    }

    },


    update: function () {
      //Hace que el fondo se desplace verticalmente
      //this.starfield.tilePosition.y += 2;

      //Controles y movimiento de la nave
      var x, y, cx, cy, angle, scale;

      x = this.input.position.x;
      y = this.input.position.y;
      /*
      var keypressed = false;
      //Control: tecla izquierda
      if(this.input.keyboard.isDown(Phaser.Keyboard.LEFT))
      {
        if(this.player.x>20)
        {
          keypressed = true;
          this.player.x=this.player.x-6;
          if (this.player.angle > -15) {
            this.player.angle -= 2;
          }
        }
      }
      //Control: tecla derecha
      if(this.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
      {
        if(this.player.x<620)
        {
          keypressed = true;
          this.player.x=this.player.x+6;
          if (this.player.angle < 15) {
            this.player.angle += 2;
          }
        }
      }

      //restablece el angulo de la nave cuando no pulsas ninguna
      if (!keypressed && this.player.angle < 0) {
            this.player.angle += 2;
      } else if (!keypressed && this.player.angle > 0) {
            this.player.angle -= 2;
      }*/

      //mover nave segun posicion del cursor
      this.player.x = this.game.input.x;
      if (this.player.x <= this.player.width/2 ) {
        this.player.x = this.player.width/2;
      }
      if (this.player.x >= this.game.width-this.player.width/2 ) {
        this.player.x = this.game.width-this.player.width/2;
      }
      
      //enemmy
      /*if (this.enemmy.x <= this.enemmy.width/2) {
          this.enemmy.body.velocity.x = 200;
      }

      else if (this.enemmy.x >= this.game.width-this.enemmy.width/2 ) {
        this.enemmy.body.velocity.x = -200;
      }*/

      this.generateEnemmy();

      this.fireBullet();
      
      //collision
      this.game.physics.overlap(this.enemmy, this.bullets, this.resetBullet, null, this);
    },
    

  fireBullet : function() {

    if (this.game.time.now > this.bulletTime && (this.bulletCounter % 3) != 2)
    {
        this.bullet = this.bullets.getFirstExists(false);

        if (this.bullet)
        {
            this.bullet.reset(this.player.x, this.player.y -80);
            this.bullet.body.velocity.y = -1000;
            this.bulletTime = this.game.time.now + 200;
            this.bulletCounter++;
        }
    }
    else if (this.game.time.now > this.bulletTime && (this.bulletCounter % 3) == 2) {
      this.bulletTime = this.game.time.now + 320;
      this.bulletCounter++;  
    }

  },

//  Called if the bullet goes out of the screen
resetBullet : function (bullet) {
    bullet.kill();
},  

generateEnemmy : function() {

    if (this.game.time.now > this.enemmyTime )
    {
      this.enemmy = this.enemmies.getFirstExists(false);
        if (this.enemmy)
        {
            this.enemmy.reset(this.game.width * Math.random(), -this.enemmy.height);
            this.enemmy.body.velocity.y = +200;
            this.enemmyTime = this.game.time.now + 800;
        }
    }

  },


    onInputDown: function (bullet) {
      this.game.state.start('menu');
    }

  };
  

  window['space-shooter'] = window['space-shooter'] || {};
  window['space-shooter'].Game = Game;

}());
