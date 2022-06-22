const endpoints = {
    'host' : 'https://developer.paytmmoney.com',
    'login_param' : '&state=',

    'login' : 'https://login.paytmmoney.com/merchant-login?apiKey=',
    'logout' : '/accounts/v1/logout',
    'user_details' : '/accounts/v1/user/details',
    'access_token' : '/accounts/v1/gettoken',

    'place_regular': '/orders/v1/place/regular',
    'modify_regular': '/orders/v1/modify/regular',
    'cancel_regular': '/orders/v1/cancel/regular',
    'convert_regular': '/orders/v1/convert/regular',

    'place_cover': '/orders/v1/place/cover',
    'modify_cover': '/orders/v1/modify/cover',
    'exit_cover': '/orders/v1/exit/cover',

    'place_bracket': '/orders/v1/place/bracket',
    'modify_bracket': '/orders/v1/modify/bracket',
    'exit_bracket': '/orders/v1/exit/bracket',

    'order_book': '/orders/v1/order-book',
    'trade_details': '/orders/v1/trade-details',
    'position': '/orders/v1/position',
    'position_details': '/orders/v1/position-details',
    'funds_summary': '/accounts/v1/funds/summary',
    'holdings_value': '/holdings/v1/get-holdings-value',
    'user_holdings_data': '/holdings/v1/get-user-holdings-data',
    'security_master': '/data/v1/security-master',

    'scrips_margin': '/margin/v1/scrips/calculator',
    'order_margin': '/margin/v1/order/calculator',

    'generate_tpin': '/edis/v1/generate/tpin',
    'validate_tpin': '/edis/v1/validate/tpin',
    'status': '/edis/v1/status',

    'price_chart_sym': '/data/v1/price-charts/sym',
    
    'gtt': '/gtt/v1/gtt',
    'gtt_by_id': '/gtt/v1/gtt/{id}',
    'gtt_aggregate': '/gtt/v1/gtt/aggregate',
    'expiry_gtt': '/gtt/v1/gtt/expiry-date',
    'gtt_by_instruction_id': '/gtt/v1/gtt/instructions/{id}'

}

exports.endpoints = endpoints