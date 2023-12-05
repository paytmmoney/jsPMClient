var PMClient = require('./pmClient.js').PMClient;
var error = require('./exception');
var message = require('./constants').error_message;
const apiService = require('./apiService');

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

    test("error_test_6", () => {
        expect(
            error.OtherError("error")
        ).toBe("OtherError")
    });

    test("error_test_7", () => {
        expect(() =>
            new PMClient(api_key=null,api_secret=null)
        ).toThrow("api_key cannot be null")
    });

    test("error_test_8", () => {
        expect(() =>
            new PMClient(api_key="api_key",api_secret=null)
        ).toThrow("api_secret cannot be null")
    });

    test("set_access_token_test", () => {
        connect.set_access_token("invalid_token");;
        const order = connect.set_access_token(access_token="access_token")
        expect(order).toBe("access_token")
    });

    test("set_public_access_token_test", () => {
        connect.set_public_access_token("invalid_token");;
        const order = connect.set_public_access_token(public_access_token="public_access_token")
        expect(order).toBe("public_access_token")
    });

    test("set_read_access_token_test", () => {
        connect.set_read_access_token("invalid_token");;
        const order = connect.set_read_access_token(read_access_token="read_access_token")
        expect(order).toBe("read_access_token")
    });

    test("set_access_token_test", () => {
        connect.set_access_token("invalid_token");;
        const order = connect.set_access_token(access_token="access_token")
        expect(order).toBe("access_token")
    });

    test("generate_session_test", () => {
        token = {
            "access_token": "abc",
            "public_access_token": "def",
            "read_access_token": "ghi"
        };
        jsonString = JSON.stringify(token)
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue(jsonString);
        connect.generate_session("request_token");
        myMethodMock.mockRestore();
    });
    
    test("logout_test", () => {
    const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
    connect.logout();
    myMethodMock.mockRestore();
  });

        

    test("login_url_test", () => {
        expect(
            connect.get_login_URL(state_key="state_key")
        ).toBe("https://login.paytmmoney.com/merchant-login?apiKey=api_key&state=state_key")
    })

    test("login_url_null_test", () => {
        expect(() =>
            connect.get_login_URL(state_key=null)
        ).toThrow(Error)
    })

    test("security_master_connection_test_1",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        expect(() =>
            connect.security_master()
        ).toThrow(error.NotFoundError)
    });

    test("place_order_attribute_test", () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        const order = connect.place_order(        
        source="W",
        txn_type="B",
        exchange="NSE",
        segment="E",
        product="",
        security_id="772",
        quantity=1,
        validity="DAY",
        order_type="SL",
        price=620.0,
        off_mkt_flag=false,
        profit_value=null,
        stoploss_value=null,
        trigger_price=null)
    });

    test("place_order_connection_test", () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
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
    });

    test("place_bracket_order_connection_test", () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
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
    });

    test("place_order_connection_test", () => {
       
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');        const order = connect.place_order(        
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
    });

    test("modify_order_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        const order = connect.modify_order(
            txn_type="B",
            source="N",
            exchange="NSE",
            segment="E",
            product="I",
            security_id="772",
            quantity=2,
            validity="DAY",
            order_type="SLM",
            price=620.0,
            off_mkt_flag=false,
            mkt_type="NL",
            order_no="order_no",
            serial_no=1,
            group_id=8,
            null,
            null,
            null
            )
    });

    test("modify_bracket_order_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        const order = connect.modify_order(
            txn_type="B",
            source="N",
            exchange="NSE",
            segment="E",
            product="B",
            security_id="772",
            quantity=2,
            validity="DAY",
            order_type="SLM",
            price=620.0,
            off_mkt_flag=false,
            mkt_type="NL",
            order_no="order_no",
            serial_no=1,
            group_id=8,
            trigger_price=null,
            leg_no="2",
            algo_order_no="4"
            )
    });

    test("modify_cover_order_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        const order = connect.modify_order(
            txn_type="B",
            source="N",
            exchange="NSE",
            segment="E",
            product="V",
            security_id="772",
            quantity=2,
            validity="DAY",
            order_type="SLM",
            price=620.0,
            off_mkt_flag=false,
            mkt_type="NL",
            order_no="order_no",
            serial_no=1,
            group_id=8,
            null,
            leg_no="2",
            null
            )
    });

    test("modify_order_attribute_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        const order = connect.modify_order(
            source="N",
            txn_type="B",
            exchange="NSE",
            segment="E",
            product="",
            security_id="772",
            quantity=2,
            validity="DAY",
            order_type="SLM",
            price=620.0,
            off_mkt_flag=false,
            mkt_type="NL",
            order_no="order_no",
            serial_no=1,
            group_id=8,
            trigger_price=9.8,
            leg_no=null,
            algo_order_no=null
            )
    });

    test("cancel_order_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        const order = connect.cancel_order(
            source="N",
            txn_type="B",
            exchange="NSE",
            segment="E",
            product="I",
            security_id="772",
            quantity=2,
            validity="DAY",
            order_type="SLM",
            price=620.0,
            off_mkt_flag=false,
            mkt_type="NL",
            order_no="order_no",
            serial_no=2,
            group_id=8)
    });

    test("cancel_cover_order_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        const order = connect.cancel_order(
            source="N",
            txn_type="B",
            exchange="NSE",
            segment="E",
            product="V",
            security_id="772",
            quantity=2,
            validity="DAY",
            order_type="SLM",
            price=620.0,
            off_mkt_flag=false,
            mkt_type="NL",
            order_no="order_no",
            serial_no=2,
            group_id=8,
            leg_no="2"
            )
    });

    test("cancel_bracket_order_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        const order = connect.cancel_order(
            source="N",
            txn_type="B",
            exchange="NSE",
            segment="E",
            product="B",
            security_id="772",
            quantity=2,
            validity="DAY",
            order_type="SLM",
            price=620.0,
            off_mkt_flag=false,
            mkt_type="NL",
            order_no="order_no",
            serial_no=2,
            group_id=8,
            leg_no="2",
            algo_order_no="4"
            )
    });

    test("cancel_order_attribute_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        const order = connect.cancel_order(
            source="N",
            txn_type="B",
            exchange="NSE",
            segment="E",
            product="",
            security_id="",
            quantity=2,
            validity="DAY",
            order_type="SL",
            price=620.0,
            off_mkt_flag=false,
            mkt_type="NL",
            order_no="order_no",
            serial_no=2,
            group_id=8,
            trigger_price=null
            )
    });
    test("convert_order_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        const order = connect.convert_order(
            source="M",
            txn_type="S",
            exchange="NSE",
            segment="E",
            product_from="C",
            product_to="I",
            security_id="2885",
            quantity=100,
            mkt_type="NL"
            )
    });
    test("order_book_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        const order = connect.order_book()
    });
    test("orders_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        const order = connect.orders()
    });
    test("trade_details_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        const order = connect.trade_details(
            order_no="order_no",
            leg_no="1",
            segment="E"
        )
    });
    test("position_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        const order = connect.position()
    });
    test("position_details_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        const order = connect.position_details(
            security_id=772,
            product="I",
            exchange="NSE"
        )
    });
    test("funds_summary_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        const order = connect.funds_summary()
    });
    test("funds_summary_attribute_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        const order = connect.funds_summary()
    });
    test("order_margin_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
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
    });
    test("scrips_margin_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
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
    });
    test("scrips_margin_attribute_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        const order = connect.scrips_margin(
            source="N",
            margin_list=null
        )
    });
    test("holdings_value_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        const order = connect.holdings_value()
    });
    test("user_holdings_data_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        const order = connect.user_holdings_data(
            isin="isin"
        )
    });
    test("security_master_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        const order = connect.security_master("fileName")
    });
    test("generate_tpin_connection_test", () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        const order = connect.generate_tpin()
    });
    test("generate_tpin_attribute_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        const order = connect.generate_tpin()
    });
    test("validate_tpin_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        const order = connect.validate_tpin(
            trade_type="trade_type",
            isin_list=[])
    });
    test("validate_tpin_attribute_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        const order = connect.validate_tpin(
            trade_type="trade_type",
            isin_list=[])
    });
    test("status_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        const order = connect.status(edis_request_id=10131)
    });
    test("status_attribute_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        const order = connect.status(edis_request_id=10131)
    });
    test("user_details_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        const order = connect.get_user_details()
        
    });
    test("user_details_attribute_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        const order = connect.get_user_details()
    });
    // test("price_chart_sym_connection_test", () => {
    //     connect.set_access_token("invalid_token");
    //     const order = connect.price_chart_sym(        
    //         cont="false",
    //         exchange="NSE",
    //         expiry="2022-04-26",
    //         fromDate="2022-02-10",
    //         instType="FUTIDX",
    //         interval="MINUTE",
    //         symbol="MIDCPNIFTY",
    //         toDate="2022-02-05")
    //     expect(order).toThrow(error.ConnectionError)
    // });
    // test("price_chart_sym_attribute_test", () => {
    //     connect.set_access_token("invalid_token");
    //     const order = connect.price_chart_sym(        
    //         cont="false",
    //         exchange="NSE",
    //         expiry="2022-04-26",
    //         fromDate="2022-02-10",
    //         instType="FUTIDX",
    //         interval="MINUTE",
    //         symbol="",
    //         toDate="2022-02-05")
    //     expect(order).toThrow(error.AttributeError)
    // });
    test("create_gtt_connection_test", () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue("response");
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
    });
    test("create_gtt_attribute_test", () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue("response");
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
    });
    test("get_gtt_by_id_or_status_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue("response");
        const order = connect.get_gtt_by_status_or_pml_id()
    });
    test("get_gtt_by_id_or_status_connection_test1",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue("response");
        const order = connect.get_gtt_by_status_or_pml_id(
            status="ACTVE",
            pml_id="111111111111111"
        )
    });
    test("get_gtt_by_id_or_status_connection_test2",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue("response");
        const order = connect.get_gtt_by_status_or_pml_id(
            null,
            pml_id="1111111111111118"
        )
    });
    test("get_gtt_by_id_or_status_connection_test3",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue("response");
        const order = connect.get_gtt_by_status_or_pml_id(
            status="ACTVE",
            null
        )
    });
    test("get_gtt_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue("response");
        const order = connect.get_gtt(id=2563)
    });
    test("delete_gtt_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue("response");
        const order = connect.delete_gtt(id=2563)
    });
    test("update_gtt_attribute_test", () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue("response");
        const order = connect.update_gtt(    
            id=89,    
            set_price=12.80,
            transaction_type=5,
            quantity=3,
            trigger_price=12.7,
            limit_price=0,
            order_type="MKT",
            trigger_type="SINGLE")
    });
    test("update_gtt_connection_test", () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue("response");
        const order = connect.update_gtt(   
            id=89,   
            set_price=12.80,
            transaction_type="S",
            quantity=3,
            trigger_price=12.7,
            limit_price=0,
            order_type="MKT",
            trigger_type="SINGLE")
    });
    test("get_gtt_aggregate_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue("response");
        const order = connect.get_gtt_aggregate()
    });
    test("get_gtt_expiry_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue("response");
        const order = connect.get_gtt_expiry(pml_id="1000001488")
    });
    test("get_gtt_by_instruction_id_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue("response");
        const order = connect.get_gtt_by_instruction_id(id=2563)
        
    });
    test("create_gtt_v2_connection_test", () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue("response");
        const order = connect.create_gtt_v2(        
            segment="E",
            exchange="NSE",
            security_id="14366",
            product_type="C",
            set_price=12.80,
            transaction_type="S",
            trigger_type="SINGLE",
            transaction_details="transaction_details")
    });
    test("create_gtt_v2_attribute_test", () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue("response");
        const order = connect.create_gtt_v2(        
            segment="E",
            exchange="NSE",
            security_id="14366",
            product_type=6,
            set_price=12.80,
            transaction_type="S",
            trigger_type="SINGLE",
            transaction_details="transaction_details")
    });
    test("get_gtt_by_id_or_status_v2_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue("response");
        const order = connect.get_gtt_by_status_or_pml_id_v2()
    });
    test("get_gtt_by_id_or_status_v2_connection_test1",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue("response");
        const order = connect.get_gtt_by_status_or_pml_id_v2(
            status="ACTVE",
            pml_id="111111111111111"
        )
    });
    test("get_gtt_by_id_or_status_v2_connection_test2",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue("response");
        const order = connect.get_gtt_by_status_or_pml_id_v2(
            null,
            pml_id="1111111111111118"
        )
    });
    test("get_gtt_by_id_or_status_v2_connection_test3",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue("response");
        const order = connect.get_gtt_by_status_or_pml_id_v2(
            status="ACTVE",
            null
        )
    });
    test("get_gtt_v2_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue("response");
        const order = connect.get_gtt_v2(id=2563)
    });
    test("update_gtt_v2_attribute_test", () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue("response");
        const order = connect.update_gtt_v2(    
            id=89,    
            set_price=12.80,
            transaction_type=5,
            trigger_type="SINGLE",
            transaction_details="transaction_details")
    });
    test("update_gtt_v2_connection_test", () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue("response");
        const order = connect.update_gtt_v2(   
            id=89,   
            set_price=12.80,
            transaction_type="S",
            trigger_type="SINGLE",
            transaction_details="transaction_details")
    });
    test("get_gtt_by_instruction_id_v2_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue("response");
        const order = connect.get_gtt_by_instruction_id_v2(id=2563)
        
    });

    // test("get_live_market_data_connection_test",  () => {
    //     response = {
    //         "data": [
    //             {
    //                 "last_trade_time": 1,
    //                 "last_update_time": 1
    //             }
    //         ]
    //     };
    //     const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue(response);
    //     const res = connect.get_live_market_data(mode_type='mode_type', preferences='preferences')
    // });

    test("get_option_chain_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        const response = connect.get_option_chain(type="type",symbol="symbol",expiry="expiry")
        myMethodMock.mockRestore();
    });

    test("get_option_chain_config_connection_test",  () => {
        const myMethodMock = jest.spyOn(apiService, 'apiCall').mockReturnValue('custom value');
        const response = connect.get_option_chain_config(symbol="symbol")
    });
    
});