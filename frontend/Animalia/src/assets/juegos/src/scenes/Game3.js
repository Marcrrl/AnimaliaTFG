export class Game3 extends Phaser.Scene {
    constructor() {
        super('Game3');
    }

    preload() {
        this.load.image('background', './assets/FondoJuegos.png');
        this.load.image('intro1', './assets/Fondo Juego3.png');

        this.animalsData = [
            { name: 'Tigre', endangered: true },
            { name: 'León', endangered: true },
            { name: 'Elefante', endangered: true },
            { name: 'Rinoceronte', endangered: true },
            { name: 'Pingüino', endangered: true },
            { name: 'Ballena', endangered: true },
            { name: 'Tortuga', endangered: true },
            { name: 'Águila', endangered: true },
            { name: 'Perro', endangered: false },
            { name: 'Gato', endangered: false },
            { name: 'Mono', endangered: false },
            { name: 'Jirafa', endangered: false },
            { name: 'Cebra', endangered: false },
            { name: 'Zorro', endangered: false },
            { name: 'Lobo', endangered: false },
            { name: 'Conejo', endangered: false },
            { name: 'Cocodrilo', endangered: false },
            { name: 'Hipopótamo', endangered: false },
            { name: 'Delfín', endangered: false }
        ];

        this.animalsData.forEach(animal => {
            this.load.image(animal.name, `assets/${animal.name}.jpg`);
        });
    }

    create() {
        const { width, height } = this.scale;
        const margin = 100;

        this.backgroundImage = this.add.image(width / 2, height / 2, 'background').setDisplaySize(width, height);
        this.introImage = this.add.image(width / 2, height / 2 - margin / 2, 'intro1').setOrigin(0.5);
        const btnY = height - margin / 2 - 20;
        const btnW = 200;
        const btnH = 50;
        const gap = 30;
        const difficulties = [
            { label: 'Fácil', rounds: 7 },
            { label: 'Normal', rounds: 10 },
            { label: 'Difícil', rounds: 15 }
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

        this.availableAnimals = [...this.animalsData];
        this.correctCount = 0;
        this.round = 0;
        this.questionText = this.add.text(width / 2, 100, '', {
            fontFamily: 'Questrial',
            fontSize: '32px',
            fill: '#fff',
            align: 'center',
            shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 4, fill: true }
        }).setOrigin(0.5);

        this.animalImage = null;
        this.createButtons();
        this.nextRound();
    }

    createButtons() {
        const { width, height } = this.scale;
        const btnY = height - 100;
        const btnW = 150;
        const btnH = 60;
        const margin = 100;

        const yesContainer = this.add.container(width / 2 - margin, btnY);
        const yesBg = this.add.rectangle(0, 0, btnW, btnH, 0xd1ab71).setOrigin(0.5);
        const yesText = this.add.text(0, 0, 'SÍ', { fontFamily: 'Questrial', fontSize: '28px', fill: '#fff' }).setOrigin(0.5);
        yesContainer.add([yesBg, yesText]);
        yesContainer.setSize(btnW, btnH);
        yesContainer.setInteractive({ useHandCursor: true });
        yesContainer.on('pointerover', () => yesBg.setFillStyle(0x8ea19b));
        yesContainer.on('pointerout', () => yesBg.setFillStyle(0xd1ab71));
        yesContainer.on('pointerdown', () => this.checkAnswer(true));
        this.yesButton = yesContainer;
        const noContainer = this.add.container(width / 2 + margin, btnY);
        const noBg = this.add.rectangle(0, 0, btnW, btnH, 0xd1ab71).setOrigin(0.5);
        const noText = this.add.text(0, 0, 'NO', { fontFamily: 'Questrial', fontSize: '28px', fill: '#fff' }).setOrigin(0.5);
        noContainer.add([noBg, noText]);
        noContainer.setSize(btnW, btnH);
        noContainer.setInteractive({ useHandCursor: true });
        noContainer.on('pointerover', () => noBg.setFillStyle(0x8ea19b));
        noContainer.on('pointerout', () => noBg.setFillStyle(0xd1ab71));
        noContainer.on('pointerdown', () => this.checkAnswer(false));
        this.noButton = noContainer;

        this.feedbackText = this.add.text(width / 2, height - 170, '', {
            fontFamily: 'Questrial',
            fontSize: '32px',
            fill: '#fff',
            align: 'center',
            shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 4, fill: true }
        }).setOrigin(0.5);
    }

    nextRound() {
        const { width, height } = this.scale;

        if (this.round >= this.maxRounds || this.availableAnimals.length === 0) {
            this.showResults();
            return;
        }

        this.round++;
        const idx = Phaser.Math.Between(0, this.availableAnimals.length - 1);
        this.currentAnimal = this.availableAnimals.splice(idx, 1)[0];

        if (this.animalImage) this.animalImage.destroy();
        this.feedbackText.setText('');

        this.animalImage = this.add.image(width / 2, height / 2, this.currentAnimal.name)
            .setDisplaySize(300, 300)
            .setOrigin(0.5);

        this.questionText.setText(`¿Está este animal en peligro de extinción?`);

        const yesBg = this.yesButton.getAt(0);
        const noBg = this.noButton.getAt(0);
        yesBg.setFillStyle(0xd1ab71);
        noBg.setFillStyle(0xd1ab71);

        this.yesButton.setAlpha(1).setInteractive();
        this.noButton.setAlpha(1).setInteractive();
    }

    checkAnswer(userAnswer) {
        this.yesButton.disableInteractive().setAlpha(0.6);
        this.noButton.disableInteractive().setAlpha(0.6);

        const isCorrect = userAnswer === this.currentAnimal.endangered;

        if (isCorrect) {
            this.correctCount++;
            this.feedbackText.setText('¡Correcto!').setStyle({
                fontFamily: 'Questrial',
                fill: '#0f0',
                shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 4, fill: true }
            });
        } else {
            this.feedbackText.setText('Incorrecto :(').setStyle({
                fontFamily: 'Questrial',
                fill: '#f00',
                shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 4, fill: true }
            });
        }

        this.time.delayedCall(1000, () => this.nextRound());
    }

    showResults() {
        const { width, height } = this.scale;

        if (this.animalImage) this.animalImage.destroy();
        this.yesButton.destroy();
        this.noButton.destroy();
        this.questionText.destroy();
        this.feedbackText.destroy();

        const experienciaGanada = this.correctCount * 10;

        if (window.gameCompletedCallback) {
            window.gameCompletedCallback(experienciaGanada);
        }

        this.resultText = this.add.text(width / 2, height / 2 - 150,
            `Has acertado ${this.correctCount} de ${this.maxRounds} preguntas.\nExperiencia ganada: ${experienciaGanada} XP`, {
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
        }).setOrigin(0.5);

        this.time.delayedCall(4000, () => this.scene.start('Menu'));
    }
}
