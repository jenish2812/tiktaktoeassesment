import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { PlayerEnum } from '../PlayerEnum';
import { getInitBoxes, getWinner } from './GameUtil';

describe('GameUtil', () => {
    test('getInitBoxes returns correctly', () => {
        const result: Array<PlayerEnum> = Array(9).fill(PlayerEnum.None);
        expect(getInitBoxes()).toEqual(result);
    });

    test('getWinner returns player if condition fulfill properly', () => {
        const boxes: Array<PlayerEnum> = Array(9).fill(PlayerEnum.None);
        const player: PlayerEnum = PlayerEnum.O;
        boxes[0] = player;
        boxes[1] = player;
        boxes[2] = player;

        expect(getWinner(boxes)).toEqual(player);
    });

    test('getWinner returns None if condition is not fulfill properly', () => {
        const boxes: Array<PlayerEnum> = Array(9).fill(PlayerEnum.None);
        const player: PlayerEnum = PlayerEnum.O;
        boxes[0] = player;

        expect(getWinner(boxes)).toEqual(PlayerEnum.None);
    });
});