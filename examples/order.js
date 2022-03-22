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


connect.place_order(
    txn_type="B",
    source="N",
    exchange="NSE",
    segment="E",
    product="I",
    security_id="772",
    quantity=1,
    validity="DAY",
    order_type="LMT",
    price=560.55,
    off_mkt_flag=false)
    .then(function(response){
        console.log(response);
    })
    .catch(function(err){
        console.log(err);
    })