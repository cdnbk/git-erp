define(['linkage'],
    function () {
        (function () {
            var urlChina = '../js/lib/cxSelect/js/cityData.min.json';
            var urlGlobal = '../js/lib/cxSelect/js/globalData.min.json';
            var dataCustom = [
                {
                    'v': '1', 'n': '第一级 >', 's': [
                        {
                            'v': '2', 'n': '第二级 >', 's': [
                                {
                                    'v': '3', 'n': '第三级 >', 's': [
                                        {
                                            'v': '4', 'n': '第四级 >', 's': [
                                                {
                                                    'v': '5', 'n': '第五级 >', 's': [
                                                        { 'v': '6', 'n': '第六级 >' }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    'n':'data',"s": [
                        {
                            "cityId": 1,
                            "n": "福州",
                            "s": [
                                {
                                    "saleId": 1,
                                    "n": "张三"
                                },
                                {
                                    "saleId": 1,
                                    "saleName": "张三"
                                }
                            ]
                        },
                        {
                            "cityId": 1,
                            "cityName": "福州",
                            "sale": [
                                {
                                    "saleId": 1,
                                    "saleName": "张三"
                                },
                                {
                                    "saleId": 1,
                                    "saleName": "张三"
                                }
                            ]
                        }
                    ]
                },
                {
                    'v': 'test number', 'n': '测试数字', 's': [
                        {
                            'v': 'text', 'n': '文本类型', 's': [
                                { 'v': '4', 'n': '4' },
                                { 'v': '5', 'n': '5' },
                                { 'v': '6', 'n': '6' },
                                { 'v': '7', 'n': '7' },
                                { 'v': '8', 'n': '8' },
                                { 'v': '9', 'n': '9' },
                                { 'v': '10', 'n': '10' }
                            ]
                        },
                        {
                            'v': 'number', 'n': '数值类型', 's': [
                                { 'v': 11, 'n': 11 },
                                { 'v': 12, 'n': 12 },
                                { 'v': 13, 'n': 13 },
                                { 'v': 14, 'n': 14 },
                                { 'v': 15, 'n': 15 },
                                { 'v': 16, 'n': 16 },
                                { 'v': 17, 'n': 17 }
                            ]
                        }
                    ]
                },
                {
                    'v': 'test boolean', 'n': '测试 Boolean 类型', 's': [
                        { 'v': true, 'n': true },
                        { 'v': false, 'n': false }
                    ]
                },
                {
                    v: 'test quotes', n: '测试属性不加引号', s: [
                        { v: 'quotes', n: '引号' }
                    ]
                },
                {
                    v: 'test other', n: '测试奇怪的值', s: [
                        { v: '[]', n: '数组（空）' },
                        { v: [1, 2, 3], n: '数组（数值）' },
                        { v: ['a', 'b', 'c'], n: '数组（文字）' },
                        { v: new Date(), n: '日期' },
                        { v: new RegExp('\\d+'), n: '正则对象' },
                        { v: /\d+/, n: '正则直接量' },
                        { v: {}, n: '对象' },
                        { v: document.getElementById('custom_data'), n: 'DOM' },
                        { v: null, n: 'Null' },
                        { n: '未设置 value' }
                    ]
                },
                { 'v': '', 'n': '无子级' }
            ];

            $.cxSelect.defaults.url = urlChina;

            // 默认
            $('#city_china').cxSelect({
                selects: ['province', 'city', 'area']
            });

            // 设置默认值及选项标题
            $('#city_china_val').cxSelect({
                selects: ['province', 'city', 'area'],
                emptyStyle: 'none'
            });

            // 全球主要国家城市联动
            $('#global_location').cxSelect({
                url: urlGlobal,
                selects: ['country', 'state', 'city', 'region'],
                emptyStyle: 'none'
            });

            // 自定义选项
            $('#custom_data').cxSelect({
                selects: ['first', 'second', 'third', 'fourth', 'fifth'],
                // required: true,
                jsonValue: 'v',
                data: dataCustom
            });

            // API 接口
            var apiBox = $('#api_data');
            var cxSelectApi;

            apiBox.cxSelect({
                selects: ['province', 'city', 'area']
            }, function (api) {
                cxSelectApi = api;
            });

            // cxSelectApi = $.cxSelect(apiBox, {
            //   selects: ['province', 'city', 'area']
            // });

            $('body').on('click', 'button', function () {
                var _name = this.name;
                var _value = this.value;

                switch (_name) {
                    case 'attach':
                        cxSelectApi.attach();
                        break;

                    case 'detach':
                        cxSelectApi.detach();
                        break;

                    case 'clear':
                        cxSelectApi.clear();
                        break;

                    case 'required':
                        cxSelectApi.setOptions({
                            required: _value == 1 ? false : true
                        });
                        this.value = _value == 1 ? 0 : 1;
                        break;

                    case 'emptyStyle':
                        if (_value === 'none') {
                            _value = 'hidden';
                        } else if (_value === 'hidden') {
                            _value = '';
                        } else {
                            _value = 'none';
                        };
                        cxSelectApi.setOptions({
                            emptyStyle: _value
                        });
                        this.value = _value;
                        break;

                    case 'firstTitle':
                        _value = _value === '请选择' ? '选择吧' : '请选择';
                        cxSelectApi.setOptions({
                            firstTitle: _value
                        });
                        this.value = _value;
                        break;

                    case 'setSelect':
                        cxSelectApi.setOptions({
                            selects: _value === 'a' ? ['province', 'city', 'area'] : ['first', 'second', 'third', 'fourth', 'fifth']
                        });
                        this.value = _value === 'a' ? 'b' : 'a';
                        break;

                    case 'setData':
                        if (_value === 'china' || _value === 'global') {
                            // $.ajax({
                            //   url: this.value === 'china' ? urlChina : urlGlobal,
                            //   type: 'GET',
                            //   dataType: 'json'
                            // }).done(function(data, textStatus, jqXHR) {
                            cxSelectApi.setOptions({
                                url: this.value === 'china' ? urlChina : urlGlobal,
                                // data: data
                            });
                            // }).fail(function(jqXHR, textStatus, errorThrown) {
                            // });

                        } else if (this.value === 'custom') {
                            cxSelectApi.setOptions({
                                data: dataCustom
                            });
                        };
                        break;

                    // not default
                };
            });
        })();
    });