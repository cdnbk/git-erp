define(['linkage', 'defaults-zh_CN','utils/app'],
    function () {
        function init(select$, render) {

            select$.data("data-nms-init", true);
            select$.selectpicker('destroy');

            const urltpl = select$.attr("data-nms-src");
            if (!urltpl) {
                select$.attr("multiple", "multiple");
                select$.addClass("selectpicker");
                select$.selectpicker();
                render && select$.selectpicker('show');
                return;
            }

            const values = select$.data("data-nms-values") || "";
            const url = urltpl.replace(/\$values/ig, encodeURIComponent(values));
            console.log(url);
            var userInfo = {};
            //$.server.res('cwgjerp_3.0.0_queryallopencity', userInfo, 'C_AES', 'post').then(function (data) {
            //    console.log(1234);
            //    if (data.r_code == 900 || data.r_code == 901) {
            //        $.dialog.alert("当前页面已过期，请重新登录");
            //        window.location.href = "login";
            //    }
            //    if (data.r_code == 0) {
            //        console.log(data);
            //    }
            //    else {
            //        $.dialog.alert(data.r_msg);
            //    }
            //});
            function ajax(url, callback) {
                callback({
                    data: [
                        { cityId: "1", cityName: "a" },
                        { cityId: "2", cityName: "b" },
                        { cityId: "3", cityName: "c" }
                    ].filter(e => !values || e.cityId == values)
                });
            };
            ajax(url, data => {
                const options = select$.get(0).options;
                options.length = 0;
                for (let i = 0; i < data.data.length; i++) {
                    const e = data.data[i];
                    options.add(new Option(e.cityName, e.cityId));
                }

                select$.attr("multiple", "multiple");
                select$.addClass("selectpicker");
                select$.selectpicker();
                render && select$.selectpicker('show');
            });
        }
        //初始化函数
        $(() => {
            $("[data-nms]").each((i, e) => {
                const select$ = $(e);
                if (select$.data("data-nms-init")) return undefined;
                init(select$, true);
            })
        });

        $(document).on("mousedown", "[data-nms]", e => {
            const select$ = $(e.currentTarget);
            if (select$.data("data-nms-init")) return undefined;
            init(select$, true);
            return false;
        });

        $(document).on("changed.bs.select", "[data-nms-target]", e => {
            const select$ = $(e.currentTarget);
            const target$ = $(select$.attr("data-nms-target"));
            target$.data("data-nms-values", select$.val());
            init(target$);
        });
    });