$(function(){
	moduleShowHide(); //展开收起事件
	var EmosEnterMark = localStorage.getItem('EmosEnterMark');
    if(EmosEnterMark == '0'){ //EMOS
        $('.nav li').eq(2).hide();
        $('.top li:last-child').removeAttr('onclick');
        $('.top li:last-child').on('click',function(){
            window.location.href='/logout/1/'
        })
    }else if(EmosEnterMark == '1'){ // 录入
        $('.nav li').eq(1).hide();
        $('.nav li').eq(3).hide();
        $('.top li:last-child').removeAttr('onclick');
        $('.top li:last-child').on('click',function(){
            window.location.href='/logout/2/'
        })
    };
    //消息
    var totalCount = localStorage.getItem('totalmessageCount');
	if (totalCount == 0 || totalCount == null || totalCount < 0) {
	    $('.message').next('.icon').hide();
	} else {
        $('.message').next('.icon').show();
	    $('.message').next('.icon').find('b').text(totalCount);
	};
    $('.top li').each(function(){
    	$(this).on('mouseover',function(){
    		var elem = $(this).find('i');
    		var elem_class = elem.get(0).className;
    		elem.removeClass().addClass(elem_class+'_active')
    	})
    	$(this).on('mouseout',function(){
    		var elem = $(this).find('i');
    		var elem_class = elem.get(0).className;
    		elem.removeClass().addClass(elem_class.split('_active')[0])
    	})
    })
})