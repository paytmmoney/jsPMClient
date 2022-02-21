# The Paytm Money Equity 1.0 API NodeJS client

The official NodeJS client for communicating with [PaytmMoney Equity API](https://www.paytmmoney.com/stocks/).

PMClient is a set of REST-like APIs that expose many capabilities required to build a complete investment and
trading platform. Execute orders in real time, manage user portfolio, and more, with the simple HTTP API collection.

[PaytmMoney Technology Pvt Ltd](https://www.paytmmoney.com/) (c) 2021. Licensed under the MIT License.


##Documentation

##Usage
```shell
npm install pmClient;
```

##API Usage
```shell
var PMClient = require('pmClient').PMClient;
```

User needs to create an object of sdk and pass apiKey & apiSecretKey
```shell
# Initialize PMClient using apiKey, apiSecret & state_key.
pm = PMClient(api_key="your_api_key", api_secret="your_api_secret", state_key="your_state_key");
# Initialize PMClient using apiKey, apiSecret, state_key & access_token if user has already generated.
pm = PMClient(api_key="your_api_key", api_secret="your_api_secret", state_key="your_state_key", access_token="your_access_token");
```


User needs to call the login method and get the login URL.
```shell
pm.get_login_URL();
```

1) User manually executes a login url in the browser and fetches requestToken after validating username, password, OTP and passcode.
2) After a successful login user will be provided the request_token in the URL
3) Once the request_token is obtained you can generate access_token by calling generate_session
```shell
pm.generate_session(request_token="your_request_token")
.then(function(response){
    console.log(response)
})
.catch(function(err){
    console.log(err);
});
```

* Every Api returns a promise. Hence, then and catch must be used, as shown in generate_session api

```shell
    .then(function(response){
        console.log(response)
    })
    .catch(function(err){
        console.log(err);
    });
```

After generating the access_token/session any API can be called with same access_token/session.
```shell
#Set access Token if you have already. In this case, Don't need to call generateSession method.
pm.set_access_token(access_token);
```

###Place Order
* Here you can place regular, cover and bracket order.
* For cover order in argument user has to add trigger_price.
* For bracket order in argument user has to add stoploss_value & profit_value.
* To place sell CNC order user has to add edis_txn_id and edis_auth_mode.
* * If order_type is StopLossMarket(SLM) or StopLoss(SL) trigger price should not be null.

```shell
# Regular Order
order = pm.place_order(txn_type, source, exchange, segment, product, security_id, quantity, validity, order_type, price,
off_mkt_flag);
```
```shell
# Cover Order
order = pm.place_order(txn_type, source, exchange, segment, product, security_id, quantity, validity, order_type, price,
off_mkt_flag, null, null, trigger_price);
```
```shell
# Bracket Order
order = pm.place_order(txn_type, source, exchange, segment, product, security_id, quantity, validity, order_type, price,
off_mkt_flag, profit_value, stoploss_value);
```
```shell
# Sell CNC Order
order = pm.place_order(txn_type, source, exchange, segment, product, security_id, quantity, validity, order_type, price,
off_mkt_flag, null, null, null, edis_txn_id, edis_auth_mode);
```

###Modify Order
* Here you can modify orders.
* For cover order in argument user has to add leg_no.
* For bracket order in argument user has to add leg_no & algo_order_no.
* To modify sell CNC order user has to add edis_txn_id and edis_auth_mode.
* * If order_type is StopLossMarket(SLM) or StopLoss(SL) trigger price should not be null.
```shell
# Regular Order
order = pm.modify_order(txn_type, source, exchange, segment, product, security_id, quantity, validity, order_type,
price, off_mkt_flag, mkt_type, order_no, serial_no, group_id);
```
```shell
# Cover Order
order = pm.modify_order(txn_type, source, exchange, segment, product, security_id, quantity, validity, order_type,
price, off_mkt_flag, mkt_type, order_no, serial_no, group_id, null, leg_no);
```
```shell
# Bracket Order
order = pm.modify_order(txn_type, source, exchange, segment, product, security_id, quantity, validity, order_type,
price, off_mkt_flag, mkt_type, order_no, serial_no, group_id, null, leg_no, algo_order_no);
```
```shell
# Sell CNC Order
order = pm.modify_order(txn_type, source, exchange, segment, product, security_id, quantity, validity, order_type,
price, off_mkt_flag, mkt_type, order_no, serial_no, group_id, null, null, null, edis_txn_id, edis_auth_mode);
```

###Cancel Order
* Here you can Cancel Orders
* For cover order in argument user has to add leg_no
* For bracket order in argument user has to add leg_no & algo_order_no
* If order_type is StopLossMarket(SLM) or StopLoss(SL) trigger price should not be null.
```shell
# Regular Order
order = pm.cancel_order(txn_type, source, exchange, segment, product, security_id, quantity, validity, order_type,
price, off_mkt_flag, mkt_type, order_no, serial_no, group_id);
```
```shell
# Cover Order
order = pm.cancel_order(txn_type, source, exchange, segment, product, security_id, quantity, validity, order_type,
price, off_mkt_flag, mkt_type, order_no, serial_no, group_id, null, leg_no);
```
```shell
# Bracket Order
order = pm.cancel_order(txn_type, source, exchange, segment, product, security_id, quantity, validity, order_type,
price, off_mkt_flag, mkt_type, order_no, serial_no, group_id, null, leg_no, algo_order_no);
```


###Convert Order
* For converting through eDIS user needs to provide edis_txn_id & edis_auth_mode.
* The above details can be generated by TPIN APIs.
```shell
# Regular Order
order = pm.convert_order(source, txn_type, exchange, segment, mkt_type, product_from, product_to, quantity,
security_id);
```
```shell
# Sell CNC Order
order = pm.convert_order(source, txn_type, exchange, segment, mkt_type, product_from, product_to, quantity,
security_id, edis_txn_id, edis_auth_mode);
```

###Order Details
* Fetch details of all the order
```shell
pm.order_book();
```


###Trade Details
* Fetch Trade Details
```shell
pm.trade_details(order_no, leg_no, segment);
```

###Position
* Get all the positions
```shell
pm.position();
```

###Position Details
* Get position detail of specific stock
```shell
pm.position_details(security_id, product, exchange);
```

###Get Funds History
* Get the funds history
```shell
pm.funds_summary(config);
```

###Scrip Margin
* Calculate Scrip Margin
```shell
pm.scrip_margin(source,margin_list=[]);
```

###Order Margin
* Calculate Order Margin
```shell
pm.order_margin(source, exchange, segment, security_id, txn_type, quantity, price, product, trigger_price);
```

###Holdings value
* Get value of the holdings
```shell
pm.holdings_value();
```

###User Holdings Data
* Get holdings data of User
* isin will be provided in order details
```shell
pm.user_holdings_data();
```

###Security Master
* Data will be provided in CSV format
```shell
pm.security_master();
```

###User Details
* Fetch user details
```shell
pm.get_user_details();
```

###Generate Tpin
```shell
pm.generate_tpin();
```

###Validate Tpin
```shell
pm.validate_tpin(trade_type, isin_list=[]);
```


###Status
* User can get the edis_request_id from the response of validate TPIN API.
```shell
pm.status(edis_request_id);
```

###Logout
* To end session.
```shell
pm.logout();
```


