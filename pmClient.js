const apiservice = require('./apiService')
const endpoints = require('./constants').endpoints

/**
 * @classdesc
 * 
 * @constructor
 * @name PMClient
 * @param {String} params.api_key
 * @param {String} params.api_secret
 * @param {String} params.state_key
 * @param {String} [params.access_token=null] 
 */
var PMClient  = function(params){
    this.api_key = params.api_key;
    this.api_secret = params.api_secret;
    this.state_key = params.state_key;
    this.access_token = params.access_token;
    
    /**
     * Set the access token 
     * @param {String} token 
     */
    this.set_access_token = function (access_token) {
        this.access_token = access_token;
        apiservice.access_token = access_token;
        return this.access_token;
    }

    /**
     * Login URL to get the request token
     */
    this.get_login_URL = function () {
        return endpoints['login'] + api_key + endpoints['login_param'] + state_key;
    }

    /**
     * Generate session and get the access_token
     * @param {String} request_token 
     */
    this.generate_session = async function (request_token) {
        var order = {
            merchantSecret : api_secret
        }
        var query_param = {
            requestToken : request_token,
            apiKey : api_key,
        }
        var token = await apiservice.apiCall('access_token', 'POST', order, query_param)

        const res = JSON.parse(token);

        if (token) {
            this.set_access_token(res['data']);
        }

        return res['data'];
    }

    /**
     * Logout the session
     */
    this.logout = function() {
        this.set_access_token(this.access_token=null)
        return apiservice.apiCall('logout','GET',null,null)
    }

    /**
     * Fetch User Details
     */
    this.get_user_details = function() {
        return apiservice.apiCall('user_details','GET',null,null)
    }

    // Orders
    /**
     * Place Order
     * @param {String} txn_type 
     * @param {String} source 
     * @param {String} exchange 
     * @param {String} segment 
     * @param {String} product 
     * @param {number} security_id 
     * @param {number} quantity 
     * @param {String} validity 
     * @param {String} order_type 
     * @param {number} price 
     * @param {boolean} off_mkt_flag 
     * @param {number} profit_value 
     * @param {number} stoploss_value 
     * @param {number} trigger_price 
     * @param {number} edis_txn_id 
     * @param {String} edis_auth_mode 
     */
    this.place_order = function(txn_type,source,exchange,segment,product,security_id,quantity,validity,order_type,price,off_mkt_flag=false,profit_value=null,stoploss_value=null,trigger_price=null, edis_txn_id=null, edis_auth_mode=null){
        var order = {        
            'txn_type': txn_type, 
            'source' : source, 
            'exchange' : exchange, 
            'segment' : segment, 
            'product' : product, 
            'security_id' : security_id, 
            'quantity' : quantity, 
            'validity' : validity, 
            'order_type' : order_type, 
            'price' : price, 
            'off_mkt_flag': off_mkt_flag
        }
        var helper = 'place_regular';

        //For placing stop loss order or stop loss market order
        if (order_type == "SLM" || "SL"){
            order['trigger_price'] = trigger_price;
        }

        //If placing sell CNC order
        if (edis_txn_id && edis_auth_mode != null){
            order['edis_txn_id'] = edis_txn_id;
            order['edis_auth_mode'] = edis_auth_mode;
        }


        //For Bracket Order
        if(product == 'B') {
            helper = 'place_bracket';
            delete order.off_mkt_flag;
            order['profit_value'] = profit_value;
            order['stoploss_value'] = stoploss_value;
        }

        // For Cover Order
        if(product == 'V'){
            helper = 'place_cover';
            delete order.off_mkt_flag;
            order['trigger_price'] = trigger_price;
        }
        return apiservice.apiCall(helper, 'POST', order, null);
    }

    /**
     * Modify Order
     * @param {String} txn_type 
     * @param {String} source 
     * @param {String} exchange 
     * @param {String} segment 
     * @param {String} product 
     * @param {number} security_id 
     * @param {number} quantity 
     * @param {String} validity 
     * @param {String} order_type 
     * @param {number} price 
     * @param {boolean} off_mkt_flag 
     * @param {String} mkt_type 
     * @param {number} order_no 
     * @param {number} serial_no 
     * @param {number} group_id 
     * @param {number} trigger_price
     * @param {number} leg_no 
     * @param {number} algo_order_no 
     * @param {number} edis_txn_id 
     * @param {String} edis_auth_mode 
     */
    this.modify_order = function(txn_type,source,exchange,segment,product,security_id,quantity,validity,order_type,price,off_mkt_flag=false,mkt_type,order_no,serial_no,group_id,trigger_price=null,leg_no=null,algo_order_no=null, edis_txn_id=null, edis_auth_mode=null) {
        var order = {
            'txn_type': txn_type, 
            'source' : source, 
            'exchange' : exchange, 
            'segment' : segment, 
            'product' : product, 
            'security_id' : security_id, 
            'quantity' : quantity, 
            'validity' : validity, 
            'order_type' : order_type, 
            'price' : price, 
            'off_mkt_flag': off_mkt_flag,
            'mkt_type': mkt_type,
            'order_no': order_no,
            'serial_no': serial_no,
            'group_id': group_id
        }

        var helper = 'modify_regular'

        //For modifying stop loss order or stop loss market order
        if (order_type == "SLM" || "SL"){
            order['trigger_price'] = trigger_price;
        }

        //If modifying sell CNC order
        if (edis_txn_id && edis_auth_mode != null){
            order['edis_txn_id'] = edis_txn_id;
            order['edis_auth_mode'] = edis_auth_mode;
        }

        // For Bracket Order
        if(product == 'B'){
            helper = 'modify_bracket';
            order['leg_no'] = leg_no;
            order['algo_order_no'] = algo_order_no;
        }

        // For Cover Order
        if(product == 'V'){
            helper = 'modify_cover';
            order['leg_no'] = leg_no;
        }
        return apiservice.apiCall(helper,'POST',order,null);
    }

    /**
     * Cancel Order
     * @param {String} txn_type 
     * @param {String} source 
     * @param {String} exchange 
     * @param {String} segment 
     * @param {String} product 
     * @param {number} security_id 
     * @param {number} quantity 
     * @param {String} validity 
     * @param {String} order_type 
     * @param {number} price 
     * @param {boolean} off_mkt_flag 
     * @param {String} mkt_type 
     * @param {number} order_no 
     * @param {number} serial_no 
     * @param {number} group_id 
     * @param {number} trigger_price
     * @param {number} leg_no 
     * @param {number} algo_order_no
     * 
    */
    this.cancel_order = function(txn_type,source,exchange,segment,product,security_id,quantity,validity,order_type,price,off_mkt_flag=false,mkt_type,order_no,serial_no,group_id,trigger_price=null,leg_no=null,algo_order_no=null) {
        var order = {
            'txn_type': txn_type, 
            'source' : source, 
            'exchange' : exchange, 
            'segment' : segment, 
            'product' : product, 
            'security_id' : security_id, 
            'quantity' : quantity, 
            'validity' : validity, 
            'order_type' : order_type, 
            'price' : price, 
            'off_mkt_flag': off_mkt_flag,
            'mkt_type': mkt_type,
            'order_no': order_no,
            'serial_no': serial_no,
            'group_id': group_id
        }
        var helper = 'cancel_regular';

        //For placing stop loss order or stop loss market order
        if (order_type == "SLM" || "SL"){
            order['trigger_price'] = trigger_price;
        }

        // For Bracket Order
        if(product == 'B'){
            helper = 'exit_bracket';
            order['leg_no'] = leg_no;
            order['algo_order_no'] = algo_order_no;
        }

        // For Cover Order
        if(product == 'V'){
            helper = 'exit_cover';
            order['leg_no'] = leg_no;
        }
        return apiservice.apiCall(helper,'POST',order,null)
    }

    /**
     * Convert Regular Order
     * @param {String} source 
     * @param {String} txn_type 
     * @param {String} exchange 
     * @param {String} segment 
     * @param {String} mkt_type 
     * @param {String} product_from 
     * @param {String} product_to 
     * @param {number} quantity 
     * @param {number} security_id 
     * @param {number} edis_txn_id 
     * @param {String} edis_auth_mode 
     * @returns 
     */
    this.convert_order = function(source,txn_type,exchange,segment,mkt_type,product_from,product_to,quantity,security_id, edis_txn_id=null, edis_auth_mode=null){
        var order = {
            'source': source,
            'txn_type': txn_type,
            'exchange':exchange,
            'segment':segment,
            'mkt_type':mkt_type,
            'product_from':product_from,
            'product_to':product_to,
            'quantity':quantity,
            'security_id':security_id
        }
        
        //If modifying sell CNC order
        if (edis_txn_id && edis_auth_mode != null){
            order['edis_txn_id'] = edis_txn_id;
            order['edis_auth_mode'] = edis_auth_mode;
        }
        return apiservice.apiCall('convert_regular','POST',order,null)
    }

    // Order & Trade Book
    /**
     * Order Book
     */
    this.order_book = function(){
        return apiservice.apiCall('order_book', 'GET', null, null)
    }

    /**
     * Trade Details
     * @param {number} order_no 
     * @param {number} leg_no 
     * @param {String} segment 
     */
    this.trade_details = function(order_no,leg_no,segment){
        var params={
            'order_no':order_no,
            'leg_no':leg_no,
            'segment':segment
        }
        return apiservice.apiCall('trade_details', 'GET', null, params)
    }

    /**
     * Positions
     */
    this.position = function(){
        return apiservice.apiCall('position','GET', null, null)
    }

    /**
     * Position details of the security_id
     * @param {number} security_id 
     * @param {String} product 
     * @param {String} exchange  
     */
    this.position_details = function(security_id, product, exchange){
        var params ={
            'security_id':security_id,
            'product':product,
            'exchange':exchange
        }
        return apiservice.apiCall('position_details', 'GET', null, params)
    }

    /**
     * Funds Summary
     * @param {boolean} config  
     */
    this.funds_summary = function(config=false) {
        var params = {
            'config' : config
        }
        return apiservice.apiCall('funds_summary','GET',null,params)
    }

    /**
     * Holdings Value
     */
    this.holdings_value = function(){
        return apiservice.apiCall('holdings_value','GET',null,null)
    }

    /**
     * User Holdings Data
     */
    this.user_holdings_data = function(){
        return apiservice.apiCall('user_holdings_data','GET',null,null)
    }

    // Margins
    /**
     * Scrips Margin
     * @param {String} source 
     * @param {String} exchange 
     * @param {String} segment 
     * @param {number} security_id 
     * @param {String} txn_type 
     * @param {number} quantity 
     * @param {number} price 
     * @param {String} product 
     * @param {number} trigger_price 
     */
    this.order_margin = function(source, exchange, segment, security_id, txn_type, quantity, price, product, trigger_price) {
        var params = {
            'source':source,
            'exchange':exchange,
            'segment':segment,
            'security_id':security_id,
            'txn_type':txn_type,
            'quantity':quantity,
            'price':price,
            'product':product,
            'trigger_price':trigger_price
        }
        return apiservice.apiCall('order_margin','GET',null,params)
    }

    /**
     * Scrips Margin
     * @param {String} source 
     * @param {Array} margin_list 
     * @returns 
     */
    this.scrips_margin = function(source,margin_list) {
        if (margin_list == null) {
            margin_list = []
        }
        var order = {
            'source':source,
            'margin_list':margin_list
        }
        return apiservice.apiCall('scrips_margin','POST',order,null)
    }

    /**
     * Security Master
     */
    this.security_master = function(){
        return apiservice.apiCall('security_master','GET',null,null)
    }

    /**
     * Generate TPIN for CDSL
     */
    this.generate_tpin = function(){
        return apiservice.apiCall('generate_tpin','GET',null,null)
    }

    /**
     * Validate the TPIN
     * @param {String} trade_type 
     * @param {Array} isin_list 
     */
    this.validate_tpin = function(trade_type,isin_list){
        var order = {
            'trade_type':trade_type,
            'isin_list':isin_list
        }
        return apiservice.apiCall('validate_tpin','POST',order,null)
    }

    /**
     * Status of Transaction
     * @param {number} edis_request_id 
     */
    this.status = function(edis_request_id){
        var params = {
            'edis_request_id':edis_request_id
        }
        return apiservice.apiCall('status','GET',null,params)
    }
}

//exporting PMClient
exports.PMClient = PMClient