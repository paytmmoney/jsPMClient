# The Paytm Money Equity 1.1.3 API NodeJS client

The official NodeJS client for communicating with [PaytmMoney Equity API](https://www.paytmmoney.com/stocks/).

PMClient is a set of REST-like APIs that expose many capabilities required to build a complete investment and
trading platform. Execute orders in real time, manage user portfolio, stream live market data (WebSockets), and more, with the simple HTTP API collection.

[PaytmMoney Technology Pvt Ltd](https://www.paytmmoney.com/) (c) 2022. Licensed under the MIT License.


## Api Documentation

- [PaytmMoney API documentation](https://developer.paytmmoney.com/docs/api/logout/)

## Usage
###### User needs to clone this repo and add it locally to their project.

## API Usage
```javascript
var PMClient = require('pmClient').PMClient;
```

User needs to create an object of sdk and pass apiKey & apiSecretKey
```javascript
// Initialize PMClient using apiKey, apiSecret.
pm = PMClient(api_key="your_api_key", api_secret="your_api_secret");
// Initialize PMClient using apiKey, apiSecret & jwt tokens if user has already generated.
pm = PMClient(api_key="your_api_key", api_secret="your_api_secret", access_token="access_token",public_access_token="public_access_token", read_access_token="read_access_token");
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

### To manually set the jwt tokens, 
```javascript
pm.set_access_token("your_access_token")
pm.set_public_access_token("your_public_access_token")
pm.set_read_access_token("your_read_access_token")
```

### Place Order
* Here you can place regular, cover and bracket order.
* For cover order in argument user has to add trigger_price.
* For bracket order in argument user has to add stoploss_value & profit_value.
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
off_mkt_flag, null, null, null);
```

### Modify Order
* Here you can modify orders.
* For cover order in argument user has to add leg_no.
* For bracket order in argument user has to add leg_no & algo_order_no.
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
* For converting orders.
* The above details can be generated by TPIN APIs.
```javascript
// Regular Order
order = pm.convert_order(source, txn_type, exchange, segment, mkt_type, product_from, product_to, quantity,
security_id);
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
pm.scrips_margin(source,margin_list=[]);
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
* User can filter by file_name
* To get the supported fileName [API Doc for fileNames](https://developer.paytmmoney.com/docs/api/security-master/)
```javascript
pm.security_master("file_name");
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

### Create GTT V2
* To create a GTT order.
* Note : transaction_details is a list of objects(key-value pair).
* Refer below sample requestBody 
```javascript
pm.create_gtt_v2(segment, exchange, security_id, product_type, set_price, transaction_type, trigger_type, transaction_details);
```
```javascript
// Sample requestBody for SINGLE trigger_type
pm.create_gtt_v2(
    segment = "E",
    exchange = "BSE",
    security_id = 500570,
    product_type = "C",
    set_price = "709.35",
    transaction_type = "B",
    trigger_type = "SINGLE",
    transaction_details = [
        {
            "trigger_price": "702.25",
            "order_type": "MKT",
            "limit_price": 0,
            "quantity": 1
        }
    ]
)
```
```javascript
// Sample requestBody for OCO trigger_type
pm.create_gtt_v2(
    segment = "E",
    exchange = "BSE",
    security_id = 500570,
    product_type = "C",
    set_price = "702.65",
    transaction_type = "S",
    trigger_type = "OCO",
    transaction_details = [
        {
            "sub_type": "STOPLOSS",
            "trigger_price": "695.60",
            "order_type": "MKT",
            "limit_price": 0,
            "quantity": 1
        },
        {
            "sub_type": "TARGET",
            "trigger_price": "709.70",
            "order_type": "MKT",
            "limit_price": 0,
            "quantity": 1
        }
    ]
)
```

### Get All GTT V2
* To get all GTT or get by pml_id or status.
```javascript
pm.get_gtt_by_status_or_pml_id_v2(status, pml_id);
```

### Get GTT V2
* To get GTT by Id.
```javascript
pm.get_gtt_v2(id);
```

### Update GTT V2
* To update GTT by Id.
* Note : transaction_details is a list of objects(key-value pair).
* Refer below sample requestBody 
```javascript
pm.update_gtt_v2(id, set_price, transaction_type, trigger_type, transaction_details);
```
```javascript
pm.update_gtt_v2(
    id=217,
    set_price = "8.40",
    transaction_type = "S",
    trigger_type = "OCO",
    transaction_details = [
        {
            "id": 218,               //For OCO only
            "sub_type": "STOPLOSS",  //For OCO only
            "quantity": "2",
            "trigger_price": "9.0",
            "limit_price": "15.0",
            "order_type": "LMT"    
        },
        {
            "id": 219,                //For OCO only
            "sub_type": "TARGET",   //For OCO only
            "quantity": "2",
            "trigger_price": "15.0",
            "limit_price": "20",
            "order_type": "LMT"   
        }
    ]
)
```

### Get GTT InstructionId V2
* To GTT by InstructionId.
```javascript
pm.get_gtt_by_instruction_id_v2(id);
```

### Get Live Price via API
* To Get Live Price Data via API
```javascript
pmClient.get_live_market_data("mode", preferences)
```

### Get Option Chain
* To Get Option Chain using type, symbol and expiry (in DD-MM-YYYY format)
```javascript
pmClient.get_option_chain("type", "symbol", "expiry")
```

### Get Option Chain Config
* To Get Option Chain Config using symbol
```javascript
pmClient.get_option_chain_config("symbol")
```

### Get All Orders
* Get all orders without apiKey filter
```javascript
pmClient.orders()
```

### Brokerage, Statutory & Regulatory Levies
* Get Charges Info
```javascript
pmClient.charges_info("brokerage_profile_code", "transaction_type", "product_type", "instrument_type", "exchange", qty, price)
```

## WebSocket Usage
* To use websocket client in your project, add below code in a js file -
```javascript
const LivePriceWebSocket = require("../LivePriceWebSocket.js");
let livePriceWebSocket = new LivePriceWebSocket();
jwt = "your_public_access_token" // enter your public access token here

customerPreferences = []

preference = {
        "actionType" : 'ADD', // 'ADD', 'REMOVE'
        "modeType" : 'LTP', // 'LTP', 'FULL', 'QUOTE'
        "scripType" : 'EQUITY', // 'ETF', 'FUTURE', 'INDEX', 'OPTION', 'EQUITY'
        "exchangeType" : 'NSE', // 'BSE', 'NSE'
        "scripId" : '3456'
        }

// create as many preferences as you like as shown above and append them in customerPreferences array

customerPreferences.push(preference)

// send preferences via websocket once connection is open
livePriceWebSocket.setOnOpenListener(() => {
    livePriceWebSocket.subscribe(customerPreferences)
})

// this event gets triggered when connection is closed
livePriceWebSocket.setOnCloseListener((code, reason) => {
        console.log(" disconnected Code: " + code + " Reason: " + reason);
})

// this event gets triggered when response is received
livePriceWebSocket.setOnMessageListener((arr) => {
    printArray(arr)
})

// this event gets triggered when error occurs
livePriceWebSocket.setOnErrorListener((err) => {
    console.log(err)
})

/**
 *  set this config if reconnect feature is desired
 * Set first param as true and second param, the no. of times retry to connect to server shall be made  
 */
livePriceWebSocket.setReconnectConfig(true, 5);

// this method is called to create a websocket connection with broadcast server
livePriceWebSocket.connect(jwt) //pass public_access_token

// To explicitly close websocket connection with server, call this method
livePriceWebSocket.disconnect()

// this method prints the response array received 
function printArray(arr) {
    console.log("data received from server: ");
    arr.forEach((obj) => {
        let tick = Object.keys(obj)
        tick.forEach((key) => {
            console.log(key + ":", obj[key])
        })
        console.log("\n")
    })
}
```
