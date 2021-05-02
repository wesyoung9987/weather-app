import React from 'react';
import { render, getByText } from '@testing-library/react';
import Cities from '../../../src/components/Cities';
import { cities } from '../../../src/config';

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children, to }) => {
      return (
        <a href={to}>{children}</a>
      );
    },
  };
});

describe('Cities', () => {
  test('it should render a city for each city', () => {
    const { container } = render(<Cities />);
  
    for (let i = 0; i < cities.length; i++) {
      const city = getByText(container, cities[i].name);
  
      expect(city).toBeTruthy();
    }
  });
});

