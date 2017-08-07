/**
 * Created by apple on 2017/4/28.
 */
require(['utils/layout','utils/app'],function(){
    if (typeof(Cookies.get('tk')) === "undefined"){
        //alert("请登录");
        //window.location.href = '/index.html';
    }
    $.Layout.init();

    $('#hide-iframe').attr("src", globalConfig.basePath + 'loginData?tk=' + Cookies.get('tk'));
    //监听是否过期，如果过期则进行跳转
    window.addEventListener('message',function(e){
        if (e.data.type === 'Redirect') {
            Cookies.remove('tk');
            if(window.localStorage){
                localStorage.clear();
            }
        }
    },false);
});
