import { PlayerEnum } from './../PlayerEnum';

export function getInitBoxes(): Array<PlayerEnum> {
    return Array(9).fill(PlayerEnum.None);
}

export function getWinner(boxes: Array<PlayerEnum>): PlayerEnum {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (boxes[a] !== PlayerEnum.None && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
            return boxes[a];
        }
    }

    return PlayerEnum.None;
}