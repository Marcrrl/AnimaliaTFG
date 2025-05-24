export class Game4 extends Phaser.Scene {
    constructor() {
        super("Game4");
    }

    preload() {
        this.load.image("background", "./assets/FondoJuegos.png");
        this.load.image("intro1", "./assets/Fondo Juego4.png");
        this.questionsData = [
            {
                question: "Si avistas un tigre en peligro de extinción, deberías:",
                options: [
                    "Acercarte para alimentarlo",
                    "Tomarle una foto y subirla a Animalia",
                    "Informar a las autoridades de conservación local",
                    "Intentar llevarlo a tu casa para protegerlo",
                ],
                correctIndex: 2,
            },
            {
                question:
                    "Al encontrar una tortuga marina en la playa, lo correcto es:",
                options: [
                    "Llevarla a casa como mascota",
                    "Dejarla tranquila y observar desde lejos",
                    "Tocarla para ver si está viva",
                    "Moverla hacia el agua rápidamente",
                ],
                correctIndex: 1,
            },
            {
                question: "Si encuentras un águila herida, debes:",
                options: [
                    "Llamar a un centro de rescate de vida silvestre",
                    "Intentar curarla tú mismo",
                    "Liberarla en otro lugar",
                    "Tomarle fotos y subirlas a redes sociales",
                ],
                correctIndex: 0,
            },
            {
                question: "Al observar ballenas desde un barco, es importante:",
                options: [
                    "Acercar el barco lo máximo posible",
                    "Hacer ruido para que salgan a la superficie",
                    "Arrojar comida al agua",
                    "Mantener una distancia segura para no perturbarlas",
                ],
                correctIndex: 3,
            },
            {
                question:
                    "Si encuentras un mercado vendiendo productos de animales en peligro, debes:",
                options: [
                    "Comprarlos para salvar al animal",
                    "Denunciar a las autoridades",
                    "Ignorarlo, no es tu problema",
                    "Negociar para conseguir un mejor precio",
                ],
                correctIndex: 1,
            },
            {
                question: "Al avistar un rinoceronte en un safari, es correcto:",
                options: [
                    "Bajar del vehículo para verlo mejor",
                    "Hacer ruido para llamar su atención",
                    "Permanecer en silencio y a distancia adecuada",
                    "Retarle a una carrera",
                ],
                correctIndex: 2,
            },
            {
                question: "Si encuentras huevos de tortuga en la playa, debes:",
                options: [
                    "Llevártelos para protegerlos",
                    "No tocarlos y notificar a las autoridades",
                    "Moverlos a un lugar más seguro",
                    "Hacer una tortilla francesa con ellos",
                ],
                correctIndex: 1,
            },
            {
                question:
                    "Para ayudar a conservar el hábitat de los animales en peligro, puedes:",
                options: [
                    "Cazar especies invasoras por tu cuenta",
                    "Construir refugios en áreas naturales",
                    "Apoyar organizaciones de conservación",
                    "Liberar mascotas exóticas en la naturaleza",
                ],
                correctIndex: 2,
            },
            {
                question: "Si ves a alguien molestando a un animal protegido, debes:",
                options: [
                    "Unirte a ellos para no parecer aguafiestas",
                    "Enfrentarte físicamente a esa persona",
                    "Ignorarlo, no es tu problema",
                    "Informar a la autoridad correspondiente",
                ],
                correctIndex: 3,
            },
            {
                question: "La mejor manera de aprender sobre animales en peligro es:",
                options: [
                    "Visitando zoológicos éticos y centros de conservación",
                    "Comprándolos como mascotas",
                    "Viendo videos de personas interactuando con ellos",
                    "Buscándolos en su hábitat sin guía",
                ],
                correctIndex: 0,
            },
        ];
    }

    create() {
        const { width, height } = this.scale;
        const margin = 100;

        this.backgroundImage = this.add
            .image(width / 2, height / 2, "background")
            .setDisplaySize(width, height);
        this.introImage = this.add
            .image(width / 2, height / 2 - margin / 2, "intro1")
            .setOrigin(0.5);
        const btnY = height - margin / 2 - 20;
        const btnW = 200;
        const btnH = 50;
        const gap = 30;
        const difficulties = [
            { label: "Fácil", rounds: 7 },
            { label: "Normal", rounds: 10 },
            { label: "Difícil", rounds: 15 },
        ];
        this.difficultyButtons = [];
        difficulties.forEach((dif, i) => {
            const btnX = width / 2 + (i - 1) * (btnW + gap);
            const btnContainer = this.add.container(btnX, btnY);
            const btnBg = this.add
                .rectangle(0, 0, btnW, btnH, 0xd1ab71)
                .setOrigin(0.5);
            const btnText = this.add
                .text(0, 0, dif.label, {
                    fontFamily: "Questrial",
                    fontSize: "24px",
                    fill: "#fff",
                })
                .setOrigin(0.5);
            btnContainer.add([btnBg, btnText]);
            btnContainer.setSize(btnW, btnH);
            btnContainer.setInteractive({ useHandCursor: true });
            btnContainer.on("pointerover", () => btnBg.setFillStyle(0x8ea19b));
            btnContainer.on("pointerout", () => btnBg.setFillStyle(0xd1ab71));
            btnContainer.on("pointerdown", () => {
                this.introImage.destroy();
                this.difficultyButtons.forEach((b) => b.destroy());
                this.maxRounds = dif.rounds;
                this.initGame();
            });
            this.difficultyButtons.push(btnContainer);
        });
    }

    initGame() {
        const { width, height } = this.scale;

        this.availableQuestions = [...this.questionsData];
        this.correctCount = 0;
        this.round = 0;
        this.optionButtons = [];
        this.questionText = this.add
            .text(width / 2, 100, "", {
                fontFamily: "Questrial",
                fontSize: "24px",
                fill: "#fff",
                align: "center",
                wordWrap: { width: width - 100 },
                shadow: { offsetX: 2, offsetY: 2, color: "#000", blur: 4, fill: true },
            })
            .setOrigin(0.5);
        this.feedbackText = this.add
            .text(width / 2, height - 50, "", {
                fontFamily: "Questrial",
                fontSize: "32px",
                fill: "#fff",
                align: "center",
                shadow: { offsetX: 2, offsetY: 2, color: "#000", blur: 4, fill: true },
            })
            .setOrigin(0.5);
        this.nextRound();
    }

    nextRound() {
        const { width, height } = this.scale;
        this.optionButtons.forEach((btn) => btn.destroy());
        this.optionButtons = [];

        if (this.round >= this.maxRounds || this.availableQuestions.length === 0) {
            this.showResults();
            return;
        }

        this.round++;
        const idx = Phaser.Math.Between(0, this.availableQuestions.length - 1);
        this.currentQuestion = this.availableQuestions.splice(idx, 1)[0];
        this.questionText.setText(this.currentQuestion.question);
        this.feedbackText.setText("");
        const buttonHeight = 60;
        const buttonWidth = width * 0.8;
        const buttonGap = 20;
        const startY = 200;
        this.currentQuestion.options.forEach((option, i) => {
            const y = startY + i * (buttonHeight + buttonGap);

            const btnContainer = this.add.container(width / 2, y);
            const btnBg = this.add
                .rectangle(0, 0, buttonWidth, buttonHeight, 0xd1ab71)
                .setOrigin(0.5)
                .setStrokeStyle(2, 0xffffff);

            const btnText = this.add
                .text(0, 0, option, {
                    fontFamily: "Questrial",
                    fontSize: "20px",
                    fill: "#fff",
                    align: "center",
                    wordWrap: { width: buttonWidth - 20 },
                })
                .setOrigin(0.5);

            btnContainer.add([btnBg, btnText]);
            btnContainer.setSize(buttonWidth, buttonHeight);
            btnContainer.setInteractive({ useHandCursor: true });

            btnContainer.on("pointerover", () => btnBg.setFillStyle(0x8ea19b));
            btnContainer.on("pointerout", () => btnBg.setFillStyle(0xd1ab71));
            btnContainer.on("pointerdown", () => this.checkAnswer(i, btnBg));

            this.optionButtons.push(btnContainer);
        });
    }

    checkAnswer(selectedIndex, selectedBg) {
        this.optionButtons.forEach((btn) => btn.disableInteractive());
        const isCorrect = selectedIndex === this.currentQuestion.correctIndex;

        if (isCorrect) {
            this.correctCount++;
            selectedBg.setFillStyle(0x00ff00);
            this.feedbackText.setText("¡Correcto!").setStyle({
                fontFamily: "Questrial",
                fill: "#0f0",
                shadow: { offsetX: 2, offsetY: 2, color: "#000", blur: 4, fill: true },
            });
        } else {
            selectedBg.setFillStyle(0xff0000);

            const correctBg =
                this.optionButtons[this.currentQuestion.correctIndex].getAt(0);
            correctBg.setFillStyle(0x00ff00);

            this.feedbackText.setText("Incorrecto :(").setStyle({
                fontFamily: "Questrial",
                fill: "#f00",
                shadow: { offsetX: 2, offsetY: 2, color: "#000", blur: 4, fill: true },
            });
        }

        this.time.delayedCall(2000, () => this.nextRound());
    }

    showResults() {
        const { width, height } = this.scale;

        this.questionText.destroy();
        this.feedbackText.destroy();
        this.optionButtons.forEach((btn) => btn.destroy());
        
        const experienciaGanada = this.correctCount * 10;

        if (window.gameCompletedCallback) {
            window.gameCompletedCallback(experienciaGanada);
        }

        this.resultText = this.add
            .text(
                width / 2,
                height / 2 - 150,
                `Has acertado ${this.correctCount} de ${this.maxRounds} preguntas.\nExperiencia ganada: ${experienciaGanada} XP`,
                {
                    fontFamily: "Questrial",
                    fontSize: "32px",
                    fill: "#000",
                    align: "center",
                    fontStyle: "bold",
                    stroke: "#fff",
                    strokeThickness: 4,
                    backgroundColor: "#d1ab71",
                    padding: { x: 10, y: 5 },
                    shadow: {
                        offsetX: 2,
                        offsetY: 2,
                        color: "#fff",
                        blur: 6,
                        fill: true,
                    },
                }
            )
            .setOrigin(0.5);

        this.time.delayedCall(4000, () => this.scene.start("Menu"));
    }
}
