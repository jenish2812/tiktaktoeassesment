import { FC, memo, useCallback } from 'react';
import { PlayerEnum } from '../PlayerEnum';
import '../styles/Box.css';

const DEFAULT_CLASS_NAME = 'box';

export interface IBoxProps {
    index: number;
    value: PlayerEnum;
    onClick: (key: number) => void;
}

const Box: FC<IBoxProps> = memo((props: IBoxProps) => {
    const {
        index,
        value,
        onClick,
    } = props;

    const onButtonClick = useCallback(() => {
        onClick(index);
    }, [index, onClick]);

    return (
        <button
            data-testid='box-button'
            className={DEFAULT_CLASS_NAME}
            onClick={onButtonClick}
            disabled={value !== PlayerEnum.None}
        >
            {value}
        </button>
    );
});

export default Box;