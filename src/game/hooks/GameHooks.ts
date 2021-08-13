import { useCallback, useState } from 'react';
import { PlayerEnum } from '../PlayerEnum';
import { getInitBoxes } from '../utils/GameUtil';

export function useGameHook() {
    const [boxes, setBoxes] = useState<Array<PlayerEnum>>(getInitBoxes());
    const [rewind, setRewind] = useState<Array<number>>([]);

    const updateValue = useCallback((index, value) => {
        setRewind(rewindPos => {
            const newRewind = [...rewindPos];
            if (value === PlayerEnum.None) {
                newRewind.pop();
            }
            else {
                newRewind.push(index);
            }

            return newRewind;
        });

        setBoxes(values => {
            const newResults = [...values];
            values[index] = value;

            return newResults;
        });
    }, [setRewind, setBoxes]);

    const onReset = useCallback(() => {
        setRewind([]);
        setBoxes(getInitBoxes());
    }, [setBoxes, setRewind]);

    return {
        boxes,
        updateValue,
        rewind,
        onReset,
    };
}