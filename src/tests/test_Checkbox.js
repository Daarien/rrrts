import React from 'react';
import Checkbox from './Checkbox';
import { render, fireEvent, cleanup } from 'react-testing-library';

afterEach(cleanup);

it('should change label after click', () => {
    const { queryByLabelText, getByLabelText } = render(
        <Checkbox labelOn='On' labelOff='off' />
    );

    expect(queryByLabelText(/off/i)).toBeTruthy();

    fireEvent.click(getByLabelText(/off/i));

    expect(queryByLabelText(/on/i)).toBeTruthy();
});