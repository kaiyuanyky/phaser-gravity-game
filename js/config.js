/********************************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2021/22
ID and Name #1 : 1181101903 YeowKaiYuan
Contacts    #1 : 0195905668 1181101903@student.mmu.edu.my
ID and Name #2 : 1181100678 NgWenDong
Contacts    #2 : 0187901655 1181100678@student.mmu.edu.my
********************************************************/

// It is used to create the player in MainScene
player = {
    name: 'player',

    frameRate: {
        rest: 5,
        run: 10,
        jump: 10,
    },

    startEnd: {
        rest: [0,3],
        run: [4,9],
        jump: [10,12],
    }
}

// Different values to be used on different maps
themes = {
    'forest': {
        'score': 10,
        'bgColor': 0x285A13,
        'textColor': 0xECDCCC,
        'bgm': 'bgm1',
        'bgMap': 'bg-map1',
        'bgPlatform': 'pf-forest',
        'rock': 'rock-forest',
    },
    'volcano': {
        'score': 30,
        'bgColor': 0xAE503E,
        'textColor': 0xFFFFFF,
        'bgm': 'bgm2',
        'bgMap': 'bg-map2',
        'bgCloud': 'bg-map2-cloud',
        'bgPlatform': 'pf-volcano',
        'rock': 'rock-volcano',
    },
    'snow': {
        'score': 50,
        'bgColor': 0x2E95E2,
        'textColor': 0xECDCCC,
        'bgm': 'bgm3',
        'bgMap': 'bg-map3',
        'bgPlatform': 'pf-snow',
        'rock': 'rock-snow',
    },
    'prewinning': {
        'bgColor': 0xFFFFFF,
        'textColor': 0x000000,
        'bgm': '',
        'bgMap': 'bg-prewinning',
        'bgPlatform': 'pf-pre-winning',
    },
}