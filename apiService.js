const request = require('request');
const querystring = require('querystring');
const endpoints = require('./constants').endpoints;
const exception = require('./exception');


this.apiCall = function(api,http_method,payload=null,params=null){
    var request_body = JSON.stringify(payload);               //converts the arguments to JSON form
    var query_param = querystring.stringify(params);          //converts the arguments to query_param
    if (params != null){
        var url = endpoints['host']+endpoints[api]+'?'+query_param;   
    }
    else{
        var url = endpoints['host']+endpoints[api];
    }
    var options = {
        headers: {'Content-Type' : 'application/json'},
        url: url,
        body: request_body,
        method: http_method
    }

    if (payload == null){
        delete options["body"];
    }

    options['headers']['x-jwt-token'] = this.access_token
    
    if (url == endpoints['host']+endpoints['security_master']){              //setting the Content-Type if data is in CSV form
        options['headers']['Content-Type'] = 'application/vnd.ms-excel';   
    }

    //request method to call the apis
    return new Promise(function(resolve,reject){
        request(options, function(error, response, body){
            if(body){
                if (response.statusCode != 200){
                    if (response.statusCode == 401) {
                        throw new exception.ConnectionError(body);
                    } else if (response.statusCode == 400) {
                        throw new exception.AttributeError(body);
                    } else if (response.statusCode == 404) {
                        throw new exception.NotFoundError(body);
                    } else if (response.statusCode == 415) {
                        throw new exception.MediaTypeError(body);
                    } else if (response.statusCode == 500) {
                        throw new exception.ServerError(body);
                    } else {
                        throw new exception.OtherError(body);
                    }
                }
                resolve(body);
            } else {
                reject(error);
            }
        });
    });
}
