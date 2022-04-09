/********************************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2021/22
ID and Name #1 : 1181101903 YeowKaiYuan
Contacts    #1 : 0195905668 1181101903@student.mmu.edu.my
ID and Name #2 : 1181100678 NgWenDong
Contacts    #2 : 0187901655 1181100678@student.mmu.edu.my
********************************************************/

class MapThree extends MainScene {
    constructor() {
        super('MapThree');

        this.theme = 'snow';

        // Player initial position on this map
        this.playerPosition = {
            'x': 330,
            'y': 80
        };

        // Positions of the platforms to be stepped on
        this.platformPositions = [
            [0.5, 13.0],
            [6.9, 3.7],
            [12.8, 3.5],
            [15.8, 0.6],
            [15.8, 3.5],
        ];

        // Positions of the small rocks to be stepped on
        this.rockPositions = [
            [1.5, 3.5],
            [3.6, 11.5],
            [5.6, 9.5],
            [9.3, 6.0],
            [11.8, 5.5],
            [14.5, 9.5],
        ];

        // Positions of the coins (physic formulas) to be collected
        this.coinPositions = [
            [1.1, 11.0],
            [6.2, 1.7],
            [11.0, 1.5],
        ];

        // Positions of the enemies (snowman)
        this.enemyPositions = [
            [0.7, 12.8],
            [4.6, 9.0],
            [5.9, 2.0],
            [11.71, 8.2],
        ];
    }
}