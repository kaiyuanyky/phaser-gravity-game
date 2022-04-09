/********************************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2021/22
ID and Name #1 : 1181101903 YeowKaiYuan
Contacts    #1 : 0195905668 1181101903@student.mmu.edu.my
ID and Name #2 : 1181100678 NgWenDong
Contacts    #2 : 0187901655 1181100678@student.mmu.edu.my
********************************************************/

class MainScene extends Phaser.Scene {
    constructor(map){
        super(map);
        this.map = map

        // Mapping of current level to the next level
        this.nextMap = {
            'MapOne': 'MapTwo',
            'MapTwo': 'MapThree',
            'MapThree': 'MapPreWinning',
            'MapPreWinning': 'MapWin',
        }
    }

    // Load all the resources (image and audio)
    preload() {
        this.loadImages();
        this.loadAudios();
    }

    create() {
        // Get the player as defined in config.js
        var inputPlayer = player;

        gameState.active = true;

        // Create the animations
        this.createObjectAnimations();
        this.createPlayerAnimations(inputPlayer.name, inputPlayer.frameRate, inputPlayer.startEnd);
        
        // Create the background including parallax background
        this.createBackgrounds();
        // Create the objects including exit, score text, platforms, rocks, coins, and enemies
        this.createObjects();
        // Create the player using the input read from config.js
        this.createPlayer(inputPlayer);

        this.physics.world.setBounds(0, -gameState.player.height, gameState.width, gameState.background.height + gameState.player.height * 2);
        // Set the camera bounds as the bound of the background size
        this.cameras.main.setBounds (0, 0, gameState.background.width, gameState.background.height);
        // Camera follows the player smoothly
        this.cameras.main.startFollow(gameState.player, true, 0.9, 0.9);
        
        // Add the collider including world bound, exit, player, platforms, rocks, coins, and enemies
        this.addColliders();
        // Able to react to key pressed
        gameState.cursors = this.input.keyboard.createCursorKeys();

        // Create the background music and sound effects
        this.createSounds();
    }

    update() {
        // If the game is still active, detect key pressed and perform corresponding actions
        if(gameState.active) {
            this.reactToKeyPressed();
        }

        // If the player fall out the map (top or bottom), restart the current level
        if ((gameState.player.y > gameState.background.height + 30) || (gameState.player.y < -30)) {
            this.restart();
        }
    }

    // Create the animations of campfire, snowman, and the exit portal
    createObjectAnimations() {
        this.anims.create({
            key: 'campfire-anim',
            frames: this.anims.generateFrameNumbers('campfire'),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'snowman-anim',
            frames: this.anims.generateFrameNumbers('snowman', {start: 0, end: 3}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'portal',
            frames: this.anims.generateFrameNumbers('teleport'),
            frameRate: 7,
            repeat: -1
        });
    }

    // Create the player's animations of resting, running, and jumping
    createPlayerAnimations(name, frameRate, startEnd) {
        this.anims.create({
            key: 'rest',
            frames: this.anims.generateFrameNumbers(name, {start: startEnd.rest[0], end: startEnd.rest[1]}),
            frameRate: frameRate.rest,
            repeat: -1
        });

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers(name, {start: startEnd.run[0], end: startEnd.run[1]}),
            frameRate: frameRate.run,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers(name, {start: startEnd.jump[0], end: startEnd.jump[1]}),
            frameRate: frameRate.jump,
            repeat: -1
        });
    }

    createBackgrounds() {
        // Set the game background color
        this.cameras.main.setBackgroundColor(themes[this.theme]['bgColor']);

        // Create the background image
        gameState.background = this.add.image(0, 0, themes[this.theme]['bgMap']).setOrigin(0,0);
        
        // Set the image scale to fit the game width
        var ratio = this.getRatio(gameState.background.width, gameState.background.height);
        gameState.background.setScale(ratio);
        gameState.background.setSize(gameState.width, config.height)

        // Set the scroll factor of the background
        const widthBg = gameState.background.getBounds().width;
        gameState.background.setScrollFactor((widthBg - config.width) / (gameState.width - config.width));
        
        // Create the corresponding parallax background on different map (forest and snow)
        switch(this.theme) {
            case 'forest':
                // Create vine background with scroll factor
                gameState.vine = this.add.image(0, 0, 'bg-map1-vine').setScale(0.55).setOrigin(0,0);
                const widthVine = gameState.vine.getBounds().width;
                gameState.vine.setScrollFactor((widthVine - config.width) / (gameState.width - config.width));
                return;
            case 'snow':
                // Create parallax background with scroll factor
                gameState.snowParallax = this.add.image(0, 0, 'bg-map3-parallax').setOrigin(0,0);
                const widthSnowParallax = gameState.snowParallax.getBounds().width;
                gameState.snowParallax.setScrollFactor((widthSnowParallax - config.width) / (gameState.width - config.width));
                // Create the snow effect if the theme is snow
                this.createSnowEffect();
                return;
            default:
                return;
        }
    }

    createObjects() {
        // The text of the scoring system at top-right
        gameState.scoreText = this.add.bitmapText(config.width * 0.7, 15, 'carrier_command', `Scores: ${gameState.totalScore}`, 16);
        // Set to 10 to make sure it appears in front of every other objects (similar to z-index)
        gameState.scoreText.depth = 10;
        gameState.scoreText.setScrollFactor(0);
        // Set the color of the score text
        gameState.scoreText.setTint(themes[this.theme]['textColor']);

        // Create the exit portal with animation
        gameState.portal = this.physics.add.sprite(gameState.width - 100,  50, 'teleport').setScale(1.3);
        gameState.portal.anims.play('portal', true);
        
        // Create the platforms to be stepped on
        gameState.platforms = this.physics.add.staticGroup();
        this.createPlatforms();

        // Create the small rocks to be stepped on
        gameState.rocks = this.physics.add.staticGroup();
        this.createRocks();

        // Create the coins
        gameState.coins = [];
        this.createCoins();

        // Create the enemies
        gameState.enemies = [];
        this.createEnemies();
    }

    // Create the player with the gravity
    createPlayer(player) {
        gameState.player = this.physics.add.sprite(this.playerPosition.x, this.playerPosition.y, player.name);
        gameState.player.inverted = false;
        gameState.player.body.gravity.y = gameState.gravity * 1/2;
    }

    // Create the small rocks to be stepped on by using the positions from each map
    createRocks() {
        for(const [x,y] of this.rockPositions) {
            if(typeof x === 'number' && typeof parseInt(y) === 'number') {
                gameState.rocks.create(x * 200,  y * 57, themes[this.theme]['rock']).setOrigin(0, 0.5).setScale(0.1).refreshBody();
            }
        }
    }

    // Create the platforms to be stepped on by using the positions from each map
    createPlatforms() {
        for(const [x,y] of this.platformPositions) {
            if(typeof x === 'number' && typeof parseInt(y) === 'number') {
                gameState.platforms.create(x * 200,  y * 57, themes[this.theme]['bgPlatform']).setOrigin(0, 0.5).refreshBody();
            }
        }
    }

    // Randomly create the coins with bouncing
    createCoins() {
        for(const [x,y] of this.coinPositions) {
            if(typeof x === 'number' && typeof parseInt(y) === 'number') {
                var coin = "coin" + (Math.floor(Math.random() * 3) + 1);
                gameState.coins.push(this.physics.add.sprite(x * 250,  y * 50, coin).setScale(0.25).setBounce(1));
            }
        }
    }

    // If the current map is volcano, create the campfire enemies
    // if the current map is snow, create the snowman enemies
    createEnemies() {
        if (this.theme === 'volcano') {
            var enemyText = 'campfire';
        }
        if (this.theme === 'snow') {
            var enemyText = 'snowman';
        }

        for(const [x,y] of this.enemyPositions) {
            if(typeof x === 'number' && typeof parseInt(y) === 'number') {
                var enemy = this.physics.add.sprite(x * 250,  y * 50, enemyText).setScale(2);
                enemy.anims.play(enemyText + '-anim', true);
                gameState.enemies.push(enemy);
            }
        }
    }

    addColliders() {
        // Add colliders between platforms and the others
        this.physics.add.collider(gameState.portal, gameState.platforms);
        this.physics.add.collider(gameState.player, gameState.platforms);
        this.physics.add.collider(gameState.coins, gameState.platforms);
        this.physics.add.collider(gameState.enemies, gameState.platforms);

        // Add colliders between the small rocks and the others
        this.physics.add.collider(gameState.player, gameState.rocks);
        this.physics.add.collider(gameState.coins, gameState.rocks);
        this.physics.add.collider(gameState.enemies, gameState.rocks);
        
        // If the player overlaps with the portal, means exit to the next map
        this.physics.add.overlap(gameState.player, gameState.portal,
            () => {
                this.cameras.main.fade(300, // duration in milliseconds
                    0, 0, 0, // amount to fade the red, green, blue channels towards
                    false,   // true or false, force the effect to start immediately, even if already running 
                    function(camera, progress) {                        
                        if (progress > .9) {
                            // The score collected on current map, is added to the total score
                            gameState.totalScore += gameState.score;
                            // Clear the score of current map when moving to the next map.
                            gameState.score = 0;

                            // Remove all the sounds on current map before moving to the next map
                            this.removeAllSounds();
                            gameState.bgmPlayed = false;
                            gameState.soundEffectsCreated = false;
                            
                            // Stop current map and move to the next map
                            this.scene.stop(this.map);
                            this.scene.start(this.nextMap[this.map]);
                        }
                    }
                );
            }
        );

        // If the player collects a coin, the sound effect is played, 
        // the coin is disappeared (destroyed), and the score is updated
        this.physics.add.overlap(gameState.player, gameState.coins,
            (player, coin) => {
                gameState.coinSound.play();
                coin.destroy();
                this.updateScore();
            }
        );

        // If the player touches the enemy, restart the current map
        this.physics.add.overlap(gameState.player, gameState.enemies,
            (player, enemy) => {
                this.restart();
            }
        );
    }

    // Used to remove all the sounds before moving to the next map to save memory
    removeAllSounds() {
        this.sound.sounds.forEach(function (sound) {
            sound.destroy();
        });

        this.sound.sounds.length = 0;
    }

    createSounds() {
        // Sound effects (These would be called each time and become duplicated after each death)
        if (!gameState.soundEffectsCreated) {
            gameState.coinSound = this.sound.add('coin');

            // The sounds are created, set to true, next round will not create duplicated sounds to save memory
            gameState.soundEffectsCreated = true;
        }

        // Play the background musci if it is not played yet
        // Otherwise it means the player fall out of the map, just continue playing the music, no need to replay
        if (!gameState.bgmPlayed) {
            // Play the background music
            gameState.bgm = this.sound.add(themes[this.theme]['bgm'], {loop: true, volume: gameState.volume});
            gameState.bgm.play();

            // To continue playing background music when not focusing (switch tab, program, etc)
            this.sound.pauseOnBlur = false;
        }
    }

    // This functions is invoked when the player is on the third map
    // it is used to create the snow effects
    createSnowEffect() {
        gameState.snow = this.add.particles('snowflake');
        gameState.snowEmitter = gameState.snow.createEmitter({
            scale: {
                start: 0.5,
                end: 0
            },
            speedX: {
                min: -5,
                max: -250
            },
            speedY: {
                min: 300,
                max: 500
            },
            x: {
                min: 0,
                max: gameState.width * 2
            },
            y: -5,
            quantity: 15,
            blendMode: 'ADD',
            lifespan: 3000
        });
    }

    // Used to get the ratio of scaling the background size to the game width
    getRatio(w,h) {
        // Find the ratio for X and Y
        var ratioX = config.width / w
        var ratioY = config.height / h

        // Find the largest ratio between ratioX and ratioY, that is used to scale the win board
        return Math.max(ratioX, ratioY)
    }

    // Used to adding the score and updating the text at top-right
    updateScore() {
        // Each map has different score for each coin, as defined in config.js
        gameState.score += themes[this.theme]['score'];
        gameState.scoreText.setText(`Scores: ${gameState.totalScore + gameState.score}`);
    }

    // Flipping the player vertically and its gravity
    flipGravity() {
        if (!gameState.player.inverted) {
            gameState.player.inverted = true;
            gameState.player.body.gravity.y = -gameState.gravity * 2;
            gameState.player.flipY = true;
        } else {
            gameState.player.inverted = false;
            gameState.player.body.gravity.y = gameState.gravity * 1/2;
            gameState.player.flipY = false;
        }
    }

    reactToKeyPressed() {
        // Reset the player's acceleration
        gameState.player.setAccelerationX(0);

        // If 'TAB' is pressed and released, flip the gravity
        if (Phaser.Input.Keyboard.JustUp(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB))) {
            this.flipGravity();
        }

        // If 'LEFT' is pressed, move the player towards left
        if (gameState.cursors.left.isDown) {
            gameState.player.flipX = true;
            gameState.player.anims.play('run', true);
            gameState.player.setVelocityX(-gameState.speed);

            // If 'S' is pressed, the player starts to accelerate
            if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown) {
                gameState.player.setAccelerationX(-gameState.acceleration);
            }
        }
        // If 'RIGHT' is pressed, move the player towards right
        else if (gameState.cursors.right.isDown) {
            gameState.player.flipX = false;
            gameState.player.anims.play('run', true);
            gameState.player.setVelocityX(gameState.speed);

            // If 'S' is pressed, the player starts to accelerate
            if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown) {
                gameState.player.setAccelerationX(gameState.acceleration);
            }
        }
        // Otherwise the player is not moving
        else {
            gameState.player.setVelocityX(0);
            gameState.player.anims.play('rest', true);
        }

        // If 'SPACE' is pressed, and the player is not moving in y-axis, the player is able to jump
        if (Phaser.Input.Keyboard.JustDown(gameState.cursors.space) && gameState.player.body.velocity.y == 0) {
            var flag = (gameState.player.inverted) ? 3/4 : -1;
            gameState.player.setVelocityY(gameState.jump * flag);
            gameState.player.anims.play('jump', true);
        }
        
        // If the player is not on the floor and not on the ceiling, means
        // it is moving in y-axis, hence animate the jump animation
        if (!gameState.player.body.onFloor() && !gameState.player.body.onCeiling()) {
            gameState.player.anims.play('jump', true);
        }
    }

    // This function is invoked when the player fall out of the map
    restart() {
        // The score collected on current map is reset, and the game is restarted
        // The background music continues to play
        this.cameras.main.shake(200, 0.01, false, function(camera, progress) {
            if (progress > 0.9) {
                gameState.score = 0;
                gameState.bgmPlayed = true;
                this.scene.restart();
            }
        });
    }

    loadImages() {
        //console.log(game.textures.exists('player'))

        // Bitmap Font for score text
        this.load.bitmapFont('carrier_command', 'bitmapFonts/carrier_command.png', 'bitmapFonts/carrier_command.xml');

        // Player character
        this.load.spritesheet('player', 'img/player/player.png', {frameWidth: 70, frameHeight: 90});

        // Enemies
        this.load.spritesheet('snowman', 'img/enemies/snowman.png', {frameWidth: 50, frameHeight: 70});
        this.load.spritesheet('campfire', 'img/enemies/campfire.png', {frameWidth: 32, frameHeight: 32});

        // Exit portal
        this.load.spritesheet('teleport', 'img/portal/teleport.png', {frameWidth: 84, frameHeight: 88});

        // Coins
        this.load.image('coin1', 'img/coins/coin1.png');
        this.load.image('coin2', 'img/coins/coin2.png');
        this.load.image('coin3', 'img/coins/coin3.png');

        // Backgrounds for different maps
        this.load.image('bg-map1', 'img/backgrounds/bg1.png');
        this.load.image('bg-map1-vine', 'img/backgrounds/bg1-vine.png');
        this.load.image('bg-map2', 'img/backgrounds/bg2.png');
        this.load.image('bg-map3', 'img/backgrounds/bg3.png');
        this.load.image('bg-map3-parallax', 'img/backgrounds/bg3-parallax.png');
        
        // Platforms for different maps
        this.load.image('pf-forest', 'img/platforms/platform-forest.png');
        this.load.image('pf-volcano', 'img/platforms/platform-volcano.png');
        this.load.image('pf-snow', 'img/platforms/platform-snow.png');
        this.load.image('pf-pre-winning', 'img/platforms/platform-pre-winning.png');

        // Small rocks for different maps
        this.load.image('rock-forest', 'img/rocks/rock-forest.png');
        this.load.image('rock-volcano', 'img/rocks/rock-volcano.png');
        this.load.image('rock-snow', 'img/rocks/rock-snow.png');

        // Others
        this.load.image('snowflake', 'img/others/snowflake.png');
    }

    loadAudios() {
        // Sound effects
        this.load.audio('coin', 'audio/sound-effects/sound-coin.mp3');
        this.load.audio('hit', 'audio/sound-effects/sound-got-hit-by-trophy.mp3');
        this.load.audio('victory', 'audio/sound-effects/sound-victory.mp3');

        // Background musics for different maps
        this.load.audio('bgm1', 'audio/bgm/bg-map1.mp3');
        this.load.audio('bgm2', 'audio/bgm/bg-map2.mp3');
        this.load.audio('bgm3', 'audio/bgm/bg-map3.mp3');
    }
}