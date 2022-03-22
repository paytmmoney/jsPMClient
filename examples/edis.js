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

connect.generate_tpin()
    .then(function(response){
        console.log(response)
    })
    .catch(function(err){
        console.log(err);
    })

    // PIN sent on mobile number. Wait for 6 minutes.

connect.validate_tpin(
    trade_type ="PRE",
    isin_list=[  
        {
            "isin": "INE405Y01013",
            "qty": 2
        },
        {
            "isin": "INE421A01028",
            "qty": 3
        }
    ]
)
.then(function(response){
    console.log(response)
})
.catch(function(err){
    console.log(err);
})

// In response, we get the edis_request_id

connect.status(edis_request_id="edis_request_token")
    .then(function(response){
        console.log(response)
    })
    .catch(function(err){
        console.log(err);
    })