import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { PlayerEnum } from '../PlayerEnum';
import Box, { IBoxProps } from './Box';

describe('<Box />', () => {
    test('render Box component correctly', async () => {
        const { findByTestId } = renderBox();

        const boxComponent = await findByTestId("box-button");

        expect(boxComponent).toContainHTML(PlayerEnum.None);
        expect(boxComponent).toHaveClass('box');
    });

    test('render Box component correctly with disability', async () => {
        const { findByTestId } = renderBox({ value: PlayerEnum.X });

        const boxComponent = await findByTestId("box-button");

        expect(boxComponent).toContainHTML(PlayerEnum.X);
        expect(boxComponent).toHaveAttribute('disabled', '');
    });

    test('Box component click event triggers correctly', async () => {
        const onClick = jest.fn();
        const { findByTestId } = renderBox({ onClick });

        const boxComponent = await findByTestId("box-button");

        fireEvent.click(boxComponent);

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    test('Box component click event does not trigger when value is available', async () => {
        const onClick = jest.fn();
        const { findByTestId } = renderBox({ value: PlayerEnum.O, onClick });

        const boxComponent = await findByTestId("box-button");

        fireEvent.click(boxComponent);

        expect(onClick).toHaveBeenCalledTimes(0);
    });
});

function renderBox(props: Partial<IBoxProps> = {}) {
    const defaultProps: IBoxProps = {
        index: 0,
        value: PlayerEnum.None,
        onClick: () => { }
    };
    
    return render(<Box {...defaultProps} {...props} />);
}