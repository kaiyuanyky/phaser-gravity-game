/********************************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2021/22
ID and Name #1 : 1181101903 YeowKaiYuan
Contacts    #1 : 0195905668 1181101903@student.mmu.edu.my
ID and Name #2 : 1181100678 NgWenDong
Contacts    #2 : 0187901655 1181100678@student.mmu.edu.my
********************************************************/

class MapOne extends MainScene {
    constructor() {
        super('MapOne');

        this.theme = 'forest';

        // Player initial position on this map
        this.playerPosition = {
            'x': 200,
            'y': 150
        };

        // Positions of the platforms to be stepped on
        this.platformPositions = [
            // Platform at the top (1)
            [-0.1, 0.4],
            [0.65, 0.4],
            // Platform at the top (2)
            [2.30, 0.4],
            [2.95, 0.4],
            // Platform at the top (3)
            [4.75, 0.4],
            // Platform at the top (4)
            [6.75, 0.4],
            [7.50, 0.4],
            // Platform at the top (5)
            [9.5, 0.4],
            // Platform at the top (6)
            [11.5, 0.4],
            // Platform at the top (7)
            [13.5, 0.4],
            [14.1, 0.4],
            // Platform at the top (8)
            [15.8, 0.4],

            // Platforms to step on
            [0.50, 5.8],
            [2.70, 4.9],
            [4.35, 5.5],
            [6.25, 4.8],
            [9.50, 4.5],
            [11.7, 9.8],
            [13.8, 6.3],
            [15.8, 5.3],
            [15.8, 10.5]
        ];

        // Positions of the small rocks to be stepped on
        this.rockPositions = [
            [0.75, 9.5],
            [2.10, 12.5],
            [3.85, 9.5],
            [5.65, 13.5],
            [7.85, 6.5],
            [9.75, 9.5],
            [11.85, 5.5],
            [14.15, 12.5]
        ];

        // Positions of the coins (physic formulas) to be collected
        this.coinPositions = [
            [1.10, 4.5],
            [1.76, 9.5],
            [3.85, 3.5],
            [6.36, 4.8],
            [7.90, 7.5],
            [9.56, 3.5],
            [11.40, 4.5],
            [13.05, 8.8]
        ];

        // No enemies on this map
        this.enemyPositions = [];
    }
}