let LivePriceWebSocket = require('./livePriceWebSocket.js');

describe("LivePriceWebSocket", () => {

    let livePriceWebSocket = new LivePriceWebSocket();

    beforeEach( () => {
        livePriceWebSocket.setOnOpenListener( () => {
            //do nothing
        });
        livePriceWebSocket.setOnCloseListener( (code, reason) => {
            //do nothing
        });
        livePriceWebSocket.setOnMessageListener( (arr) => {
            //do nothing
        });
        livePriceWebSocket.setOnErrorListener( (err) => {
            //do nothing
        });
    });

    test("setOnOpenListenerTest", () => {
        livePriceWebSocket.setOnOpenListener(null)
    });

    test("setOnCloseListenerTest", () => {
        livePriceWebSocket.setOnCloseListener(null)
    });

    test("setOnMessageListenerTest", () => {
        livePriceWebSocket.setOnMessageListener(null)
    });

    test("setOnErrorListenerTest", () => {
        livePriceWebSocket.setOnErrorListener(null)
    });

    test("setReconnectConfigTest", () => {
        livePriceWebSocket.setReconnectConfig(null, null)
    });

    test("connectTest", () => {
        livePriceWebSocket.connect("jwt")
    });

    test("subscribeTest", () => {
        livePriceWebSocket.subscribe(["pref"])
    });

    test("parseBinaryLtpTest", () => {
        let byteBuffer = Buffer.alloc(23);
        let dataView = new DataView(byteBuffer.buffer);
        dataView.setInt8(0, 61);
        dataView.setFloat32(1, 100);
        dataView.setInt32(5, 100);
        dataView.setInt32(9, 100);
        dataView.setInt8(13, 1);
        dataView.setInt8(14, 1);
        dataView.setFloat32(15, 100);
        dataView.setFloat32(19, 100);
        livePriceWebSocket.parseBinary(byteBuffer);
    });

    test("parseBinaryIndexLtpTest", () => {
        let byteBuffer = Buffer.alloc(23);
        let dataView = new DataView(byteBuffer.buffer);
        dataView.setInt8(0, 64);
        dataView.setFloat32(1, 100);
        dataView.setInt32(5, 100);
        dataView.setInt32(9, 100);
        dataView.setInt8(13, 1);
        dataView.setInt8(14, 1);
        dataView.setFloat32(15, 100);
        dataView.setFloat32(19, 100);
        livePriceWebSocket.parseBinary(byteBuffer);
    });

    test("parseBinaryQuoteTest", () => {
        let byteBuffer = Buffer.alloc(67);
        let dataView = new DataView(byteBuffer.buffer);
        dataView.setInt8(0, 62);
        dataView.setFloat32(1, 100);
        dataView.setInt32(5, 100);
        dataView.setInt32(9, 100);
        dataView.setInt8(13, 1);
        dataView.setInt8(14, 1);
        dataView.setInt32(15, 100);
        dataView.setFloat32(19, 100);
        dataView.setInt32(23, 100);
        dataView.setInt32(27, 100);
        dataView.setInt32(31, 100);
        dataView.setFloat32(35, 100);
        dataView.setFloat32(39, 100);
        dataView.setFloat32(43, 100);
        dataView.setFloat32(47, 100);
        dataView.setFloat32(51, 100);
        dataView.setFloat32(55, 100);
        dataView.setFloat32(59, 100);
        dataView.setFloat32(63, 100);
        livePriceWebSocket.parseBinary(byteBuffer);
    });

    test("parseBinaryIndexQuoteTest", () => {
        let byteBuffer = Buffer.alloc(43);
        let dataView = new DataView(byteBuffer.buffer);
        dataView.setInt8(0, 65);
        dataView.setFloat32(1, 100);
        dataView.setInt32(5, 100);
        dataView.setInt8(9, 1);
        dataView.setInt8(10, 1);
        dataView.setFloat32(11, 100);
        dataView.setFloat32(15, 100);
        dataView.setFloat32(19, 100);
        dataView.setFloat32(23, 100);
        dataView.setFloat32(27, 100);
        dataView.setFloat32(31, 100);
        dataView.setFloat32(35, 100);
        dataView.setFloat32(39, 100);
        livePriceWebSocket.parseBinary(byteBuffer);
    });

    test("parseBinaryFullTest", () => {
        let byteBuffer = Buffer.alloc(175);
        let dataView = new DataView(byteBuffer.buffer);
        let depth_size = 20;

        for (let i = 0; i < 5; i++) {
            dataView.setInt32(1 + (i * depth_size), 100);
            dataView.setInt32(5 + (i * depth_size), 100);
            dataView.setInt16(9 + (i * depth_size), 100);
            dataView.setInt16(11 + (i * depth_size), 100);
            dataView.setFloat32(13 + (i * depth_size), 100);
            dataView.setFloat32(17 + (i * depth_size), 100);
        }

        dataView.setInt8(0, 63);
        dataView.setFloat32(101, 100);
        dataView.setInt32(105, 100);
        dataView.setInt32(109, 100);
        dataView.setInt8(113, 1);
        dataView.setInt8(114, 1);
        dataView.setInt32(115, 100);
        dataView.setFloat32(119, 100);
        dataView.setInt32(123, 100);
        dataView.setInt32(127, 100);
        dataView.setInt32(131, 100);
        dataView.setFloat32(135, 100);
        dataView.setFloat32(139, 100);
        dataView.setFloat32(143, 100);
        dataView.setFloat32(147, 100);
        dataView.setFloat32(151, 100);
        dataView.setFloat32(155, 100);
        dataView.setFloat32(159, 100);
        dataView.setFloat32(163, 100);
        dataView.setInt32(167, 100);
        dataView.setInt32(171, 100);
        livePriceWebSocket.parseBinary(byteBuffer);
    });

    test("parseBinaryIndexFullTest", () => {
        let byteBuffer = Buffer.alloc(39);
        let dataView = new DataView(byteBuffer.buffer);
        dataView.setInt8(0, 66);
        dataView.setFloat32(1, 100);
        dataView.setInt32(5, 100);
        dataView.setInt8(9, 1);
        dataView.setInt8(10, 1);
        dataView.setFloat32(11, 100);
        dataView.setFloat32(15, 100);
        dataView.setFloat32(19, 100);
        dataView.setFloat32(23, 100);
        dataView.setFloat32(27, 100);
        dataView.setFloat32(31, 100);
        dataView.setInt32(35, 100);
        livePriceWebSocket.parseBinary(byteBuffer);
    });

    test("onOpenTest", () => {
        livePriceWebSocket.connect
    })

    test("reconnectTest", () => {
        livePriceWebSocket.reconnect()
    });

    test("disconnectTest", () => {
        livePriceWebSocket.disconnect()
    });

    test("delayTest", () => {
        livePriceWebSocket.delay(1)
    })
});