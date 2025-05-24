export class Start extends Phaser.Scene {
    constructor() {
        super("Start");
    }

    preload() {
        this.load.image("background", "./assets/Fondo Juegos.png");
    }

    create() {
        this.background = this.add.tileSprite(640, 360, 1280, 720, "background");
    }

    update() { }
}
