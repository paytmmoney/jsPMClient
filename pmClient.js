const apiservice = require('./apiService')
const endpoints = require('./constants').endpoints

/**
 * @classdesc
 * 
 * @constructor
 * @name PMClient
 * @param {String} api_key
 * @param {String} api_secret
 * @param {String} access_token 
 */
var PMClient  = function(api_key, api_secret, access_token=null){
    if (api_key != null || undefined){
        this.api_key = api_key;
    } else {
        throw Error("api_key cannot be null");
    }
    if (api_secret != null || undefined){
        this.api_secret = api_secret;
    } else {
        throw Error("api_secret cannot be null");
    }
    this.access_token = access_token;
    
    /**
     * Set the access token 
     * @param {String} access_token 
     */
    this.set_access_token = function (access_token) {
        this.access_token = access_token;
        apiservice.access_token = access_token;
        return this.access_token;
    }

    /**
     * Login URL to get the request token
     * @param {String} state_key
     */
    this.get_login_URL = function (state_key) {
        if (state_key != null || undefined){
            return endpoints['login'] + api_key + endpoints['login_param'] + state_key;
        } else {
            throw Error("state_key cannot be null");
        }
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
        var token = await apiservice.apiCall('access_token', 'POST', order, query_param, null)

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
        return apiservice.apiCall('logout','DELETE',null,null,null)
    }

    /**
     * Fetch User Details
     */
    this.get_user_details = function() {
        return apiservice.apiCall('user_details','GET',null,null,null)
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
        return apiservice.apiCall(helper, 'POST', order, null, null);
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
        return apiservice.apiCall(helper,'POST',order,null, null);
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
        return apiservice.apiCall(helper,'POST',order,null,null)
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
        return apiservice.apiCall('convert_regular','POST',order,null,null)
    }

    // Order & Trade Book
    /**
     * Order Book
     */
    this.order_book = function(){
        return apiservice.apiCall('order_book', 'GET', null, null,null)
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
        return apiservice.apiCall('trade_details', 'GET', null, params,null)
    }

    /**
     * Positions
     */
    this.position = function(){
        return apiservice.apiCall('position','GET', null, null,null)
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
        return apiservice.apiCall('position_details', 'GET', null, params, null)
    }

    /**
     * Funds Summary
     * @param {boolean} config  
     */
    this.funds_summary = function(config=false) {
        var params = {
            'config' : config
        }
        return apiservice.apiCall('funds_summary','GET',null,params,null)
    }

    /**
     * Holdings Value
     */
    this.holdings_value = function(){
        return apiservice.apiCall('holdings_value','GET',null,null,null)
    }

    /**
     * User Holdings Data
     */
    this.user_holdings_data = function(){
        return apiservice.apiCall('user_holdings_data','GET',null,null,null)
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
        return apiservice.apiCall('order_margin','GET',null,params,null)
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
        return apiservice.apiCall('scrips_margin','POST',order,null,null)
    }

    /**
     * Security Master
     * @param {String} scrip_type
     * @param {String} exchange
     */
    this.security_master = function(scrip_type=null, exchange=null){
        var params = {
            'scrip_type': scrip_type, 
            'exchange': exchange
        }
        return apiservice.apiCall('security_master','GET',null,params,null)
    }

    /**
     * Generate TPIN for CDSL
     */
    this.generate_tpin = function(){
        return apiservice.apiCall('generate_tpin','GET',null,null,null)
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
        return apiservice.apiCall('validate_tpin','POST',order,null,null)
    }

    /**
     * Status of Transaction
     * @param {number} edis_request_id 
     */
    this.status = function(edis_request_id){
        var params = {
            'edis_request_id':edis_request_id
        }
        return apiservice.apiCall('status','GET',null,params,null)
    }

    /**
     * Historical data
     * @
     */
    this.price_chart_sym = function(cont, exchange, expiry, from_date, inst_type, interval, symbol, to_date, month_id=null, series=null, strike=null){
        var order = {
            'cont': cont,
            'exchange': exchange,
            'expiry': expiry,
            'fromDate': from_date,
            'instType': inst_type,
            'interval': interval,
            'monthId': month_id,
            'series': series,
            'strike': strike,
            'symbol': symbol,
            'toDate': to_date
        }
        return apiservice.apiCall('price_chart_sym','POST',order,null,null)
    }

    /**
     * Get GTT by status or pml_id
     * @param {String} status
     * @param {String} pml_id
     */
     this.get_gtt_by_status_or_pml_id = function(status=null,pml_id=null){
        var params = {
            'status': status,
            'pml-id': pml_id
        }
        return apiservice.apiCall('gtt','GET',null,params,null)
    }

    /**
     * Create GTT order
     * @param {String} segment
     * @param {String} exchange
     * @param {String} pml_id
     * @param {String} security_id
     * @param {String} product_type
     * @param {String} set_price
     * @param {String} transaction_type
     * @param {String} order_type
     * @param {String} trigger_type
     * @param {String} quantity
     * @param {String} trigger_price
     * @param {String} limit_price
     * @param {String} execution_ref_id
     * @param {String} notification_ref_id
     * @param {String} sub_type
     * @param {String} triggered_at
     * @param {String} triggered_at_price
     * @param {String} triggered_at_type
     */
     this.create_gtt = function(segment, exchange, pml_id, security_id, product_type, set_price, transaction_type, order_type, trigger_type, quantity, trigger_price, limit_price, execution_ref_id=null, 
        notification_ref_id=null, sub_type=null, triggered_at=null, triggered_at_price=null, triggered_at_type=null){
        var transaction_details = []

        var transaction_details_obj = {
            'quantity': quantity,
            'trigger_price': trigger_price,
            'limit_price': limit_price,
            'execution_ref_id': execution_ref_id,
            'notification_ref_id': notification_ref_id,
            'sub_type': sub_type,
            'triggered_at': triggered_at,
            'triggered_at_price': triggered_at_price,
            'triggered_at_type': triggered_at_type
        }
        transaction_details.push(transaction_details_obj)

        var order = {
            'segment': segment,
            'exchange': exchange,
            'pml_id': pml_id,
            'security_id': security_id,
            'product_type': product_type,
            'set_price': set_price,
            'transaction_type': transaction_type,
            'order_type': order_type,
            'trigger_type': trigger_type,
            'transaction_details': transaction_details
        }
        return apiservice.apiCall('gtt','POST',order,null,null)
    }

    /**
     * Get GTT 
     * @param {String} id
     */
     this.get_gtt = function(id){
        var path_params = {
            'id' : id
        }
        return apiservice.apiCall('gtt_by_id','GET',null,null,path_params)
    }

    /**
     * Update GTT order
     * @param {String} set_price
     * @param {String} transaction_type
     * @param {String} order_type
     * @param {String} trigger_type
     * @param {String} quantity
     * @param {String} trigger_price
     * @param {String} limit_price
     */
     this.update_gtt = function(id,set_price=null, transaction_type=null, order_type=null, trigger_type=null, quantity=null, trigger_price=null, limit_price=null){
        var path_params = {
            'id' : id
        }
        
        var transaction_details = []

        var transaction_details_obj = {
            'quantity': quantity,
            'trigger_price': trigger_price,
            'limit_price': limit_price
        }
        transaction_details.push(transaction_details_obj)

        var order = {
            'set_price': set_price,
            'transaction_type': transaction_type,
            'order_type': order_type,
            'trigger_type': trigger_type,
            'transaction_details': transaction_details
        }
        return apiservice.apiCall('gtt_by_id','PUT',order,null,path_params)
    }

    /**
     * Delete GTT order
     * @param {String} id
     */
     this.delete_gtt = function(id){
        var path_params = {
            'id' : id
        }
        return apiservice.apiCall('gtt_by_id','DELETE',null,null,path_params)
    }

    /**
     * GET GTT Aggregate
     */
    this.get_gtt_aggregate = function(){
        return apiservice.apiCall('gtt_aggregate','GET',null,null,null)
    }

    /**
     * Get GTT expiry date by pml_id
     * @param {String} id
     */
     this.get_gtt_expiry = function(pml_id){
        var params = {
            'pml-id' : pml_id
        }
        return apiservice.apiCall('expiry_gtt','GET',null,params,null)
    }   

    /**
     * Get GTT order by Instruction id
     * @param {String} id
     */
     this.get_gtt_by_instruction_id = function(id){
        var path_params = {
            'id' : id
        }
        return apiservice.apiCall('gtt_by_instruction_id','GET',null,null,path_params)
    }
}

//exporting PMClient
exports.PMClient = PMClient