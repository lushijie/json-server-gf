/*
* @Author: lushijie
* @Date:   2016-12-14 18:10:13
* @Last Modified by:   lushijie
* @Last Modified time: 2016-12-14 18:29:55
*/
;(function() {
    //测试服务器地址
    var TEST_SERVER_ADDRESS = location.protocol + '127.0.0.1:8080';
    //接口测试服务器地址
    var API_SERVER_ADDRESS = 'http://127.0.0.1:3000';
    //当前环境下location地址
    var CURRENT_SERVER_ADDRESS = location.protocol + '//' + location.host;
    function isDevENV(){
      return (CURRENT_SERVER_ADDRESS == TEST_SERVER_ADDRESS);
    }
    var API_BASE_URL = isDevENV ? API_SERVER_ADDRESS : CURRENT_SERVER_ADDRESS;

    // 通用逻辑处理
    var commonLogicHandler = function(data, textStatus, jqXHR) {
    };
    // 通用网络请求
    $.request = function(url, method, data) {
        var deferred = $.Deferred();
        if(!/^https?/.test(url) && url.indexOf('/') != 0) {
          throw  ('url格式错误，请检查! url = ' + url);
        }
        url = /^https?/.test(url) ? url : (API_BASE_URL + url);
        $.ajax({
            url: url ,
            method: method || 'get',
            dataType: 'json',
            data: data || {},
            statusCode: {
                404: function() {}
            }
        }).then(function(data, textStatus, jqXHR) {
            // 通用逻辑处理
            commonLogicHandler.call(null, data, textStatus, jqXHR);
            // errno 不为0时, 代表错误
            if ( data && data.errno ) {
                deferred.reject(data);
            } else {
                deferred.resolve(data);
            }
        }, function(jqXHR, textStatus, errorThrown) {
            if( jqXHR.readyState != 0){
                // ajax 请求错误
                var ajaxError = { errno: 1,  errmsg: '未知错误' };
                switch(textStatus) {
                    case 'timeout':
                        ajaxError = { errno: 1,  errmsg: '请求超时' };
                        break;
                    case 'error':
                        ajaxError = { errno: 2,  errmsg: '请求错误' };
                        break;
                    case 'abort':
                        ajaxError = { errno: 3,  errmsg: '请求终止' };
                        break;
                    default:
                        break;
                }
                deferred.reject(ajaxError);
            }
        }).always(function() {
            //always
        });
        return deferred;
    };

    // get
    $.getJson = function(url, data) {
        data = data || {};
        data.r = Math.random();
        return $.request(url, 'get', data).then(function(data) {
            return data;
        });
    };

    // post
    $.postData = function(url, data) {
        data = data || {};
        return $.request(url, 'post', data);
    };
})();
