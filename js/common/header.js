require([], function () {
    $("#header-menu-more").on('click',function(){
        if($(".xfd-nav-menu").hasClass('open')){
            $(".xfd-nav-menu").removeClass('open');
            $(".header-btn-more > a").removeClass('on');
        }
        else{
            $(".xfd-nav-menu").addClass('open');
            $(".header-btn-more > a").addClass('on');
        }
            
    });
})