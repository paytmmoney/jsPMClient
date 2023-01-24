const LivePriceWebSocket = require("../LivePriceWebSocket.js");
let livePriceWebSocket = new LivePriceWebSocket();
jwt = "public_access_token"
ws = livePriceWebSocket.connect(jwt) //pass public_access_token

customerPreferences = []

preference = {
        "actionType" : 'ADD', // 'ADD', 'REMOVE'
        "modeType" : 'LTP', // 'LTP', 'FULL', 'QUOTE'
        "scripType" : 'INDEX', // 'ETF', 'FUTURE', 'INDEX', 'OPTION', 'EQUITY'
        "exchangeType" : 'BSE', // 'BSE', 'NSE'
        "scripId" : '51'
        }

customerPreferences.push(preference)

// send prefernces via websocket once connection is open
ws.on('open', function () {
    livePriceWebSocket.subscribe(customerPreferences)
})

ws.on('message', function (data) {
    try {
        printArray(livePriceWebSocket.parseBinary(data));
    } 
    catch (e) {
        console.log("Error message received from server: " + e);
    }
});

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

ws.on('error', function (err) {
    console.log(err)
});

ws.on('close', function (code, reason) {
    console.log(" disconnected Code: " + code + " Reason: " + reason);
});