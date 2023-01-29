let WebSocket = require("ws");

/**
 * This class handles websocket connection required for streaming live price of stocks.
 */
 class LivePriceWebSocket {
    
    socket; // websocket connection object created with broadcast server 
    
    url; // url to which request is hit for creating websocket connection

    onOpenListener; // listens to connection open event

    onCloseListener; // listens to connection closure event

    onMesssageListener; // listens to ticks sent by server

    onErrorListener; // listens to error event

    setOnOpenListener(onOpenListener) {
        this.onOpenListener = onOpenListener
    }

    setOnCloseListener(onCloseListener) {
        this.onCloseListener = onCloseListener
    }

    setOnMessageListener(onMessageListener) {
        this.onMessageListener = onMessageListener
    }

    setOnErrorListener(onErrorListener) {
        this.onErrorListener = onErrorListener
    }

    /**
     * This method creates a websocket connection with broadcast server 
     * @param {String} jwt Public Access Token
     */
    connect(jwt) {
        this.url = 'wss://developer-ws.paytmmoney.com/broadcast/user/v1/data?' + `x_jwt_token=${jwt}`;  // prod

        this.socket = new WebSocket(this.url);

        this.socket.on('open', () => {
            console.log("connection made with server")
            this.onOpenListener();
        })

        this.socket.on('close', (code, reason) => {
            this.onCloseListener(code, reason);
        })

        this.socket.on('message', (packet) => {
            if(typeof packet === "string")
                this.onErrorListener(packet); // to handle error message sent by server
            else
                this.onMessageListener(this.parseBinary(packet)) // to handle ByteBuffer packets sent by server
        })

        this.socket.on('error', (err) => {
            console.log("on error triggered")
            this.onErrorListener(err)
        })
    }
    
    /**
     * This method subscribes the preferences sent by user with Broadcast Server
     * @param {Array} pref array of preferences
     */
    subscribe(pref) {
        if(!this.socket || this.socket.readyState != this.socket.OPEN) {
            console.log("Socket is not in ready state!");
            return;
        }
        this.socket.send(JSON.stringify(pref));
        console.log("preferences sent")
    }
    
    /**
     * This method parses the packets received from Broadcast Server (in ByteBuffer) to human-readable format
     * @param {ArrayByteBuffer} packet ByteBuffer response packet received from Broadcast server
     * @returns {Array} response parsed in human-readable format 
     */
    parseBinary(packet) {
            let len = packet.length, response = [];
            // console.log("Packet length: " + len);
            let ab = new ArrayBuffer(len);
            let dv = new Int8Array(ab);
            for (let i = 0; i < len; ++i) {
                dv[i] = packet[i];
            }
            let dvu = new DataView(ab);
            let position = 0;
            while (position != len) {
                // console.log("position at start of while loop: " + position)
                let type = dvu.getInt8(position);
                position = position + 1;
                // console.log("Data Type: " + type);
                switch (type) {
                    case 64:
                        // console.log("IndexLtpPacket")
                        processIndexLtpPacket();
                        break;
                    case 65:
                        // console.log("IndexQuotePacket")
                        processIndexQuotePacket();
                        break;
                    case 66:
                        processIndexFullPacket();
                        break;
                    case 61:
                        // console.log("LtpPacket")
                        processLtpPacket();
                        break;
                    case 62:
                        // console.log("QuotePacket")
                        processQuotePacket();
                        break;
                    case 63:
                        // console.log("FullPacket")
                        processFullPacket();
                        break;
                    default:
                        // console.log("Default")
                        // console.log("position: " + position)
                        break;
                }
            }

            function processLtpPacket() {
                response.push({
                     LTP: dvu.getFloat32(position, true).toFixed(2),
                     LTT: dvu.getInt32(position + 4, true),
                     security_id: dvu.getInt32(position + 8, true),
                     tradable: dvu.getInt8(position + 12, true),
                     mode: dvu.getInt8(position + 13, true),
                     change_absolute: dvu.getFloat32(position + 14, true).toFixed(2),
                     change_percent: dvu.getFloat32(position + 18, true).toFixed(2)    
                });
                position = position + 22;
            }

            function processIndexLtpPacket() {
                response.push({
                     LTP: dvu.getFloat32(position, true).toFixed(2),
                     LTT: dvu.getInt32(position + 4, true),
                     security_id: dvu.getInt32(position + 8, true),
                     tradable: dvu.getInt8(position + 12, true),
                     mode: dvu.getInt8(position + 13, true),
                     change_absolute: dvu.getFloat32(position + 14, true).toFixed(2),
                     change_percent: dvu.getFloat32(position + 18, true).toFixed(2)    
                });
                position = position + 22;
            }

            function processQuotePacket() {
                response.push({
                    LTP: dvu.getFloat32(position, true).toFixed(2),
                    LTT: dvu.getInt32(position + 4, true),
                    security_id: dvu.getInt32(position + 8, true),
                    tradable: dvu.getInt8(position + 12, true),
                    mode: dvu.getInt8(position + 13, true),
                    last_traded_quantity: dvu.getInt32(position + 14, true),
                    average_traded_price: dvu.getFloat32(position + 18, true).toFixed(2),
                    volume_traded: dvu.getInt32(position + 22, true),
                    total_buy_quantity: dvu.getInt32(position + 26, true),
                    total_sell_quantity: dvu.getInt32(position + 30, true),
                    open: dvu.getFloat32(position + 34, true).toFixed(2), 
                    close: dvu.getFloat32(position + 38, true).toFixed(2),  
                    high: dvu.getFloat32(position + 42, true).toFixed(2),
                    low: dvu.getFloat32(position + 46, true).toFixed(2), 
                    change_percent: dvu.getFloat32(position + 50, true).toFixed(2), 
                    change_absolute: dvu.getFloat32(position + 54, true).toFixed(2),
                    fifty_two_week_high: dvu.getFloat32(position + 58, true).toFixed(2),
                    fifty_two_week_low: dvu.getFloat32(position + 62, true).toFixed(2)
                });
                position = position + 66;
            }

            function processIndexQuotePacket() {
                response.push({
                    LTP: dvu.getFloat32(position, true).toFixed(2),
                    security_id: dvu.getInt32(position + 4, true),
                    tradable: dvu.getInt8(position + 8, true),
                    mode: dvu.getInt8(position + 9, true),
                    open: dvu.getFloat32(position + 10, true).toFixed(2), 
                    close: dvu.getFloat32(position + 14, true).toFixed(2),  
                    high: dvu.getFloat32(position + 18, true).toFixed(2),
                    low: dvu.getFloat32(position + 22, true).toFixed(2), 
                    change_percent: dvu.getFloat32(position + 26, true).toFixed(2), 
                    change_absolute: dvu.getFloat32(position + 30, true).toFixed(2),
                    fifty_two_week_high: dvu.getFloat32(position + 34, true).toFixed(2),
                    fifty_two_week_low: dvu.getFloat32(position + 38, true).toFixed(2)
                });
                position = position + 42;
            }

            function processFullPacket() {
                let depth_size = 20;
                let depthPacket = {}
                for (let i = 0; i < 5; i++) {
                    let depth = "depth_packet_#" + (i + 1);
                    let depthObj = {}  
                    depthObj.buy_quantity = dvu.getInt32(1 + (i * depth_size), true); 
                    depthObj.sell_quantity = dvu.getInt32(5 + (i * depth_size), true); 
                    depthObj.buy_order = dvu.getInt16(9 + (i * depth_size), true); 
                    depthObj.sell_order = dvu.getInt16(11 + (i * depth_size), true); 
                    depthObj.buy_price = dvu.getFloat32(13 + (i * depth_size), true).toFixed(2); 
                    depthObj.sell_price = dvu.getFloat32(17 + (i * depth_size), true).toFixed(2);  
                    depthPacket[depth] = depthObj;
                }
                let tick = {}
                tick.depthPacket = depthPacket
                position += 100

                tick.LTP = dvu.getFloat32(position, true).toFixed(2),
                tick.last_traded_time = dvu.getInt32(position + 4, true),
                tick.security_id = dvu.getInt32(position + 8, true),
                tick.tradable = dvu.getInt8(position + 12, true),
                tick.mode = dvu.getInt8(position + 13, true), 
                tick.last_traded_quantity = dvu.getInt32(position + 14, true),  
                tick.average_traded_price = dvu.getFloat32(position + 18, true).toFixed(2),
                tick.volume_traded = dvu.getInt32(position + 22, true), 
                tick.total_buy_quantity = dvu.getInt32(position + 26, true), 
                tick.total_sell_quantity = dvu.getInt32(position + 30, true),
                tick.open = dvu.getFloat32(position + 34, true).toFixed(2),
                tick.close = dvu.getFloat32(position + 38, true).toFixed(2),
                tick.high = dvu.getFloat32(position + 42, true).toFixed(2),
                tick.low = dvu.getFloat32(position + 46, true).toFixed(2),
                tick.change_percent = dvu.getFloat32(position + 50, true).toFixed(2),
                tick.change_absolute = dvu.getFloat32(position + 54, true).toFixed(2),
                tick.fifty_two_week_high = dvu.getFloat32(position + 58, true).toFixed(2),
                tick.fifty_two_week_low = dvu.getFloat32(position + 62, true).toFixed(2),
                tick.OI = dvu.getInt32(position + 66, true),
                tick.OI_change = dvu.getInt32(position + 70, true)

                response.push(tick);

                position += 74
            }

            function processIndexFullPacket() {
                response.push({
                    LTP: dvu.getFloat32(position, true).toFixed(2),
                    security_id: dvu.getInt32(position + 4, true),
                    tradable: dvu.getInt8(position + 8, true),
                    mode: dvu.getInt8(position + 9, true),
                    open: dvu.getFloat32(position + 10, true).toFixed(2), 
                    close: dvu.getFloat32(position + 14, true).toFixed(2),  
                    high: dvu.getFloat32(position + 18, true).toFixed(2),
                    low: dvu.getFloat32(position + 22, true).toFixed(2), 
                    change_percent: dvu.getFloat32(position + 26, true).toFixed(2), 
                    change_absolute: dvu.getFloat32(position + 30, true).toFixed(2),
                    last_trade_time: dvu.getInt32(position + 34, true),
                });
                position = position + 38;
            }

        return response;
    }
}

module.exports = LivePriceWebSocket;