import React from 'react';
import { render, fireEvent, getByPlaceholderText, getByText } from '@testing-library/react';
import Search from '../../../../src/components/Header/Search';

describe('Search', () => {
  let emit;

  beforeAll(() => {
    ({ emit } = window._virtualConsole);
  });

  beforeEach(() => {
    window._virtualConsole.emit = jest.fn();
  });

  afterAll(() => {
    window._virtualConsole.emit = emit;
  });

  it('should handle passed in text correctly', () => {
    const { container } = render(
      <Search
        text="123"
        handleSearch={() => {}}
        handleTextChange={() => {}}
      />
    );

    const input = getByPlaceholderText(container, 'Enter zip code...');

    expect(input.value).toBe('123');
  });

  it('should pass text to the parent component correctly', () => {
    const handleTextChange = jest.fn();

    const { container } = render(
      <Search
        text=""
        handleSearch={() => {}}
        handleTextChange={handleTextChange}
      />
    );

    const input = getByPlaceholderText(container, 'Enter zip code...');

    fireEvent.change(input, { target: { value: '1' } });

    expect(handleTextChange).toHaveBeenCalledWith('1');
  });

  it('should handle submitting the form correctly', () => {
    const handleSearch = jest.fn();

    const { container } = render(
      <Search
        text=""
        handleSearch={handleSearch}
        handleTextChange={() => {}}
      />
    );

    const button = getByText(container, 'Search');

    fireEvent.click(button);

    expect(handleSearch).toHaveBeenCalledTimes(1);
  });
});

// test('Search functionality', () => {
//   const handleSearch = jest.fn();
//   const { container } = render(<Search handleSearch={handleSearch} />);

//   const input = getByPlaceholderText(container, 'Enter zip code...');
//   const button = getByText(container, 'Search');

//   expect(input.value).toBe('');

//   fireEvent.change(input, { target: { value: '12345' } });

//   expect(input.value).toBe('12345');

//   fireEvent.click(button);

//   expect(input.value).toBe('');

//   expect(handleSearch).toHaveBeenCalledWith('12345');
// });
