/********************************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2021/22
ID and Name #1 : 1181101903 YeowKaiYuan
Contacts    #1 : 0195905668 1181101903@student.mmu.edu.my
ID and Name #2 : 1181100678 NgWenDong
Contacts    #2 : 0187901655 1181100678@student.mmu.edu.my
********************************************************/

class MapWin extends MainScene {
    constructor() {
        super('MapWin');
    }

    preload() {
        // Bitmap Font for displaying text
        this.load.bitmapFont('carrier_command', 'bitmapFonts/carrier_command.png', 'bitmapFonts/carrier_command.xml');

        // Background image
        this.load.image('win-board', 'img/backgrounds/win-board.png');

        // Trophy
        this.load.spritesheet('trophy-shine', 'img/others/trophy-shine.png', {frameWidth: 45, frameHeight: 49});
    }

    create() {
        gameState.winBoard = this.add.image(config.width / 2, config.height / 2 - 50, 'win-board')
        gameState.trophy = this.add.sprite(config.width / 2, (config.height / 2) - 100, 'trophy-shine');

        this.createText();
        this.resizeImages();
        this.createAnimation();

        gameState.victorySound = this.sound.add('victory', {volume: gameState.volume * 1.5});
        gameState.victorySound.play();
    }

    update() {
        gameState.trophy.anims.play('shine', true);

        // If 'R' is pressed, the page is reloaded and the game is restarted
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R).isDown) {
            location.reload();
        }
    }

    createText() {
        // Create the role and score text
        gameState.roleText = this.add.bitmapText(55, 15, 'carrier_command', `${this.getRole()}`, 16).setTint('0x00ff00');
        gameState.totalScoreText = this.add.bitmapText(config.width * 0.7, 15, 'carrier_command', `Scores: ${gameState.totalScore}`, 16);

        // Create the restart text
        gameState.restartText = this.add.bitmapText((config.width / 2) - 222, (config.height - 222), 'carrier_command', 'Press \'R\' to restart.', 20);

        // To display in front (similar to z-index)
        gameState.restartText.depth = 1;

        // Create a blinking effect by making the text to be visible and not visible every 500ms
        setInterval(
            function() {
                gameState.restartText.visible = !gameState.restartText.visible;
            },
            500
        );
    }

    createAnimation() {
        this.anims.create({
            key: 'shine',
            frames: this.anims.generateFrameNumbers('trophy-shine'),
            frameRate: 15,
            repeat: -1
        });
    }

    getRole() {
        var role = '';

        if(gameState.totalScore === 500) {
            role = 'an Expert';
        }
        else if (gameState.totalScore >= 400) {
            role = 'a Professional';
        }
        else if (gameState.totalScore >= 200) {
            role = 'an Intermediate';
        }
        else {
            role = 'a Beginner';
        }

        return role;
    }

    getRatio(w,h) {
        // Find the ratio for width and height
        var ratioX = config.width / w
        var ratioY = config.height / h
        // Find the largest ratio between ratioX and ratioY, that is used to scale the win board
        return Math.max(ratioX, ratioY)
    }

    resizeImages() {
        // Get the ratio and then resize them using the ratio
        var ratio = this.getRatio(gameState.winBoard.width, gameState.winBoard.height);
        gameState.trophy.setScale(ratio)
        gameState.winBoard.setScale(ratio)
    }
}