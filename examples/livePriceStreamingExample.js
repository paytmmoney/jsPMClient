const LivePriceWebSocket = require("../livePriceWebSocket.js");
let livePriceWebSocket = new LivePriceWebSocket();
jwt = "your_public_access_token"

customerPreferences = []

preference = {
        "actionType" : 'ADD', // 'ADD', 'REMOVE'
        "modeType" : 'LTP', // 'LTP', 'FULL', 'QUOTE'
        "scripType" : 'EQUITY', // 'ETF', 'FUTURE', 'INDEX', 'OPTION', 'EQUITY'
        "exchangeType" : 'NSE', // 'BSE', 'NSE'
        "scripId" : '3456'
        }

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