import React from 'react';
import { render, getByText } from '@testing-library/react';
import City from '../../../../src/components/Cities/City';
import { cities } from '../../../../src/config';

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children, to }) => {
      return (
        <a href={to}>{children}</a>
      );
    },
  };
});

const city = cities[0];

describe('City', () => {
  test('it should render the city name', () => {
    const { container } = render(<City city={city} />);

    const cityElem = getByText(container, city.name);

    expect(cityElem).toBeTruthy();
  });

  test('it should render a link with the correct href', () => {
    const { container } = render(<City city={city} />);
  
    const links = container.getElementsByTagName('a');

    expect(links[0].href.includes(`/weather?zip=${city.zip}`)).toBeTruthy();
  });
});
