export class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    preload() {
        this.load.image('background', './assets/Fondo Juegos.png');
        this.load.image('fondomenu1', './assets/fondomenu1.png');
        this.load.image('fondomenu2', './assets/fondomenu2.png');
        this.load.image('fondomenu3', './assets/fondomenu3.png');
        this.load.image('fondomenu4', './assets/fondomenu4.png');
        this.load.image('logo', './assets/Logo.png');
    }

    create() {
        const { width, height } = this.scale;
        this.add.image(width / 2, height / 2, 'background').setDisplaySize(width, height);
        const imageW = width / 2;
        const imageH = height / 2;
        const options = [
            { scene: 'Game1', background: 'fondomenu1' },
            { scene: 'Game2', background: 'fondomenu2' },
            { scene: 'Game3', background: 'fondomenu3' },
            { scene: 'Game4', background: 'fondomenu4' }
        ];
        options.forEach((opt, idx) => {
            const x = (idx % 2) * imageW;
            const y = Math.floor(idx / 2) * imageH;
            
            const buttonBg = this.add.image(x + imageW / 2, y + imageH / 2, opt.background)
                .setDisplaySize(imageW, imageH)
                .setInteractive({ useHandCursor: true });
            
            const border = this.add.graphics();
            border.lineStyle(2, 0xd1ab71);
            border.strokeRect(x, y, imageW, imageH);
            
            this.add.text(x + imageW / 2, y + imageH / 2, opt.label, { 
                fontFamily: 'Questrial', 
                fontSize: '24px', 
                fill: '#fff',
                stroke: '#000',
                strokeThickness: 2
            }).setOrigin(0.5);
            
            buttonBg.on('pointerdown', () => { this.scene.start(opt.scene); });
        });

        const logoSize = Math.min(width, height) * 0.15;
        this.add.image(width / 2, height / 2, 'logo')
            .setOrigin(0.5)
            .setDisplaySize(logoSize, logoSize);
    }
}
