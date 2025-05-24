export class Game1 extends Phaser.Scene {
    constructor() {
        super('Game1');
    }

    preload() {
        this.animalList = ['Perro','Gato','Elefante','Mono','León','Tigre','Jirafa','Cebra','Oso','Zorro','Lobo','Conejo','Cocodrilo','Rinoceronte','Hipopótamo','Pingüino','Delfín','Ballena','Tortuga','Águila'];
        this.load.image('background', 'assets/Fondo Juegos.png');
        this.load.image('intro1', 'assets/Fondo Juego1.png');
        this.animalList.forEach(name => {
            this.load.image(name, `assets/${name}.jpg`);
        });
    }

    create() {
        const { width, height } = this.scale;
        const margin = 100;
        this.add.image(width/2, height/2, 'background').setDisplaySize(width, height);
        this.availableQuestions = this.animalList.slice();
        this.correctCount = 0;
        this.round = 0;
        this.maxRounds = 10;
        this.optionImages = [];
        this.optionBorders = [];
        this.questionText = this.add.text(width/2, height - margin/2, '', {
            fontFamily: 'Questrial',
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#d1ab71',
            padding: { x: 10, y: 5 },
            shadow: { offsetX: 1, offsetY: 1, color: '#000', blur: 2, fill: true }
        }).setOrigin(0.5);

        this.introImage = this.add.image(width/2, height/2 - margin/2, 'intro1').setOrigin(0.5);

        const btnY = height - margin/2 - 20;
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
            const btnX = width/2 + (i-1)*(btnW+gap);
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
                this.nextRound();
            });
            this.difficultyButtons.push(btnContainer);
        });
    }

    nextRound() {
        const { width, height } = this.scale;
        const margin = 100;
        const imageW = width / 2;
        const imageH = (height - 2 * margin) / 2;
        const imgW = imageW * 0.65;
        const imgH = imageH;
        this.optionBorders.forEach(rect => rect.destroy());
        this.optionBorders = [];
        this.optionImages.forEach(img => img.destroy());
        this.optionImages = [];
        if (this.round >= this.maxRounds || this.availableQuestions.length === 0) {
            const totalXP = this.correctCount * 100;
            this.optionBorders.forEach(rect => rect.destroy());
            this.optionBorders = [];
            this.optionImages.forEach(img => img.destroy());
            this.optionImages = [];
            const { width, height } = this.scale;
            this.questionText.setPosition(width/2, height/2 - 150).setOrigin(0.5);
            this.questionText.setText(
                `Has acertado ${this.correctCount} de ${this.maxRounds} preguntas.\nExperiencia: ${totalXP} XP`
            ).setStyle({
                fill: '#000',
                align: 'center',
                fontStyle: 'bold',
                stroke: '#fff',
                strokeThickness: 4
            });
            this.time.delayedCall(4000, () => this.scene.start('Menu'));
            return;
        }
        this.round++;
        const correct = Phaser.Utils.Array.RemoveRandomElement(this.availableQuestions);
        this.correctAnimal = correct;
        const pool = this.animalList.filter(a => a !== correct);
        Phaser.Utils.Array.Shuffle(pool);
        const options = [correct, ...pool.slice(0, 3)];
        Phaser.Utils.Array.Shuffle(options);
        options.forEach((key, idx) => {
            const quadX = (idx % 2) * imageW;
            const quadY = margin + Math.floor(idx / 2) * imageH;
            const x = quadX + (imageW - imgW) / 2;
            const y = quadY + (imageH - imgH) / 2;
            const img = this.add.image(x, y, key)
                .setOrigin(0, 0)
                .setDisplaySize(imgW, imgH)
                .setInteractive({ useHandCursor: true });
            img.on('pointerdown', () => {
                if (key === this.correctAnimal) {
                    this.correctCount++;
                    this.questionText.setText('¡Correcto!').setStyle({ fontFamily: 'Questrial', fill: '#0f0' });
                } else {
                    this.questionText.setText('Incorrecto :(').setStyle({ fontFamily: 'Questrial', fill: '#f00' });
                }
                this.time.delayedCall(1000, () => this.nextRound());
            });
            const rect = this.add.rectangle(x, y, imgW, imgH)
                .setOrigin(0, 0)
                .setStrokeStyle(4, 0xd1ab71);
            this.optionBorders.push(rect);
            this.optionImages.push(img);
        });
        this.questionText.setText(this.correctAnimal).setStyle({ fontFamily: 'Questrial', fill: '#fff' });
    }
}
