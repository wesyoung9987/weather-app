import React from 'react';
import renderer from 'react-test-renderer';
import App from '../src/App';

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children, to }) => {
      return (
        <a href={to}>{children}</a>
      );
    },
    Switch: ({ children }) => {
      return (
        <div>{children}</div>
      );
    },
    Route: ({ children }) => {
      return (
        <div>{children}</div>
      );
    },
    Redirect: ({ children, to }) => {
      return (
        <div to={to}>{children}</div>
      );
    },
    useHistory: () => {
      return {
        push: jest.fn(),
      };
    },
    useLocation: () => {
      return {
        search: 'test=123',
      };
    },
  };
});

describe('App', () => {
  test('it should render correctly', () => {
    const tree = renderer
      .create(<App />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

