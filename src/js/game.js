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
    this.enemy = null;
    this.enemies = null;
    this.enemyTime = 0;
    this.playerEmitter = null;
    this.score = 0;
    this.scoreString = '';
    this.explosion = null;
    this.explosions;
    this.nEnemies=1;




    this.powerups=null;
    this.powerupblue=null;
    this.powerupgreen=null;
    this.poweruporange=null;

    this.enemyred=null;
    this.enemygreen=null;
    this.enemyyellow=null;
    this.enemyblue=null;

    this.lastTime = 0;
    this.typebullet = 3;
  }

  Game.prototype = {

    create: function () {

      this.music = this.game.add.audio('musicLoop', 1, true);
      this.music.play('', 0, 1, true);

      this.tryAgainVoice = this.game.add.audio('tryAgain');

      this.laser1sound = this.game.add.audio('laser1');


      //Crea fondo del juego
      this.starfield = this.add.tileSprite(0, 0, 640, 960, 'starfield');
      
      this.input.onDown.add(this.onInputDown, this);

      //generador de particulas, cola de la nave
      this.playerEmitter = this.game.add.emitter(this.game.width / 2, this.game.height-this.game.height/10, 500);
      this.playerEmitter.makeParticles('particle');
      this.playerEmitter.minParticleSpeed.setTo(-300, 1500);
      this.playerEmitter.maxParticleSpeed.setTo(300, 400);
      this.playerEmitter.maxParticleScale = 1;
      this.playerEmitter.minParticleScale = 0.1;
      this.playerEmitter.gravity = 0;
      this.playerEmitter.start(false, 500, 2);

      this.scoreString = 'Score : ';
      this.scoreText = this.game.add.text(10, 10, this.scoreString + this.score, { fontSize: '34px', fill: '#fff' });

    //  Our bullet group
    this.bullets = this.game.add.group();
    //Bucle que crea el grupo de balas
    




    //Crea "player"
    this.player = this.add.sprite(this.game.width / 2, this.game.height-this.game.height/10, 'player');
    this.player.animations.add('fly');
    this.player.animations.play('fly', 24, true);
    this.player.anchor.setTo(0.5, 0.5);

    //POWERUPS
    this.powerups = this.game.add.group();

    this.poweruporange = this.game.add.group();
    this.powerupblue = this.game.add.group();
    this.powerupgreen = this.game.add.group();

    this.powerups.add(this.powerupgreen._container);
    this.powerups.add(this.powerupblue._container);
    this.powerups.add(this.poweruporange._container);

    //ENEMIES
    this.enemies = this.game.add.group();

    this.enemyred= this.game.add.group();
    this.enemygreen= this.game.add.group();
    this.enemyyellow= this.game.add.group();
    this.enemyblue= this.game.add.group();

    this.enemies.add(this.enemyred._container);
    this.enemies.add(this.enemygreen._container);
    this.enemies.add(this.enemyyellow._container);
    this.enemies.add(this.enemyblue._container);
    //this.game.add(createpwp, this)

    //this.game.add(createpwp, this);

    //Crea "enemy"
    /*this.enemy.body.velocity.x = -200;
    this.enemy.body.velocity.y = +100;
    this.enemy.anchor.setTo(0.5, 0.75);
    this.enemy.name = 'enemy';*/

        //  An explosion pool
    this.explosions = this.game.add.group();
    this.explosions.createMultiple(this.nEnemies, 'kaboom');
    this.explosions.forEach(function (enemy) {
      enemy.anchor.x = 0.5;
      enemy.anchor.y = 0.5;
      enemy.animations.add('kaboom'); 
      }, this);


      
    //Bucle que crea el grupo de enemigos
    for (var i = 0; i < this.nEnemies; i++)
    {
        var b = this.enemyred.create(0, 0, 'enemyred', 24, true);
        b.name = 'enemyred' + i;
        b.exists = false;
        b.visible = false;
        b.anchor.setTo(0.5, 0.5);
        b.events.onOutOfBounds.add(function (enemy) {
        enemy.kill();
      }, this);
    }

    },

    resetenemy: function() {
      enemy.kill();
    },

    

     createpwp: function() {

    var pwp;

    // Of course, the pwps created will belong to their respective groups
    if (Math.random() > 0.5)
    {
        pwp = this.powerupgreen.create(360 + Math.random() * 200, 0, 'pwpgreen');
        pwp.name = 'pwpgreen';
        pwp.animations.add('fly');
        pwp.animations.play('fly', 24, true);
        pwp.body.velocity.y = +300;
        pwp.anchor.setTo(0.5, 0.5);
    }
    else
    {
        pwp = this.powerupblue.create(360 + Math.random() * 200, 0, 'pwpblue');
        pwp.name = 'pwpblue';
        pwp.animations.add('fly');
        pwp.animations.play('fly', 24, true);
        pwp.body.velocity.y = +300;
        pwp.anchor.setTo(0.5, 0.5);
    }
    
},

    createBullets: function(bullet, typebullet) {
      for (var i = 0; i < 10; i++)
        {
          if(typebullet==1)
            {
                var b = this.bullets.create(0, 0, 'bulletblue');
                b.name = 'bulletblue' + i;
            }
          if(typebullet==2)
            {
              var b = this.bullets.create(0, 0, 'bulletgreen');
              b.name = 'bulletgreen' + i;
            }
          if(typebullet==3)
            {
              var b = this.bullets.create(0, 0, 'bulletorange');
              b.name = 'bulletorange' + i;
            }
            b.exists = false;
            b.visible = false;
            b.anchor.setTo(0.5, 0.5);
            b.events.onOutOfBounds.add(this.resetBullet, this);
        }
    },
    



    update: function () {
      //Hace que el fondo se desplace verticalmente
      this.starfield.tilePosition.y += 1;

      //Controles y movimiento de la nave
      var x, y, cx, cy, angle, scale;

      x = this.input.position.x;
      y = this.input.position.y;

      this.createBullets(this.bullet,this.typebullet);

      /*if (this.game.time.now > this.lastTime) {
        var v = this.enemyred.create(Math.random()*400, 0, 'enemyred', 24, true);
        this.lastTime = this.game.time.now + 3000
      }*/

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
      this.playerEmitter.x = this.player.x;
      
      //enemy
      /*if (this.enemy.x <= this.enemy.width/2) {
          this.enemy.body.velocity.x = 200;
      }

      else if (this.enemy.x >= this.game.width-this.enemy.width/2 ) {
        this.enemy.body.velocity.x = -200;
      }*/

      this.generateenemy();

      this.fireBullet();
      //collision
      this.game.physics.overlap(this.enemies, this.bullets, function (enemy, bullet) {
        enemy.kill();
        bullet.kill();
        this.score += 5;
        this.scoreText.content = this.scoreString + this.score;
        this.explosion = this.explosions.getFirstDead();
        this.explosion.reset(enemy.body.x, enemy.body.y);
        this.explosion.play('kaboom', 11, false, true);
      } , null, this);

      this.game.physics.overlap(this.powerups, this.bullets, function (powerup, bullet) {
        if(powerup.name=='pwpblue')
        {
          this.typebullet=1;
        }
        else if(powerup.name=='pwpgreen')
        {
          this.typebullet=2;
        }
        else if(powerup.name=='pwporange')
        {
          this.typebullet=3;
        }
        powerup.kill();
        bullet.kill();
      } , null, this);
      //this.game.physics.overlap(this.enemies, this.player, this.resetGame, null, this);
    },
    

  fireBullet : function() {
    if(this.typebullet =1)
    {
        if (this.game.time.now > this.bulletTime && (this.bulletCounter % 3) != 2)
        {
            this.bullet = this.bullets.getFirstExists(false);

            if (this.bullet)
            {
                this.bullet.reset(this.player.x, this.player.y -80);
                this.bullet.body.velocity.y = -1000;
                this.bulletTime = this.game.time.now + 200;
                this.bulletCounter++;
                this.laser1sound.play();
            }
        }
        else if (this.game.time.now > this.bulletTime && (this.bulletCounter % 3) == 2) {
          this.bulletTime = this.game.time.now + 320;
          this.bulletCounter++;  
        }
    }
    

  },
  /*setupInvader: function (enemy) {
      this.enemy.anchor.x = 0.5;
      this.enemy.anchor.y = 0.5;
      this.enemy.animations.add('kaboom');
    },*/

//  Called if the bullet goes out of the screen
resetBullet : function (bullet) {
    bullet.kill();
},  

generateenemy : function() {

    if (this.game.time.now > this.enemyTime )
    {
      this.enemy = this.enemies.getFirstExists(false);
        if (this.enemy)
        {
            this.createpwp();
            this.enemy.reset(this.game.width * Math.random(), -this.enemy.height);
            this.enemy.animations.add('fly');
            this.enemy.animations.play('fly', 24, true);
            this.enemy.body.velocity.y = +300;
            this.enemyTime = this.game.time.now + 400;
        }
    }

  },


  resetGame: function () {
      this.tryAgainVoice.play();
      this.game.state.start('menu');
      this.music.pause();
      this.score=0;
    },


    onInputDown: function (bullet) {
      this.tryAgainVoice.play();
      this.game.state.start('menu');
      this.music.pause();
    }

  };
  

  window['space-shooter'] = window['space-shooter'] || {};
  window['space-shooter'].Game = Game;

}());

/*
//  When a bullet hits an alien we kill them both
    //this.enemies.kill();
    //this.enemies.kill();*/

    //this.bullet.kill();
    //this.enemmie.kill();
    //  Increase the score
    //this.score += 5;
    //this.scoreText.content = this.scoreString + this.score;*/
/*
    //  And create an explosion :)
    var explosion = explosions.getFirstDead();
    explosion.reset(alien.body.x, alien.body.y);
    explosion.play('kaboom', 30, false, true);*/

    /*if (aliens.countLiving() == 0)
    {
        score += 1000;
        scoreText.content = scoreString + score;

        enemyBullets.callAll('kill',this);
        stateText.content = " You Won, \n Click to restart";
        stateText.visible = true;

        //the "click to restart" handler
        game.input.onTap.addOnce(restart,this);
    }*/
