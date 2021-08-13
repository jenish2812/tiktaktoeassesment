import {
    memo,
    useCallback,
    useEffect,
    useMemo,
    useState
} from 'react';
import { GameTypeEnum } from '../GameType';
import { useGameHook } from '../hooks/GameHooks';
import { PlayerEnum } from '../PlayerEnum';
import { getWinner } from '../utils/GameUtil';
import BoxContainer from './BoxContainer';

const Game = memo(() => {
    const {
        boxes,
        rewind,
        updateValue,
        onReset,
    } = useGameHook();

    const [player, changePlayer] = useState<PlayerEnum>(PlayerEnum.O);
    const winner: PlayerEnum = useMemo(() => getWinner(boxes), [boxes]);
    const gameType: GameTypeEnum = useMemo(() => {
        if (winner !== PlayerEnum.None) {
            return GameTypeEnum.Win;
        }
        else if (rewind.length === 9) {
            return GameTypeEnum.Tie;
        }

        return GameTypeEnum.Running;
    }, [winner, rewind]);

    const onClickBox = useCallback((index) => {
        updateValue(index, player);
    }, [player, updateValue]);

    const onRewind = useCallback(() => {
        const rewindIndex = rewind[rewind.length - 1];

        updateValue(rewindIndex, PlayerEnum.None);
    }, [rewind, updateValue]);

    useEffect(() => {
        changePlayer(value => value === PlayerEnum.O ? PlayerEnum.X : PlayerEnum.O);
    }, [boxes, changePlayer]);

    return (
        <div data-testid='game'>
            {gameType === GameTypeEnum.Running && <BoxContainer
                boxes={boxes}
                onBoxClicked={onClickBox}
            ></BoxContainer>}

            {gameType === GameTypeEnum.Tie && <h1>Match Tie</h1>}

            {gameType === GameTypeEnum.Win && <h1>{winner} won the game</h1>}

            <button
                data-testid='reset'
                onClick={onReset}>
                {winner !== PlayerEnum.None ? 'Start Game' : 'Reset Game'}
            </button>

            <button
                data-testid='rewind'
                disabled={gameType !== GameTypeEnum.Running || rewind.length === 0}
                onClick={onRewind}>
                Rewind
            </button>
        </div>
    )
});

export default Game;