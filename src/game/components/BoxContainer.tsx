import { FC, memo } from 'react';
import { PlayerEnum } from '../PlayerEnum';
import Box from './Box';
import '../styles/BoxContainer.css';

const DEFAULT_CLASS_NAME = 'box-container';

export interface IBoxContainerProps {
    boxes: Array<PlayerEnum>;
    onBoxClicked: (key: number) => void;
}

const BoxContainer: FC<IBoxContainerProps> = memo((props: IBoxContainerProps) => {
    const {
        boxes,
        onBoxClicked,
    } = props;

    return (
        <div data-testid='box-container' className={DEFAULT_CLASS_NAME}>
            {boxes.map((value, index) => {
                return (
                    <Box
                        key={index}
                        index={index}
                        onClick={onBoxClicked}
                        value={value}
                    ></Box>
                )
            })}
        </div>
    );
});

export default BoxContainer;