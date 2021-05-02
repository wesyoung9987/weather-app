import React from 'react';
import { render, fireEvent, getByPlaceholderText, getByText } from '@testing-library/react';
import Header from '../../../src/components/Header';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => {
      return {
        push: mockPush,
      };
    },
  };
});

describe('Header', () => {
  test('search functionality', () => {
    const { container } = render(<Header />);
  
    const input = getByPlaceholderText(container, 'Enter zip code...');
    const button = getByText(container, 'Search');
  
    expect(input.value).toBe('');
  
    fireEvent.change(input, { target: { value: '12345' } });
  
    expect(input.value).toBe('12345');
  
    fireEvent.click(button);
  
    expect(input.value).toBe('');
  
    expect(mockPush).toHaveBeenCalledWith('/weather?zip=12345');
  });
});
