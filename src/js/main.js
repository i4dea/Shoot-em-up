window.onload = function () {
  'use strict';

  var game
    , ns = window['space-shooter'];

  game = new Phaser.Game(640, 960, Phaser.AUTO, 'space-shooter-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('menu', ns.Menu);
  game.state.add('submenu', ns.SubMenu);
  game.state.add('game', ns.Game);
  game.state.add('score', ns.Score);

  game.state.start('boot');
};
