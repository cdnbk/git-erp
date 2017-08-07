/**
 * Created by apple on 16/6/28.
 */
/**
 * 弹框组件
 *
 */
;(function($){
    "use strict";
    function Layout (options){
        //存储插入dom 弹框的位置
        this.height_arr = [];
        this.menu_dom = null;
        this.menu_child = null;
        this.iframe_key = [];
    }

    //主入口全部布局模块打开
    Layout.prototype.init = function (){
        this.menu();
        this.switch();
        this.height();
    }

    //主题高度
    Layout.prototype.height = function(opts){
        var _height = $(opts.main_dom).height();
        $(opts.main_dom).height(_height);
    }
    //菜单开关
    Layout.prototype.switch = function(){
        $(document).on('click','[data-toggle="switch"]',function(){
            event.preventDefault();
            if ($(window).width() < 769) {
                $("body").toggleClass("show-sidebar");
            } else {
                $("body").toggleClass("hide-sidebar");
            }
        })
    }

    //菜单初始化
    Layout.prototype.menu = function(options){
        var $this = this;
        this.menu_dom = $(options.menu_dom);
        this.menu_child = this.menu_dom.find(options.menu_child);
        this.menu_dom.children('li').each(function(){
            if($(this).children('ul').length<=0){
                $this.height_arr.push(0);
            }else{
                $this.height_arr.push($(this).children('ul').height());
            }
            $(this).children('ul').height(0);
        });
        this.action();
    }

    //菜单动画事件
    Layout.prototype.action = function(){
        var $this = this;
        this.menu_dom.find("li").has('ul').children('a').on('click',function(){
            var _ul = $(this).next('ul');
            var _index = $(this).parent('li').index();
            $(this).parent().toggleClass('active');
            if(_ul.hasClass('on')){
                _ul.height(0);
                _ul.removeClass('on');
            }else{
                _ul.addClass('on');
                _ul.height($this.height_arr[_index]);
            }
        });
    }

    //切换显示iframe 模板

    Layout.prototype.switchIframe = function (index){
       $(".xfd-content").children().hide();
        $(".xfd-content").find(".xfd-iframe[name=iframe"+index+"]").show();
    }

    //动态创建iframe 模板
    Layout.prototype.iframeTel = function (iframeArgument){
        var tel = [];
        tel.push('<iframe class="xfd-iframe" name="iframe'+(iframeArgument.name)+'" data-id="'+(iframeArgument.name)+'" src="'+(iframeArgument.src)+'">');
        tel.push('</iframe>');
        $(tel.join('')).appendTo(".xfd-content");
    }

    //创建动态li标签 <li role="presentation" class="active"><a href="#">消息通知</a></li>
    Layout.prototype.creationLi = function(key,test){
        var tel = [];
        tel.push('<li role="presentation" data-navkey="'+(key)+'" name="nav'+(key)+'"><a href="#">'+(test)+'</a></li>');
        $(tel.join('')).appendTo("#navPills");
        this.activeLi(key);
    }

    //点击导航切换不同容器层
    Layout.prototype.eventNav = function(){
        var _this = this;
        $('#navPills').on('click','li',function(){
            var _index = $(this).data('navkey');
            _this.switchIframe(_index);
            _this.activeLi(_index);
        })
    }

    //高亮activeLi 按钮
    Layout.prototype.activeLi = function(key){
        $("#navPills").find("li").removeClass("active");
        $("#navPills").find("li[name=nav"+key+"]").addClass("active");
    }

    //菜单动态创建iframe 格式
    Layout.prototype.creationIframe = function(opts){
        var _this = this;
        var iframeArgument = {};
        var menu_dom = $(opts.menu_dom);
        menu_dom.find("li").has('ul').find('a[data-menukey]').on('click',function(e){
            iframeArgument.name = $(this).data('menukey');
            iframeArgument.src = $(this).attr('href');
            /**
             * 添加iframe
             */
            if(_this.iframe_key.indexOf(iframeArgument.name)==-1){
               _this.iframe_key.push(iframeArgument.name);
               _this.iframeTel(iframeArgument);
                _this.creationLi(iframeArgument.name,$(this).html());
               _this.switchIframe(iframeArgument.name);
            }else{
                _this.switchIframe(iframeArgument.name);
                _this.activeLi(iframeArgument.name);
            }
            e.preventDefault();
        })
    }
    /**
     * 调用方式
     * @type {{alert: Zepto.dialog.alert, confirm: Zepto.dialog.confirm, info: Zepto.dialog.info}}
     */
    $.Layout = {
        del_opts:function(opts){
            return $.extend({},{menu_dom:'#side-menu',main_dom:'#wrapper',menu_child:'.nav-second-level'},opts);
        },
        menu:function(opts){
            new Layout().menu(this.del_opts(opts));
        },
        switch:function(opts){
            new Layout().switch(this.del_opts(opts));
        },
        height:function(opts){
            new Layout().height(this.del_opts(opts));
        },
        creationIframe:function(opts){
            new Layout().creationIframe(this.del_opts(opts));
        },
        eventNav:function(opts){
            new Layout().eventNav(this.del_opts(opts));
        },
        init:function(opts){
            this.menu(this.del_opts(opts));
            this.switch(this.del_opts(opts));
            this.creationIframe(this.del_opts(opts));
            this.eventNav(this.del_opts(opts));
        }
    };
})(jQuery?jQuery:Zepto);