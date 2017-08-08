/**
 * Created by apple on 2017/4/28.
 */
require(['utils/layout', 'utils/app', 'utils/dialog','common/header'], function () {
    var mainApi = {
        fw_userLogout: function () {
            //退出接口
            return $.server.res('fw_userLogout');
        }
    };
    function exit_clean() {
        if (window.localStorage) {
            localStorage.clear();
            Cookies.remove('tk');
            window.location.href = '/index.html';
        }
    }

    if (!window.globalConfig.isDebug) {
        if (typeof (Cookies.get('tk')) === "undefined") {
            $.dialog.info('无登录权限', {
                actions: [
                    {
                        label: '确定', class: 'primary', onClick: function () {
                            exit_clean();
                        }
                    }
                ]
            })
            return false;
        }

        $('#hide-iframe').attr("src", globalConfig.basePath + 'loginData?tk=' + Cookies.get('tk'));
    }
    $.Layout.init();
    //修改密码弹窗
    $(".updatePwd").on("click", function () {
        console.log('11')
        $.dialog.info($("#update-pwd"), {
            actions: [
                {
                    label: '取消', class: 'default', onClick: function () {
                        // alert('我是按钮1')
                    }
                },
                {
                    label: '保存', class: 'primary', onClick: function () {
                        $.dialog.alert('密码错误!');
                    }
                }
            ]
        }, "修改密码");
    });
    //修改密码
    // $("#updatePassWord").click(function () {
    //     var oldPassWord = $("#oldPassWord").val();
    //     var newPassWord = $("#newPassWord").val();
    //     var resetPassWord = $("#resetPassWord").val();
    //     if (newPassWord == "" || resetPassWord == "") {
    //         alert("密码不能为空！！！");
    //     }
    //     if (newPassWord == resetPassWord) {
    //         var action = new CAESAction("fw_resetPassword");
    //         action.putData({
    //             "oldPassword": oldPassWord,
    //             "password": newPassWord
    //         });
    //         action.post({
    //             success: function (data) {
    //                 if (data.r_code == 900 || data.r_code == 901) {
    //                     alert("当前页面已过期，请重新登录");
    //                     window.location.href = "login";
    //                 }
    //                 if (data.r_code == 0) {
    //                     alert("密码修改成功");
    //                     location.replace(location.href);
    //                 }
    //                 else {
    //                     alert(data.r_msg);
    //                 }
    //             }
    //         });
    //     }
    // });
    //退出方法
    //修改邮箱弹窗
    $("#editEmail").on("click", function () {
        $.dialog.info($("#update-email"), {
            actions: [
                {
                    label: '取消', class: 'default', onClick: function () {
                        // alert('我是按钮1')
                    }
                },
                {
                    label: '保存', class: 'primary', onClick: function () {
                        var newEmail = $("#updateEmail").val();
                        if (newEmail == "") {
                            $.dialog.alert("邮箱不能为空！！！");
                        }
                        else {
                            var userInfo = {
                                "newEmail": newEmail,
                            };
                            $.server.res('fw_queryUserMailAndPhone', userInfo, 'C_AES').then(function (data) {
                                if (data.r_code == 900 || data.r_code == 901) {
                                    $.dialog.alert("当前页面已过期，请重新登录");
                                    window.location.href = "login";
                                }
                                if (data.r_code == 0) {
                                    $.dialog.alert("邮箱修改成功");
                                    setTimeout(function () {
                                        location.replace(location.href);
                                    }, 1000);
                                }
                                else {
                                    $.dialog.alert(data.r_msg);
                                }
                            });
                        }
                    }
                }
            ]
        }, "修改邮箱地址");
    });
    //修改手机弹窗
    $("#editMobile").on("click", function () {
        $.dialog.info($("#update-mobile"), {
            actions: [
                {
                    label: '取消', class: 'default', onClick: function () {
                        // alert('我是按钮1')
                    }
                },
                {
                    label: '保存', class: 'primary', onClick: function () {
                        var newEmail = $("#updateEmail").val();
                        if (newEmail == "") {
                            $.dialog.alert("邮箱不能为空！！！");
                        }
                        else {
                            var userInfo = {
                                "newEmail": newEmail,
                            };
                            $.server.res('fw_queryUserMailAndPhone', userInfo, 'C_AES').then(function (data) {
                                if (data.r_code == 900 || data.r_code == 901) {
                                    $.dialog.alert("当前页面已过期，请重新登录");
                                    window.location.href = "login";
                                }
                                if (data.r_code == 0) {
                                    $.dialog.alert("邮箱修改成功");
                                    setTimeout(function () {
                                        location.replace(location.href);
                                    }, 1000);
                                }
                                else {
                                    $.dialog.alert(data.r_msg);
                                }
                            });
                        }
                    }
                }
            ]
        }, "修改手机号");
    });
    $('.exit').on('click', function () {
        mainApi.fw_userLogout().then(function (data) {
            if (data.r_code === 0) {
                $.dialog.info('退出成功', {
                    actions: [
                        {
                            label: '确定', class: 'primary', onClick: function () {
                                exit_clean();
                            }
                        }
                    ]
                })
            }
        })
    })
    //全局监听事件做派发处理
    window.addEventListener('message', function (e) {
        switch (e.data.type) {
            case 'Redirect':
                $.dialog.info('登录过期,请重新登录', {
                    actions: [
                        {
                            label: '确定', class: 'primary', onClick: function () {
                                exit_clean()
                            }
                        }
                    ]
                })

                break;
            case 'iframeController':
                /**
                 * self.parent.LayoutController.iframeController(3,'button.html','按钮组件');
                 */
                var content = e.data.content;
                self.parent.LayoutController.iframeController(content.key, content.url, content.info);
                break;
        }
    }, false);
});


/*** 跨域iframe 调用
 * window.parent.postMessage({
             type:'iframeController',
             content:{
                key:2,
                url:'http://127.0.0.1:8080/pages/button.html',
                info:'按钮组件'
             }
         },'*')
 */
