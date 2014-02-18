(function() {
  'use strict';

  function Game() {
    this.player = null;
    this.starfield=null;
    this.bullets = null;
    this.bullet = null;
    this.bulletTime = 0;
  }

  Game.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height-20;

      this.player = this.add.sprite(x, y, 'player');
      this.player.anchor.setTo(0.5, 0.75);
      this.input.onDown.add(this.onInputDown, this);

      //starfield = this.add.tileSprite(0, 0, 800, 600, 'starfield');

      //  Our bullet group
    this.bullets = this.game.add.group();

    for (var i = 0; i < 10; i++)
    {
        var b = this.bullets.create(0, 0, 'bullet');
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.events.onOutOfBounds.add(this.resetBullet, this);
    }

    console.log(this.bullets)

    },

    update: function () {
      var x, y, cx, cy, angle, scale;

      x = this.input.position.x;
      y = this.input.position.y;
      var keypressed = false;

      if(this.input.keyboard.isDown(Phaser.Keyboard.UP) && (this.player.y>10))
      {
        keypressed = true;
        this.player.y=this.player.y-3;
      }
      if(this.input.keyboard.isDown(Phaser.Keyboard.DOWN))
      {
        if(this.player.y<460)
        {
          keypressed = true;
          this.player.y=this.player.y+3;
        }
      }
      if(this.input.keyboard.isDown(Phaser.Keyboard.LEFT))
      {
        if(this.player.x>20)
        {
          keypressed = true;
          this.player.x=this.player.x-3;
          if (this.player.angle > -40) {
            this.player.angle -= 5;
          }
        }
      }
      if(this.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
      {
        if(this.player.x<620)
        {
          keypressed = true;
          this.player.x=this.player.x+3;
          if (this.player.angle < 40) {
            this.player.angle += 5;
          }
        }
      }

      if (!keypressed && this.player.angle < 0) {
            this.player.angle += 5;
      } else if (!keypressed && this.player.angle > 0) {
            this.player.angle -= 5;
      }
      if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
      {
            this.fireBullet();
      }
    },
    

  fireBullet : function() {

    if (this.game.time.now > this.bulletTime)
    {
        this.bullet = this.bullets.getFirstExists(false);

        if (this.bullet)
        {
            this.bullet.reset(this.player.x + 6, this.player.y - 8);
            this.bullet.body.velocity.y = -300;
            this.bulletTime = this.game.time.now + 150;
        }
    }

  },

//  Called if the bullet goes out of the screen
resetBullet : function (bullet) {
    bullet.kill();
},
    
   


    onInputDown: function (bullet) {
      this.game.state.start('menu');
    }

  };
  

  window['space-shooter'] = window['space-shooter'] || {};
  window['space-shooter'].Game = Game;

}());
