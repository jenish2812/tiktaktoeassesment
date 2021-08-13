import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

jest.mock('./game/components/Game', () => () => (<div>Game</div>));

describe('<App />', () => {
  test('render App component correctly', async () => {
    const appComponent = render(<App />);

    expect(appComponent.baseElement).toContainHTML('Game');
  });
});
