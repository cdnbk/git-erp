/**
 * Created by apple on 17/3/6.
 */
/**
 * Created by Administrator on 2016/1/5.
 */
requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: '/js',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        'vue':'lib/vue',
        'jquery':'lib/jquery.min',
        'WebUploader':'lib/webuploader-0.1.5/webuploader',
        'daterangepicker':'lib/daterangepicker',
        'radialIndicator':'lib/radialIndicator',
        'moment':'lib/moment/moment',
        'bootstrap-datetimepicker':'lib/bootstrap-datetimepicker/src/js/bootstrap-datetimepicker',
        'WdatePicker':'lib/My97DatePicker/WdatePicker',
        'zh-cn': 'lib/moment/locale/zh-cn',
        'linkage':'lib/cxSelect/js/jquery.cxselect.min'
    },
    shim: {
        'WebUploader':{
            deps: ['jquery'],
            exports: 'WebUploader'
        },
        'WdatePicker':{
            exports: 'WdatePicker'
        }
    }
});