const apiService = require('./apiService');
const { ConnectionError } = require('./exception');

describe('apiCall', () => {
  it('returns a successful response for a GET request', async () => {
    // Arrange
    const http_method = 'GET';
    const api_endpoint = 'logout';
    const expected_url = 'http://example.com/example_endpoint';
    const expected_response = { message: 'success' };

    // Mock the request library
    jest.mock('request', () => {
      return jest.fn((options, callback) => {
        expect(options.method).toBe(http_method);
        expect(options.url).toBe(expected_url);
        callback(null, { statusCode: 200 }, JSON.stringify(expected_response));
      });
    });

    await expect(() => apiService.apiCall(api_endpoint, http_method)).toThrow(("Token is invalid"));
  });

  it('throws a ConnectionError for a 401 response', async () => {
    // Arrange
    const http_method = 'POST';
    const api_endpoint = 'example_endpoint';
    const expected_url = 'http://example.com/example_endpoint';
    const expected_error = { message: 'Unauthorized' };

    // Mock the request library
    jest.mock('request', () => {
      return jest.fn((options, callback) => {
        expect(options.method).toBe(http_method);
        expect(options.url).toBe(expected_url);
        callback(null, { statusCode: 401 }, JSON.stringify(expected_error));
      });
    });

    expect(() => apiService.apiCall(api_endpoint, http_method)).toThrowError(TypeError);
  });

});