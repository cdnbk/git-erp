define(['linkage', 'defaults-zh_CN'],
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
            function ajax(url, callback) {
                callback({
                    data: [
                        { value: "1", text: "a" },
                        { value: "2", text: "b" },
                        { value: "3", text: "c" }
                    ].filter(e => !values || e.value == values)
                });
            };

            ajax(url, data => {
                const options = select$.get(0).options;
                options.length = 0;
                for (let i = 0; i < data.data.length; i++) {
                    const e = data.data[i];
                    options.add(new Option(e.text, e.value));
                }

                select$.attr("multiple", "multiple");
                select$.addClass("selectpicker");
                select$.selectpicker();
                render && select$.selectpicker('show');
            });
        }

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