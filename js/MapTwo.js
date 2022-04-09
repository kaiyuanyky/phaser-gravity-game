/********************************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2021/22
ID and Name #1 : 1181101903 YeowKaiYuan
Contacts    #1 : 0195905668 1181101903@student.mmu.edu.my
ID and Name #2 : 1181100678 NgWenDong
Contacts    #2 : 0187901655 1181100678@student.mmu.edu.my
********************************************************/

class MapTwo extends MainScene {
    constructor() {
        super('MapTwo');

        this.theme = 'volcano';

        // Player initial position on this map
        this.playerPosition = {
            'x': 190,
            'y': 150
        };

        // Positions of the platforms to be stepped on
        this.platformPositions = [
            // Platform at the top (1)
            [-0.1, 0.4],
            [0.92, 0.4],
            // Platform at the top (2)
            [7.50, 0.4],
            [8.55, 0.4],
            // Platform at the top (3)
            [10.5, 0.4],
            // Platform at the top (4)
            [11.5, 0.4],

            // Platforms to step on
            [0.50, 5.8],
            [2.35, 8.6],
            [3.05, 4.5],
            [4.55, 8.5],
            [6.75, 4.8],
            [9.0, 10.5],
            [11.7, 8.2],
            [13.8, 6.3],
            [15.8, 4.0],
            [15.5, 9.5],
        ];

        // Positions of the small rocks to be stepped on
        this.rockPositions = [
            [0.15, 3.5],
            [0.95, 11.5],
            [3.85, 10.5],
            [6.00, 6.5],
            [7.00, 11.5],
            [8.25, 7.5],
            [10.55, 4.5],
            [14.35, 12.5],
        ];

        // Positions of the coins (physic formulas) to be collected
        this.coinPositions = [
            [0.22, 2.0],
            [0.85, 10.5],
            [3.85, 8.0],
            [5.75, 2.8],
            [5.68, 10.5],
            [6.70, 4.5],
            [8.55, 1.5],
            [11.60, 11.5],
            [13.10, 7.5],
        ];

        // Positions of the enemies (campfire)
        this.enemyPositions = [
            [1.1, 5.4],
            [2.7, 3.9],
            [3.2, 11.0],
            [9.7, 6.0],
            [11.2, 6.0],
        ];
    }
}