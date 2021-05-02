import React from 'react';
import { getByText, render } from '@testing-library/react';
import CurrentWeather from '../../../../src/components/Weather/CurrentWeather';

jest.mock('moment', () => {
  return (value) => {
    return {
      format: () => {
        return `some date ${value}`;
      },
    };
  };
});

describe('CurrentWeather', () => {
  test('it should render the current location', () => {
    const data = {
      name: 'Some Location',
    };
    const { container } = render(<CurrentWeather data={data} />);

    const name = getByText(container, 'Some Location');

    expect(name).toBeTruthy();
  });

  test('it should render the weather correctly', () => {
    const data = {
      name: 'Some Location',
      weather: [
        {
          main: 'Cloudy',
          description: 'scattered clouds',
          icon: '123',
        },
      ],
    };
    const { container } = render(<CurrentWeather data={data} />);

    const weather = getByText(container, 'Cloudy - scattered clouds');

    expect(weather).toBeTruthy();

    const images = container.getElementsByTagName('img');

    expect(images[0].src).toBe('http://openweathermap.org/img/wn/123@2x.png');
  });

  test('it should render the wind correctly', () => {
    const data = {
      name: 'Some Location',
      wind: {
        speed: 5,
      },
    };
    const { container } = render(<CurrentWeather data={data} />);

    const wind = getByText(container, '5 mph');

    expect(wind).toBeTruthy();
  });

  test('it should render the sunrise and sunset correctly', () => {
    const data = {
      name: 'Some Location',
      sys: {
        sunrise: 5,
        sunset: 10,
      },
    };
    const { container } = render(<CurrentWeather data={data} />);

    const sunrise = getByText(container, 'some date 5000');
    const sunset = getByText(container, 'some date 10000');

    expect(sunrise).toBeTruthy();
    expect(sunset).toBeTruthy();
  });

  test('it should render the temperature correctly', () => {
    const data = {
      name: 'Some Location',
      main: {
        temp: 65,
        feels_like: 60,
        humidity: 10,
      },
    };
    const { container } = render(<CurrentWeather data={data} />);

    const temp = getByText(container, '65°');
    const feelsLike = getByText(container, '60°');
    const humidity = getByText(container, '10%');

    expect(temp).toBeTruthy();
    expect(feelsLike).toBeTruthy();
    expect(humidity).toBeTruthy();
  });
});
