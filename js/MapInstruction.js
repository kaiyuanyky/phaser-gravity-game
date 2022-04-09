/********************************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2021/22
ID and Name #1 : 1181101903 YeowKaiYuan
Contacts    #1 : 0195905668 1181101903@student.mmu.edu.my
ID and Name #2 : 1181100678 NgWenDong
Contacts    #2 : 0187901655 1181100678@student.mmu.edu.my
********************************************************/

class MapInstruction extends Phaser.Scene {
    constructor() {
        super('MapInstruction');
    }

    preload() {
        // Bitmap Font for displaying text
        this.load.bitmapFont('carrier_command', 'bitmapFonts/carrier_command.png', 'bitmapFonts/carrier_command.xml');

        // Keys images
        this.load.image('left', 'img/keys/key-left.png');
        this.load.image('right', 'img/keys/key-right.png');
        this.load.image('tab', 'img/keys/key-tab.png');
        this.load.image('space', 'img/keys/key-space.png');
        this.load.image('s', 'img/keys/key-S.png');

        // Sound effect
        this.load.audio('start', 'audio/sound-effects/sound-coin.mp3');
    }

    create() {
        // Create the 5 keys
        gameState.leftKey = this.add.image((config.width / 2) - 220, (config.height / 2) - 200, 'left').setScale(0.7);
        gameState.rightKey = this.add.image((config.width / 2) - 220, (config.height / 2) - 100, 'right').setScale(0.7);
        gameState.sKey = this.add.image((config.width / 2) - 220, (config.height / 2), 's').setScale(0.7);
        gameState.tabKey = this.add.image((config.width / 2) - 220, (config.height / 2) + 100, 'tab').setScale(0.7);
        gameState.spaceKey = this.add.image((config.width / 2) - 80, (config.height / 2) + 200, 'space').setScale(0.7);

        // Create the instruction texts
        this.createText();
    }

    update() {
        // If 'Enter' is pressed, the would be started
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER).isDown) {
            this.sound.add('start', {volume: gameState.volume * 1.5}).play();
            this.scene.stop('MapInstruction');
            this.scene.start('MapOne');
        }
    }

    createText() {
        // Create the title text
        gameState.title = this.add.bitmapText((config.width / 2) - 395, (config.height / 2) - 330, 'carrier_command', 'Keyboard Control Instruction', 24).setTint('0x00ff00');

        // Create the instruction text for different keys
        gameState.leftKeyText = this.add.bitmapText((config.width / 2) - 120, (config.height / 2) - 210, 'carrier_command', 'Move to the left', 20);
        gameState.rightKeyText = this.add.bitmapText((config.width / 2) - 120, (config.height / 2) - 110, 'carrier_command', 'Move to the right', 20);
        gameState.sKeyText = this.add.bitmapText((config.width / 2) - 120, (config.height / 2) - 10, 'carrier_command', 'Speed up / Boost', 20);
        gameState.tabKeyText = this.add.bitmapText((config.width / 2) - 120, (config.height / 2) + 90, 'carrier_command', 'Flip the gravity', 20);
        gameState.spaceKeyText = this.add.bitmapText((config.width / 2) + 160, (config.height / 2) + 190, 'carrier_command', 'Jump', 20);

        // Create the start text
        gameState.startText = this.add.bitmapText((config.width / 2) - 260, (config.height - 85), 'carrier_command', 'Press \'ENTER\' to start.', 20);
        // To display in front (similar to z-index)
        gameState.startText.depth = 1;

        // Create a blinking effect by making the text to be visible and not visible every 500ms
        setInterval(
            function() {
                gameState.startText.visible = !gameState.startText.visible;
            },
            500
        );
    }
}