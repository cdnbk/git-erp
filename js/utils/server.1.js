
function TokenManager() {

}

TokenManager.prototype.serToken = function (token) {
    var tokenString = JSON.stringify(token);
    localStorage.setItem('token', tokenString);
}

TokenManager.prototype.getToken = function () {
    var tokenString = localStorage.getItem('token');
    var token = JSON.parse(tokenString);
   // token.expirationTime = new Date(token.expirationTime);
    return token;
}

TokenManager.prototype.hasToken = function () {
    const token = this.getToken();
    if (token == null) return false;
    if (token.key == null) return false;
    if (token.expirationTime < new Date()) return false;
    return true;
}


;(function($){
    "use strict";
    /**
     * 数据服务层封装
     * @param parameters
     * @returns {*}
     */
    function Resource(opts, param,json) {
        this.url = opts.url;
        this.type = opts.type ? opts.type : 'GET';
        this.dataType = opts.dataType ? opts.dataType : 'json';
        this.param = param ? param : {};
        this.json = json ? json : false;
        //返回promise对象用于外部调用
        return this.promise();
    };

    Resource.prototype.promise = function() {
        var that = this;
        //创建延迟对象
        var dtd = $.Deferred();
        $.ajax({
            url: that.url,
            data: that.param,
            type: that.type,
            timeout: 30000,
            dataType:that.dataType,
            success: function(data) {
                var _data = that.json ? JSON.parse(data) : data;
                dtd.resolve(_data);
            },
            beforeSend: function(data) {
                
            },
            error: function(xhr, type) {
                //后台状态返回1 延迟加载成功
                dtd.reject(xhr, type);
            }
        });
        /*--
         返回promise的作用是防止外部修改全局dtd 延迟对象的执行状态。
         return dtd;
         --*/ //返回promise对象
        return dtd.promise();
    };
    $.server = {
        resource:function(opts,param){
            var del_param = {
                app_type:'4',
                ver_name:'3.2.0'
            }
            var $param = $.extend(del_param,param)
            // console.log(JSON.stringify($param))
            return new Resource(opts,{content:JSON.stringify($param)},true);
        },
        promise:function(opts,param){
            return new Resource(opts,param,false);
        }
    }
})(jQuery?jQuery:Zepto);