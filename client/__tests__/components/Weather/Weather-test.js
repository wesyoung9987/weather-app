import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import { useQuery } from '../../../src/hooks';
import Weather from '../../../src/components/Weather';

const mockPush = jest.fn();

jest.mock('axios');
jest.mock('../../../src/hooks');

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => {
      return {
        push: mockPush,
      };
    },
    useLocation: () => {
      return {
        search: 'test=123',
      };
    },
  };
});

describe('Weather', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('it should redirect if the zip is not in the query params', () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: { name: 'Some Location' } }));
    useQuery.mockImplementationOnce(() => {
      return {
        get: () => '',
      };
    });

    render(<Weather />);

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  test('it should render loading correctly', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: { name: 'Some Location' } }));
    useQuery.mockImplementation(() => {
      return {
        get: () => '123',
      };
    });

    const { findByText } = render(<Weather />);

    expect(await findByText('Searching weather for 123...')).toBeTruthy();
  });

  test('it should handle errors correctly', async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error('error')));
    useQuery.mockImplementation(() => {
      return {
        get: () => '123',
      };
    });

    const { findByText } = render(<Weather />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    expect(await findByText('Error loading weather for 123, please try again.')).toBeTruthy();
  });

  test('it should render weather correctly', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: { name: 'Some Location' } }));
    useQuery.mockImplementation(() => {
      return {
        get: () => '123',
      };
    });

    const { findByText } = render(<Weather />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    expect(await findByText('Some Location')).toBeTruthy();
  });
});
