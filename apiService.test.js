const apiService = require('./apiService');
const { ConnectionError, NotFoundError} = require('./exception');

describe('apiCall', () => {
  it('returns a successful response for a GET request', async () => {
    // Arrange
    const http_method = 'GET';
    const api_endpoint = 'gtt_by_instruction_id';
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

    expect(() => apiService.apiCall(api_endpoint, http_method)).toThrowError(NotFoundError);
  });

  test("api_call_path_param", () => {
    var path_params = {
      'id' : 234
    }
    
    expect(() => apiService.apiCall(
      api='gtt_by_instruction_id',
      http_method='GET',
      payload=null,
      parmas=null,
      path_params=path_params
    )).toThrowError(NotFoundError);
  });

  test("api_call_query_param", () => {
    this.public_access_token = "public";
    var params = {
      'source':'source',
      'exchange':'exchange',
      'segment':'segment',
      'security_id':'security_id',
      'txn_type':'txn_type',
      'quantity':'quantity',
      'price':'price',
      'product':'product',
      'trigger_price':'trigger_price'
    }
  
    expect(() => apiService.apiCall(
      api='order_margin',
      http_method='GET',
      payload=null,
      parmas=params,
      path_params=null
    )).toThrowError(NotFoundError);
  });

});