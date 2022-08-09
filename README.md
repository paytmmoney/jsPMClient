# The Paytm Money Equity 1.0 API NodeJS client

The official NodeJS client for communicating with [PaytmMoney Equity API](https://www.paytmmoney.com/stocks/).

PMClient is a set of REST-like APIs that expose many capabilities required to build a complete investment and
trading platform. Execute orders in real time, manage user portfolio, and more, with the simple HTTP API collection.

[PaytmMoney Technology Pvt Ltd](https://www.paytmmoney.com/) (c) 2022. Licensed under the MIT License.


## Documentation

## Usage
```javascript
npm install pmClient;
```

## API Usage
```javascript
var PMClient = require('pmClient').PMClient;
```

User needs to create an object of sdk and pass apiKey & apiSecretKey
```javascript
// Initialize PMClient using apiKey, apiSecret.
pm = PMClient(api_key="your_api_key", api_secret="your_api_secret");
// Initialize PMClient using apiKey, apiSecret & access_token if user has already generated.
pm = PMClient(api_key="your_api_key", api_secret="your_api_secret", access_token="your_access_token");
```


User needs to call the login method and get the login URL.
```javascript
// Variable key which merchant/fintech company expects Paytm Money to return with Request Token. This can be string.
pm.get_login_URL(state_key);
```

1) User manually executes a login url in the browser and fetches requestToken after validating username, password, OTP and passcode.
2) After a successful login user will be provided the request_token in the URL
3) Once the request_token is obtained you can generate access_token by calling generate_session
```javascript
pm.generate_session(request_token="your_request_token")
.then(function(response){
    console.log(response)
})
.catch(function(err){
    console.log(err);
});
```

* Every Api returns a promise. Hence, then and catch must be used, as shown in generate_session api

```javascript
    .then(function(response){
        console.log(response)
    })
    .catch(function(err){
        console.log(err);
    });
```

After generating the access_token/session any API can be called with same access_token/session.
```javascript
// Set access Token if you have already. In this case, Don't need to call generateSession method.
pm.set_access_token(access_token);
```

### Place Order
* Here you can place regular, cover and bracket order.
* For cover order in argument user has to add trigger_price.
* For bracket order in argument user has to add stoploss_value & profit_value.
* To place sell CNC order user has to add edis_txn_id and edis_auth_mode.
* If order_type is StopLossMarket(SLM) or StopLoss(SL) trigger price should not be null.

```javascript
// Regular Order
order = pm.place_order(txn_type, source, exchange, segment, product, security_id, quantity, validity, order_type, price,
off_mkt_flag);
```
```javascript
// Cover Order
order = pm.place_order(txn_type, source, exchange, segment, product, security_id, quantity, validity, order_type, price,
off_mkt_flag, null, null, trigger_price);
```
```javascript
// Bracket Order
order = pm.place_order(txn_type, source, exchange, segment, product, security_id, quantity, validity, order_type, price,
off_mkt_flag, profit_value, stoploss_value);
```
```javascript
// Sell CNC Order
order = pm.place_order(txn_type, source, exchange, segment, product, security_id, quantity, validity, order_type, price,
off_mkt_flag, null, null, null, edis_txn_id, edis_auth_mode);
```

### Modify Order
* Here you can modify orders.
* For cover order in argument user has to add leg_no.
* For bracket order in argument user has to add leg_no & algo_order_no.
* To modify sell CNC order user has to add edis_txn_id and edis_auth_mode.
* If order_type is StopLossMarket(SLM) or StopLoss(SL) trigger price should not be null.
```javascript
// Regular Order
order = pm.modify_order(txn_type, source, exchange, segment, product, security_id, quantity, validity, order_type,
price, off_mkt_flag, mkt_type, order_no, serial_no, group_id);
```
```javascript
// Cover Order
order = pm.modify_order(txn_type, source, exchange, segment, product, security_id, quantity, validity, order_type,
price, off_mkt_flag, mkt_type, order_no, serial_no, group_id, null, leg_no);
```
```javascript
// Bracket Order
order = pm.modify_order(txn_type, source, exchange, segment, product, security_id, quantity, validity, order_type,
price, off_mkt_flag, mkt_type, order_no, serial_no, group_id, null, leg_no, algo_order_no);
```
```javascript
// Sell CNC Order
order = pm.modify_order(txn_type, source, exchange, segment, product, security_id, quantity, validity, order_type,
price, off_mkt_flag, mkt_type, order_no, serial_no, group_id, null, null, null, edis_txn_id, edis_auth_mode);
```

### Cancel Order
* Here you can Cancel Orders
* For cover order in argument user has to add leg_no
* For bracket order in argument user has to add leg_no & algo_order_no
* If order_type is StopLossMarket(SLM) or StopLoss(SL) trigger price should not be null.
```javascript
// Regular Order
order = pm.cancel_order(txn_type, source, exchange, segment, product, security_id, quantity, validity, order_type,
price, off_mkt_flag, mkt_type, order_no, serial_no, group_id);
```
```javascript
// Cover Order
order = pm.cancel_order(txn_type, source, exchange, segment, product, security_id, quantity, validity, order_type,
price, off_mkt_flag, mkt_type, order_no, serial_no, group_id, null, leg_no);
```
```javascript
// Bracket Order
order = pm.cancel_order(txn_type, source, exchange, segment, product, security_id, quantity, validity, order_type,
price, off_mkt_flag, mkt_type, order_no, serial_no, group_id, null, leg_no, algo_order_no);
```


### Convert Order
* For converting through eDIS user needs to provide edis_txn_id & edis_auth_mode.
* The above details can be generated by TPIN APIs.
```javascript
// Regular Order
order = pm.convert_order(source, txn_type, exchange, segment, mkt_type, product_from, product_to, quantity,
security_id);
```
```javascript
// Sell CNC Order
order = pm.convert_order(source, txn_type, exchange, segment, mkt_type, product_from, product_to, quantity,
security_id, edis_txn_id, edis_auth_mode);
```

### Order Details
* Fetch details of all the order
```javascript
pm.order_book();
```


### Trade Details
* Fetch Trade Details
```javascript
pm.trade_details(order_no, leg_no, segment);
```

### Position
* Get all the positions
```javascript
pm.position();
```

### Position Details
* Get position detail of specific stock
```javascript
pm.position_details(security_id, product, exchange);
```

### Get Funds History
* Get the funds history
```javascript
pm.funds_summary(config);
```

### Scrip Margin
* Calculate Scrip Margin
```javascript
pm.scrip_margin(source,margin_list=[]);
```

### Order Margin
* Calculate Order Margin
```javascript
pm.order_margin(source, exchange, segment, security_id, txn_type, quantity, price, product, trigger_price);
```

### Holdings value
* Get value of the holdings
```javascript
pm.holdings_value();
```

### User Holdings Data
* Get holdings data of User
```javascript
pm.user_holdings_data();
```

### Security Master
* Data will be provided in CSV format
```javascript
pm.security_master();
```

### User Details
* Fetch user details
```javascript
pm.get_user_details();
```

### Generate Tpin
```javascript
pm.generate_tpin();
```

### Validate Tpin
```javascript
pm.validate_tpin(trade_type, isin_list=[]);
```


### Status
* User can get the edis_request_id from the response of validate TPIN API.
```javascript
pm.status(edis_request_id);
```

### Logout
* To end session.
```javascript
pm.logout();
```

### Price Chart
* To get data for the candle stick(ohlc) of time period.
```javascript
pm.price_chart_sym(cont, exchange, expiry, from_date, inst_type, interval, symbol, to_date, month_id, series, strike);
```

### Create GTT
* To create a GTT order.
```javascript
pm.create_gtt(segment, exchange, pml_id, security_id, product_type, set_price, transaction_type, order_type, trigger_type, quantity, trigger_price, limit_price);
```

### Get All GTT
* To get all GTT or get by pml_id or status.
```javascript
pm.get_gtt_by_status_or_pml_id(status, pml_id);
```

### Get GTT
* To get GTT by Id.
```javascript
pm.get_gtt(id);
```

### Update GTT
* To update GTT by Id.
```javascript
pm.update_gtt(id, set_price, transaction_type, order_type, trigger_type, quantity, trigger_price, limit_price);
```

### Delete GTT
* To Delete GTT by Id.
```javascript
pm.delete_gtt(id);
```

### Get Expiry
* To get expiry of the GTT.
```javascript
pm.get_gtt_expiry(pml_id);
```

### Get Aggregate
* To get the aggregate of the GTTs.
```javascript
pm.get_gtt_aggregate();
```

### Get GTT InstructionId
* To GTT by InstructionId.
```javascript
pm.get_gtt_by_instruction_id(id);
```

