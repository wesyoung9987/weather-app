import { useQuery } from '../../src/hooks';

jest.mock('react-router-dom', () => {
  return {
    useLocation: () => {
      return {
        search: 'test=123',
      };
    },
  };
});

describe('useQuery', () => {
  test('it returns the query object', () => {
    const query = useQuery();
  
    expect(query.get('test')).toBe('123');
  });
});
