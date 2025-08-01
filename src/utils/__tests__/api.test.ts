import { fetchUsers, fetchUsersXHR } from '../api';

// Mock fetch globally
global.fetch = jest.fn();

// Mock XMLHttpRequest
const mockXHR = {
  open: jest.fn(),
  send: jest.fn(),
  setRequestHeader: jest.fn(),
  readyState: 4,
  status: 200,
  responseText: JSON.stringify([
    {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      phone: '123-456-7890',
      website: 'https://test.com',
      address: {
        street: 'Test Street',
        suite: 'Apt 1',
        city: 'Test City',
        zipcode: '12345',
        geo: { lat: '0', lng: '0' },
      },
      company: {
        name: 'Test Company',
        catchPhrase: 'Test phrase',
        bs: 'Test bs',
      },
    },
  ]),
  onload: null as (() => void) | null,
  onerror: null as (() => void) | null,
};

// Mock XMLHttpRequest constructor
global.XMLHttpRequest = jest.fn(
  () => mockXHR
) as unknown as typeof XMLHttpRequest;

describe('API Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  describe('fetchUsers', () => {
    it('successfully fetches users from API', async () => {
      const mockUsers = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '123-456-7890',
          website: 'https://john.com',
          address: {
            street: 'Main St',
            suite: 'Apt 1',
            city: 'City',
            zipcode: '12345',
            geo: { lat: '0', lng: '0' },
          },
          company: {
            name: 'Company',
            catchPhrase: 'Phrase',
            bs: 'BS',
          },
        },
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers,
      });

      const result = await fetchUsers();

      expect(result).toEqual(mockUsers);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/users',
        expect.any(Object)
      );
    });

    it('throws error when API response is not ok', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      await expect(fetchUsers()).rejects.toThrow('HTTP error! status: 500');
    });

    it('throws error when fetch fails', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('Network error')
      );

      await expect(fetchUsers()).rejects.toThrow('Network error');
    });
  });

  describe('fetchUsersXHR', () => {
    it('successfully fetches users using XHR', (done) => {
      fetchUsersXHR()
        .then((users) => {
          expect(users).toEqual(JSON.parse(mockXHR.responseText));
          expect(mockXHR.open).toHaveBeenCalledWith(
            'GET',
            'https://jsonplaceholder.typicode.com/users',
            true
          );
          expect(mockXHR.send).toHaveBeenCalled();
          done();
        })
        .catch(done);

      // Simulate successful XHR response
      if (mockXHR.onload) mockXHR.onload();
    });

    it('handles XHR error', (done) => {
      mockXHR.status = 500;

      fetchUsersXHR()
        .then(() => {
          done(new Error('Should have failed'));
        })
        .catch((error) => {
          expect(error.message).toContain('Network error');
          done();
        });

      // Simulate failed XHR response
      if (mockXHR.onerror) mockXHR.onerror();
    });

    it('handles XHR timeout', (done) => {
      mockXHR.readyState = 0;

      fetchUsersXHR()
        .then(() => {
          done(new Error('Should have failed'));
        })
        .catch((error) => {
          expect(error.message).toContain('Network error');
          done();
        });

      // Simulate timeout
      if (mockXHR.onerror) mockXHR.onerror();
    });
  });
});
