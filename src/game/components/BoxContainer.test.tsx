import React from 'react';
import { render } from '@testing-library/react';
import { PlayerEnum } from '../PlayerEnum';
import BoxContainer, { IBoxContainerProps } from './BoxContainer';

jest.mock('./Box', () => () => (<div>test</div>));

describe('<BoxContainer />', () => {
    test('render BoxContainer component correctly', async () => {
        const totalBoxes: number = 9;
        const { findByTestId } = renderBoxContainer({ boxes: Array(totalBoxes).fill(PlayerEnum.None) });

        const boxContainerComponent = await findByTestId("box-container");

        expect(boxContainerComponent.children.length).toEqual(totalBoxes);
        expect(boxContainerComponent).toHaveClass('box-container');
    });
});

function renderBoxContainer(props: Partial<IBoxContainerProps> = {}) {
    const defaultProps: IBoxContainerProps = {
        boxes: [],
        onBoxClicked: () => { }
    };

    return render(<BoxContainer {...defaultProps} {...props} />);
}