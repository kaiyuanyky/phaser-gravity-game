/********************************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2021/22
ID and Name #1 : 1181101903 YeowKaiYuan
Contacts    #1 : 0195905668 1181101903@student.mmu.edu.my
ID and Name #2 : 1181100678 NgWenDong
Contacts    #2 : 0187901655 1181100678@student.mmu.edu.my
********************************************************/

const gameState = {
    width: 3400,
    jump: 500,
    gravity: 800,
    speed: 250,
    acceleration: 15000,
    score: 0,
    totalScore: 0,
    volume: 0.5,
    bgmPlayed: false,
    soundEffectsCreated: false
};

const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 800,

    fps: {
        target: 60
    },

    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: gameState.gravity
            },
            enableBody: false,
        }
    },

    // ScaleManager (For screen responsiveness)
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },

    scene: [MapInstruction, MapOne, MapTwo, MapThree, MapPreWinning, MapWin]
};

const game = new Phaser.Game(config);