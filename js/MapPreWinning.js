/********************************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2021/22
ID and Name #1 : 1181101903 YeowKaiYuan
Contacts    #1 : 0195905668 1181101903@student.mmu.edu.my
ID and Name #2 : 1181100678 NgWenDong
Contacts    #2 : 0187901655 1181100678@student.mmu.edu.my
********************************************************/

class MapPreWinning extends MainScene {
    constructor() {
        super('MapPreWinning');
        
        this.theme = 'prewinning';

        // The platforms to be stepped on (a row of clouds)
        this.platformPositions = [
            [-0.1, 13.9],
            [0.4, 13.9],
            [0.9, 13.9],
            [1.4, 13.9],
            [1.9, 13.9],
            [2.4, 13.9],
            [2.9, 13.9],
            [3.4, 13.9],
            [3.9, 13.9],
            [4.4, 13.9],
        ];

        // Angle used for rotating the trophy when dropping from the sky
        this.angle = 5;
    }

    preload() {
        // Background image
        this.load.image('bg-prewinning', 'img/backgrounds/bg-prewinning.png');

        // Platform
        this.load.image('pf-pre-winning', 'img/platforms/platform-pre-winning.png');

        // Trophy
        this.load.image('trophy', 'img/others/trophy.png');
    }

    create() {
        gameState.active = true;

        // Create the background and resize it according to the scale
        gameState.background = this.add.image(config.width / 2, config.height / 2, 'bg-prewinning')
        gameState.trophy = this.physics.add.sprite(config.width / 2, 0, 'trophy').setGravityY(-gameState.gravity + 300);
        this.resizeImages();

        // Create the platforms
        gameState.platforms = this.physics.add.staticGroup();
        super.createPlatforms();

        // Create the player and its animation
        gameState.player = this.physics.add.sprite(config.width / 2, config.height - 200, player.name);
        super.createPlayerAnimations(player.name, player.frameRate, player.startEnd);

        // Add the collider including player, trophy, and world bounds
        this.addColliders();

        // Able to react to key pressed
        gameState.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (gameState.active) {
            // Rotate the angle of trophy
            gameState.trophy.angle += this.angle;

            // Detect which key is pressed and perform corresponding actions
            super.reactToKeyPressed();
        }
    }

    addColliders() {
        // Set world bounds so that the player and trophy would not fall out of bounds
        gameState.player.setCollideWorldBounds(true);
        gameState.trophy.setCollideWorldBounds(true);

        // So that the player can stand on the cloud platform
        this.physics.add.collider(gameState.player, gameState.platforms);

        // When player collide with trophy, check if player got hit by trophy, or player step on it
        this.physics.add.collider(gameState.player, gameState.trophy,
            () => {
                // When the player got hit by the trophy
                if (gameState.player.body.touching.up) {
                    this.playerGotHit();
                }
                
                // When the player step on the trophy
                if(gameState.trophy.body.touching.up) {
                    this.trophyGotStepped();
                }
            }
        );

        // When the trophy reached the ground, stop rotating the trophy
        this.physics.add.collider(gameState.trophy, gameState.platforms,
            () => {
                this.angle = 0;
            }
        );
    }

    playerGotHit() {
        // When got hit, game is set to not active, and the scene is paused
        gameState.active = false;
        this.scene.pause();

        if (!gameState.bgmPlayed) {
            // Set the angle to 0 so that the trophy stopped rotating
            this.angle = 0;
            // Create the text containing game over message
            this.createText();

            // Play the music after hit
            gameState.bgm = this.sound.add('hit', {volume: gameState.volume / 4});
            gameState.bgm.play();

            // Optional: Music continues to play after switching tab, program, etc.
            this.sound.pauseOnBlur = false;
         
            // If 'R' is pressed, the page is reloaded and the game is restarted
            document.onkeydown = function(e) {
                if (!gameState.active && (e.code === 'KeyR')) {
                    location.reload();
                }
            };
        }
    }

    trophyGotStepped() {
        this.cameras.main.fade(300,     // duration in milliseconds
            0, 0, 0, // amount to fade the red, green, blue channels towards
            false,   // true or false, force the effect to start immediately, even if already running 
            function(camera, progress) {                        
                if (progress > .9) {
                    gameState.coinSound = this.sound.add('coin', {volume: gameState.volume * 1.5});
                    gameState.coinSound.play();

                    // Proceed to the final map, and the game is completed
                    this.scene.stop(this.map);
                    this.scene.start(this.nextMap[this.map]);
                }
            }
        );
    }

    createText() {
        // Create the text at specific position of size 20
        gameState.restartText = this.add.bitmapText((config.width / 9), (config.height / 3), 'carrier_command', 'You got hit. Press \'R\' to restart.', 20);

        // Set the text color to the corresponding color as defined in config.js
        gameState.restartText.setTint(themes[this.theme]['textColor']);
        gameState.restartText.depth = 1;

        // Create a blinking effect by making the text to be visible and not visible every 500ms
        setInterval(
            function() {
                gameState.restartText.visible = !gameState.restartText.visible;
            },
            500
        );
    }

    resizeImages() {
        // Get the ratio for x and y
        var ratioX = config.width / gameState.background.width
        var ratioY = config.height / gameState.background.height
        var ratio = Math.max(ratioX, ratioY);

        // Set the size of the background image according the ratio
        gameState.background.setScale(ratio);
        gameState.trophy.setScale(0.6);
    }
}