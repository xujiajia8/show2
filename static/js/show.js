//设置cookie
function setCookie(c_name,value,expiredays){
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
};
//删除cookie
function deleteCookie(c_name){
    var exdate=new Date()
    exdate.setDate(exdate.getDate()-1)
    document.cookie=c_name+ "=" +escape('')+
    ((-1==null) ? "" : ";expires="+exdate.toGMTString())
};
//读取cookie
function getCookie(c_name){
    if (document.cookie.length>0){
        c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1){ 
            c_start=c_start + c_name.length+1 
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
        } 
    }
    return ""
};
if(!window.localStorage){
    var support;
    support = getCookie('support');
};
if(window.localStorage===undefined && support != 1){
    alert('为了更好的游览体验，请更换Chrome、Firebox等浏览器或切换浏览器为极速模式');
    setCookie('support','1',1);
};
function selectImitate(){ //模拟下拉框事件
    $('.choice').each(function(){
        var markLi = 0,
            _that = $(this),
            url = window.location.href;
        //展开收起
        $(this).find('p').on('click',function(e){
            $(this).removeAttr('style')
            var oUl = $(this).parent().find('ul');
            if(oUl.css('display') == 'none'){
                oUl.show()
            }else{
                oUl.hide()
            }
            e.stopPropagation();
        });
        //选择
        $(this).find('ul').on('click',function(e){
            var elem = e.target;
            if(elem.nodeName == 'LI'){
                var p_txt = $(elem).parent().prev('p').text();
                if($(elem).parent().parent().get(0).className.indexOf('city') != -1 && url.indexOf('high_search') != -1){
                    var mark = $(elem).attr('markLi');
                    if(mark == '1'){
                        $(elem).removeClass();
                        $(elem).removeAttr('markLi');
                        var p_txt = $(elem).parent().find('li.active');
                        if(p_txt.length == 0){
                            $(elem).parent().prev('p').text('-请选择-');
                            return false
                        }
                        $(elem).parent().prev('p').text('');
                        for(var i=0;i<p_txt.length;i++){
                            if(i == 0){
                                $(elem).parent().prev('p').text(p_txt.eq(i).text().trim())
                            }else{
                                $(elem).parent().prev('p').text($(elem).parent().prev('p').text() +','+ p_txt.eq(i).text().trim())
                            }
                        }
                    }else{
                        $(elem).addClass('active');
                        $(elem).attr('markLi','1');
                        if($(elem).parent().prev('p').text() == '-请选择-'){
                            $(elem).parent().prev('p').text($(elem).text().trim())
                        }else{
                            $(elem).parent().prev('p').text($(elem).parent().prev('p').text() +','+ $(elem).text().trim());
                        }
                    }
                }else{
                    if($(elem).text().trim() == p_txt){
                        oLi = 0;
                        $(elem).removeClass();
                        $(elem).removeAttr('markLi');
                        $(elem).parent().hide();
                        if(url.indexOf('idx') != -1){
                            $(elem).parent().prev('p').text('全部状态');
                        }else{
                            $(elem).parent().prev('p').text('-请选择-');
                        };
                        if($(elem).parent().parent().get(0).className.indexOf('a_type') != -1){
                            $('.a_reason').find('p').text('-请先选择异常类型-');
                            $('.a_reason').find('ul').html('');
                        }
                        $(elem).parent().prev('p').change();
                        return false;
                    };
                    var txt = $(elem).text().trim();
                    $(elem).attr('markLi','1');
                    $(elem).addClass('active').siblings().removeClass();
                    $(elem).parent().hide();
                    $(elem).parent().prev('p').text(txt);
                    $(elem).parent().prev('p').change();
                }  
            }
            e.stopPropagation();
        })
        $(this).find('ul').on('mouseover',function(e){
            var elem = e.target;
            if(elem.nodeName == 'LI'){
                var mark = $(elem).attr('markLi');
                if(mark == 1){
                    return false
                }else{
                    $(elem).addClass('active')
                }
            }
            e.stopPropagation();
        })
        $(this).find('ul').on('mouseout',function(e){
            var elem = e.target;
            if(elem.nodeName == 'LI'){
                var mark = $(elem).attr('markLi');
                if(mark == 1){
                    return false
                }else{
                    $(elem).removeClass('active')
                }
            }
            e.stopPropagation();
                
        })
        $(document).on('click',function(){
            _that.find('ul').hide();
        })
    })
};
function radioImitate(){ //模拟单选框
    $('.checkbox').each(function(){
        $(this).on('click',function(e){
            var elem = e.target;
            if(elem.nodeName == 'SPAN'){
                var cs = $(elem).get(0).className;
                if(cs == 'active'){
                    $(elem).removeClass()
                }else{
                    $(elem).addClass('active').siblings().removeClass('active')
                }
            }
        }) 
    });
    $('.radio').each(function(){
        $(this).on('click',function(e){
            var elem = e.target;
            if(elem.nodeName == 'SPAN'){
                var cs = $(elem).get(0).className;
                if(cs == 'active'){
                    $(elem).removeClass()
                }else{
                    $(elem).addClass('active').siblings().removeClass('active');
                    if($(elem).text() == 'EMOS工单'){
                        $('.cont .checkbox').eq(0).find('span').eq(0).hide();
                    }else if($(elem).text() == '录入型工单' || $(elem).text() == '全部'){
                        $('.cont .checkbox').eq(0).find('span').eq(0).show();
                    }
                }
            }
        }) 
    });
}
function pageShow(number,index){ //页码展示
    var str = '';
    if(index == 1){
        totalPage = totalPage1
    }
    if(totalPage == 0){
        if(index != undefined){
            $('.page').eq(index).find('.p_number').html(str);
            $('.page').eq(index).find('.p_now').html('<i>'+number+'</i>/'+totalPage);
        }else{
            $('.page .p_number').html('');
            $('.page .p_now').html('<i>0</i>/'+totalPage);
        }
        return false;
    };
    number = Number(number);
    if(totalPage <= 5){
        for(var i = 1;i <= totalPage;i++){
            if(i == number){
                str += '<span class="active">'+i+'</span>'
            }else{
                str += '<span>'+i+'</span>'
            }
        }
    }else if(number - 2 <= 1){
        for(var i=1;i < 5;i++){
            if(i == number){
                str += '<span class="active">'+i+'</span>'
            }else{
                str += '<span>'+i+'</span>'
            }
        }
        str += '<i>···</i><span>'+totalPage+'</span>'
    }else if(number + 2 >= totalPage){
        str += '<span>1</span><i>···</i>'
        for(var i=(totalPage-4);i <= totalPage;i++){
            if(i == number){
                str += '<span class="active">'+i+'</span>'
            }else{
                str += '<span>'+i+'</span>'
            }
        }
    }else{
        str += '<span>1</span><i>···</i><span>'+(number-1)+'</span><span class="active">'+number+'</span><span>'+(number+1)+'</span><i>···</i><span>'+totalPage+'</span>'
    }
    if(index != undefined){
        $('.page').eq(index).find('.p_number').html(str);
        $('.page').eq(index).find('.p_now').html('<i>'+number+'</i>/'+totalPage);
    }else{
        $('.page .p_number').html(str);
        $('.page .p_now').html('<i>'+number+'</i>/'+totalPage);
    }
    
};
function lately(parent) {  //工单列表添加点击事件
    var trList = parent.querySelectorAll('tr');
    for (var i = 0; i < trList.length; i++) {
        (function() {
            var index = i;
            var eX = 0;
            var eY = 0;
            var clickTime;
            trList[index].onmousedown = function(e) {
                var e = e || window.event;
                eX = e.clientX;
                eY = e.clientY;
            };
            trList[index].onmouseup = function(e) {
                var e = e || window.event;
                if (eX != e.clientX || eY != e.clientY) {
                    return false
                }
                if (e.button == 2 || e.target.nodeName == 'EM') {
                    //console.log('您点击了鼠标右键')
                    return false
                };
                var state = this.querySelectorAll('td')[2].innerText.replace(/\s+/g, "");
                switch (state) {
                    case '草稿':
                        window.open('draft.html');
                        break;
                    case '待处理':
                        window.open('chulState.html');
                        break;
                    case '待确认':
                        window.open('querState.html');
                        break;
                    case '异常态':
                        window.open('process.html');
                        break;
                    case '定界中':
                        window.open('process.html');
                        break;
                    case '已完成':
                        window.open('completeState.html');
                        break;
                    case '排队中':
                        window.open('process.html');
                        break;
                    default:
                        //console.log('null')
                        break;
                };
                if(window.localStorage){
                    localStorage.setItem('fiel_number', this.querySelectorAll('td')[0].innerText);
                }else{
                    setCookie('fiel_number', this.querySelectorAll('td')[0].innerText, 1);
                }
            }
        })()
    }
};
function showArray(obj) { //工单列表数据渲染
    var tbody = document.querySelector('.lately').querySelector('tbody');
    var url = window.location.href;
    var demark,check = '';
    var w_cord = {
        '草稿':'chul',
        '待处理':'chul',
        '已核验':'hey',
        '已完成':'wanc',
        '待核查':'hec',
        '待确认':'quer',
        '异常态':'yic',
        '定界中':'dingj',
        '排队中':'paid'
    };
    tbody.innerHTML = '';
    for (var i in obj) {
        var tr = document.createElement('tr');
        if (!obj[i].demarkRES) {
            demark = ''
        } else {
            demark = obj[i].demarkRES
        };
        if(url.indexOf('enter_idx') != -1){
            check = '<em></em>'
        };
        tr.innerHTML = '<td>'+ check + obj[i].form_no + '</td><td>' + obj[i].city + '</td><td><i class="'+w_cord[obj[i].workrecode]+'"></i>' + obj[i].workrecode + '</td><td>' + timeChange(obj[i].occTime) + '</td><td>' + obj[i].prosType + '</td><td>' + demark + '</td>';
        tbody.appendChild(tr);
    }
    lately(tbody);
};
function graph(dArry, xArry) { //首页echarts折线图渲染
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('graph'));

    // 指定图表的配置项和数据
    var option = {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xArry,
            name: '时间',
            nameTextStyle:{
                padding:[28,0,0,30],
                color:'rgba(0,0,0,.45)'
            },
            axisLine:{
                lineStyle:{
                    color:'#DEE1E3'
                }
            },
            axisTick: {
                length:4
            },
            axisLabel: {
                color:'rgba(0,0,0,.65)',
                showMaxLabel: true
            }
        },
        yAxis: {
            type: 'value',
            name: '工单量',
            nameGap:20,
            nameTextStyle:{
                padding:[0,60,0,0],
                color:'rgba(0,0,0,.45)'
            },
            axisLine:{
                show:false
            },
            axisTick: {
                show:false
            },
            axisLabel: {
                margin:16,
                color:'rgba(0,0,0,.65)'
            },
            splitLine:{
                lineStyle:{
                    color:'#DEE1E3',
                    type:'dashed'
                }
            }
        },
        tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: 'rgba(36, 146, 252, .65)'
                }
            },
            backgroundColor: '#fff',
            textStyle: {
                color: '#666'
            },
            formatter: function(params, ticket, callback){
                var value = params[0].value;
                var name = params[0].name;
                var str = '<div style="box-shadow:0px 6px 32px -5px rgba(1,54,105,0.23);font-size:12px;line-height:18px;padding:8px 16px;"><p style="margin-bottom:6px;color:rgba(0,0,0,.85);">EMOS工单 '+value+'</p><p style="color:rgba(0,0,0,.35);">'+name+'</p></div>';
                return str;
            }
        },
        series: [{
            data: dArry,
            type: 'line',
            showSymbol :false,
            smooth:true,
            itemStyle: {
                normal: {
                    borderColor: '#2492FC'
                }
            },
            lineStyle: {
                normal: {
                    color: '#2492FC'
                }
            }
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
};
function tabChange(a, b, text) {  //tab切换
    var nav = document.querySelector(a);
    var liList = nav.querySelectorAll('span');
    var oDiv = document.querySelector(b);
    var imgList = oDiv.querySelectorAll('div')
    for (var i = 0; i < liList.length; i++) {
        (function() {
            var index = i;
            liList[index].onclick = function() {
                for (var j = 0; j < liList.length; j++) {
                    if(liList[j].className != 'disabled'){
                        liList[j].className = '';
                    }
                    imgList[j].style.display = 'none'
                }
                this.className = 'active';
                imgList[index].style.display = 'block'
            }
        })()
        var nowText = liList[i].innerHTML;
        if (nowText == text) {
            for(var j=i+1;j<liList.length;j++){
                liList[j].className = 'disabled'
            }
            break;
        }
    }
};
function moduleShowHide() {  //module展开收起
    var siled = document.querySelector('.siled');
    var moduleList = siled.querySelectorAll(".module");
    for (var i = 0; i < moduleList.length; i++) {
        if(!moduleList[i].querySelector('.title')){
                continue;
        }
        (function() {
            var index = i;
            var title = moduleList[index].querySelector('.title');

            var cont = moduleList[index].querySelector('.cont');
            title.onclick = function(e) {
                var e = e|| window.event;
                var elem = e.target.nodeName;
                
                if(elem == 'I'){
                    if (cont.style.display == '' || cont.style.display == 'none') {
                        cont.style.display = 'block';
                        title.querySelector('i').className = 'show'
                    } else {
                        cont.style.display = 'none';
                        title.querySelector('i').className = '';
                    }
                }
                    
            }
        })()
    }
};
function timeChange(time) {  //时间戳转化时间格式‘-’
    if (!time) {
        return ''
    }
    time = String(time);
    if(time.indexOf('-') != -1){
        time = time.replace(/-/g,'/');
    }else{
        if(time.indexOf(' ') == -1){
            time = Number(time)
        }
    };
    var dTime = new Date(time);
    var hours = dTime.getHours();
    hours = hours < 10 ? '0' + hours : hours;
    var minutes = dTime.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var seconds = dTime.getSeconds();
    seconds = seconds < 10 ? '0' + seconds : seconds;

    var month = dTime.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    var day = dTime.getDate();
    day = day < 10 ? '0' + day : day;
    var date = dTime.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    return date
};
function picDataTime(type, time, obj) { //首页折线图 x/y轴数据处理
    var xs = [],
        ys = [];
    var nowDate;
    var excessive;
    var getTime;
    if (time) {
        getTime = Number(obj[obj.length - 1].now_time);
    } else {
        getTime = Number(obj[0].now_time);
    };
    var year = new Date(getTime).getFullYear();
    var month = new Date(getTime).getMonth() + 1;
    var date = new Date(getTime).getDate();
    if (time == '近三月') {
        switch (month) {
            case 1:
            case 2:
            case 3:
                month += 9;
                year--;
                break;
            default:
                month -= 3;
                break;
        };
        month = month < 10 ? '0' + month : month;
        date = date < 10 ? '0' + date : date;

        nowDate = year + '-' + month + '-' + date;
    };
    if (time == '近一月') {
        switch (month) {
            case 1:
                month += 11;
                year--;
                break;
            default:
                month -= 1;
                break;
        };
        month = month < 10 ? '0' + month : month;
        date = date < 10 ? '0' + date : date;
        nowDate = year + '-' + month + '-' + date;
    };
    if (time == '近一周') {
        excessive = getTime - 7 * 24 * 60 * 60 * 1000;
        var eMonth = new Date(excessive).getMonth() + 1;
        var eDay = new Date(excessive).getDate();
        eMonth = eMonth < 10 ? '0' + eMonth : eMonth;
        eDay = eDay < 10 ? '0' + eDay : eDay;

        nowDate = new Date(excessive).getFullYear() + '-' + eMonth + '-' + eDay;
    };
    for (var i in obj) {
        var tsMonth = new Date(Number(obj[i].now_time)).getMonth() + 1;
        var tsDay = new Date(Number(obj[i].now_time)).getDate();
        tsMonth = tsMonth < 10 ? '0' + tsMonth : tsMonth;
        tsDay = tsDay < 10 ? '0' + tsDay : tsDay;
        var thisDat = new Date(Number(obj[i].now_time)).getFullYear() + '-' + tsMonth + '-' + tsDay;
        if (thisDat < nowDate) {
            continue;
        };
        if (type == '日推工单') {
            ys.push(obj[i].all);
        };
        if (type == '待处理') {
            ys.push(obj[i].to_be_treated);
        };
        if (type == '待确认') {
            ys.push(obj[i].to_be_confirmed);
        };
        xs.push(thisDat.replace(/\-/g, '.'));
    };
    return {
        xd: xs,
        yd: ys
    }
};
function request(url, date) { //工单列表 搜索数据请求
    $.ajax({
        type: 'post',
        url: url,
        data: date,
        dataType: 'json',
        success: function(respone) {
            //console.log(respone);
            showArray(respone.data);
        },
        error: function(xhtTxt) {
            //console.log('error:' + xhtTxt);
        }
    })
};
function cityOption(type, elem, index) { //录入型工单城市选择
    //elem.innerHTML = '<option></option>';
    elem.find('ul li').remove();
    elem.find('p').text('-请选择-');
    var cityArea;
    var url = window.location.href;
    if (type == '1') {
        cityArea = cityStr[index].city[0].area;
        for (var i in cityArea) {
            var oLi = document.createElement('li');
            oLi.innerHTML = cityArea[i];
            elem.find('ul').append(oLi)
        }
    } else {
        cityArea = cityStr[index].city;
        for (var i in cityArea) {
            var oLi = document.createElement('li');
            oLi.innerHTML = cityArea[i].name;
            elem.find('ul').append(oLi)
        }
    }
    if(url.indexOf('high_search') != -1){
        elem.find('ul').append('<li style="clear:both;float:right;padding-left:0;background-image:none"><button style="padding:4px 8px;cursor:pointer;width:auto;height:auto;line-height:normal;background-color:transparent;color:rgba(0,0,0,.65);border:1px solid #CDCFD1" onclick="$(this).parents(\'ul\').find(\'li.active\').removeClass();$(this).parents(\'ul\').prev(\'p\').text(\'-请选择-\');">清空</button><button style="padding:4px 8px;cursor:pointer;width:auto;height:auto;line-height:normal;background-color:#2492FC;;color:#fff;border:1px solid #2492FC"  onclick="$(this).parents(\'ul\').hide()">确定</button></li>');
    }
};
function dateFormat(num){ //时间月日时分秒格式转化
    num = num < 10 ? '0'+ num : num;
    return num
};
//地图数据处理
function mapDateHandle(coordinate){
    if(coordinate == ''){
        return {
            'data_all':'',
            'abnormal':''
        }
    }
    var data_info = [], arr1 = [], arr2 = [], data_all = [], abnormal = [];
    for(var item in coordinate){
        if(item == '0'){
            continue
        };
        var childs = [],str = '',bool = false;
        var coord = item.split(',');
        childs.push(coord[0].replace(/\s+/g, ""));  //x坐标
        childs.push(coord[1].replace(/\s+/g, ""));  //y坐标
        var cont = coordinate[item];
        if(cont.length > 1){
            var time = [],cityNames = [];
            str += '<div class="scrollbar mapbar" style="max-height:372px;overflow-y:auto;margin:10px 0">'
            for(var i=0;i<cont.length;i++){
                str += '<p style="margin:0 0 10px 0;padding:0;font-weight:bold;color:rgba(0,0,0,.85)">小区名称'+(i+1)+'：'+cont[i]['小区名称']+'</p>';
                if(cont[i].msg != ''){
                    bool = true;
                    if(cont[i].msg.length > 1){
                        for(var j=0;j<cont[i].msg.length;j++){
                            var jStr = '';
                            for(var k=0;k<cont[i].msg[j]['异常原因'].length; k++){
                                jStr += cont[i].msg[j]['异常原因'][k] +',';
                            }
                            jStr = jStr.substring(0,jStr.length-1);
                            str += '<p style="margin:0 0 8px 0;padding:0;"><em style="color:#FF5975;">异常类型'+(j+1)+'：</em><em style="color:rgba(0,0,0,.65)">'+cont[i].msg[j]['异常类型'] + '</em></p><p style="margin:0;padding:0;">' + '<em style="color:#FF5975;">异常原因'+ (j+1)+'：</em><em style="color:rgba(0,0,0,.65)">'+ jStr + '</em></p>';
                        }
                    }else{
                        var jStr = '';
                        for(var k=0;k<cont[i].msg[0]['异常原因'].length; k++){
                            jStr += cont[i].msg[0]['异常原因'][k] +',';
                        }
                        jStr = jStr.substring(0,jStr.length-1);
                        str += '<p style="margin:0;padding:0;"><em style="color:#FF5975;">异常类型：</em><em style="color:rgba(0,0,0,.65)">'+cont[i].msg[0]['异常类型'] + '</em></p><p style="margin:0;padding:0;">' + '<em style="color:#FF5975;">异常原因：</em><em style="color:rgba(0,0,0,.65)">' + jStr + '</em></p>';
                    }
                    cityNames.push(cont[i]['小区名称'])
                } 
                if(i<cont.length-1){
                    str += '<p style="margin:24px 0;padding:0;border:1px dashed #DEE1E3"></p>'
                } 
            }
            str += '</div>';
            if(bool){
                time.push(item.split(',')[0].replace(/\s+/g, ""));
                time.push(item.split(',')[1].replace(/\s+/g, ""));
                time.push(cityNames);
                time.push(str)
                abnormal.push(time)
            }  
        }else{
            var time = [],cityNames = [];
            str += '<div><p style="margin:0;padding:0;font-weight:bold">小区名称：'+cont[0]['小区名称']+'</p>';
            if(cont[0].msg != ''){
                bool = true;
                if(cont[0].msg.length > 1){
                    for(var j=0;j<cont[0].msg.length;j++){
                        var jStr = '';
                        for(var k=0;k<cont[0].msg[j]['异常原因'].length; k++){
                            jStr += cont[0].msg[j]['异常原因'][k] +',';
                        }
                        jStr = jStr.substring(0,jStr.length-1);
                        str += '<p style="margin:0;padding:0;"><em style="color:#FF5975;">异常类型'+(j+1)+'：</em><em style="color:rgba(0,0,0,.65)">'+cont[0].msg[j]['异常类型'] + '</em></p><p style="margin:0;padding:0;">' + '<em style="color:#FF5975;">异常原因'+ (j+1)+'：</em><em style="color:rgba(0,0,0,.65)">'+ jStr + '</em></p>';
                    }
                }else{
                    var jStr = '';
                    for(var k=0;k<cont[0].msg[0]['异常原因'].length; k++){
                        jStr += cont[0].msg[0]['异常原因'][k] +',';
                    }
                    jStr = jStr.substring(0,jStr.length-1);
                    str += '<p style="margin:0;padding:0;"><em style="color:#FF5975;">异常类型：</em><em style="color:rgba(0,0,0,.65)">'+cont[0].msg[0]['异常类型'] + '</em></p><p style="margin:0;padding:0;">' + '<em style="color:#FF5975;">异常原因：</em><em style="color:rgba(0,0,0,.65)">' + jStr + '</em></p>';
                }
                cityNames.push(cont[0]['小区名称'])
            }
            str += '</div>'
            if(bool){
                time.push(item.split(',')[0].replace(/\s+/g, ""));
                time.push(item.split(',')[1].replace(/\s+/g, ""));
                time.push(cityNames);
                time.push(str)
                abnormal.push(time)
            }  
        }
        if(bool){
            childs.push(1);
        }else{
            childs.push(0);
        }
        childs.push(str);
        if(cont[0]['is_error']){
            childs.push(1)
        }else{
            childs.push(0)
        }
        data_info.push(childs);  
    };
    for(var i=0;i<data_info.length;i++){
        if(data_info[i][2] == 1){
            arr2.push(data_info[i])
        }else{
            arr1.push(data_info[i])
        }
    }
    data_all = arr1.concat(arr2);
    return {
        'data_all':data_all,
        'abnormal':abnormal
    };
}
function mapBd(xyA,coordinate,circleDate,data_all,abnormal) { //定界结果-地图渲染
    if(coordinate == ''){
        var bd09 = wgs2bd('32.057236','118.778074')
        mainPoint = new BMap.Point(bd09[1], bd09[0])
    }else{
        if(xyA == ''){
            var bd09 = wgs2bd(data_all[0][1], data_all[0][0]); //GPS转百度
            //var bd09 = [data_info[0][1], data_info[0][0]];
        }else{
            var bd09 = wgs2bd(xyA[1], xyA[0]); //GPS转百度
           // var bd09 = [xyA[1], xyA[0]];
        }
        mainPoint = new BMap.Point(bd09[1], bd09[0]);
    };
    var thIndex = -1;
    window.map = new BMap.Map("allmap", {
        minZoom: 9,
        maxZoom: 17
        
    }); // 创建Map实例
    if(xyA == ''){
        map.centerAndZoom(mainPoint, 12); // 初始化地图,设置中心点坐标和地图级别
    }else{
        map.centerAndZoom(mainPoint, 17); // 初始化地图,设置中心点坐标和地图级别
        
    }
    //map.setCurrentCity("南京"); // 设置地图中心显示的城市 new！
    //map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

    var opts = {
        width: 240, // 信息窗口宽度
        offset: new BMap.Size(0, -5)
    }  
    
    
    if(coordinate != ''){
        pointBd(data_all);
    };
    function pointBd(points) {
        for (var i = 0; i < points.length; i++) {
            var myIcon,marker;
            var bd09 = wgs2bd(points[i][1], points[i][0]); //GPS转百度
            //var bd09 = [points[i][1], points[i][0]];
            if(!points[i][4] == 1){
                if(points[i][2] == 1){
                    myIcon = new BMap.Icon("./static/images/circle-error.png", new BMap.Size(18, 18)); //新图标
                    marker = new BMap.Marker(new BMap.Point(bd09[1], bd09[0]),{
                        icon: myIcon,
                        offset: new BMap.Size(-8, 5)
                    }); // 创建标注, 
                }else{
                    myIcon = new BMap.Icon("./static/images/circle-normal.png", new BMap.Size(18, 18)); //新图标
                    
                    marker = new BMap.Marker(new BMap.Point(bd09[1], bd09[0]),{
                        icon: myIcon,
                        offset: new BMap.Size(-8, 5),
                    }); // 创建标注, 
                }
            }else{
                if(points[i][2] == 1){
                    myIcon = new BMap.Icon("./static/images/map-error.png", new BMap.Size(18, 18)); //新图标
                    marker = new BMap.Marker(new BMap.Point(bd09[1], bd09[0]),{
                        icon: myIcon,
                        offset: new BMap.Size(-8, 5)
                    }); // 创建标注, 
                }else{
                    myIcon = new BMap.Icon("./static/images/map-normal.png", new BMap.Size(18, 18)); //新图标
                    
                    marker = new BMap.Marker(new BMap.Point(bd09[1], bd09[0]),{
                        icon: myIcon,
                        offset: new BMap.Size(-8, 5)
                    }); // 创建标注, 
                }
            }  
            marker.setZIndex(i);
            map.addOverlay(marker); //添加点到地图
            
            if(points[i][3] != ''){
                var content;
                //点击显示弹层
                content = points[i][3];
                
                addClickHandler(content, marker);
            }  
        }
    }; 
    //-start-1219地图画圆修改
    if(circleDate != ''){
        for(var item in circleDate){
            var coord1 = item.split(',');
            var bd09 = wgs2bd(coord1[1].replace(/\s+/g, ""), coord1[0].replace(/\s+/g, "")); //GPS转百度
            //var bd09 = [coord1[1].replace(/\s+/g, ""), coord1[0].replace(/\s+/g, "")];
            var cirPoint = new BMap.Point(bd09[1], bd09[0]);
            var circle = new BMap.Circle(cirPoint,circleDate[item]*1000,{strokeColor:"#F0454C", strokeWeight:1, strokeOpacity:0.3,fillColor:'#FF5975',fillOpacity:0.08}); //创建圆 半径单位米

            var myIcon2 = new BMap.Icon("./static/images/center.png", new BMap.Size(18, 18)); //新图标
            var marker2 = new BMap.Marker(cirPoint,{
                icon: myIcon2,
                offset: new BMap.Size(-8, 5)
            }); // 创建标注, 
            map.addOverlay(marker2); //添加点到地图
            //addClickHandler('区域圆心位置',marker2);
            map.addOverlay(circle); //增加圆
        }
    }
    //默认标注异常点
    if(xyA != ''){
        for(var i=0;i<abnormal.length;i++){
            if(xyA[0] == abnormal[i][0] && xyA[1] == abnormal[i][1]){
                thIndex = i;
                break;
            }
        }
        if(thIndex >= 0){
            var bd09 = wgs2bd(abnormal[thIndex][1], abnormal[thIndex][0]); //GPS转百度
           // var BD09 = [data_all[thIndex][1], data_all[thIndex][0]];
            var point1 = new BMap.Point(bd09[1], bd09[0]);
            var infoWindow1 = new BMap.InfoWindow(abnormal[thIndex][3], opts); // 创建信息窗口对象 
            map.openInfoWindow(infoWindow1, point1); //开启信息窗口
        }
            
    }
    //定位投诉点
    $('.map .location span').eq(0).unbind();
    $('.map .location span').eq(0).on('click',function(){
        if(circleDate != ''){
            for(var item in circleDate){
                theLocation(item);
                break;
            }
        }
    });
    $('.map .location span').eq(0).on('mouseover',function(e){
        var evt = e || window.event;
        var elem = evt.target
        var zx = $(elem).offset().top - 30;
        var zy = $(elem).offset().left + 50;
        if(circleDate != ''){
            var txt = '可定位投诉点'
        }else{
            var txt = '无投诉点定位'
        }
        var str = '<p class="mapPosition" style="position:absolute;top:'+zx+'px;left:'+zy+'px;padding:5px 10px;border-radius:3px;background-color:rgba(0,0,0,65);color:#fff;font-size:14px;">'+txt+'</p>';
        $('body').append(str);
    })
    $('.map .location span').eq(0).on('mouseout',function(){
        $('.mapPosition').remove();
    })
    //缩放地图
    $('.map .location span').eq(1).unbind();
    $('.map .location span').eq(1).on('click',function(){
        mapZoom('+');
    });
    $('.map .location span').eq(2).unbind();
    $('.map .location span').eq(2).on('click',function(){
        mapZoom('-');
    });
};
// 故障详情点击表格对应地图异常点
function mapCityClick(xyA,data_all){
    var opts = {
        width: 240, // 信息窗口宽度
        offset: new BMap.Size(0, -5)
    } 
    var thIndex = -1;
    console.log(data_all.indexOf(xyA[0]))
    console.log(data_all.indexOf(xyA[1]))
    for(var i=0;i<data_all.length;i++){
        if(xyA[0] == data_all[i][0] && xyA[1] == data_all[i][1]){
            thIndex = i;
        }
    }
    if(xyA != '' && thIndex>=0){
        var BD09 = wgs2bd(data_all[thIndex][1], data_all[thIndex][0]); //GPS转百度
        //var BD09 = [data_all[thIndex][1], data_all[thIndex][0]];
        var point1 = new BMap.Point(BD09[1], BD09[0]);
        var infoWindow1 = new BMap.InfoWindow(data_all[thIndex][3], opts); // 创建信息窗口对象 
        map.openInfoWindow(infoWindow1, point1); //开启信息窗口
        theLocation(data_all[thIndex][0]+','+data_all[thIndex][1])
    }
}
//地图缩放事件
function mapZoom(type){
    var zoom = map.getZoom();
    if(type == '+'){
        if((zoom+1) > 17){
            return false
        }
        map.setZoom(map.getZoom() + 1);
    }else if(type == '-'){
        if((zoom-1) < 9){
            return false
        }
        map.setZoom(map.getZoom() - 1);
    }   
}
// 用经纬度设置地图中心点
function theLocation(cde){
    var zb = wgs2bd(cde.split(',')[1],cde.split(',')[0])
    var new_point = new BMap.Point(zb[1],zb[0]);
    map.centerAndZoom(new_point, 17);
}
//地图标点点击事件
function addClickHandler(content, marker) {
    marker.addEventListener("click", function(e) {
        openInfo(content, e)
    });
};
//地图标点弹窗事件
function openInfo(content, e) {
    
    var opts = {
        width: 240, // 信息窗口宽度
        offset: new BMap.Size(0, -5)
    }  
    var p = e.target;
    var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
    
    var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象 
    map.openInfoWindow(infoWindow, point); //开启信息窗口
}