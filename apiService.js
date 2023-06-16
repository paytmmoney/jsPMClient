const request = require('request');
const querystring = require('querystring');
const endpoints = require('./constants').endpoints;
const exception = require('./exception');


this.apiCall = function(api,tokens,http_method,payload=null,params=null,path_param=null){
    var request_body = JSON.stringify(payload);               //converts the arguments to JSON form
    var query_param = querystring.stringify(params);          //converts the arguments to query_param
    var url = endpoints.host+api;
    if (path_param != null) {
        for(var key in path_param) {
            url = url.replace("{"+key+"}", path_param[key])
        }
    }
    if (params != null){
        url = url+'?'+query_param;   
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

    options['headers']['x-jwt-token'] = validate_token(tokens,this.access_token,this.public_access_token,this.read_access_token);

    function validate_token(tokens,access_token,public_access_token,read_access_token){
        var jwt_token = null
        if (access_token && tokens.includes('access_token')){
            jwt_token = access_token
        }
        if (public_access_token && tokens.includes('public_access_token')){
            jwt_token = public_access_token
        }
        if (read_access_token && tokens.includes('read_access_token')){
            jwt_token = read_access_token
        }
        if (tokens.length>0 && jwt_token == null){
            throw new exception.NotFoundError("Token is invalid") 
        }
        return jwt_token
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
