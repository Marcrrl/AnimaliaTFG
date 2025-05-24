export class Game2 extends Phaser.Scene {
    constructor() {
        super('Game2');
    }

    preload() {
        this.load.image('background', './assets/FondoJuegos.png');
        this.load.image('intro1', './assets/Fondo Juego2.png');

        this.animalHabitat = [
            { key: 'Elefante', habitat: 'sabana' },
            { key: 'Mono', habitat: 'jungla' },
            { key: 'León', habitat: 'sabana' },
            { key: 'Tigre', habitat: 'jungla' },
            { key: 'Jirafa', habitat: 'sabana' },
            { key: 'Cebra', habitat: 'sabana' },
            { key: 'Cocodrilo', habitat: 'jungla' },
            { key: 'Rinoceronte', habitat: 'sabana' },
            { key: 'Hipopótamo', habitat: 'sabana' },
            { key: 'Pingüino', habitat: 'polar' },
            { key: 'Delfín', habitat: 'marina' },
            { key: 'Ballena', habitat: 'marina' },
            { key: 'Tortuga', habitat: 'marina' }
        ];

        this.animalHabitat.forEach(item => {
            this.load.image(item.key, `assets/${item.key}.jpg`);
        });
    }

    create() {
        const { width, height } = this.scale;
        const margin = 100;
        this.backgroundImage = this.add.image(width / 2, height / 2, 'background').setDisplaySize(width, height);
        this.introImage = this.add.image(width / 2, height / 2 - margin / 2, 'intro1').setOrigin(0.5);

        this.dragHandler = null;
        this.dropHandler = null;

        const btnY = height - margin / 2 - 20;
        const btnW = 200;
        const btnH = 50;
        const gap = 30;
        const difficulties = [
            { label: 'Fácil', rounds: 3 },
            { label: 'Normal', rounds: 5 },
            { label: 'Difícil', rounds: 8 }
        ];
        this.difficultyButtons = [];
        difficulties.forEach((dif, i) => {
            const btnX = width / 2 + (i - 1) * (btnW + gap);
            const btnContainer = this.add.container(btnX, btnY);
            const btnBg = this.add.rectangle(0, 0, btnW, btnH, 0xd1ab71).setOrigin(0.5);
            const btnText = this.add.text(0, 0, dif.label, { fontFamily: 'Questrial', fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
            btnContainer.add([btnBg, btnText]);
            btnContainer.setSize(btnW, btnH);
            btnContainer.setInteractive({ useHandCursor: true });
            btnContainer.on('pointerover', () => btnBg.setFillStyle(0x8ea19b));
            btnContainer.on('pointerout', () => btnBg.setFillStyle(0xd1ab71));
            btnContainer.on('pointerdown', () => {
                this.introImage.destroy();
                this.difficultyButtons.forEach(b => b.destroy());
                this.maxRounds = dif.rounds;
                this.initGame();
            });
            this.difficultyButtons.push(btnContainer);
        });
    }

    initGame() {
        const { width, height } = this.scale;
        const margin = 100;
        const imageW = width / 2;
        const imageH = (height - 2 * margin) / 2;
        this.dropZones = [];
        const imgW = imageW * 0.8;
        const imgH = imageH;
        const habitats = [
            { code: 'sabana', label: 'Sabana', x: 0, y: margin },
            { code: 'jungla', label: 'Jungla', x: imageW, y: margin },
            { code: 'marina', label: 'Marina', x: 0, y: margin + imageH },
            { code: 'polar', label: 'Polar', x: imageW, y: margin + imageH }
        ];
        habitats.forEach((zone, idx) => {
            const quadX = zone.x;
            const quadY = zone.y;
            const x = quadX + (imageW - imgW) / 2;
            const y = quadY + (imageH - imgH) / 2;
            const rect = this.add.rectangle(x, y, imgW, imgH, 0x0000ff, 0.2)
                .setOrigin(0, 0)
                .setStrokeStyle(4, 0xd1ab71);
            const dz = this.add.zone(x, y, imgW, imgH)
                .setOrigin(0, 0)
                .setRectangleDropZone(imgW, imgH);
            dz.habitat = zone.code;
            this.add.text(x + imgW / 2, y + imgH / 2, zone.label, { fontFamily: 'Questrial', fontSize: '24px', fill: '#fff', align: 'center' })
                .setOrigin(0.5);
            this.dropZones.push(dz);
        });

        this.cleanupEventHandlers();
        this.setupEventHandlers();

        const count = this.maxRounds || 5;
        this.availableItems = this.getRandomAnimals(count);
        this.correctCount = 0;
        this.round = 0;
        this.feedbackText = this.add.text(width / 2, height - 50, '', {
            fontFamily: 'Questrial', fontSize: '32px', fill: '#fff', align: 'center',
            shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 4, fill: true }
        }).setOrigin(0.5);
        this.animalBorder = null;
        this.nextRound();
    }

    setupEventHandlers() {
        this.dragHandler = this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.dropHandler = this.input.on('drop', (pointer, gameObject, dropZone) => {
            if (dropZone.habitat === this.currentItem.habitat) {
                this.correctCount++;
                this.feedbackText.setText('¡Correcto!').setStyle({ fontFamily: 'Questrial', fill: '#0f0', shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 4, fill: true } });
            } else {
                this.feedbackText.setText('Incorrecto :(').setStyle({ fontFamily: 'Questrial', fill: '#f00', shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 4, fill: true } });
            }
            gameObject.destroy();
            this.time.delayedCall(1000, () => this.nextRound());
        });
    }

    cleanupEventHandlers() {
        if (this.dragHandler) {
            this.input.off('drag', this.dragHandler);
            this.dragHandler = null;
        }

        if (this.dropHandler) {
            this.input.off('drop', this.dropHandler);
            this.dropHandler = null;
        }
    }

    getRandomAnimals(count) {
        const animals = this.animalHabitat.slice();
        Phaser.Utils.Array.Shuffle(animals);
        return animals.slice(0, Math.min(count, animals.length));
    }

    nextRound() {
        const { width, height } = this.scale;
        if (this.animalBorder) { this.animalBorder.destroy(); }
        if (this.round >= this.maxRounds || this.availableItems.length === 0) {
            this.cleanupEventHandlers();

            this.dropZones.forEach(zone => zone.destroy());
            this.dropZones = [];
            this.children.list.slice().forEach(child => {
                if (child !== this.feedbackText &&
                    child !== this.backgroundImage &&
                    (child.type === 'Rectangle' || child.type === 'Text' || child.type === 'Image')) {
                    child.destroy();
                }
            });

            const experienciaGanada = this.correctCount * 10;

            if (window.gameCompletedCallback) {
                window.gameCompletedCallback(experienciaGanada);
            }

            this.feedbackText.setPosition(width / 2, height / 2 - 150).setOrigin(0.5);
            this.feedbackText.setText(
                `Has acertado ${this.correctCount} de ${this.maxRounds} preguntas.\nExperiencia ganada: ${experienciaGanada} XP`
            ).setStyle({
                fontFamily: 'Questrial',
                fontSize: '32px',
                fill: '#000',
                align: 'center',
                fontStyle: 'bold',
                stroke: '#fff',
                strokeThickness: 4,
                backgroundColor: '#d1ab71',
                padding: { x: 10, y: 5 },
                shadow: { offsetX: 2, offsetY: 2, color: '#fff', blur: 6, fill: true }
            });

            this.time.delayedCall(4000, () => this.scene.start('Menu'));
            return;
        }

        this.round++;
        const idx = Phaser.Math.Between(0, this.availableItems.length - 1);
        this.currentItem = this.availableItems.splice(idx, 1)[0];
        const animalSprite = this.add.image(width / 2, height / 2, this.currentItem.key)
            .setDisplaySize(150, 150)
            .setOrigin(0.5)
            .setInteractive({ draggable: true, useHandCursor: true });

        this.input.setDraggable(animalSprite);

        this.feedbackText.setPosition(width / 2, height - 50).setOrigin(0.5);
        this.feedbackText.setText(`Arrastra el animal a su hábitat`)
            .setStyle({ fontFamily: 'Questrial', fill: '#fff' });
    }
}
