export class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    preload() {
        this.load.image('background', './assets/Fondo Juegos.png');
    }

    create() {
        const { width, height } = this.scale;
        this.add.image(width / 2, height / 2, 'background').setDisplaySize(width, height);
        const imageW = width / 2;
        const imageH = height / 2;
        const options = [
            { scene: 'Game1', label: 'Identifica el animal' },
            { scene: 'Game2', label: 'Adivina el Hábitat' },
            { scene: 'Game3', label: 'Especies Protegidas' },
            { scene: 'Game4', label: 'Actuación ante Avistamiento' }
        ];
        options.forEach((opt, idx) => {
            const x = (idx % 2) * imageW;
            const y = Math.floor(idx / 2) * imageH;
            const rect = this.add.rectangle(x, y, imageW, imageH, 0x0000ff)
                .setOrigin(0, 0)
                .setStrokeStyle(4, 0xffffff)
                .setInteractive({ useHandCursor: true });
            this.add.text(x + imageW / 2, y + imageH / 2, opt.label, { fontFamily: 'Questrial', fontSize: '24px', fill: '#fff' })
                .setOrigin(0.5);
            rect.on('pointerdown', () => { this.scene.start(opt.scene); });
        });
    }
}
