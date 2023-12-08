const apiservice = require('./apiService')
const endpoints = require('./constants').endpoints
const exception = require('./exception');
const utils = require('./epochConverterUtil');

/**
 * @classdesc
 * 
 * @constructor
 * @name PMClient
 * @param {String} api_key
 * @param {String} api_secret
 * @param {String} access_token 
 * @param {String} public_access_token 
 * @param {String} read_access_token 
 */
var PMClient  = function(api_key, api_secret, access_token=null, public_access_token=null, read_access_token=null){
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
    apiservice.access_token = access_token;
    this.public_access_token = public_access_token;
    apiservice.public_access_token = public_access_token;
    this.read_access_token = read_access_token;
    apiservice.read_access_token = read_access_token;

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
     * Set the public access token 
     * @param {String} public_access_token 
     */
    this.set_public_access_token = function (public_access_token) {
        this.public_access_token = public_access_token;
        apiservice.public_access_token = public_access_token;
        return this.public_access_token;
    }
    
    /**
     * Set the read access token 
     * @param {String} read_access_token 
     */
    this.set_read_access_token = function (read_access_token) {
        this.read_access_token = read_access_token;
        apiservice.read_access_token = read_access_token;
        return this.read_access_token;
    }

    /**
     * Login URL to get the request token
     * @param {String} state_key
     */
    this.get_login_URL = function (state_key) {
        if (state_key != null || undefined){
            return endpoints.login + api_key + endpoints.login_param + state_key;
        } else {
            throw Error("state_key cannot be null");
        }
    }

    /**
     * Generate session and get the tokens
     * @param {String} request_token 
     */
    this.generate_session = async function (request_token) {
        var request_body = {
            'api_key':this.api_key,
            'api_secret_key':this.api_secret,
            'request_token':request_token
        }
        var token = await apiservice.apiCall(endpoints.access_token[0],endpoints.access_token[1], 'POST',request_body, null, null)

        const res = JSON.parse(token);

        if (token) {
            this.set_access_token(res['access_token']);
            this.set_public_access_token(res['public_access_token']);
            this.set_read_access_token(res['read_access_token']);
        }
        return res;
    }

    /**
     * Logout the session
     */
    this.logout = function() {
        return apiservice.apiCall(endpoints.logout[0],endpoints.logout[1],'DELETE',null,null,null)
    }

    /**
     * Fetch User Details
     */
    this.get_user_details = function() {
        return apiservice.apiCall(endpoints.user_details[0],endpoints.user_details[1],'GET',null,null,null)
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
     */
    this.place_order = function(txn_type,source,exchange,segment,product,security_id,quantity,validity,order_type,price,off_mkt_flag=false,profit_value=null,stoploss_value=null,trigger_price=null){
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
        var api = endpoints.place_regular[0];
        var tokens = endpoints.place_regular[1];

        //For placing stop loss order or stop loss market order
        if (order_type == "SLM" || order_type == "SL"){
            order['trigger_price'] = trigger_price;
        }

        //For Bracket Order
        if(product == 'B') {
            api = endpoints.place_bracket[0];
            tokens = endpoints.place_bracket[1];
            delete order.off_mkt_flag;
            order['profit_value'] = profit_value;
            order['stoploss_value'] = stoploss_value;
        }

        // For Cover Order
        if(product == 'V'){
            api = endpoints.place_cover[0];
            tokens = endpoints.place_cover[1];
            delete order.off_mkt_flag;
            order['trigger_price'] = trigger_price;
        }
        return apiservice.apiCall(api,tokens,'POST', order, null, null);
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
     */
    this.modify_order = function(txn_type,source,exchange,segment,product,security_id,quantity,validity,order_type,price,off_mkt_flag=false,mkt_type,order_no,serial_no,group_id,trigger_price=null,leg_no=null,algo_order_no=null) {
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

        var api = endpoints.modify_regular[0];
        var tokens = endpoints.modify_regular[1];

        //For modifying stop loss order or stop loss market order
        if (order_type == "SLM" || order_type == "SL"){
            order['trigger_price'] = trigger_price;
        }

        // For Bracket Order
        if(product == 'B'){
            api = endpoints.modify_bracket[0];
            tokens = endpoints.modify_bracket[1];
            order['leg_no'] = leg_no;
            order['algo_order_no'] = algo_order_no;
        }

        // For Cover Order
        if(product == 'V'){
            api = endpoints.modify_cover[0];
            tokens = endpoints.modify_cover[1];
            order['leg_no'] = leg_no;
        }
        return apiservice.apiCall(api,tokens,'POST',order,null, null);
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
        var api = endpoints.cancel_regular[0];
        var tokens = endpoints.cancel_regular[1];

        //For canceling stop loss order or stop loss market order
        if (order_type == "SLM" || order_type == "SL"){
            order['trigger_price'] = trigger_price;
        }

        // For Bracket Order
        if(product == 'B'){
            api = endpoints.exit_bracket[0];
            tokens = endpoints.exit_bracket[1];
            order['leg_no'] = leg_no;
            order['algo_order_no'] = algo_order_no;
        }

        // For Cover Order
        if(product == 'V'){
            api = endpoints.exit_cover[0];
            tokens = endpoints.exit_cover[1];
            order['leg_no'] = leg_no;
        }
        return apiservice.apiCall(api,tokens,'POST',order,null,null)
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
     * @returns 
     */
    this.convert_order = function(source,txn_type,exchange,segment,mkt_type,product_from,product_to,quantity,security_id){
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
        return apiservice.apiCall(endpoints.convert_regular[0],endpoints.convert_regular[1],'POST',order,null,null)
    }

    // Order & Trade Book
    /**
     * Order Book
     */
    this.order_book = function(){
        return apiservice.apiCall(endpoints.order_book[0],endpoints.order_book[1],'GET', null, null,null)
    }

    /**
     * All Orders
     */
    this.orders = function(){
        return apiservice.apiCall(endpoints.orders[0],endpoints.orders[1],'GET', null, null,null)
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
        return apiservice.apiCall(endpoints.trade_details[0],endpoints.trade_details[1],'GET', null, params,null)
    }

    /**
     * Positions
     */
    this.position = function(){
        return apiservice.apiCall(endpoints.position[0],endpoints.position[1],'GET', null, null,null)
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
        return apiservice.apiCall(endpoints.position_details[0],endpoints.position_details[1],'GET', null, params, null)
    }

    /**
     * Funds Summary
     * @param {boolean} config  
     */
    this.funds_summary = function(config=false) {
        var params = {
            'config' : config
        }
        return apiservice.apiCall(endpoints.funds_summary[0],endpoints.funds_summary[1],'GET',null,params,null)
    }

    /**
     * Holdings Value
     */
    this.holdings_value = function(){
        return apiservice.apiCall(endpoints.holdings_value[0],endpoints.holdings_value[1],'GET',null,null,null)
    }

    /**
     * User Holdings Data
     */
    this.user_holdings_data = function(){
        return apiservice.apiCall(endpoints.user_holdings_data[0],endpoints.user_holdings_data[1],'GET',null,null,null)
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
        return apiservice.apiCall(endpoints.order_margin[0],endpoints.order_margin[1],'GET',null,params,null)
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
        return apiservice.apiCall(endpoints.scrips_margin[0],endpoints.scrips_margin[1],'POST',order,null,null)
    }

    /**
     * Security Master
     * @param {String} scrip_type
     * @param {String} exchange
     */
    this.security_master = function(file_name){
        if (!file_name){
            throw new exception.NotFoundError("File name should not be null or empty") 
        }
        var path_params = {
            'file_name' : file_name
        }
        return apiservice.apiCall(endpoints.security_master[0],endpoints.security_master[1],'GET',null,null,path_params)
    }

    /**
     * Generate TPIN for CDSL
     */
    this.generate_tpin = function(){
        return apiservice.apiCall(endpoints.generate_tpin[0],endpoints.generate_tpin[1],'GET',null,null,null)
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
        return apiservice.apiCall(endpoints.validate_tpin[0],endpoints.validate_tpin[1],'POST',order,null,null)
    }

    /**
     * Status of Transaction
     * @param {number} edis_request_id 
     */
    this.status = function(edis_request_id){
        var params = {
            'edis_request_id':edis_request_id
        }
        return apiservice.apiCall(endpoints.status[0],endpoints.status[1],'GET',null,params,null)
    }

    // /**
    //  * Historical data
    //  * @
    //  */
    // this.price_chart_sym = function(cont, exchange, expiry, from_date, inst_type, interval, symbol, to_date, month_id=null, series=null, strike=null){
    //     var order = {
    //         'cont': cont,
    //         'exchange': exchange,
    //         'expiry': expiry,
    //         'fromDate': from_date,
    //         'instType': inst_type,
    //         'interval': interval,
    //         'monthId': month_id,
    //         'series': series,
    //         'strike': strike,
    //         'symbol': symbol,
    //         'toDate': to_date
    //     }
    //     return apiservice.apiCall('price_chart_sym','POST',order,null,null)
    // }

    /**
     * Get GTT by status or pml_id
     * @param {String} status
     * @param {String} pml_id
     */
     this.get_gtt_by_status_or_pml_id = function(status=null,pml_id=null){
        if (status!=null && status!="" && pml_id!=null && pml_id!=""){
            var params = {
                'status': status,
                'pml-id': pml_id
            }
            return apiservice.apiCall(endpoints.gtt[0],endpoints.gtt[1],'GET',null,params,null)
        } else if ((status!=null && status!="")  && (pml_id==null || pml_id=="")) {
            var params = {
                'status': status
            }
            return apiservice.apiCall(endpoints.gtt[0],endpoints.gtt[1],'GET',null,params,null)
        } else if ((status==null || status=="") && (pml_id!=null && pml_id!="")) {
            var params = {
                'pml-id': pml_id
            }
            return apiservice.apiCall(endpoints.gtt[0],endpoints.gtt[1],'GET',null,params,null)
        } else {
            return apiservice.apiCall(endpoints.gtt[0],endpoints.gtt[1],'GET',null,null,null)
        }
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
     this.create_gtt = function(segment, exchange, pml_id, security_id, product_type, set_price, transaction_type, order_type, trigger_type, quantity, trigger_price, limit_price){
        var transaction_details = []

        var transaction_details_obj = {
            'quantity': quantity,
            'trigger_price': trigger_price,
            'limit_price': limit_price
        }
        transaction_details.push(transaction_details_obj)

        var order = {
            'segment': segment,
            'exchange': exchange,
            'pml-id': pml_id,
            'security_id': security_id,
            'product_type': product_type,
            'set_price': set_price,
            'transaction_type': transaction_type,
            'order_type': order_type,
            'trigger_type': trigger_type,
            'transaction_details': transaction_details
        }
        return apiservice.apiCall(endpoints.gtt[0],endpoints.gtt[1],'POST',order,null,null)
    }

    /**
     * Get GTT 
     * @param {String} id
     */
     this.get_gtt = function(id){
        var path_params = {
            'id' : id
        }
        return apiservice.apiCall(endpoints.gtt_by_id[0],endpoints.gtt_by_id[1],'GET',null,null,path_params)
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
        return apiservice.apiCall(endpoints.gtt_by_id[0],endpoints.gtt_by_id[1],'PUT',order,null,path_params)
    }

    /**
     * Delete GTT order
     * @param {String} id
     */
     this.delete_gtt = function(id){
        var path_params = {
            'id' : id
        }
        return apiservice.apiCall(endpoints.gtt_by_id[0],endpoints.gtt_by_id[1],'DELETE',null,null,path_params)
    }

    /**
     * GET GTT Aggregate
     */
    this.get_gtt_aggregate = function(){
        return apiservice.apiCall(endpoints.gtt_aggregate[0],endpoints.gtt_aggregate[1],'GET',null,null,null)
    }

    /**
     * Get GTT expiry date by pml_id
     * @param {String} id
     */
     this.get_gtt_expiry = function(pml_id){
        var params = {
            'pml-id' : pml_id
        }
        return apiservice.apiCall(endpoints.expiry_gtt[0],endpoints.expiry_gtt[1],'GET',null,params,null)
    }   

    /**
     * Get GTT order by Instruction id
     * @param {String} id
     */
     this.get_gtt_by_instruction_id = function(id){
        var path_params = {
            'id' : id
        }
        return apiservice.apiCall(endpoints.gtt_by_instruction_id[0],endpoints.gtt_by_instruction_id[1],'GET',null,null,path_params)
    }

    /**
     * Get GTT by status or pml_id v2
     * @param {String} status
     * @param {String} pml_id
     */
    this.get_gtt_by_status_or_pml_id_v2 = function(status=null,pml_id=null){
        if (status!=null && status!="" && pml_id!=null && pml_id!=""){
            var params = {
                'status': status,
                'pml-id': pml_id
            }
            return apiservice.apiCall(endpoints.gtt_v2[0],endpoints.gtt_v2[1],'GET',null,params,null)
        } else if ((status!=null && status!="")  && (pml_id==null || pml_id=="")) {
            var params = {
                'status': status
            }
            return apiservice.apiCall(endpoints.gtt_v2[0],endpoints.gtt_v2[1],'GET',null,params,null)
        } else if ((status==null || status=="") && (pml_id!=null && pml_id!="")) {
            var params = {
                'pml-id': pml_id
            }
            return apiservice.apiCall(endpoints.gtt_v2[0],endpoints.gtt_v2[1],'GET',null,params,null)
        } else {
            return apiservice.apiCall(endpoints.gtt_v2[0],endpoints.gtt_v2[1],'GET',null,null,null)
        }
    }

    /**
     * Create GTT order v2
     * @param {String} segment
     * @param {String} exchange
     * @param {String} pml_id
     * @param {String} security_id
     * @param {String} product_type
     * @param {String} set_price
     * @param {String} transaction_type
     * @param {String} trigger_type
     * @param {Object} transaction_details
     */
    this.create_gtt_v2 = function(segment, exchange, security_id, product_type, set_price, transaction_type, trigger_type, transaction_details){

        var order = {
            'segment': segment,
            'exchange': exchange,
            'security_id': security_id,
            'product_type': product_type,
            'set_price': set_price,
            'transaction_type': transaction_type,
            'trigger_type': trigger_type,
            'transaction_details': transaction_details
        }
        return apiservice.apiCall(endpoints.gtt_v2[0],endpoints.gtt_v2[1],'POST',order,null,null)
    }

    /**
     * Get GTT v2
     * @param {String} id
     */
    this.get_gtt_v2 = function(id){
        var path_params = {
            'id' : id
        }
        return apiservice.apiCall(endpoints.gtt_by_id_v2[0],endpoints.gtt_by_id_v2[1],'GET',null,null,path_params)
    }

    /**
     * Update GTT order v2
     * @param {String} set_price
     * @param {String} transaction_type
     * @param {String} order_type
     * @param {String} trigger_type
     * @param {String} quantity
     * @param {String} trigger_price
     * @param {String} limit_price
     */
    this.update_gtt_v2 = function(id, set_price=null, transaction_type=null, trigger_type=null, transaction_details=null){
        var path_params = {
            'id' : id
        }

        var order = {
            'set_price': set_price,
            'transaction_type': transaction_type,
            'trigger_type': trigger_type,
            'transaction_details': transaction_details
        }
        return apiservice.apiCall(endpoints.gtt_by_id_v2[0],endpoints.gtt_by_id_v2[1],'PUT',order,null,path_params)
    }

    /**
     * Get GTT order by Instruction id v2
     * @param {String} id
     */
    this.get_gtt_by_instruction_id_v2 = function(id){
        var path_params = {
            'id' : id
        }
        return apiservice.apiCall(endpoints.gtt_by_instruction_id_v2[0],endpoints.gtt_by_instruction_id[1],'GET',null,null,path_params)
    }

    /**
     * Live Market Data
     * @param {String} mode_type
     * @param {String} preferences
     */
    this.get_live_market_data = function(mode_type, preferences){

        var path_params = {
            'mode_type': mode_type,
            'preferences': preferences
        }
        response = apiservice.apiCall(endpoints.live_market_data[0],endpoints.live_market_data[1],'GET',null,null,path_params).then(
            function(response){
                response = JSON.parse(response)
                for (var tick in response['data']) {
                    if (response['data'][tick]['last_trade_time'] != null) {
                        response['data'][tick]['last_trade_time'] = utils.EpochConverter(response['data'][tick]['last_trade_time'])
                    }
                    if (response['data'][tick]['last_update_time'] != null) {
                        response['data'][tick]['last_update_time'] = utils.EpochConverter(response['data'][tick]['last_update_time'])
                    }
                }
                return JSON.stringify(response)
            }
        )
        return response
    }

    /**
     * Option Chain
     * @param {String} type
     * @param {String} symbol
     * @param {String} expiry
     */
        this.get_option_chain = function(type, symbol, expiry){
            var path_params = {
                'type': type,
                'symbol': symbol,
                'expiry':expiry
            }
            return apiservice.apiCall(endpoints.option_chain[0],endpoints.option_chain[1],'GET',null,null,path_params)
        }

    /**
     * Option Chain Config
     * @param {String} symbol
     */
    this.get_option_chain_config = function(symbol){
        var path_params = {
            'symbol': symbol
        }
        return apiservice.apiCall(endpoints.option_chain_config[0],endpoints.option_chain_config[1],'GET',null,null,path_params)
    }

    /**
     * Brokrage Charges Info
     * @param {String} brokerage_profile_code
     * @param {String} transaction_type
     * @param {String} product_type
     * @param {String} instrument_type
     * @param {String} exchange
     * @param {Integer} qty
     * @param {Integer} price
    */
    this.charges_info = function(brokerage_profile_code,transaction_type,product_type,instrument_type,exchange,qty,price){

        var charges_info = {
            "brokerage_profile_code": brokerage_profile_code,
            "transaction_type": transaction_type, 
            "product_type": product_type,
            "instrument_type": instrument_type,
            "exchange": exchange,
            "qty": qty,
            "price": price
        }

        return apiservice.apiCall(endpoints.charges_info[0],endpoints.charges_info[1],'POST',charges_info,null,null)
    }
}

//exporting PMClient
exports.PMClient = PMClient