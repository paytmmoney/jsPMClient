const endpoints = {
    'host' : 'https://developer.paytmmoney.com',
    'login_param' : '&state=',

    // login endpoints
    'login' : 'https://login.paytmmoney.com/merchant-login?apiKey=',
    'logout' : ['/accounts/v1/logout',['access_token','public_access_token','read_access_token']],
    'user_details' : ['/accounts/v1/user/details',['access_token','read_access_token']],
    'access_token' : ['/accounts/v2/gettoken',[]],

    // regular order endpoints
    'place_regular': ['/orders/v1/place/regular',['access_token']],
    'modify_regular': ['/orders/v1/modify/regular',['access_token']],
    'cancel_regular': ['/orders/v1/cancel/regular',['access_token']],
    'convert_regular': ['/orders/v1/convert/regular',['access_token']],

    // cover order endpoints
    'place_cover': ['/orders/v1/place/cover',['access_token']],
    'modify_cover': ['/orders/v1/modify/cover',['access_token']],
    'exit_cover': ['/orders/v1/exit/cover',['access_token']],

    // bracket order endpoints
    'place_bracket': ['/orders/v1/place/bracket',['access_token']],
    'modify_bracket': ['/orders/v1/modify/bracket',['access_token']],
    'exit_bracket': ['/orders/v1/exit/bracket',['access_token']],

    // order-book, trade details endpoints
    'order_book': ['/orders/v1/order-book',['access_token','read_access_token']],
    'orders': ['/orders/v1/user/orders',['access_token','read_access_token']],
    'trade_details': ['/orders/v1/trade-details',['access_token','read_access_token']],

    // positions and holdings endpoints
    'position': ['/orders/v1/position',['access_token','read_access_token']],
    'position_details': ['/orders/v1/position-details',['access_token','read_access_token']],
    'funds_summary': ['/accounts/v1/funds/summary',['access_token','read_access_token']],
    'holdings_value': ['/holdings/v1/get-holdings-value',['access_token','read_access_token']],
    'user_holdings_data': ['/holdings/v1/get-user-holdings-data',['access_token','read_access_token']],
    'charges_info': ['/accounts/v1/charges/info',['access_token']],

    // security Master endpoints
    'security_master': ['/data/v1/scrips/{file_name}',[]],

    // margin endpoints
    'scrips_margin': ['/margin/v1/scrips/calculator',['access_token','read_access_token']],
    'order_margin': ['/margin/v1/order/calculator',['access_token','read_access_token']],

    // edis endpoints
    'generate_tpin': ['/edis/v1/generate/tpin',['access_token']],
    'validate_tpin': ['/edis/v1/validate/tpin',['access_token']],
    'status': ['/edis/v1/status',['access_token']],

    // historical_data endpoints
    'price_chart_sym': ['/data/v1/price-charts/sym',['access_token','read_access_token']],
    
    // gtt endpoints
    'gtt': ['/gtt/v1/gtt',['access_token']],
    'gtt_by_id': ['/gtt/v1/gtt/{id}',['access_token']],
    'gtt_aggregate': ['/gtt/v1/gtt/aggregate',['access_token','read_access_token']],
    'expiry_gtt': ['/gtt/v1/gtt/expiry-date',['access_token','read_access_token']],
    'gtt_by_instruction_id': ['/gtt/v1/gtt/instructions/{id}',['access_token','read_access_token']],
    'gtt_v2': ['/gtt/v2/gtt',['access_token']],
    'gtt_by_id_v2': ['/gtt/v2/gtt/{id}',['access_token']],
    'gtt_by_instruction_id_v2': ['/gtt/v2/gtt/instructions/{id}',['access_token','read_access_token']],

    // live market data endpoints
    'live_market_data': ['/data/v1/price/live?mode={mode_type}&pref={preferences}',['access_token','read_access_token']],

    // fno option chain
    'option_chain': ['/fno/v1/option-chain?type={type}&symbol={symbol}&expiry={expiry}',['access_token','read_access_token']],
    'option_chain_config': ['/fno/v1/option-chain/config?symbol={symbol}',['access_token','read_access_token']],

    'websocket_url' : 'wss://developer-ws.paytmmoney.com/broadcast/user/v1/data?x_jwt_token='
}

exports.endpoints = endpoints