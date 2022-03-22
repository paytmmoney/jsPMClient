var PMClient = require('../pmClient').PMClient

var connect = new PMClient(api_key="api_key",api_secret="api_secret");

connect.generate_session(request_token="request_token")
    .then(function(response){
        console.log(response)
    })
    .catch(function(err){
        console.log(err);
    })

connect.set_access_token("access_token")


connect.get_user_details()
    .then(function(response){
        console.log(response)
    })
    .catch(function(err){
        console.log(err);
    })