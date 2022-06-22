var PMClient = require('./pmClient.js').PMClient;
var error = require('./exception');
var message = require('./constants').error_message;

describe("PMClient", () => {
    var connect = new PMClient(api_key="api_key",api_secret="api_secret")

    test("error_test_1", () => {
        expect(
            error.ConnectionError("error")
        ).toBe("ConnectionError")
    });

    test("error_test_2", () => {
        expect(
            error.AttributeError("error")
        ).toBe("AttributeError")
    });

    test("error_test_3", () => {
        expect(
            error.MediaTypeError("error")
        ).toBe("MediaTypeError")
    });

    test("error_test_4", () => {
        expect(
            error.ServerError("error")
        ).toBe("ServerError")
    });

    test("error_test_5", () => {
        expect(
            error.NotFoundError("error")
        ).toBe("NotFoundError")
    });

    test("set_access_token_test", () => {
        connect.set_access_token("invalid_token");;
        const order = connect.set_access_token(access_token="access_token")
        expect(order).toBe("access_token")
    });

    test("generate_session_test", () => {
        return connect.generate_session("request_token").then(data => {
            expect(data).toBe(null);
        });
    });
    
    test("logout_test", () => {
        connect.set_access_token("invalid_token");
        expect(
            connect.logout()
        ).toThrow(error.ConnectionError)
    })

    test("login_url_test", () => {
        expect(
            connect.get_login_URL()
        ).toBe("https://login-stg.paytmmoney.com/merchant-login?returnUrl=https://www.google.com/&apiKey=api_key")
    })

    test("place_order_attribute_test", () => {
        connect.set_access_token("valid_token");
        const order = connect.place_order(        
        source="W",
        txn_type="B",
        exchange="NSE",
        segment="E",
        product="",
        security_id="772",
        quantity=1,
        validity="DAY",
        order_type="LMT",
        price=620.0,
        off_mkt_flag=false)
        expect(order).toThrow(ConnectionError)
    });

    test("place_order_connection_test", () => {
        connect.set_access_token("invalid_token");
        const order = connect.place_order(        
        source="W",
        txn_type="B",
        exchange="NSE",
        segment="E",
        product="I",
        security_id="772",
        quantity=1,
        validity="DAY",
        order_type="LMT",
        price=620.0,
        off_mkt_flag=false)
        expect(order).toThrow(error.ConnectionError)
    });

    test("place_bracket_order_connection_test", () => {
        connect.set_access_token("invalid_token");
        const order = connect.place_order(        
        source="W",
        txn_type="B",
        exchange="NSE",
        segment="E",
        product="B",
        security_id="772",
        quantity=1,
        validity="DAY",
        order_type="LMT",
        price=620.0,
        off_mkt_flag=false,
        profit_value=4,
        stoploss_value=2
        )
        expect(order).toThrow(error.ConnectionError)
    });

    test("place_order_connection_test", () => {
        connect.set_access_token("invalid_token");
        const order = connect.place_order(        
        source="W",
        txn_type="B",
        exchange="NSE",
        segment="E",
        product="V",
        security_id="772",
        quantity=1,
        validity="DAY",
        order_type="LMT",
        price=620.0,
        off_mkt_flag=false,
        profit_value=null,
        stoploss_value=null,
        trigger_price=570
        )
        expect(order).toThrow(error.ConnectionError)
    });

    test("place_order_attribute_test",  () => {
        connect.set_access_token("valid_token");
        const order = connect.place_order(        
            source="W",
            txn_type="B",
            exchange="NSE",
            segment="E",
            product="",
            security_id="772",
            quantity=1,
            validity="DAY",
            order_type="LMT",
            price=620.0,
            off_mkt_flag=false)
        expect(order).toThrow(error.AttributeError)
    });

    test("modify_order_connection_test",  () => {
        connect.set_access_token("invalid_token");
        const order = connect.modify_order(
            txn_type="B",
            source="N",
            exchange="NSE",
            segment="E",
            product="I",
            security_id="772",
            quantity=2,
            validity="DAY",
            order_type="LMT",
            price=620.0,
            off_mkt_flag=false,
            mkt_type="NL",
            order_no="order_no",
            serial_no=1,
            group_id=8 )
        expect(order).toThrow(error.ConnectionError)
    });

    test("modify_bracket_order_connection_test",  () => {
        connect.set_access_token("invalid_token");
        const order = connect.modify_order(
            txn_type="B",
            source="N",
            exchange="NSE",
            segment="E",
            product="B",
            security_id="772",
            quantity=2,
            validity="DAY",
            order_type="LMT",
            price=620.0,
            off_mkt_flag=false,
            mkt_type="NL",
            order_no="order_no",
            serial_no=1,
            group_id=8,
            leg_no="2",
            algo_order_no="4"
            )
        expect(order).toThrow(error.ConnectionError)
    });

    test("modify_cover_order_connection_test",  () => {
        connect.set_access_token("invalid_token");
        const order = connect.modify_order(
            txn_type="B",
            source="N",
            exchange="NSE",
            segment="E",
            product="V",
            security_id="772",
            quantity=2,
            validity="DAY",
            order_type="LMT",
            price=620.0,
            off_mkt_flag=false,
            mkt_type="NL",
            order_no="order_no",
            serial_no=1,
            group_id=8,
            leg_no="2"
            )
        expect(order).toThrow(error.ConnectionError)
    });

    test("modify_order_attribute_test",  () => {
        connect.set_access_token("valid_token");
        const order = connect.modify_order(
            source="N",
            txn_type="B",
            exchange="NSE",
            segment="E",
            product="",
            security_id="772",
            quantity=2,
            validity="DAY",
            order_type="LMT",
            price=620.0,
            off_mkt_flag=False,
            mkt_type="NL",
            order_no="order_no",
            serial_no=1,
            group_id=8)
        expect(order).toThrow(error.AttributeError)
    });

    test("cancel_order_connection_test",  () => {
        connect.set_access_token("invalid_token");
        const order = connect.cancel_order(
            source="N",
            txn_type="B",
            exchange="NSE",
            segment="E",
            product="I",
            security_id="772",
            quantity=2,
            validity="DAY",
            order_type="LMT",
            price=620.0,
            off_mkt_flag=false,
            mkt_type="NL",
            order_no="order_no",
            serial_no=2,
            group_id=8)
        expect(order).toThrow(error.ConnectionError)
    });

    test("cancel_cover_order_connection_test",  () => {
        connect.set_access_token("invalid_token");
        const order = connect.cancel_order(
            source="N",
            txn_type="B",
            exchange="NSE",
            segment="E",
            product="V",
            security_id="772",
            quantity=2,
            validity="DAY",
            order_type="LMT",
            price=620.0,
            off_mkt_flag=false,
            mkt_type="NL",
            order_no="order_no",
            serial_no=2,
            group_id=8,
            leg_no="2"
            )
        expect(order).toThrow(error.ConnectionError)
    });

    test("cancel_bracket_order_connection_test",  () => {
        connect.set_access_token("invalid_token");
        const order = connect.cancel_order(
            source="N",
            txn_type="B",
            exchange="NSE",
            segment="E",
            product="B",
            security_id="772",
            quantity=2,
            validity="DAY",
            order_type="LMT",
            price=620.0,
            off_mkt_flag=false,
            mkt_type="NL",
            order_no="order_no",
            serial_no=2,
            group_id=8,
            leg_no="2",
            algo_order_no="4"
            )
        expect(order).toThrow(error.ConnectionError)
    });

    test("cancel_order_attribute_test",  () => {
        connect.set_access_token("valid_token");
        const order = connect.cancel_order(
            source="N",
            txn_type="B",
            exchange="NSE",
            segment="E",
            product="",
            security_id="",
            quantity=2,
            validity="DAY",
            order_type="LMT",
            price=620.0,
            off_mkt_flag=False,
            mkt_type="NL",
            order_no="order_no",
            serial_no=2,
            group_id=8)
        expect(order).toThrow(error.AttributeError)
    });
    test("convert_order_connection_test",  () => {
        connect.set_access_token("invalid_token");
        const order = connect.convert_order(
            source="M",
            txn_type="S",
            exchange="NSE",
            segment="E",
            product_from="C",
            product_to="I",
            security_id="2885",
            quantity=100,
            mkt_type="NL")
        expect(order).toThrow(error.ConnectionError)
    });
    test("order_book_connection_test",  () => {
        connect.set_access_token("invalid_token");
        const order = connect.order_book()
            expect(order).toThrow(error.ConnectionError)
    });
    test("trade_details_connection_test",  () => {
        connect.set_access_token("invalid_token");
        const order = connect.trade_details(
            order_no="order_no",
            leg_no="1",
            segment="E"
        )
        expect(order).toThrow(error.ConnectionError)
    });
    test("position_connection_test",  () => {
        connect.set_access_token("invalid_token");
        const order = connect.position()
        expect(order).toThrow(error.ConnectionError)
    });
    test("position_details_connection_test",  () => {
        connect.set_access_token("invalid_token");
        const order = connect.position_details(
            security_id=772,
            product="I",
            exchange="NSE"
        )
        expect(order).toThrow(error.ConnectionError)
    });
    test("funds_summary_connection_test",  () => {
        connect.set_access_token("invalid_token");
        const order = connect.funds_summary()
        expect(order).toThrow(error.ConnectionError)
    });
    test("funds_summary_attribute_test",  () => {
        connect.set_access_token("valid_token");
        const order = connect.funds_summary()
        expect(order).toThrow(error.AttributeError)
    });
    test("order_margin_connection_test",  () => {
        connect.set_access_token("invalid_token");
        const order = connect.order_margin(
            source="W",
            exchange="NSE",
            segment="E",
            security_id="772",
            txn_type="B",
            quantity=100,
            price=0.0,
            product="1",
            trigger_price=0.0)
        expect(order).toThrow(error.ConnectionError)
    });
    test("scrips_margin_connection_test",  () => {
        connect.set_access_token("invalid_token");
        const order = connect.scrips_margin(
            source="N",
            margin_list=[
                {
                    "exchange": "NSE",
                    "segment": "",
                    "security_id": "46840",
                    "txn_type": "B",
                    "quantity": "250",
                    "strike_price": "0",
                    "trigger_price": "0",
                    "instrument": "FUTSTK"
                },
                {
                    "exchange": "NSE",
                    "segment": "D",
                    "security_id": "46834",
                    "txn_type": "B",
                    "quantity": "250",
                    "strike_price": "0",
                    "trigger_price": "0",
                    "instrument": "FUTSTK"
                },
                {
                    "exchange": "NSE",
                    "segment": "E",
                    "security_id": "27466",
                    "txn_type": "B",
                    "quantity": "25",
                    "strike_price": "0",
                    "trigger_price": "0",
                    "instrument": "EQUITY"
                }
            ]

        )
        expect(order).toThrow(error.ConnectionError)
    });
    test("scrips_margin_attribute_test",  () => {
        connect.set_access_token("valid_token");
        const order = connect.scrips_margin(
            source="N",
            margin_list=[
                {
                    "exchange": "NSE",
                    "segment": "",
                    "security_id": "46840",
                    "txn_type": "B",
                    "quantity": "250",
                    "strike_price": "0",
                    "trigger_price": "0",
                    "instrument": "FUTSTK"
                },
                {
                    "exchange": "NSE",
                    "segment": "D",
                    "security_id": "46834",
                    "txn_type": "B",
                    "quantity": "250",
                    "strike_price": "0",
                    "trigger_price": "0",
                    "instrument": "FUTSTK"
                },
                {
                    "exchange": "NSE",
                    "segment": "E",
                    "security_id": "27466",
                    "txn_type": "B",
                    "quantity": "25",
                    "strike_price": "0",
                    "trigger_price": "0",
                    "instrument": "EQUITY"
                }
            ]

        )
        expect(order).toThrow(error.AttributeError)
    });
    test("holdings_value_connection_test",  () => {
        connect.set_access_token("invalid_token");
        const order = connect.holdings_value()
        expect(order).toThrow(error.ConnectionError)
    });
    test("user_holdings_data_connection_test",  () => {
        connect.set_access_token("invalid_token");
        const order = connect.user_holdings_data(
            isin="isin"
        )
        expect(order).toThrow(error.ConnectionError)
    });
    test("security_master_connection_test",  () => {
        connect.set_access_token("invalid_token");
        const order = connect.security_master()
        expect(order).toThrow(error.ConnectionError)
    });
    test("generate_tpin_connection_test", () => {
        connect.set_access_token("invalid_token");
        const order = connect.generate_tpin()
        expect(order).toThrow(error.ConnectionError)
    });
    test("generate_tpin_attribute_test",  () => {
        connect.set_access_token("valid_token");
        const order = connect.generate_tpin()
        expect(order).toThrow(error.AttributeError)
    });
    test("validate_tpin_connection_test",  () => {
        connect.set_access_token("invalid_token");
        const order = connect.validate_tpin(
            exchange="NSE",
            segment="E",
            security_id="772",
            quantity=2)
        expect(order).toThrow(error.ConnectionError)
    });
    test("validate_tpin_attribute_test",  () => {
        connect.set_access_token("valid_token");
        const order = connect.validate_tpin(
            exchange="NSE",
            segment="E",
            security_id="772",
            quantity=2)
        expect(order).toThrow(error.AttributeError)
    });
    test("status_connection_test",  () => {
        connect.set_access_token("invalid_token");
        const order = connect.status(edis_request_id=10131)
        expect(order).toThrow(error.ConnectionError)
    });
    test("status_attribute_test",  () => {
        connect.set_access_token("valid_token");
        const order = connect.status(edis_request_id=10131)
        expect(order).toThrow(error.AttributeError)
    });
    test("user_details_connection_test",  () => {
        connect.set_access_token("invalid_token");
        const order = connect.get_user_details()
        expect(order).toThrow(error.ConnectionError)
    });
    test("user_details_attribute_test",  () => {
        connect.set_access_token("valid_token");
        const order = connect.get_user_details()
        expect(order).toThrow(error.AttributeError)
    });
    test("price_chart_sym_connection_test", () => {
        connect.set_access_token("invalid_token");
        const order = connect.price_chart_sym(        
            cont="false",
            exchange="NSE",
            expiry="2022-04-26",
            fromDate="2022-02-10",
            instType="FUTIDX",
            interval="MINUTE",
            symbol="MIDCPNIFTY",
            toDate="2022-02-05")
        expect(order).toThrow(error.ConnectionError)
    });
    test("price_chart_sym_attribute_test", () => {
        connect.set_access_token("invalid_token");
        const order = connect.price_chart_sym(        
            cont="false",
            exchange="NSE",
            expiry="2022-04-26",
            fromDate="2022-02-10",
            instType="FUTIDX",
            interval="MINUTE",
            symbol="",
            toDate="2022-02-05")
        expect(order).toThrow(error.AttributeError)
    });
    test("create_gtt_connection_test", () => {
        connect.set_access_token("invalid_token");
        const order = connect.create_gtt(        
            segment="E",
            exchange="NSE",
            pml_id="1000001488",
            security_id="14366",
            product_type="C",
            set_price=12.80,
            transaction_type="S",
            quantity=1,
            trigger_price=12.7,
            limit_price=0,
            order_type="MKT",
            trigger_type="SINGLE")
        expect(order).toThrow(error.ConnectionError)
    });
    test("create_gtt_attribute_test", () => {
        connect.set_access_token("invalid_token");
        const order = connect.create_gtt(        
            segment="E",
            exchange="NSE",
            pml_id="1000001488",
            security_id="14366",
            product_type=6,
            set_price=12.80,
            transaction_type="S",
            quantity=1,
            trigger_price=12.7,
            limit_price=0,
            order_type="MKT",
            trigger_type="SINGLE")
        expect(order).toThrow(error.AttributeError)
    });
    test("get_gtt_by_id_or_status_connection_test",  () => {
        connect.set_access_token("valid_token");
        const order = connect.get_gtt_by_status_or_pml_id(
            status="ACTIVE",
            pml_id="1000001488"
        )
        expect(order).toThrow(error.ConnectionError)
    });
    test("get_gtt_connection_test",  () => {
        connect.set_access_token("valid_token");
        const order = connect.get_gtt(id=2563)
        expect(order).toThrow(error.ConnectionError)
    });
    test("delete_gtt_connection_test",  () => {
        connect.set_access_token("valid_token");
        const order = connect.get_gtt(id=2563)
        expect(order).toThrow(error.ConnectionError)
    });
    test("update_gtt_attribute_test", () => {
        connect.set_access_token("invalid_token");
        const order = connect.update_gtt(    
            id=89,    
            set_price=12.80,
            transaction_type=5,
            quantity=3,
            trigger_price=12.7,
            limit_price=0,
            order_type="MKT",
            trigger_type="SINGLE")
        expect(order).toThrow(error.AttributeError)
    });
    test("update_gtt_connection_test", () => {
        connect.set_access_token("invalid_token");
        const order = connect.update_gtt(   
            id=89,   
            set_price=12.80,
            transaction_type="S",
            quantity=3,
            trigger_price=12.7,
            limit_price=0,
            order_type="MKT",
            trigger_type="SINGLE")
        expect(order).toThrow(error.ConnectionError)
    });
    test("get_gtt_aggregate_connection_test",  () => {
        connect.set_access_token("valid_token");
        const order = connect.get_gtt_aggregate()
        expect(order).toThrow(error.ConnectionError)
    });
    test("get_gtt_expiry_connection_test",  () => {
        connect.set_access_token("valid_token");
        const order = connect.get_gtt_expiry(pml_id="1000001488")
        expect(order).toThrow(error.ConnectionError)
    });
    test("get_gtt_by_instruction_id_connection_test",  () => {
        connect.set_access_token("valid_token");
        const order = connect.get_gtt_by_instruction_id(id=2563)
        expect(order).toThrow(error.ConnectionError)
    });
});