var PMClient = require('../pmClient').PMClient

var connect = new PMClient(api_key="api_key",api_secret="api_secret")

connect.generate_session(request_token="your_request_token")

connect.set_access_token("your_access_token")
connect.set_public_access_token("your_public_access_token")
connect.set_read_access_token("your_read_access_token")

connect.get_user_details()
    .then(function(response){
        console.log(response)
    })
    .catch(function(err){
        console.log(err);
    })