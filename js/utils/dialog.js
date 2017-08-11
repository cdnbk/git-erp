/**
 * Created by apple on 16/6/28.
 */
/**
 * 弹框组件
 *
 */
;(function($){
    "use strict";
    function Dialog (options){
        //存储插入dom 弹框的位置
       this.create_id = null;
        this.dia_dom = null;
    }

    Dialog.prototype.Tel = function(tips,actions,title){
        var types = tips[0].nodeType==1&&typeof tips != 'string';

        var tel_id = "dialog-" + new Date().getTime();
        this.dia_dom = "dia-dom-" + new Date().getTime();
        var tel = [];
        tel.push('<div class="xfd-modal-dialog xfd-box showSweetAlert visible" id="'+(this.dia_dom)+'">');
            tel.push('<div class="xfd-modal-content '+(types?'content-title':'')+'">');
                tel.push('<div type="confirm" class="xfd-dialog">');
                    tel.push('<div class="xfd-modal-header"><h4 class="xfd-modal-title">'+(title?title:'')+'</h4></div>');
                    tel.push('<div class="xfd-modal-body">');
                        tel.push('<div id="'+(tel_id)+'">'+(types ? '':tips)+'</div>');
                    tel.push('</div>')
                    tel.push('<div class="xfd-modal-footer">')
                        tel.push(this.buttonHtml(actions,types,tips))
                    tel.push('</div>')
                tel.push('</div>')
            tel.push('</div>')
        tel.push('</div>');
        tel.push('<div class="sweet-overlay"></div>')
        var _this = this;
        this.dialog = $(tel.join('')).appendTo("body");
        types ? this.content(tips,tel_id,types) : null;
        this.EventButton(actions,types,tips);
        if(self.parent.LayoutController&&self.frameElement && self.frameElement.tagName == "IFRAME"){
            self.parent.LayoutController.mockOpen();
        }
    }

    //关闭弹框层
    Dialog.prototype.EventButton = function(actions,types,dom){
        var _this = this;
        _this.dialog.find(".xfd-btn-dialog").each(function(i, e) {
            var el = $(e);
            el.click(function() {
                types ? _this.remove_content(dom) : null;
                $('#'+_this.dia_dom).removeClass('showSweetAlert').addClass('hideSweetAlert').animationEnd(function(){
                    _this.dialog.remove();
                    if(self.parent.LayoutController){
                        self.parent.LayoutController.mockClose();
                    }
                });
                //
                //先关闭对话框，再调用回调函数
                if(actions[i].onClick) {
                    actions[i].onClick();
                }
            });
        });
    }

    //移除插入的元素
    Dialog.prototype.remove_content = function(dom){
        dom.appendTo($('#'+this.create_id)).unwrap().hide();
    }

    //插入Zepto 元素
    Dialog.prototype.content = function (dom,tel_id,types){
        if($('#'+tel_id).length>=1){
            this.create_id = 'location-layer-'+ new Date().getTime();
            dom.wrap('<div id="'+(this.create_id)+'"></div>').appendTo($('#'+tel_id)).show();
        }
    }

    Dialog.prototype.buttonHtml = function (actions){
        return actions.map(function(v,i){
            return '<button type="button" class="xfd-btn-dialog xfd-btn xfd-btn-md xfd-btn-'+(v.class)+'">'+(v.label)+'</button>'
        }).join('');
    }

    Dialog.prototype.alert = function(tips,callbackOK,title){
        var  actions = [
            { label: '确定',class:'primary',onClick:callbackOK}
        ];
        this.Tel(tips,actions,title);

    }

    Dialog.prototype.confirm = function(tips,params,title){
        var  actions = [
            { label: params.label?params.label[0] : '取消',class:'white',onClick:params.no},
            { label: params.label?params.label[1] : '确定',class:'primary',onClick:params.ok}

        ];
        this.Tel(tips,actions,title);
    }

    Dialog.prototype.info = function(tips,params,title){
        this.Tel(tips,params.actions,title);
    }

    /**
     * 调用方式
     * @type {{alert: Zepto.dialog.alert, confirm: Zepto.dialog.confirm, info: Zepto.dialog.info}}
     */
    $.dialog = {
        alert:function(tips,callback,title){
            new Dialog().alert(tips,callback,title);
        },
        confirm:function(tips,params,title){
            new Dialog().confirm(tips,params,title);
        },
        info:function(tips,params,title){
            new Dialog().info(tips,params,title);
        }
    };
})(jQuery?jQuery:Zepto);