import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import Game from './Game';
import { getInitBoxes } from '../utils/GameUtil';
import { PlayerEnum } from '../PlayerEnum';
import * as GameHooks from '../hooks/GameHooks';
import { IBoxContainerProps } from './BoxContainer';

jest.mock('./BoxContainer', () =>
    (props: IBoxContainerProps) => (
        <button
            onClick={() => props.onBoxClicked(0)}
            data-testid='mock-box'
        >
            BoxContainer
        </button>
    ));

describe('<Game />', () => {
    const defaultHookValue = {
        boxes: getInitBoxes(),
        rewind: [],
        updateValue: jest.fn(),
        onReset: jest.fn(),
    };

    const useGameHookMock = jest.spyOn(GameHooks, 'useGameHook').mockReturnValue(defaultHookValue);

    afterEach(() => {
        useGameHookMock.mockClear();
    })

    test('render Game component correctly', async () => {
        useGameHookMock.mockReturnValue(defaultHookValue);

        const { findByTestId } = renderGame();

        const gameComponent = await findByTestId("game");
        const rewind = await findByTestId("rewind");

        expect(gameComponent).toContainHTML('BoxContainer');
        expect(gameComponent).toContainHTML('Reset Game');
        expect(gameComponent).toContainHTML('Rewind');
        expect(rewind).toHaveAttribute('disabled', '');
    });

    test('check winner criteria', async () => {
        const boxes = Array(9).fill(PlayerEnum.None);
        boxes[0] = PlayerEnum.O;
        boxes[1] = PlayerEnum.O;
        boxes[2] = PlayerEnum.O;

        useGameHookMock.mockReturnValue({
            ...defaultHookValue,
            boxes: boxes,
        });
        const { findByTestId } = renderGame();

        const gameComponent = await findByTestId("game");
        const rewind = await findByTestId("rewind");

        expect(gameComponent).not.toContainHTML('BoxContainer');
        expect(gameComponent).toContainHTML(`${PlayerEnum.O} won the game`);
        expect(gameComponent).toContainHTML('Start Game');
        expect(rewind).toHaveAttribute('disabled', '');
    });

    test('check tie criteria', async () => {
        const rewind = Array(9).fill(0);

        useGameHookMock.mockReturnValue({
            ...defaultHookValue,
            rewind: rewind,
        });
        const { findByTestId } = renderGame();

        const gameComponent = await findByTestId("game");
        const rewindComponent = await findByTestId("rewind");

        expect(gameComponent).not.toContainHTML('BoxContainer');
        expect(gameComponent).toContainHTML(`Match Tie`);
        expect(rewindComponent).toHaveAttribute('disabled', '');
    });

    test('Box Component work correctly', async () => {
        const mockCallback = jest.fn();
        useGameHookMock.mockReturnValue({
            ...defaultHookValue,
            updateValue: mockCallback,
        });

        const { findByTestId } = renderGame();

        const mockBox = await findByTestId("mock-box");

        fireEvent.click(mockBox);

        expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    test('Reset button work correctly', async () => {
        const resetCallback = jest.fn();
        useGameHookMock.mockReturnValue({
            ...defaultHookValue,
            onReset: resetCallback,
        });

        const { findByTestId } = renderGame();

        const reset = await findByTestId("reset");

        fireEvent.click(reset);

        expect(resetCallback).toHaveBeenCalledTimes(1);
    });

    test('Rewind button work correctly', async () => {
        const rewindCallback = jest.fn();
        useGameHookMock.mockReturnValue({
            ...defaultHookValue,
            rewind: Array(1).fill(0),
            updateValue: rewindCallback,
        });

        const { findByTestId } = renderGame();

        const rewind = await findByTestId("rewind");

        fireEvent.click(rewind);

        expect(rewindCallback).toHaveBeenCalledTimes(1);
    });
});

function renderGame() {
    return render(<Game />);
}