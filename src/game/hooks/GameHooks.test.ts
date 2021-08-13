import { PlayerEnum } from './../PlayerEnum';
import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { getInitBoxes } from '../utils/GameUtil';
import { useGameHook } from './GameHooks';

describe('useGameHook', () => {
    test('render useGameHook work correctly', () => {
        const { result } = renderHook(() => useGameHook());

        expect(result.current.boxes).toEqual(getInitBoxes());
        expect(result.current.rewind.length).toBe(0);
    });

    test('check updateValue changes in useGameHook', () => {
        const { result } = renderHook(() => useGameHook());

        act(() => {
            result.current.updateValue(0, PlayerEnum.O);
        });

        expect(result.current.rewind.length).toBe(1);

        act(() => {
            result.current.updateValue(0, PlayerEnum.None);
        });

        expect(result.current.rewind.length).toBe(0);
    });

    test('check reset changes in useGameHook', () => {
        const { result } = renderHook(() => useGameHook());

        act(() => {
            result.current.updateValue(0, PlayerEnum.O);
        });

        expect(result.current.rewind.length).toBe(1);

        act(() => {
            result.current.onReset();
        });

        expect(result.current.rewind.length).toBe(0);
    });
});