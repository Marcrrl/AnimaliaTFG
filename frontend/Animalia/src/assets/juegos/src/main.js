import { Menu } from './scenes/Menu.js';
import { Game1 } from './scenes/Game1.js';
import { Game2 } from './scenes/Game2.js';
import { Game3 } from './scenes/Game3.js';
import { Game4 } from './scenes/Game4.js';

const config = {
    type: Phaser.AUTO,
    title: 'Selector de Juegos',
    description: '',
    parent: 'game-container',
    width: 1513,
    height: 693,
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [ Menu, Game1, Game2, Game3, Game4 ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}

new Phaser.Game(config);
