/*
   定界依据页面js统筹
*/
function performanAbnormal(name){  //异常时间段定界规则对应的折线图tab内容
    var xname = '';
    var abnormal = {
        '1/2次握手时延':'TCP一二次握手时延',
        '1/2次握手成功率':'TCP一二次握手成功率',
        '2/3次握手时延':'TCP二三次握手时延',
        '2/3次握手成功率':'TCP二三次握手成功率',
        '12次握手时延':'TCP一二次握手时延',
        '12次握手成功率':'TCP一二次握手成功率',
        '23次握手时延':'TCP二三次握手时延',
        '23次握手成功率':'TCP二三次握手成功率',
        'TCP重传率':'TCP重传率',
        'HTTP响应时延':'HTTP响应时延',
        'HTTP响应成功率':'HTTP响应成功率',
        'HTTP下行速率':'500KB以上大包下载速率',
        '附着成功率':'附着成功率',
        'TAU成功率':'TAU成功率',
        'X2切换成功率':'X2切换成功率',
        '业务请求成功率':'Service Request 业务请求成功率',
        '频繁切换':'X2切换成功率',
        '频繁附着':'附着成功率',
        '频繁TAU':'TAU成功率',
        '弱覆盖':'弱覆盖',
        '重叠覆盖':'重叠覆盖',
        '过覆盖':'过覆盖'
    };
    for(var item1 in abnormal){
        if(name.indexOf(item1) != -1){
            xname = abnormal[item1];
        }
    }
    return xname;
}
function perforParam(elem,key){  //折线图tab内容对应的接口参数
    var state;
    var basis_two_name = {
        'TCP一二次握手时延': 'tcp_12_time',
        'TCP一二次握手成功率': 'tcp_12_per',
        'TCP二三次握手时延': 'tcp_23_time',
        'TCP二三次握手成功率': 'tcp_23_per',
        'TCP重传率': 'tcp_re_per',
        'HTTP响应成功率': 'http_per',
        'HTTP响应时延': 'http_time',
        '500KB以上大包下载速率': 'http_spe'
    };
    var basis_two_name1 = {
        '附着成功率': 'scu',
        'TAU成功率': 'tau_scu',
        'X2切换成功率': 'x2_scu',
        'Service Request 业务请求成功率': 'xr_scu'
    };
    var basis_two_name2 = {
        '弱覆盖':'mr_cr',
        '重叠覆盖':'mr_ocr',
        '过覆盖':'mr_nocr'
    }
    if(key == 1){
        state = basis_two_name[elem]
    }else if(key == 2){
        state = basis_two_name1[elem]
    }else if(key == 3){
        state = basis_two_name2[elem]
    }
    return state;
}
function confirmTime(date) { //异常时间段-验证上午，中午，夜晚
    var h = date.getHours();
    if (h >= 6 & h < 12) {
        return '上午'
    } else if (h >= 12 & h < 18) {
        return '下午'
    } else if (h >= 18 & h < 24) {
        return '晚间'
    }else{
        return '凌晨'
    }
}
function add15(h) { //异常时间段-时间戳转化成时间格式
    var time = new Date(h);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    return year + '-' + dateFormat(month) + '-' + dateFormat(date) + ' ' + dateFormat(hours) + ':' + dateFormat(minutes) + ':' + dateFormat(seconds);
}
function abnormalTimeResult(resultVal) {  //异常时间段-表格最后一格根据不同规则的区分
    if(!Boolean(resultVal)){
        return ''
    };
    if (resultVal.indexOf('无线') != -1) {
        return '故障小区'
    } else if (resultVal.indexOf('核心网') != -1) {
        return '故障网元'
    } else if (resultVal.indexOf('SP') != -1) {
        return '质差业务'
    } else {
        return '故障设备'
    }
}
function performanceUnit(elem){ //异常时间段-定界规则异常原因单位
    var unit = '';
    var date = {
        '重传率':'%',
        '握手时延':'ms',
        '握手平均时延':'ms',
        '下行速率':'Mbps',
        '小区比例':'%',
        '响应时延':'ms',
        '成功率':'%',
        '次数':'次',
        '小类数目':'个',
        '小类占比':'%',
        '小区数':'个',
        '500KB以上大包':'Mbps',
        '高负荷':'-'
    };
    for(var item2 in date){
        if(elem.indexOf(item2) != -1){
            unit = date[item2]
        }
    }
    return unit;
}
function hrefIndex() { //定界依据页面tab索引
    var bTab = document.querySelector('.bTab');
    var sp = bTab.querySelectorAll('div');
    var index;
    for (var i = 0; i < sp.length; i++) {
        if (sp[i].className == 'active') {
            index = i;
        }
    }
    return index
};
//业务状态接口请求渲染页面
function business() {
    var respone = {"EmosReq":{"vlr_list":["国内漫游","正常"],"gprs_list23g":["国内漫游","正常"],"gprs_list4g":["国内漫游","正常"],"apn23g":["1,CMNET;。2,CMWAP;","正常"],"apn4g":["40,IMS。2,CMWAP。1,CMNET","正常"],"tele_lock23g":["未停机","正常"],"tele_lock4g":["未停机","正常"],"nam23g":["开通","正常"],"nam4g":["开通","正常"],"pcrf_is_speed_limit":["未限速","正常"],"pcrf_speed_limit_type":["","正常"],"pcrf_user_sign_names":["任我用-全国超套餐限速","正常"]}};
    var objName = {
        'vlr_list': 'GSM漫游状态',
        'gprs_list23g': 'GPRS漫游状态2/3G',
        'gprs_list4g': 'GPRS漫游状态4G',
        'apn23g': 'APN2/3G签约状态',
        'apn4g': 'APN4G签约状态',
        'tele_lock23g': '2/3G停复机信息',
        'tele_lock4g': '4G停复机信息',
        'nam23g': 'GPRS数据业务2/3G',
        'nam4g': 'GPRS数据业务4G',
        'pcrf_is_speed_limit': '限速状态',
        'pcrf_speed_limit_type': '限速类型',
        'pcrf_user_sign_names': '签约策略'
    }
    var abnomalNum = 0, totalNum = 0,abnomalClass = '';
    $('.business').find('tbody').html('');
    for (var item in respone.EmosReq) {
        totalNum++;
        if(respone.EmosReq[item][1] == '异常'){
            abnomalNum++;
            abnomalClass = 'yc301'
        }else{
            abnomalClass = ''
        }
        if (!respone.EmosReq[item]) {
            respone.EmosReq[item] = ''
        }
        $('.business').find('tbody').append('<tr><td><strong>' + objName[item] + '</strong></td><td>' + respone.EmosReq[item][0] + '</td><td class="'+abnomalClass+'">' + respone.EmosReq[item][1] + '</td></tr>')
    }
    if(abnomalNum != 0){
        abnomalNum = '<em style="color:#ff0739">'+abnomalNum+'</em>'
    }else{
        abnomalNum = '<em>'+abnomalNum+'</em>'
    }
    $('.business').find('th:last-child').html('异常<em>'+abnomalNum+'</em>/<em>'+totalNum+'</em>项'); 
};
//无线异常定界接口请求渲染页面
function wireless() {
    var respone = { is_cr: 1, w_id: "293894", w_type: "江阴市申港镇江南花园，申港江南花园，申港江南花苑（低层、车库），江阴市申港镇江南花园19幢103室，江南花", w_title: "弱覆盖", w_content: "您好，您所反映区域的信号弱问题我方已安排了信号覆盖工程的实施，现已完成开通，您所在区域的信号已有所改善，建议您继续观察。如您还有问题，可拨打免费咨询电话：18261510086联系我处网络管理员！ （江南花园19幢103室需要增补MDAS解决，目前处于申请设备阶段，我们将努力加快建设进度，争取早日改善对此处的覆盖，给您带来不便敬请谅解！如您还有任何疑问，可拨打免费电话18261510086联系我处网络维护人员！）" }
    if (respone.is_cr == 0) {
        $('.wireless .module').eq(0).find('.title p').text('非弱覆盖');
        $('.wireless .module').eq(0).find('.cont').hide();
        $('.wireless .module').eq(0).find('.title i').removeClass();
    } else {
        $('.wireless .module').eq(0).find('tbody tr').eq(0).find('td').eq(1).text('是');
        $('.wireless .module').eq(0).find('tbody tr').eq(1).find('td').eq(1).text(respone.w_id);
        $('.wireless .module').eq(0).find('tbody tr').eq(2).find('td').eq(1).text(respone.w_title);
        $('.wireless .module').eq(0).find('tbody tr').eq(3).find('td').eq(1).text(respone.w_type);
        $('.wireless .module').eq(0).find('tbody tr').eq(4).find('td').eq(1).text(respone.w_content);
        $('.wireless .module').eq(0).find('tbody tr').eq(1).show();
        $('.wireless .module').eq(0).find('tbody tr').eq(2).show();
        $('.wireless .module').eq(0).find('tbody tr').eq(3).show();
        $('.wireless .module').eq(0).find('tbody tr').eq(4).show();
        $('.wireless .module').eq(0).find('.title p').text('弱覆盖');
    }
};
//无线异常定界-异常时间段-接口请求渲染页面
function wirelessAbnomal(){
    var responsed = {"1558867500.0":[{"result":"无线问题","rule_category":"小区闭站","facility_description":"cell_id","abnormal_type":"发生告警","facility":"省中医药研究院下试扩L(W)-3","abnormal_detail":"小区闭塞告警;00|404661547785;2019-05-26 18:16:45;2019-05-27 08:02:37"},{"rule_category":"小区闭站","result":"无线问题","facility_description":"cell_id","abnormal_type":"发生告警","facility":"省中医药研究院下试扩L(W)-3","abnormal_detail":"小区闭塞告警;00|404661430051;2019-05-26 17:46:57;2019-05-27 05:53:09"},{"rule_category":"控制面TAU成功率低","result":"","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}"}],"1558946700.0":[{"result":"无线问题","rule_category":"小区闭站","facility_description":"cell_id","abnormal_type":"发生告警","facility":"上坊佘村二期LF-2","abnormal_detail":"小区闭塞告警;00|404666912117;2019-05-27 17:15:38;2019-05-27 18:02:13"},{"rule_category":"TCP23次握手时延长","result":"终端问题","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 206.63515240007303, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 240.16000000000003, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 6, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 0.8333333333333334}"}],"1558947600.0":[{"result":"无线问题","rule_category":"小区闭站","facility_description":"cell_id","abnormal_type":"发生告警","facility":"上坊佘村二期LF-3","abnormal_detail":"小区闭塞告警;00|404666912117;2019-05-27 17:15:38;2019-05-27 18:02:13"},{"rule_category":"TCP23次握手时延长","result":"终端问题","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 50.8624168768631, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 83.24, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 8, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558948500.0":[{"result":"无线问题","rule_category":"小区闭站","facility_description":"cell_id","abnormal_type":"发生告警","facility":"上坊佘村二期LF-3","abnormal_detail":"小区闭塞告警;00|404666912117;2019-05-27 17:15:38;2019-05-27 18:02:13"},{"rule_category":"TCP23次握手时延长","result":"终端问题","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 52.52709359605912, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 5.169999999999999, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 6, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 0.8333333333333334}"}],"1558950300.0":[{"result":"无线问题","rule_category":"小区闭站","facility_description":"cell_id","abnormal_type":"发生告警","facility":"上坊佘村二期LF-2","abnormal_detail":"小区闭塞告警;00|404666912117;2019-05-27 17:15:38;2019-05-27 18:02:13"},{"rule_category":"TCP23次握手时延长","result":"终端问题","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 59.320209973753286, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 16.049999999999997, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 6, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 0.8333333333333334}"}],"1558949400.0":[{"result":"无线问题","rule_category":"小区闭站","facility_description":"cell_id","abnormal_type":"发生告警","facility":"上坊佘村二期LF-3","abnormal_detail":"小区闭塞告警;00|404666912117;2019-05-27 17:15:38;2019-05-27 18:02:13"},{"rule_category":"TCP23次握手时延长","result":"终端问题","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 109.08204768583452, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 75.03, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 4, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558863900.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 39.3454443823365, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 95.02, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 5, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558864800.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 38.37129012719564, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 31.02, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 2, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558865700.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 33.418952618453865, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 5.0, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 2, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558866600.0":[{"result":"","rule_category":"控制面TAU成功率低","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}"}],"1558868400.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 52.74129353233831, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 219.01, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 2, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558869300.0":[{"result":"","rule_category":"控制面TAU成功率低","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}"}],"1558870200.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 40.57087583538516, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 93.01, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 4, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558871100.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 43.1038023868998, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 38.03, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 28, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 0.9285714285714286}"}],"1558872000.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 31.891089108910894, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 5.049999999999999, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 6, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 0.6666666666666666}"}],"1558872900.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 38.87465940054496, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 14.01, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558873800.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 35.388009991673606, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 12.01, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 6, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558874700.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 113.44900734294264, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 151.12, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 10, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558874760.0":[{"result":"无线问题","rule_category":"乒乓TAU","facility_description":"cell_id","abnormal_type":"信令指标异常","facility":"['9944992', '84900354']","abnormal_detail":"{\"('20758', '20753')\": 2}"}],"1558875600.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 45.067119456652016, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 27.019999999999996, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 3, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558876500.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 33.241145254843886, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 153.08999999999997, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 5, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558877400.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 41.76754594800495, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 78.02, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 10, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558878300.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 47.07177497575171, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 90.03000000000002, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 11, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558879200.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 41.564738292011015, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 37.059999999999995, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 3, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558880100.0":[{"result":"","rule_category":"控制面TAU成功率低","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}"}],"1558881900.0":[{"result":"","rule_category":"控制面TAU成功率低","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}"}],"1558882800.0":[{"result":"","rule_category":"控制面TAU成功率低","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}"}],"1558884600.0":[{"result":"","rule_category":"控制面TAU成功率低","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}"}],"1558885500.0":[{"result":"","rule_category":"控制面TAU成功率低","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}"}],"1558908000.0":[{"result":"","rule_category":"控制面TAU成功率低","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}"}],"1558908900.0":[{"result":"","rule_category":"控制面TAU成功率低","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}"}],"1558909800.0":[{"result":"","rule_category":"控制面TAU成功率低","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}"}],"1558910700.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": \"\", \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": \"\", \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558911600.0":[{"result":"","rule_category":"控制面TAU成功率低","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}"}],"1558912500.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 34.19632761688793, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 484.02, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 2, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558913400.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 34.01176159640545, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 188.01, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558914300.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": \"\", \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": \"\", \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558915200.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 31.06160164271047, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 66.05, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558916100.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 28.90735385530121, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 205.01999999999998, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558917900.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 32.97868209955679, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 228.02999999999997, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558918800.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 30.040634236623298, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 238.03999999999996, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558919700.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 30.57386198476833, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 84.02, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558920600.0":[{"result":"","rule_category":"控制面TAU成功率低","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}"}],"1558921500.0":[{"result":"","rule_category":"控制面TAU成功率低","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}"}],"1558922400.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 30.02046783625731, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 45.04, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558923300.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 37.07038123167154, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 2.0799999999999987, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558924200.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 33.06869009584664, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 11.06, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558925100.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 27.048565121412803, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 7.059999999999999, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 2, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 0.5}"}],"1558926000.0":[{"result":"","rule_category":"控制面TAU成功率低","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}"}],"1558926900.0":[{"result":"","rule_category":"控制面TAU成功率低","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}"}],"1558927800.0":[{"result":"无线问题","rule_category":"乒乓TAU","facility_description":"cell_id","abnormal_type":"信令指标异常","facility":"['219023650', '9541784']","abnormal_detail":"{\"('20981', '20952')\": 2}"}],"1558928700.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 33.629629629629626, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 9.04, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558929600.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 35.03174603174603, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 19.05, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558930500.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 35.0, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 12.03, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558931400.0":[{"result":"","rule_category":"控制面TAU成功率低","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}"}],"1558932300.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 35.41220972304454, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 79.01, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558933200.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": \"\", \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": \"\", \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558934100.0":[{"result":"","rule_category":"控制面TAU成功率低","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}"}],"1558935000.0":[{"result":"","rule_category":"控制面TAU成功率低","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}"}],"1558935900.0":[{"result":"","rule_category":"控制面TAU成功率低","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}"}],"1558936200.0":[{"result":"无线问题","rule_category":"乒乓TAU","facility_description":"cell_id","abnormal_type":"信令指标异常","facility":"['219023650', '218963970']","abnormal_detail":"{\"('20981', '20952')\": 2}"}],"1558936320.0":[{"result":"无线问题","rule_category":"乒乓TAU","facility_description":"cell_id","abnormal_type":"信令指标异常","facility":"['219023650', '230520578']","abnormal_detail":"{\"('20981', '20952')\": 2}"}],"1558936560.0":[{"result":"无线问题","rule_category":"乒乓TAU","facility_description":"cell_id","abnormal_type":"信令指标异常","facility":"['219023650', '218963970']","abnormal_detail":"{\"('20981', '20952')\": 2}"}],"1558936800.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 52.61319206088644, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 232.05, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 6, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558937160.0":[{"result":"无线问题","rule_category":"乒乓TAU","facility_description":"cell_id","abnormal_type":"信令指标异常","facility":"['219026724', '219023650', '2305","abnormal_detail":"{\"('20952', '20981')\": 3}"}],"1558937700.0":[{"result":"","rule_category":"控制面TAU成功率低","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}"}],"1558939800.0":[{"result":"无线问题","rule_category":"乒乓TAU","facility_description":"cell_id","abnormal_type":"信令指标异常","facility":"['219023650', '230520578']","abnormal_detail":"{\"('20981', '20952')\": 2}"}],"1558940400.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": \"\", \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": \"\", \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558943100.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 58.13507894867099, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 148.07, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 4, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 0.75}"}],"1558944000.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": \"\", \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": \"\", \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 2, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 0.5}"}],"1558944900.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 374.36328626444157, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 359.09999999999997, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 6, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558944960.0":[{"result":"无线问题","rule_category":"乒乓TAU","facility_description":"cell_id","abnormal_type":"信令指标异常","facility":"['219023650', '230520578']","abnormal_detail":"{\"('20981', '20952')\": 5}"}],"1558945800.0":[{"result":"终端问题","rule_category":"TCP23次握手时延长","facility_description":"","abnormal_type":"信令指标异常","facility":"","abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 259.42897261497006, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 241.12, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 6, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}"}],"1558947000.0":[{"result":"无线问题","rule_category":"乒乓TAU","facility_description":"cell_id","abnormal_type":"信令指标异常","facility":"['219023650', '218963970', '2305","abnormal_detail":"{\"('20981', '20952')\": 9}"}],"1558947120.0":[{"result":"无线问题","rule_category":"乒乓TAU","facility_description":"cell_id","abnormal_type":"信令指标异常","facility":"['230520578', '219023650', '2189","abnormal_detail":"{\"('20952', '20981')\": 3}"}]};

    for (var item in responsed) {
        var timestamps = null;
        timestamps = add15(parseInt(item) * 1000);
        //验证的值
        var confirmTime1 = confirmTime(new Date(parseInt(item) * 1000));
        // 将时间格式加15分钟
        var h = parseInt(item) * 1000 + 900000;
        var addResult = add15(h);
        var apn;
        if (confirmTime1 == "上午") {
            apn = 'am'
        } else if (confirmTime1 == "下午") {
            apn = 'pm'
        } else if (confirmTime1 == "晚间") {
            apn = 'nm'
        }
        for (var j = 0; j < responsed[item].length; j++) {
            var str = '';
            if(responsed[item][j].abnormal_type.indexOf('告警') != -1){
                str = "<div class='tab-total'><table><thead><tr><th>故障类别</th><th>故障时间</th><th>异常类型</th><th>异常原因</th><th style='width:20%'>指标详情</th><th>" + abnormalTimeResult(responsed[item][j].result) + "</th></tr></thead><tbody></tbody></table></div>";
                var elem1 = $('.wireless').find('.abnomal').eq(0).find('.tables-one');
                var elem2 = $('.wireless').find('.abnomal').eq(0).find('.tables-two');
                var elem3 = $('.wireless').find('.abnomal').eq(0).find('.tables-three');
                if (confirmTime1 == "上午" && elem1.find('table').length < 1) {
                    $('.wireless').find('.abnomal').eq(0).find('.tables-one').html('');
                    $('.wireless').find('.abnomal').eq(0).find('.tables-one').append(str);
                    $('.wireless').find('.abnomal').eq(0).find('.tables').eq(0).addClass('table-active');
                    $('.wireless').find('.abnomal').eq(0).find('.userTab span').eq(0).removeClass().addClass('active abnormal');
                } else if (confirmTime1 == "下午" && elem2.find('table').length < 1) {
                    $('.wireless').find('.abnomal').eq(0).find('.tables-two').html('');
                    $('.wireless').find('.abnomal').eq(0).find('.tables-two').append(str);
                    $('.wireless').find('.abnomal').eq(0).find('.userTab span').eq(1).removeClass().addClass('abnormal');
                } else if (confirmTime1 == "晚间" && elem3.find('table').length < 1) {
                    $('.wireless').find('.abnomal').eq(0).find('.tables-three').html('');
                    $('.wireless').find('.abnomal').eq(0).find('.tables-three').append(str);
                    $('.wireless').find('.abnomal').eq(0).find('.userTab span').eq(2).removeClass().addClass('abnormal');
                }
                if(elem1.find('table').length < 1 && elem2.find('table').length < 1 && elem3.find('table').length < 1){
                    $('.wireless').find('.abnomal').eq(0).prev('.title').find('p').html('异常<em>0</em>');
                } else{
                    $('.wireless').find('.abnomal').eq(0).show();
                }
            }else if(responsed[item][j].abnormal_type.indexOf('网优') != -1){
                str = "<div class='tab-total'><table><thead><tr><th>故障类别</th><th>故障时间</th><th>异常类型</th><th>异常原因</th><th style='width:20%'>指标详情</th><th>" + abnormalTimeResult(responsed[item][j].result) + "</th></tr></thead><tbody></tbody></table></div>";
                var elem1 = $('.wireless').find('.abnomal').eq(1).find('.tables-one');
                var elem2 = $('.wireless').find('.abnomal').eq(1).find('.tables-two');
                var elem3 = $('.wireless').find('.abnomal').eq(1).find('.tables-three');
                if (confirmTime1 == "上午" && elem1.find('table').length < 1) {
                    $('.wireless').find('.abnomal').eq(1).find('.tables-one').html('');
                    $('.wireless').find('.abnomal').eq(1).find('.tables-one').append(str);
                    $('.wireless').find('.abnomal').eq(1).find('.tables').eq(0).addClass('table-active');
                    $('.wireless').find('.abnomal').eq(1).find('.userTab span').eq(0).removeClass().addClass('active abnormal');
                } else if (confirmTime1 == "下午" && elem2.find('table').length < 1) {
                    $('.wireless').find('.abnomal').eq(1).find('.tables-two').html('');
                    $('.wireless').find('.abnomal').eq(1).find('.tables-two').append(str);
                    $('.wireless').find('.abnomal').eq(1).find('.userTab span').eq(1).removeClass().addClass('abnormal');
                } else if (confirmTime1 == "晚间" && elem3.find('table').length < 1) {
                    $('.wireless').find('.abnomal').eq(1).find('.tables-three').html('');
                    $('.wireless').find('.abnomal').eq(1).find('.tables-three').append(str);
                    $('.wireless').find('.abnomal').eq(1).find('.userTab span').eq(2).removeClass().addClass('abnormal');
                }
                if(elem1.find('table').length < 1 && elem2.find('table').length < 1 && elem3.find('table').length < 1){
                    $('.wireless').find('.abnomal').eq(1).prev('.title').find('p').html('异常<em>0</em>');
                } else{
                    $('.wireless').find('.abnomal').eq(1).show();
                }
            }else if(responsed[item][j].abnormal_type.indexOf('MR') != -1){
                str = "<div class='tab-total mr"+parseInt(item)+apn+"'><table><thead><tr><th>故障类别</th><th>故障时间</th><th>异常类型</th><th>异常原因</th><th style='width:20%'>指标详情</th><th>" + abnormalTimeResult(responsed[item][j].result) + "</th></tr></thead><tbody></tbody></table></div>";
                var elem1 = $('.wireless').find('.abnomal').eq(2).find('.tables-one');
                var elem2 = $('.wireless').find('.abnomal').eq(2).find('.tables-two');
                var elem3 = $('.wireless').find('.abnomal').eq(2).find('.tables-three');
                if (confirmTime1 == "上午" && elem1.find('table').length < 1) {
                    $('.wireless').find('.abnomal').eq(2).find('.tables-one').html('');
                    $('.wireless').find('.abnomal').eq(2).find('.tables-one').append(str);
                    $('.wireless').find('.abnomal').eq(2).find('.tables').eq(0).addClass('table-active');
                    $('.wireless').find('.abnomal').eq(2).find('.userTab span').eq(0).removeClass().addClass('active abnormal');
                } else if (confirmTime1 == "下午" && elem2.find('table').length < 1) {
                    $('.wireless').find('.abnomal').eq(2).find('.tables-two').html('');
                    $('.wireless').find('.abnomal').eq(2).find('.tables-two').append(str);
                    $('.wireless').find('.abnomal').eq(2).find('.userTab span').eq(1).removeClass().addClass('abnormal');
                } else if (confirmTime1 == "晚间" && elem3.find('table').length < 1) {
                    $('.wireless').find('.abnomal').eq(2).find('.tables-three').html('');
                    $('.wireless').find('.abnomal').eq(2).find('.tables-three').append(str);
                    $('.wireless').find('.abnomal').eq(2).find('.userTab span').eq(2).removeClass().addClass('abnormal');
                }
                if(elem1.find('table').length < 1 && elem2.find('table').length < 1 && elem3.find('table').length < 1){
                    $('.wireless').find('.abnomal').eq(2).prev('.title').find('p').html('异常<em>0</em>');
                } else{
                    $('.wireless').find('.abnomal').eq(2).show();
                }
            }
            var detailCont = '';
            if(responsed[item][j].abnormal_detail){
                if(responsed[item][j].abnormal_detail.indexOf('{') != -1 && responsed[item][j].abnormal_detail.indexOf('}') != -1){
                    var detail = JSON.parse(responsed[item][j].abnormal_detail);
                    for(var itm in detail){
                        if(typeof detail[itm] == 'number'){
                            var number = detail[itm] + '';
                            if(number.indexOf('.') != -1){
                                if(performanceUnit(itm) == '%'){
                                    detail[itm] = (detail[itm] * 100).toFixed(2) + performanceUnit(itm);
                                }else if(performanceUnit(itm) == '-'){
                                    detail[itm] = (detail[itm]);
                                }else{
                                    detail[itm] = detail[itm].toFixed(2) + performanceUnit(itm);
                                }
                            }else{
                                if(performanceUnit(itm) == '%'){
                                    detail[itm] = (detail[itm] * 100).toFixed(2) + performanceUnit(itm);
                                }else if(performanceUnit(itm) == '-'){
                                    detail[itm] = (detail[itm]);
                                }else{
                                    detail[itm] = detail[itm].toFixed(2) + performanceUnit(itm);
                                }
                            }
                            
                        }
                    }
                    for(var itm in detail){
                        detailCont += itm + ':' + detail[itm] + '，';
                    }
                    detailCont = detailCont.substring(0,detailCont.length-1)
                }else{
                    detailCont = responsed[item][j].abnormal_detail
                }
            }
            
            // 拼接追加的字符串
            if(!responsed[item][j].facility){
                responsed[item][j].facility = ''
            }
            $('.wireless').find('.cont .userTab2 span').each(function(){
                if(responsed[item][j].rule_category.indexOf($(this).text()) != -1){
                    if($(this).get(0).className.indexOf('abnormal') == -1){
                        $(this).addClass('abnormal')
                    }
                }
            })
            if(responsed[item][j].abnormal_type.indexOf('告警') != -1){
                var num,parent,elem,fTime,eTime,rowspan;
                if (confirmTime1 == "上午") {
                    elem = $('.wireless').find('.abnomal').eq(0).find('.tables-one tbody tr');
                    parent = $('.wireless').find('.abnomal').eq(0).find('.tables-one tbody');
                }else if (confirmTime1 == "下午") {
                    elem = $('.wireless').find('.abnomal').eq(0).find('.tables-two tbody tr');
                    parent = $('.wireless').find('.abnomal').eq(0).find('.tables-two tbody');
                }else if (confirmTime1 == "晚间") {
                    elem = $('.wireless').find('.abnomal').eq(0).find('.tables-three tbody tr');
                    parent = $('.wireless').find('.abnomal').eq(0).find('.tables-three tbody');
                }
                if(elem.length == 0){
                    str = "<tr><td>"+responsed[item][j].result+"</td><td><div class='time'><p>"+timestamps+"</p><p>"+addResult+"</p></div></td><td>"+responsed[item][j].abnormal_type+"</td><td>" + responsed[item][j].rule_category + "</td><td><div class='txt'>" + detailCont + "</div></td><td>" + responsed[item][j].facility + "</td></tr>";
                    parent.append(str);
                    num = Number($('.wireless').find('.abnomal').eq(0).prev('.title').find('p em').text());
                    $('.wireless').find('.abnomal').eq(0).prev('.title').find('p').html('异常<em>'+(num+1)+'</em>');
                    parent.parents('.tables').show();
                    var oTr = parent.find('tr').eq(parent.find('tr').length-1).find('div.txt');
                    var LH = parseFloat(oTr.css('line-height'));
                    var HT = parseFloat(oTr.css('height'));
                    if(HT > 2.5*LH){
                        oTr.addClass('txt active');
                        oTr.css('overflow','hidden');
                        oTr.parent().append('<p class="alt">'+detailCont+'</p>');
                        var oHp = oTr.parent().find('p').height();
                        var oTop = oTr.parent().offset().top;
                        var oLeft = oTr.parent().find('p').width() - oTr.parent().width();
                        if(oHp > oTop){
                            oTr.parent().find('p').css({'top':oTr.parent().height() + 25 + 'px','left':-oLeft + 'px'})
                        }else{
                            oTr.parent().find('p').css({'top': -oHp+'px','left':-oLeft + 'px'})
                        }
                        oTr.on('mouseover',function(){
                            if($(this).parent().find('p').css('display') == 'none'){
                                $(this).parent().find('p').show()
                            }
                        });
                        oTr.parents('td').on('mouseout',function(){
                            $(this).find('p').hide()
                        })
                    }
                    parent.parents('.tables').removeAttr('style');
                }else{
                    var rowBool = false;
                    var rowI = 0;
                    for(var i = 0;i<elem.length;i++){
                        fTime = elem.eq(i).find('td').eq(1).find('p:first-child').text();
                        eTime = elem.eq(i).find('td').eq(1).find('p:last-child').text();
                        if(fTime == timestamps && eTime == addResult){
                            rowBool = true;
                            rowI = i;
                            break;
                        }
                    }
                    if(rowBool){
                        rowspan = Number(elem.eq(rowI).find('td').eq(1).attr('rowspan'));
                        if(Boolean(rowspan)){
                            elem.eq(rowI).find('td').eq(0).attr('rowspan',rowspan+1);
                            elem.eq(rowI).find('td').eq(1).attr('rowspan',rowspan+1);
                            str = "<tr><td>"+responsed[item][j].abnormal_type+"</td><td>" + responsed[item][j].rule_category + "</td><td><div class='txt'>" + detailCont + "</div></td><td>" + responsed[item][j].facility + "</td></tr>";
                            elem.eq(rowI).after(str);
                        }else{
                            elem.eq(rowI).find('td').eq(0).attr('rowspan','2');
                            elem.eq(rowI).find('td').eq(1).attr('rowspan','2');
                            str = "<tr><td>"+responsed[item][j].abnormal_type+"</td><td>" + responsed[item][j].rule_category + "</td><td><div class='txt'>" + detailCont + "</div></td><td>" + responsed[item][j].facility + "</td></tr>";
                            elem.eq(rowI).after(str);
                        }
                        parent.parents('.tables').show();
                        var oTr = parent.find('tr').eq(rowI+1).find('div.txt');
                        var LH = parseFloat(oTr.css('line-height'));
                        var HT = parseFloat(oTr.css('height'));
                        if(HT > 2.5*LH){
                            oTr.addClass('txt active');
                            oTr.css('overflow','hidden');
                            oTr.parent().append('<p class="alt">'+detailCont+'</p>');
                            var oHp = oTr.parent().find('p').height();
                            var oTop = oTr.parent().offset().top;
                            var oLeft = oTr.parent().find('p').width() - oTr.parent().width();
                            if(oHp > oTop){
                                oTr.parent().find('p').css({'top':oTr.parent().height() + 25 + 'px','left':-oLeft + 'px'})
                            }else{
                                oTr.parent().find('p').css({'top': -oHp+'px','left':-oLeft + 'px'})
                            }
                            oTr.on('mouseover',function(){
                                if($(this).parent().find('p').css('display') == 'none'){
                                    $(this).parent().find('p').show()
                                }
                            });
                            oTr.parents('td').on('mouseout',function(){
                                $(this).find('p').hide()
                            })
                        }
                        parent.parents('.tables').removeAttr('style');
                    }else{
                        str = "<tr><td>"+responsed[item][j].result+"</td><td><div class='time'><p>"+timestamps+"</p><p>"+addResult+"</p></div></td><td>"+responsed[item][j].abnormal_type+"</td><td>" + responsed[item][j].rule_category + "</td><td><div class='txt'>" + detailCont + "</div></td><td>" + responsed[item][j].facility + "</td></tr>";
                        parent.append(str);
                        num = Number($('.wireless').find('.abnomal').eq(0).prev('.title').find('p em').text());
                        $('.wireless').find('.abnomal').eq(0).prev('.title').find('p').html('异常<em>'+(num+1)+'</em>');
                        parent.parents('.tables').show();
                        var oTr = parent.find('tr').eq(parent.find('tr').length-1).find('div.txt');
                        var LH = parseFloat(oTr.css('line-height'));
                        var HT = parseFloat(oTr.css('height'));
                        if(HT > 2.5*LH){
                            oTr.addClass('txt active');
                            oTr.css('overflow','hidden');
                            oTr.parent().append('<p class="alt">'+detailCont+'</p>');
                            var oHp = oTr.parent().find('p').height();
                            var oTop = oTr.parent().offset().top;
                            var oLeft = oTr.parent().find('p').width() - oTr.parent().width();
                            if(oHp > oTop){
                                oTr.parent().find('p').css({'top':oTr.parent().height() + 25 + 'px','left':-oLeft + 'px'})
                            }else{
                                oTr.parent().find('p').css({'top': -oHp+'px','left':-oLeft + 'px'})
                            }
                            oTr.on('mouseover',function(){
                                if($(this).parent().find('p').css('display') == 'none'){
                                    $(this).parent().find('p').show()
                                }
                            });
                            oTr.parents('td').on('mouseout',function(){
                                $(this).find('p').hide()
                            })
                        }
                        parent.parents('.tables').removeAttr('style');
                    }
                }
            }else if(responsed[item][j].abnormal_type.indexOf('网优') != -1){
                var num,parent,elem,fTime,eTime,rowspan;
                if (confirmTime1 == "上午") {
                    elem = $('.wireless').find('.abnomal').eq(1).find('.tables-one tbody tr');
                    parent = $('.wireless').find('.abnomal').eq(1).find('.tables-one tbody');
                }else if (confirmTime1 == "下午") {
                    elem = $('.wireless').find('.abnomal').eq(1).find('.tables-two tbody tr');
                    parent = $('.wireless').find('.abnomal').eq(1).find('.tables-two tbody');
                }else if (confirmTime1 == "晚间") {
                    elem = $('.wireless').find('.abnomal').eq(1).find('.tables-three tbody tr');
                    parent = $('.wireless').find('.abnomal').eq(1).find('.tables-three tbody');
                }
                if(elem.length == 0){
                    str = "<tr><td>"+responsed[item][j].result+"</td><td><div class='time'><p>"+timestamps+"</p><p>"+addResult+"</p></div></td><td>"+responsed[item][j].abnormal_type+"</td><td>" + responsed[item][j].rule_category + "</td><td><div class='txt'>" + detailCont + "</div></td><td>" + responsed[item][j].facility + "</td></tr>";
                    parent.append(str);
                    num = Number($('.wireless').find('.abnomal').eq(1).prev('.title').find('p em').text());
                    $('.wireless').find('.abnomal').eq(1).prev('.title').find('p').html('异常<em>'+(num+1)+'</em>');
                    parent.parents('.tables').show();
                    var oTr = parent.find('tr').eq(parent.find('tr').length-1).find('div.txt');
                    var LH = parseFloat(oTr.css('line-height'));
                    var HT = parseFloat(oTr.css('height'));
                    if(HT > 2.5*LH){
                        oTr.addClass('txt active');
                        oTr.css('overflow','hidden');
                        oTr.parent().append('<p class="alt">'+detailCont+'</p>');
                        var oHp = oTr.parent().find('p').height();
                        var oTop = oTr.parent().offset().top;
                        var oLeft = oTr.parent().find('p').width() - oTr.parent().width();
                        if(oHp > oTop){
                            oTr.parent().find('p').css({'top':oTr.parent().height() + 25 + 'px','left':-oLeft + 'px'})
                        }else{
                            oTr.parent().find('p').css({'top': -oHp+'px','left':-oLeft + 'px'})
                        }
                        oTr.on('mouseover',function(){
                            if($(this).parent().find('p').css('display') == 'none'){
                                $(this).parent().find('p').show()
                            }
                        });
                        oTr.parents('td').on('mouseout',function(){
                            $(this).find('p').hide()
                        })
                    }
                    parent.parents('.tables').removeAttr('style');
                }else{
                    var rowBool = false;
                    var rowI = 0;
                    for(var i = 0;i<elem.length;i++){
                        fTime = elem.eq(i).find('td').eq(1).find('p:first-child').text();
                        eTime = elem.eq(i).find('td').eq(1).find('p:last-child').text();
                        if(fTime == timestamps && eTime == addResult){
                            rowBool = true;
                            rowI = i;
                            break;
                        }
                    }
                    if(rowBool){
                        rowspan = Number(elem.eq(rowI).find('td').eq(1).attr('rowspan'));
                        if(Boolean(rowspan)){
                            elem.eq(rowI).find('td').eq(0).attr('rowspan',rowspan+1);
                            elem.eq(rowI).find('td').eq(1).attr('rowspan',rowspan+1);
                            str = "<tr><td>"+responsed[item][j].abnormal_type+"</td><td>" + responsed[item][j].rule_category + "</td><td><div class='txt'>" + detailCont + "</div></td><td>" + responsed[item][j].facility + "</td></tr>";
                            elem.eq(rowI).after(str);
                        }else{
                            elem.eq(rowI).find('td').eq(0).attr('rowspan','2');
                            elem.eq(rowI).find('td').eq(1).attr('rowspan','2');
                            str = "<tr><td>"+responsed[item][j].abnormal_type+"</td><td>" + responsed[item][j].rule_category + "</td><td><div class='txt'>" + detailCont + "</div></td><td>" + responsed[item][j].facility + "</td></tr>";
                            elem.eq(rowI).after(str);
                        }
                        parent.parents('.tables').show();
                        var oTr = parent.find('tr').eq(rowI+1).find('div.txt');
                        var LH = parseFloat(oTr.css('line-height'));
                        var HT = parseFloat(oTr.css('height'));
                        if(HT > 2.5*LH){
                            oTr.addClass('txt active');
                            oTr.css('overflow','hidden');
                            oTr.parent().append('<p class="alt">'+detailCont+'</p>');
                            var oHp = oTr.parent().find('p').height();
                            var oTop = oTr.parent().offset().top;
                            var oLeft = oTr.parent().find('p').width() - oTr.parent().width();
                            if(oHp > oTop){
                                oTr.parent().find('p').css({'top':oTr.parent().height() + 25 + 'px','left':-oLeft + 'px'})
                            }else{
                                oTr.parent().find('p').css({'top': -oHp+'px','left':-oLeft + 'px'})
                            }
                            oTr.on('mouseover',function(){
                                if($(this).parent().find('p').css('display') == 'none'){
                                    $(this).parent().find('p').show()
                                }
                            });
                            oTr.parents('td').on('mouseout',function(){
                                $(this).find('p').hide()
                            })
                        }
                        parent.parents('.tables').removeAttr('style');
                    }else{
                        str = "<tr><td>"+responsed[item][j].result+"</td><td><div class='time'><p>"+timestamps+"</p><p>"+addResult+"</p></div></td><td>"+responsed[item][j].abnormal_type+"</td><td>" + responsed[item][j].rule_category + "</td><td><div class='txt'>" + detailCont + "</div></td><td>" + responsed[item][j].facility + "</td></tr>";
                        parent.append(str);
                        num = Number($('.wireless').find('.abnomal').eq(1).prev('.title').find('p em').text());
                        $('.wireless').find('.abnomal').eq(1).prev('.title').find('p').html('异常<em>'+(num+1)+'</em>');
                        parent.parents('.tables').show();
                        var oTr = parent.find('tr').eq(parent.find('tr').length-1).find('div.txt');
                        var LH = parseFloat(oTr.css('line-height'));
                        var HT = parseFloat(oTr.css('height'));
                        if(HT > 2.5*LH){
                            oTr.addClass('txt active');
                            oTr.css('overflow','hidden');
                            oTr.parent().append('<p class="alt">'+detailCont+'</p>');
                            var oHp = oTr.parent().find('p').height();
                            var oTop = oTr.parent().offset().top;
                            var oLeft = oTr.parent().find('p').width() - oTr.parent().width();
                            if(oHp > oTop){
                                oTr.parent().find('p').css({'top':oTr.parent().height() + 25 + 'px','left':-oLeft + 'px'})
                            }else{
                                oTr.parent().find('p').css({'top': -oHp+'px','left':-oLeft + 'px'})
                            }
                            oTr.on('mouseover',function(){
                                if($(this).parent().find('p').css('display') == 'none'){
                                    $(this).parent().find('p').show()
                                }
                            });
                            oTr.parents('td').on('mouseout',function(){
                                $(this).find('p').hide()
                            })
                        }
                        parent.parents('.tables').removeAttr('style');
                    }
                }
            }else if(responsed[item][j].abnormal_type.indexOf('MR') != -1){
                var num,parent,elem,fTime,eTime,rowspan;
                if (confirmTime1 == "上午") {
                    elem = $('.wireless').find('.abnomal').eq(2).find('.tables-one tbody tr');
                    parent = $('.wireless').find('.abnomal').eq(2).find('.tables-one tbody');
                }else if (confirmTime1 == "下午") {
                    elem = $('.wireless').find('.abnomal').eq(2).find('.tables-two tbody tr');
                    parent = $('.wireless').find('.abnomal').eq(2).find('.tables-two tbody');
                }else if (confirmTime1 == "晚间") {
                    elem = $('.wireless').find('.abnomal').eq(2).find('.tables-three tbody tr');
                    parent = $('.wireless').find('.abnomal').eq(2).find('.tables-three tbody');
                }
                if(elem.length == 0){
                    str = "<tr><td>"+responsed[item][j].result+"</td><td><div class='time'><p>"+timestamps+"</p><p>"+addResult+"</p></div></td><td>"+responsed[item][j].abnormal_type+"</td><td>" + responsed[item][j].rule_category + "</td><td><div class='txt'>" + detailCont + "</div></td><td>" + responsed[item][j].facility + "</td></tr>";
                    num = Number($('.wireless').find('.abnomal').eq(2).prev('.title').find('p em').text());
                    $('.wireless').find('.abnomal').eq(2).prev('.title').find('p').html('异常<em>'+(num+1)+'</em>');
                    parent.append(str);
                    parent.parents('.tables').show();
                    var oTr = parent.find('tr').eq(parent.find('tr').length-1).find('div.txt');
                    var LH = parseFloat(oTr.css('line-height'));
                    var HT = parseFloat(oTr.css('height'));
                    if(HT > 2.5*LH){
                        oTr.addClass('txt active');
                        oTr.css('overflow','hidden');
                        oTr.parent().append('<p class="alt">'+detailCont+'</p>');
                        var oHp = oTr.parent().find('p').height();
                        var oTop = oTr.parent().offset().top;
                        var oLeft = oTr.parent().find('p').width() - oTr.parent().width();
                        if(oHp > oTop){
                            oTr.parent().find('p').css({'top':oTr.parent().height() + 25 + 'px','left':-oLeft + 'px'})
                        }else{
                            oTr.parent().find('p').css({'top': -oHp+'px','left':-oLeft + 'px'})
                        }
                        oTr.on('mouseover',function(){
                            if($(this).parent().find('p').css('display') == 'none'){
                                $(this).parent().find('p').show()
                            }
                        });
                        oTr.parents('td').on('mouseout',function(){
                            $(this).find('p').hide()
                        })
                    }
                    parent.parents('.tables').removeAttr('style');
                }else{
                    var rowBool = false;
                    var rowI = 0;
                    for(var i = 0;i<elem.length;i++){
                        fTime = elem.eq(i).find('td').eq(1).find('p:first-child').text();
                        eTime = elem.eq(i).find('td').eq(1).find('p:last-child').text();
                        if(fTime == timestamps && eTime == addResult){
                            rowBool = true;
                            rowI = i;
                            break;
                        }
                    }
                    if(rowBool){
                        rowspan = Number(elem.eq(rowI).find('td').eq(1).attr('rowspan'));
                        if(Boolean(rowspan)){
                            elem.eq(rowI).find('td').eq(0).attr('rowspan',rowspan+1);
                            elem.eq(rowI).find('td').eq(1).attr('rowspan',rowspan+1);
                            str = "<tr><td>"+responsed[item][j].abnormal_type+"</td><td>" + responsed[item][j].rule_category + "</td><td><div class='txt'>" + detailCont + "</div></td><td>" + responsed[item][j].facility + "</td></tr>";
                            elem.eq(rowI).after(str);
                        }else{
                            elem.eq(rowI).find('td').eq(0).attr('rowspan','2');
                            elem.eq(rowI).find('td').eq(1).attr('rowspan','2');
                            str = "<tr><td>"+responsed[item][j].abnormal_type+"</td><td>" + responsed[item][j].rule_category + "</td><td><div class='txt'>" + detailCont + "</div></td><td>" + responsed[item][j].facility + "</td></tr>";
                            elem.eq(rowI).after(str);
                        }
                        parent.parents('.tables').show();
                        var oTr = parent.find('tr').eq(rowI+1).find('div.txt');
                        var LH = parseFloat(oTr.css('line-height'));
                        var HT = parseFloat(oTr.css('height'));
                        if(HT > 2.5*LH){
                            oTr.addClass('txt active');
                            oTr.css('overflow','hidden');
                            oTr.parent().append('<p class="alt">'+detailCont+'</p>');
                            var oHp = oTr.parent().find('p').height();
                            var oTop = oTr.parent().offset().top;
                            var oLeft = oTr.parent().find('p').width() - oTr.parent().width();
                            if(oHp > oTop){
                                oTr.parent().find('p').css({'top':oTr.parent().height() + 25 + 'px','left':-oLeft + 'px'})
                            }else{
                                oTr.parent().find('p').css({'top': -oHp+'px','left':-oLeft + 'px'})
                            }
                            oTr.on('mouseover',function(){
                                if($(this).parent().find('p').css('display') == 'none'){
                                    $(this).parent().find('p').show()
                                }
                            });
                            oTr.parents('td').on('mouseout',function(){
                                $(this).find('p').hide()
                            })
                        }
                        parent.parents('.tables').removeAttr('style');
                    }else{
                        str = "<tr><td>"+responsed[item][j].result+"</td><td><div class='time'><p>"+timestamps+"</p><p>"+addResult+"</p></div></td><td>"+responsed[item][j].abnormal_type+"</td><td>" + responsed[item][j].rule_category + "</td><td><div class='txt'>" + detailCont + "</div></td><td>" + responsed[item][j].facility + "</td></tr>";
                        parent.append(str);
                        num = Number($('.wireless').find('.abnomal').eq(2).prev('.title').find('p em').text());
                        $('.wireless').find('.abnomal').eq(2).prev('.title').find('p').html('异常<em>'+(num+1)+'</em>');
                        parent.parents('.tables').show();
                        var oTr = parent.find('tr').eq(parent.find('tr').length-1).find('div.txt');
                        var LH = parseFloat(oTr.css('line-height'));
                        var HT = parseFloat(oTr.css('height'));
                        if(HT > 2.5*LH){
                            oTr.addClass('txt active');
                            oTr.css('overflow','hidden');
                            oTr.parent().append('<p class="alt">'+detailCont+'</p>');
                            var oHp = oTr.parent().find('p').height();
                            var oTop = oTr.parent().offset().top;
                            var oLeft = oTr.parent().find('p').width() - oTr.parent().width();
                            if(oHp > oTop){
                                oTr.parent().find('p').css({'top':oTr.parent().height() + 25 + 'px','left':-oLeft + 'px'})
                            }else{
                                oTr.parent().find('p').css({'top': -oHp+'px','left':-oLeft + 'px'})
                            }
                            oTr.on('mouseover',function(){
                                if($(this).parent().find('p').css('display') == 'none'){
                                    $(this).parent().find('p').show()
                                }
                            });
                            oTr.parents('td').on('mouseout',function(){
                                $(this).find('p').hide()
                            })
                        }
                        parent.parents('.tables').removeAttr('style');
                    }
                }
            }
        }
    }

    $('.wireless').find('.abnomal').each(function(){
        $(this).find('.userTab span').each(function(){
            if($(this).get(0).className != 'disabled'){
                $(this).addClass('active');
                $(this).parents('.cont').find('.tables').eq($(this).index()).addClass('table-active');
                return false;
            }
        })
    });
}
//无线异常定界-MR数据表格展示-接口请求渲染页面
function wirelessCharts(name, xName){
    var respone = {"threshold":0,"data":[{"x":1558870200000,"y":0,"data":[{"xname":"高层外打朗诗玲珑屿11栋五期LF(W)-4","type":"user","key":"9318554","value":"0.0"},{"xname":"高层外打朗诗玲珑屿11栋五期LF(W)-4","type":"cell","key":"9318554","value":"81.86"}]},{"x":1558871100000,"y":"-","data":{}},{"x":1558874700000,"y":100,"data":[{"xname":"警官学院本部三期LF-3","type":"user","key":"230983939","value":"100.0"},{"xname":"警官学院本部三期LF-3","type":"cell","key":"230983939","value":"65.6"}]},{"x":1558875600000,"y":100,"data":[{"xname":"警官学院本部三期LD-3","type":"user","key":"230983942","value":"100.0"},{"xname":"小行路16号四期LD-1","type":"user","key":"231048196","value":"100.0"},{"xname":"警官学院本部三期LD-3","type":"cell","key":"230983942","value":"72.94"},{"xname":"小行路16号四期LD-1","type":"cell","key":"231048196","value":"100.0"}]},{"x":1558876500000,"y":100,"data":[{"xname":"警官学院本部三期LD-1","type":"user","key":"230983940","value":"100.0"},{"xname":"警官学院本部三期LD-3","type":"user","key":"230983942","value":"100.0"},{"xname":"警官学院本部三期LD-1","type":"cell","key":"230983940","value":"91.05"},{"xname":"警官学院本部三期LD-3","type":"cell","key":"230983942","value":"81.7"}]},{"x":1558877400000,"y":"-","data":{}},{"x":1558878300000,"y":14.2857142857,"data":[{"xname":"安德门四期LD-2","type":"user","key":"231042821","value":"14.28"},{"xname":"安德门四期LD-2","type":"cell","key":"231042821","value":"98.08"}]},{"x":1558879200000,"y":"-","data":{}},{"x":1558912500000,"y":100,"data":[{"xname":"宝鼎路五期LD-2","type":"user","key":"9541786","value":"100.0"},{"xname":"宝鼎路五期LD-2","type":"cell","key":"9541786","value":"87.67"}]},{"x":1558913400000,"y":"-","data":{}},{"x":1558924200000,"y":100,"data":[{"xname":"宝鼎路五期LD-2","type":"user","key":"9541786","value":"100.0"},{"xname":"宝鼎路五期LD-2","type":"cell","key":"9541786","value":"92.98"}]},{"x":1558925100000,"y":"-","data":{}},{"x":1558926900000,"y":100,"data":[{"xname":"宝鼎路五期LD-2","type":"user","key":"9541786","value":"100.0"},{"xname":"宝鼎路五期LD-2","type":"cell","key":"9541786","value":"90.74"}]},{"x":1558927800000,"y":"-","data":{}},{"x":1558934100000,"y":100,"data":[{"xname":"宝鼎路五期LD-2","type":"user","key":"9541786","value":"100.0"},{"xname":"宝鼎路五期LD-2","type":"cell","key":"9541786","value":"86.02"}]},{"x":1558935000000,"y":"-","data":{}},{"x":1558945800000,"y":0,"data":[{"xname":"天云阁五期LD-2","type":"user","key":"230520581","value":"0.0"},{"xname":"天云阁五期LD-2","type":"cell","key":"230520581","value":"70.96"}]}],"code":0};

    $('#wireless').parents('.cont').find('.information').hide();
    if(respone.code != 0){
        $('#wireless').parent().find('.no-chart').show();
        $('#wireless').hide();
        if(window.localStorage){
            localStorage.removeItem('per_echarts');
        }else{
            deleteCookie('per_echarts');
        }
        return false
    };
    $('#wireless').show();
    $('#wireless').parent().find('.no-chart').hide();
    var xDate = [], //折线图 x坐标值
        yDate = [], //折线图 y坐标值
        dottedY = [], //折线图 虚线y坐标值
        zDate = [], //折线图 阈值
        tlp = [], //折线图 点弹窗内容
        minAx = [], //折线图 y坐标轴最大最小值
        dy,
        abnomalNum=0;
    for (var i = 0; i < respone.data.length; i++) {
        var time = new Date(respone.data[i].x);
        var xt = time;

        if(i == 0){
            respone.threshold = (respone.threshold * 100).toFixed(2);
        }
        if(i == 0){
            minAx = [respone.threshold,respone.threshold];
        }

        if(respone.data[i].y != '-'){
            respone.data[i].y = (respone.data[i].y).toFixed(2);
        }
        dy = respone.data[i].y;
        if (dy == '-') {
            var pre,nex;
            if(i == 0){
                pre = 0;
                for(var n=1;(i + n) < respone.data.length;n++){
                    if(respone.data[i + n].y != '-'){
                        nex = Number(respone.data[i + n].y);
                        break;
                    }
                }
            }else if(i == respone.data.length-1){
                for(var m=1;(i - m) >= 0;m++){
                    if(respone.data[i - m].y != '-'){
                        pre = Number(respone.data[i - m].y);
                        break;
                    }
                }
                nex = 0
            }else{
                for(var m=1;(i - m) >= 0;m++){
                    if(respone.data[i - m].y != '-'){
                        pre = Number(respone.data[i - m].y);
                        break;
                    }
                }
                for(var n=1;(i + n) < respone.data.length ;n++){
                    if(respone.data[i + n].y != '-'){
                        nex = Number(respone.data[i + n].y);
                        break;
                    }
                }
            }
            dy = ( pre + nex ) / 2;
        }else{
            if(respone.data[i].y <= respone.threshold){
                abnomalNum++;
            }
        }

        //设置y值最大最小值
        if(respone.data[i].y != '-' && Number(respone.data[i].y) < Number(minAx[0]) ){
            minAx[0] = respone.data[i].y
        }
        if(respone.data[i].y != '-' && Number(respone.data[i].y) > Number(minAx[1])){
            minAx[1] = respone.data[i].y
        }
        xDate.push(xt);
        yDate.push(respone.data[i].y);
        dottedY.push(dy);
        zDate.push(respone.threshold);
        tlp.push(respone.data[i].data)
    }
    if((minAx[1] - respone.threshold) > (respone.threshold - minAx[0])){
        if((minAx[1] - respone.threshold) > (respone.threshold - 0)){
            minAx[0] = 0;
        }else{
            minAx[0] = respone.threshold - (minAx[1] - respone.threshold);
        }
    }else{
        minAx[1] = (respone.threshold - minAx[0]) + Number(respone.threshold);
        minAx[1] = minAx[1].toFixed(2);
    }
    lineChart('wireless', xDate, yDate, dottedY, zDate, xName, tlp, 'red', '#5E9DD6', '百分比/%',minAx);
    if(abnomalNum > 0){
        $('#wireless').parents('.module').find('.title p').text('异常'+abnomalNum)
    };
    if(window.localStorage){
        localStorage.removeItem('per_echarts');
    }else{
        deleteCookie('per_echarts');
    }
}
//性能指标-用户面-接口请求渲染页面
function performance(url, id, name, xName, c1, c2,respone) {
    //标记折线图数据是否请求完成
    if(window.localStorage){
        localStorage.removeItem('per_echarts');
    }else{
        setCookie('per_echarts','1',1);
    }
    $('#'+id).parents('.cont').find('.information').hide();
    if(respone.code != 0){
        $('#'+id).hide();
        $('#'+id).parent().find('.no-chart').show();
        if(window.localStorage){
            localStorage.removeItem('per_echarts');
        }else{
            deleteCookie('per_echarts');
        }
        return false
    };
    $('#'+id).show();
    $('#'+id).parent().find('.no-chart').hide();
    $('#'+id).show();
    var xDate = [], //折线图 x坐标值
        yDate = [], //折线图 y坐标值
        dottedY = [], //折线图 虚线y坐标值
        zDate = [], //折线图 阈值
        tlp = [], //折线图 点弹窗内容
        minAx = [], //折线图 y坐标轴最大最小值
        dy,
        abnomalNum = 0;
    // 折线图 y轴单位
    var unit = {
        'TCP一二次握手时延':'单位/ms',
        'TCP一二次握手成功率':'百分比/%',
        'TCP二三次握手时延':'单位/ms',
        'TCP二三次握手成功率':'百分比/%',
        'TCP重传率':'百分比/%',
        'HTTP响应成功率':'百分比/%',
        'HTTP响应时延':'单位/ms',
        '500KB以上大包下载速率':'单位/Mbps',
        '附着成功率':'百分比/%',
        'TAU成功率':'百分比/%',
        'X2切换成功率':'百分比/%',
        'Service Request 业务请求成功率':'百分比/%'
    };
    for (var i = 0; i < respone.data.length; i++) {
        var time = new Date(respone.data[i].x);
        var xt = time;
        
        if(xName == 'TCP一二次握手成功率' || xName == 'TCP二三次握手成功率' || xName == 'TCP重传率' || xName == 'HTTP响应成功率' || xName == '附着成功率' || xName == 'TAU成功率' || xName == 'X2切换成功率' || xName == 'Service Request 业务请求成功率'){
            if(respone.data[i].y != '-'){
                respone.data[i].y = (respone.data[i].y * 100).toFixed(2);
            }
            if(i == 0){
                respone.threshold = (respone.threshold * 100).toFixed(2);
            }
            dy = respone.data[i].y;
            if (dy == '-') {
                var pre,nex;
                if(i == 0){
                    pre = 0;
                    for(var n=1;(i + n) < respone.data.length;n++){
                        if(respone.data[i + n].y != '-'){
                            nex = Number(respone.data[i + n].y * 100).toFixed(2);
                            break;
                        }
                    }
                }else if(i == respone.data.length-1){
                    for(var m=1;(i - m) >= 0;m++){
                        if(respone.data[i - m].y != '-'){
                            pre = Number(respone.data[i - m].y);
                            break;
                        }
                    }
                    nex = 0
                }else{
                    for(var m=1;(i - m) >= 0;m++){
                        if(respone.data[i - m].y != '-'){
                            pre = Number(respone.data[i - m].y);
                            break;
                        }
                    }
                    for(var n=1;(i + n) < respone.data.length ;n++){
                        if(respone.data[i + n].y != '-'){
                            nex = Number(respone.data[i + n].y * 100).toFixed(2);
                            break;
                        }
                    }
                }
                dy = ( pre + Number(nex) ) / 2;
            }else{
                if(respone.data[i].y <= respone.threshold){
                    abnomalNum++;
                }
            }
        }else{
            if(respone.data[i].y != '-'){
                respone.data[i].y = (respone.data[i].y).toFixed(2);
            }
            if(i == 0){
                respone.threshold = Number(respone.threshold).toFixed(2);
            }
            dy = respone.data[i].y;
            if (dy == '-') {
                var pre,nex;
                if(i == 0){
                    pre = 0;
                    for(var n=1;(i + n) < respone.data.length;n++){
                        if(respone.data[i + n].y != '-'){
                            nex = Number(respone.data[i + n].y);
                            break;
                        }
                    }
                }else if(i == respone.data.length-1){
                    for(var m=1;(i - m) >= 0;m++){
                        if(respone.data[i - m].y != '-'){
                            pre = Number(respone.data[i - m].y);
                            break;
                        }
                    }
                    nex = 0
                }else{
                    for(var m=1;(i - m) >= 0;m++){
                        if(respone.data[i - m].y != '-'){
                            pre = Number(respone.data[i - m].y);
                            break;
                        }
                    }
                    for(var n=1;(i + n) < respone.data.length ;n++){
                        if(respone.data[i + n].y != '-'){
                            nex = Number(respone.data[i + n].y);
                            break;
                        }
                    }
                }
                dy = ( pre + nex ) / 2;
            }else{
                if(respone.data[i].y >= respone.threshold){
                    abnomalNum++;
                }
            }
        }
        if(i == 0){
            minAx = [respone.threshold,respone.threshold];
        }
        //设置y值最大最小值
        if(respone.data[i].y != '-' && Number(respone.data[i].y) < Number(minAx[0]) ){
            minAx[0] = respone.data[i].y
        }
        if(respone.data[i].y != '-' && Number(respone.data[i].y) > Number(minAx[1])){
            minAx[1] = respone.data[i].y
        }
        xDate.push(xt);
        yDate.push(respone.data[i].y);
        dottedY.push(dy);
        zDate.push(respone.threshold);
        tlp.push(respone.data[i].data)
    }
    if((minAx[1] - respone.threshold) > (respone.threshold - minAx[0])){
        if((minAx[1] - respone.threshold) > (respone.threshold - 0)){
            minAx[0] = 0;
        }else{
            minAx[0] = respone.threshold - (minAx[1] - respone.threshold);
        }
    }else{
        minAx[1] = (respone.threshold - minAx[0]) + Number(respone.threshold);
        minAx[1] = minAx[1].toFixed(2);
    }
    lineChart(id, xDate, yDate, dottedY, zDate, xName, tlp, c1, c2, unit[xName],minAx);
    if(abnomalNum > 0){
        $('#'+id).parents('.module').find('.title p').text('异常'+abnomalNum)
    };
    if(window.localStorage){
        localStorage.removeItem('per_echarts');
    }else{
        deleteCookie('per_echarts');
    }
};
function performUser(time,id, title, xName, type) {  //折线图-点弹层数据跳转
    if(window.localStorage){
        localStorage.setItem('fiel_number',window.fiel_number);
        //存储的折线点的time
        localStorage.setItem('basis_two_time', time);
        //存储的折线点的id
        localStorage.setItem('basis_two_id', id);
        //存储的折线点的小区名
        localStorage.setItem('basis_two_text', title);
        //存储的折线图的tab名称
        localStorage.setItem('basis_two_name', xName);
        //存储的折线点的type
        localStorage.setItem('basis_two_type', type);
        //存储的定界依据页面tab索引值
        localStorage.setItem('basis', hrefIndex());
        //存储的折线图点的索引
        localStorage.setItem('basis_xAxisIdx',window.dataIndex);
    }else{
        setCookie('basis_two_id', id ,1);
        setCookie('basis_two_time', time ,1);
        setCookie('basis_two_text', title ,1);
        setCookie('basis_two_name', xName ,1);
        setCookie('basis_two_type', type ,1);
        setCookie('basis', hrefIndex() ,1);
        setCookie('basis_xAxisIdx',window.dataIndex ,1);
    }
    window.location.href = 'basis_village.html'
};
//加载折线图-折线图charts的渲染
function lineChart(id, xA, yA, dY, thd, xName, tlp, eColor, sColor, unitY ,ymx) { 
    var lte_val,xA1=[],threshold;  //折线图 阈值上下点的颜色区别
    threshold = thd[0];
    if(threshold.split('.')[1] == '00'){
        threshold = threshold.split('.')[0]
    };
    if(unitY == '百分比/%'){
        threshold = threshold + '%'
    }else{
        threshold = threshold + 'ms'
    };
    var xIndex;
    if (eColor == 'red') {
        lte_val = [{
            gte: 0,
            lt: thd[0],
            color: eColor
        }];
    } else {
        lte_val = [{
            gte: 0,
            lte: thd[0],
            color: eColor
        }]
    };
    var s_first,e_end;
    var s_val = null;
    var e_val = null;
    var miny = ymx[0];  // y轴最小值
    var maxy = ymx[1];  // y轴最大值
    dz_idx = Number(localStorage.getItem('basis_xAxisIdx'));
    if(dz_idx != undefined){
        dz_idx = dz_idx - 10 < 0 ? 0 : dz_idx - 10;
    }else{
        dz_idx = 0
    }
    s_val = dateFormat(xA[s_first].getHours()) + ':' + dateFormat(xA[s_first].getMinutes())
    for(var i=0;i<xA.length;i++){
        xA1.push(dateFormat(xA[i].getHours()) + ':' + dateFormat(xA[i].getMinutes()));
        if(i == 19 && dz_idx == 0){
            e_val = dateFormat(xA[i].getHours()) + ':' + dateFormat(xA[i].getMinutes())
        }else if(i == (dz_idx + 19) && dz_idx > 0){}
    }
    // 基于准备好的dom，初始化echarts实例
    if(id == 'userFace'){
        window.myChart1 = echarts.init(document.getElementById(id));
        window.myChart1.clear();
    }else if(id == 'controlFace'){
        window.myChart2 = echarts.init(document.getElementById(id));
        window.myChart2.clear();
    }else if(id == 'wireless'){
        window.myChart3 = echarts.init(document.getElementById(id));
        window.myChart3.clear();
    }
    // 指定图表的配置项和数据
    var option = {
        grid: {
            show: true,
            bottom: 90,
            left: '10%',
            right: '10%',
            borderWidth:0
        },
        legend: {
            type: 'plain',
            show: true,
            top: 10,
            right:'10%',
            selectedMode: false,
            itemWidth:14,
            itemHeight:14,
            textStyle:{
                color:'rgba(0,0,0,0.45)'
            },
            data: [{
                name: '异常',
                icon:'image://static/images/echarts_i1.png'
            },{
                name: '阈值:'+parseInt(thd[0]),
                icon:'image://static/images/echarts_i2.png'
            }, {
                name: xName,
                icon:'image://static/images/echarts_i3.png'
            }],
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xA1,
            axisLine: {     //x轴坐标轴设置
                lineStyle: {
                    color: '#DEE1E3',
                }
            },
            axisTick: {    //x坐标轴刻度设置
                length: 3,
                lineStyle: {
                    color: '#DEE1E3',
                }
            },
            axisLabel: {    //x坐标轴刻度值设置
                color: 'rgba(0,0,0,0.65)',
                fontSize: 12,
                //rotate: -45
            },
        },
        yAxis: {
            type: 'value',
            min:miny,
            max:maxy,
            name: unitY,
            nameGap :25,
            nameTextStyle: {
                color: 'rgba(0,0,0,0.65)',
                padding:[0, 25, 0, 0]
            },
            axisLine: {
                show:false,
            },
            axisTick: {
                show:false
            },
            axisLabel: {
                color: 'rgba(0,0,0,0.65)',
                fontSize: 12,
                margin:15
            },
            splitLine: {
                lineStyle:{
                    type:'dashed',
                    color:'#DEE1E3'
                }
            },
        },
        dataZoom: [{
            type: 'inside',
            startValue:s_val, //折线图开始数值位置
            endValue:e_val, //折线图结束数值位置
            minValueSpan: 2,
            zoomOnMouseWheel:false
        },{
            type: 'slider',
            backgroundColor:'rgba(243,244,245,0.8)',
            dataBackground:{
                lineStyle:{
                    opacity:0
                },
                areaStyle:{
                    color:'rgba(0,0,0,0.1)'
                }
            },
            fillerColor:'rgba(36,146,252,0.1489)',
            borderColor:'transparent',
            handleStyle:{
                color:'#2492FC',
                borderWidth:2
            },
            showDetail:false,
            xAxisIndex: [0],
            filterMode: 'filter',
        }],
        tooltip: {  //提示框设置
            trigger: 'axis',
            triggerOn: 'click',
            backgroundColor: '#fff',
            axisPointer: {
                lineStyle: {
                    color: '#FF5975',
                    width:2,
                    opacity:0.65
                }
            },
            position: function(point, params, dom, rect, size) {
                var number = size.viewSize[0] - point[0] - size.contentSize[0];
                if (number > 80) {
                    return [point[0] + 20, point[1] - size.contentSize[1] / 2];
                } else {
                    return [point[0] - size.contentSize[0] - 20, point[1] - size.contentSize[1] / 2];
                }
            },
            formatter: function(params, ticket, callback) {
                var htmlStr = '';
                var str = '';
                //console.log(params[1].data);
                var index = params[0].dataIndex;
                window.dataIndex = index;
                var a_value = params[0].data; //y轴值 
                var excmal,x_txt = '';
                var num1 = 0,num2 = 0,num3 = 0;
                var routeA = 0,routeB = 0,sgwA = 0,sgwB = 0,mmeA = 0,mmeB = 0,routSgMe = '';
                if(a_value != '-'){
                    $('#'+id).parents('.cont').find('.information').show();
                    $('#'+id).parents('.cont').find('.information table').remove();
                    var company = unitY.split('/')[1];
                    var infStr = '';
                    var thisTime = xA[index].getFullYear()+'-'+dateFormat((xA[index].getMonth() + 1)) + '-' + dateFormat(xA[index].getDate()) + ' ' + dateFormat(xA[index].getHours()) + ':' + dateFormat(xA[index].getMinutes());//xA[index]
                   // htmlStr = '<div style="padding:5px;"><p style="color:#5E5E5E;font-size:14px;border-bottom:1px solid #c9c9c9">'+xName+'：'+value+company+'</p><span style="font-size:12px;color:#999">'+xA1[index]+'</span></div>';
                    
                    $('#'+id).parents('.cont').find('.information .coordinate span').eq(1).text(thisTime);
                    for (var item = 0; item < tlp[index].length;item++) {
                        if(unitY == '百分比/%'){
                            if( id != 'wireless'){
                                excmal = (tlp[index][item].value * 100).toFixed(2) + '%';
                            }else{
                                excmal = Number(tlp[index][item].value).toFixed(2) + '%';
                            }
                        }else{
                            excmal = tlp[index][item].value.toFixed(2);
                        };
                        tlp[index][item].xname = String(tlp[index][item].xname).replace(/\s+/g, "");
                        if (tlp[index][item].type == 'user' || tlp[index][item].type == 'cell') {

                            var spn = '',bl = true,userCell,tdIdx;
                            if (num1 == 0) {
                                num1++;
                                str = '<table class="userCell"><thead><tr><th>小区名称</th><th>用户小区指标</th><th>小区整体指标</th></tr></thead><tbody></tbody></table>';
                                $('#'+id).parents('.cont').find('.information').append(str);
                            }
                            if(tlp[index][item].type == 'user'){
                                if((id == 'wireless' && xName == '弱覆盖')){
                                    spn = '<span class="goIn" onclick="performUser(\'' + thisTime + '\',\'' + tlp[index][item].key + '\',\'' + tlp[index][item].xname + '\',\'' + xName + '\',\'' + tlp[index][item].type + '\')"></span>';
                                }
                                userCell = $('#'+id).parents('.cont').find('.information table.userCell tbody tr');
                                if(userCell.length > 0){
                                    for(var i=0;i<userCell.length;i++){
                                        var city = userCell.eq(i).find('td').eq(0).text();
                                        if(city == tlp[index][item].xname){
                                            bl = false;
                                            tdIdx = i;
                                            break;
                                        }
                                    }
                                }
                                if(bl){
                                    str = '<tr><td>'+tlp[index][item].xname+'</td><td>' + excmal + '</td><td><em></em>'+spn+'</td></tr>';
                                    $('#'+id).parents('.cont').find('.information table.userCell tbody').append(str);
                                }else{
                                    userCell.eq(tdIdx).find('td').eq(1).text(excmal);
                                }
                            }
                            if(tlp[index][item].type == 'cell'){
                                if(id != 'wireless'){
                                    spn = '<span class="goIn" onclick="performUser(\'' + thisTime + '\',\'' + tlp[index][item].key + '\',\'' + tlp[index][item].xname + '\',\'' + xName + '\',\'' + tlp[index][item].type + '\')"></span>';
                                }
                                userCell = $('#'+id).parents('.cont').find('.information table.userCell tbody tr');
                                if(userCell.length > 0){
                                    for(var i=0;i<userCell.length;i++){
                                        var city = userCell.eq(i).find('td').eq(0).text();
                                        if(city == tlp[index][item].xname){
                                            bl = false;
                                            tdIdx = i;
                                            break;
                                        }
                                    }
                                }
                                routeA++;
                                var yic = '';
                                if(unitY == '百分比/%'){
                                    if(parseFloat(excmal) < thd[0]){
                                        routeB++;
                                        yic = '#ff5975'
                                    }
                                }else{
                                    if(parseFloat(excmal) > thd[0]){
                                        routeB++;
                                        yic = '#ff5975'
                                    }
                                }
                                if(bl){
                                    str = '<tr><td>'+tlp[index][item].xname+'</td><td></td><td><em style="color:'+yic+'">' + excmal + '</em>'+spn+'</td></tr>';
                                    $('#'+id).parents('.cont').find('.information table.userCell tbody').append(str);
                                }else{
                                    userCell.eq(tdIdx).find('td').eq(2).find('em').text(excmal);
                                    userCell.eq(tdIdx).find('td').eq(2).find('em').css('color',yic);
                                    var lng = userCell.eq(tdIdx).find('td').eq(2).find('span').length;
                                    if(id != 'wireless' && lng <= 0){
                                        userCell.eq(tdIdx).find('td').eq(2).append(spn);
                                    }
                                };
                            }
                        }else if(tlp[index][item].type == 'sgw'){
                            if (num2 == 0) {
                                num2++;
                                str = '<table class="sgw"><thead><tr><th>SGW-IP</th><th>SGW-IP整体指标</th></tr></thead><tbody></tbody></table>';
                                $('#'+id).parents('.cont').find('.information').append(str);
                            }
                            if(id == 'wireless' && xName != '弱覆盖'){
                                str = '<tr><td>'+tlp[index][item].xname+'</td><td>' + excmal + '</td></tr>';
                            }else{
                                str = '<tr><td>'+tlp[index][item].xname+'</td><td>' + excmal + '<span class="goIn" onclick="performUser(\'' + thisTime + '\',\'' + tlp[index][item].key + '\',\'' + tlp[index][item].xname + '\',\'' + xName + '\',\'' + tlp[index][item].type + '\')"></span></td></tr>';
                            }
                            sgwA++;
                            if(unitY == '百分比/%'){
                                if(parseFloat(excmal) < thd[0]){
                                    sgwB++;
                                }
                            }else{
                                if(parseFloat(excmal) > thd[0]){
                                    sgwB++;
                                }
                            }
                            $('#'+id).parents('.cont').find('.information table.sgw tbody').append(str);
                        }else if(tlp[index][item].type == 'mme'){
                            if (num3 == 0) {
                                num3++;
                                str = '<table class="mme"><thead><tr><th>MME-IP</th><th>MME-IP整体指标</th></tr></thead><tbody></tbody></table>';
                                $('#'+id).parents('.cont').find('.information').append(str);
                            }
                            if(id == 'wireless' && xName != '弱覆盖'){
                                str = '<tr><td>'+tlp[index][item].xname+'</td><td>' + excmal + '</td></tr>';
                            }else{
                                str = '<tr><td>'+tlp[index][item].xname+'</td><td>' + excmal + '<span class="goIn" onclick="performUser(\'' + thisTime + '\',\'' + tlp[index][item].key + '\',\'' + tlp[index][item].xname + '\',\'' + xName + '\',\'' + tlp[index][item].type + '\')"></span></td></tr>';
                            }
                            mmeA++;
                            if(unitY == '百分比/%'){
                                if(parseFloat(excmal) < thd[0]){
                                    mmeB++;
                                }
                            }else{
                                if(parseFloat(excmal) > thd[0]){
                                    mmeB++;
                                }
                            }
                            $('#'+id).parents('.cont').find('.information table.mme tbody').append(str);
                        }
                    };
                    if(routeA > 0){
                        routSgMe = '<p style="font-size:12px;color:rgba(0,0,0,.65)">异常/途经小区：<em style="color:#FF5975">'+routeB+'</em>/'+routeA+'</p>'
                    };
                    if(sgwA > 0){
                        routSgMe += '<p style="font-size:12px;color:rgba(0,0,0,.65)">异常/SGW-IP：<em style="color:#FF5975">'+sgwB+'</em>/'+sgwA+'</p>'
                    };
                    if(mmeA > 0){
                        routSgMe += '<p style="font-size:12px;color:rgba(0,0,0,.65)">异常/MME-IP：<em style="color:#FF5975">'+mmeB+'</em>/'+mmeA+'</p>'
                    };
                    x_txt = dateFormat(xA[index].getFullYear()) + '-' + dateFormat((xA[index].getMonth() + 1)) + '-' + dateFormat(xA[index].getDate()) + ' ' + dateFormat(xA[index].getHours()) + ':' + dateFormat(xA[index].getMinutes());
                    if(id != 'wireless'){
                        $('#'+id).parents('.cont').find('.information .coordinate span').eq(0).text(xName+'：'+a_value+company);
                        htmlStr = '<div style="padding:20px;box-shadow:0px 6px 32px -5px rgba(1,54,105,0.23);"><p style="color:rgba(0,0,0,.85);font-size:14px;margin-bottom:16px;font-weight:bold">'+xName+'：'+a_value+company+'</p>'+routSgMe+'<span style="font-size:12px;color:rgba(0,0,0,.45)">'+x_txt+'</span></div>';
                    }else{
                        $('#'+id).parents('.cont').find('.information .coordinate span').eq(0).text('用户整体指标：'+a_value+company);
                        htmlStr = '<div style="padding:20px;box-shadow:0px 6px 32px -5px rgba(1,54,105,0.23);"><p style="color:rgba(0,0,0,.85);font-size:14px;margin-bottom:16px;font-weight:bold">用户整体指标：'+a_value+company+'</p>'+routSgMe+'<span style="font-size:12px;color:rgba(0,0,0,.45)">'+x_txt+'</span></div>';
                    };
                    $('#'+id).parents('.cont').find('.information').show();
                    return htmlStr;
                }else{
                    $('#'+id).parents('.cont').find('.information').hide();
                }
            }
        },
        //范围颜设置色
        visualMap: [{
            show: false,
            dimension: 1,
            pieces: lte_val, //pieces的值由动态数据决定 'red'
            outOfRange: {
                color: sColor //'#5E9DD6'
            }
        }],
        series: [{
            type: 'line',
            name: xName,
            data: yA,
            //showSymbol: false,
            symbolSize:8,
            animation:false,
            itemStyle: {
                borderWidth: 2,
                color: '#5E9DD6'
            },
            lineStyle: {
                type: 'solid',
                color: '#2492FC'
            }
        }, {
            type: 'line',
            name: '阈值:'+parseInt(thd[0]),
            data: thd,
            symbol: 'none',
            animation:false,
            label:{
                show:true,
                position:'left',
                color:'#FF5975',
                fontSize:12,
                padding:[0,10,0,0],
                formatter:function(params){
                    var index = params.dataIndex;
                    if(index == 0){
                        return Number(params.value)
                    }else{
                        return '';
                    }
                }
            },
            lineStyle: {
                width :1,
                type:'dashed',
                color: '#FF5975'
            },
            areaStyle:{
                color:{
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'rgba(255, 89, 117, 0.0995)' // 0% 处的颜色
                    }, {
                        offset: 1, color: 'rgba(255, 89, 117, 0)' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                }
            }
        }, {
            type: 'line',
            name: '异常',
            data: dY,
            symbol: 'none',
            animation:false,
            lineStyle: {
                width:1,
                color: '#2492FC',
                type: 'dashed' //'dotted'虚线 'solid'实线
            }
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    if(id == 'userFace'){
        window.myChart1.setOption(option);
    }else if(id == 'controlFace'){
        window.myChart2.setOption(option);
    }else if(id == 'wireless'){
        window.myChart3.setOption(option);
    }
    //异常时间段-点击联动折线图
    $('.bDiv').eq(index).find('.abnomal .tables').each(function(){
        $(this).click(function(e){
            var evt = e || window.event;
            var elem = evt.target;
            var oDiv = $(elem).parents('td').find('div.time');
            if(oDiv.length > 0){
                var time = $(elem).parents('td').find('p').eq(0).text().replace(/\-/g,'/');
                datetme = new Date(time);
                clickTime = dateFormat((datetme.getMonth() + 1)) + '-' + dateFormat(datetme.getDate()) + ' ' + dateFormat(datetme.getHours()) + ':' + dateFormat(datetme.getMinutes());
                abnomal = $(elem).parents('tr').find('td').eq(3).text();
                lianjie(abnomal);
            }
        })
    })
    
    var showIdx = '',basisTwoName;
    if(window.localStorage){
        basisTwoName = localStorage.getItem('basis_two_name');
        var bxd = localStorage.getItem('basis_xAxisIdx');
        if(Boolean(bxd)){
            window.xAxisIndex = bxd;
        }
    }else{
        basisTwoName = getCookie('basis_two_name');
        var bxd = getCookie('basis_xAxisIdx');
        if(Boolean(bxd)){
            window.xAxisIndex = bxd;
        }
    }
    if(basisTwoName){
        $('.bDiv').eq(1).find('.userTab2').find('span').each(function(){
            if($(this).text() == basisTwoName){
                showIdx = 0
            }
        })
        $('.bDiv').eq(2).find('.userTab').eq(1).find('span').each(function() {
            if($(this).text() == basisTwoName){
                showIdx = 1
            }
        })
        $('.bDiv').eq(2).find('.userTab').eq(2).find('span').each(function() {
            if($(this).text() == basisTwoName){
                showIdx = 2
            }
        })
    }
    if(!!window.xAxisIndex){
        if(id == 'userFace' && showIdx == 1){
            window.myChart1.dispatchAction({
                type: 'showTip',            //显示提示框，指定数据图形，根据 tooltip 的配置项显示提示框。
                seriesIndex: 1,        // 系列的 index，在 tooltip 的 trigger 为 axis 的时候可选。
                dataIndex: window.xAxisIndex,          // 数据的 index，如果不指定也可以通过 name 属性根据名称指定数据
                //name: string,               // 可选，数据名称，在有 dataIndex 的时候忽略
                // 本次显示 tooltip 的位置。只在本次 action 中生效。
                // 缺省则使用 option 中定义的 tooltip 位置。
                //position: Array.<number>|string|Function,
            });
        }else if(id == 'controlFace' && showIdx == 2){
            window.myChart2.dispatchAction({
                type: 'showTip',            //显示提示框，指定数据图形，根据 tooltip 的配置项显示提示框。
                seriesIndex: 1,        // 系列的 index，在 tooltip 的 trigger 为 axis 的时候可选。
                dataIndex: window.xAxisIndex,          // 数据的 index，如果不指定也可以通过 name 属性根据名称指定数据
                //name: string,               // 可选，数据名称，在有 dataIndex 的时候忽略
                // 本次显示 tooltip 的位置。只在本次 action 中生效。
                // 缺省则使用 option 中定义的 tooltip 位置。
                //position: Array.<number>|string|Function,
            });
        }else if(id == 'wireless' && showIdx == 0){
            window.myChart3.dispatchAction({
                type: 'showTip',            //显示提示框，指定数据图形，根据 tooltip 的配置项显示提示框。
                seriesIndex: 1,        // 系列的 index，在 tooltip 的 trigger 为 axis 的时候可选。
                dataIndex: window.xAxisIndex,          // 数据的 index，如果不指定也可以通过 name 属性根据名称指定数据
                //name: string,               // 可选，数据名称，在有 dataIndex 的时候忽略
                // 本次显示 tooltip 的位置。只在本次 action 中生效。
                // 缺省则使用 option 中定义的 tooltip 位置。
                //position: Array.<number>|string|Function,
            });
        }
    }
    if(!!window.keyTop){
        $(window).scrollTop(window.keyTop);
        window.xAxisIndex = 0;
        window.keyTop = 0;
    }else{
        if(!!window.xAxisIndex){
            if(id == 'wireless' && showIdx == 0){
                $(window).scrollTop($('.bDiv').eq(1).find('.module').eq(4).offset().top);
            }else if(id == 'userFace' && showIdx == 1){
                $(window).scrollTop($('.bDiv').eq(2).find('.module').eq(1).offset().top);
            }else if(id == 'controlFace' && showIdx == 2){
                $(window).scrollTop($('.bDiv').eq(2).find('.module').eq(2).offset().top);
            }
            
        }
    }  
    localStorage.removeItem('basis_xAxisIdx')
    window.xAxisIndex = '';
    var time,datetme,clickTime,index,abnomal;
    if(id == 'wireless'){
        index = 1
    }else{
        index = 2
    }
    function lianjie(abnomal){
        for(var i=0;i<xA.length;i++){
            if(clickTime == xA1[i]){
                xIndex = i;
            }
        };
        if(performanAbnormal(abnomal)){
            $('.bDiv').eq(index).find('.userTab').each(function(key){
                var thsDivIndex = key;
                if(index == 1){
                    thsDivIndex = 3
                }
                if(thsDivIndex == 0){
                    return true
                };
                $(this).find('span').each(function(){
                    var thsText = $(this).text();
                    var thsClass = $(this).get(0).className;
                    var tTop ;
                        
                    if(performanAbnormal(abnomal) == thsText){
                        if(thsDivIndex == 1){
                            tTop = $('.bDiv').eq(2).find('.module').eq(1).offset().top;
                        }else if(thsDivIndex == 2){
                            tTop = $('.bDiv').eq(2).find('.module').eq(2).offset().top;
                        }else if(thsDivIndex == 3){
                            tTop = $('.bDiv').eq(1).find('.module').eq(4).offset().top;
                        }
                        if(thsClass.indexOf('active') != -1){
                            if(thsDivIndex == 1){
                                window.myChart1.dispatchAction({
                                    type: 'showTip',            //显示提示框，指定数据图形，根据 tooltip 的配置项显示提示框。
                                    seriesIndex: 1,        // 系列的 index，在 tooltip 的 trigger 为 axis 的时候可选。
                                    dataIndex: xIndex,          // 数据的 index，如果不指定也可以通过 name 属性根据名称指定数据
                                    //name: string,               // 可选，数据名称，在有 dataIndex 的时候忽略
                                    // 本次显示 tooltip 的位置。只在本次 action 中生效。
                                    // 缺省则使用 option 中定义的 tooltip 位置。
                                    //position: Array.<number>|string|Function,
                                });
                            }else if(thsDivIndex == 2){
                                window.myChart2.dispatchAction({
                                    type: 'showTip',            //显示提示框，指定数据图形，根据 tooltip 的配置项显示提示框。
                                    seriesIndex: 1,        // 系列的 index，在 tooltip 的 trigger 为 axis 的时候可选。
                                    dataIndex: xIndex,          // 数据的 index，如果不指定也可以通过 name 属性根据名称指定数据
                                    //name: string,               // 可选，数据名称，在有 dataIndex 的时候忽略
                                    // 本次显示 tooltip 的位置。只在本次 action 中生效。
                                    // 缺省则使用 option 中定义的 tooltip 位置。
                                    //position: Array.<number>|string|Function,
                                });
                            }else if(thsDivIndex == 3){
                                window.myChart3.dispatchAction({
                                    type: 'showTip',            //显示提示框，指定数据图形，根据 tooltip 的配置项显示提示框。
                                    seriesIndex: 1,        // 系列的 index，在 tooltip 的 trigger 为 axis 的时候可选。
                                    dataIndex: xIndex,          // 数据的 index，如果不指定也可以通过 name 属性根据名称指定数据
                                    //name: string,               // 可选，数据名称，在有 dataIndex 的时候忽略
                                    // 本次显示 tooltip 的位置。只在本次 action 中生效。
                                    // 缺省则使用 option 中定义的 tooltip 位置。
                                    //position: Array.<number>|string|Function,
                                });
                            }
                            $(window).scrollTop(tTop);
                        }else{
                            if(window.localStorage){
                                localStorage.removeItem('basis_xAxisIdx')
                            }else{
                                deleteCookie('basis_xAxisIdx')
                            }
                            window.xAxisIndex = xIndex;
                            window.keyTop = tTop;
                            $(this).addClass('active').siblings().removeClass('active');
                            var bis_id = perforParam(thsText,thsDivIndex);
                            if(thsDivIndex == 1){
                                if (thsText == 'TCP一二次握手时延' || thsText == 'TCP二三次握手时延' || thsText == 'TCP重传率' || thsText == 'HTTP响应时延') {
                                    performance('/dash/return_basis_power/', 'userFace', bis_id, thsText, '#5E9DD6', 'red');
                                } else {
                                    performance('/dash/return_basis_power/', 'userFace', bis_id, thsText, 'red', '#5E9DD6');
                                }
                            }else if(thsDivIndex == 2){
                                performance('/dash/return_basis_ctrl/', 'controlFace', bis_id, thsText, 'red', '#5E9DD6');
                            }else if(thsDivIndex == 3){
                                wirelessCharts(bis_id,thsText);
                            }
                        }   
                    }
                })
            })
        }
    }
};
//性能指标定界-异常时间段-接口请求渲染页面
function performanceAbnomal() {
    var responsed = {"1558863900.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 39.3454443823365, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 95.02, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 5, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558864800.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 38.37129012719564, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 31.02, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 2, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558865700.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 33.418952618453865, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 5.0, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 2, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558866600.0":[{"result":null,"facility_description":null,"facility":null,"abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}","rule_category":"控制面TAU成功率低","abnormal_type":"信令指标异常"}],"1558867500.0":[{"result":null,"facility_description":null,"facility":null,"abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}","rule_category":"控制面TAU成功率低","abnormal_type":"信令指标异常"}],"1558868400.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 52.74129353233831, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 219.01, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 2, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558869300.0":[{"result":null,"facility_description":null,"facility":null,"abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}","rule_category":"控制面TAU成功率低","abnormal_type":"信令指标异常"}],"1558870200.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 40.57087583538516, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 93.01, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 4, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558871100.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 43.1038023868998, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 38.03, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 28, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 0.9285714285714286}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558872000.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 31.891089108910894, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 5.049999999999999, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 6, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 0.6666666666666666}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558872900.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 38.87465940054496, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 14.01, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558873800.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 35.388009991673606, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 12.01, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 6, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558874700.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 113.44900734294264, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 151.12, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 10, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558874760.0":[{"result":"无线问题","facility_description":"cell_id","facility":"省建筑院五期LF-1,  梦都大街东二期LF-2,  ","abnormal_detail":"{\"20758,20753\": 2}","rule_category":"乒乓TAU","abnormal_type":"信令指标异常"}],"1558875600.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 45.067119456652016, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 27.019999999999996, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 3, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558876500.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 33.241145254843886, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 153.08999999999997, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 5, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558877400.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 41.76754594800495, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 78.02, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 10, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558878300.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 47.07177497575171, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 90.03000000000002, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 11, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558879200.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 41.564738292011015, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 37.059999999999995, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 3, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558880100.0":[{"result":null,"facility_description":null,"facility":null,"abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}","rule_category":"控制面TAU成功率低","abnormal_type":"信令指标异常"}],"1558881900.0":[{"result":null,"facility_description":null,"facility":null,"abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}","rule_category":"控制面TAU成功率低","abnormal_type":"信令指标异常"}],"1558882800.0":[{"result":null,"facility_description":null,"facility":null,"abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}","rule_category":"控制面TAU成功率低","abnormal_type":"信令指标异常"}],"1558884600.0":[{"result":null,"facility_description":null,"facility":null,"abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}","rule_category":"控制面TAU成功率低","abnormal_type":"信令指标异常"}],"1558885500.0":[{"result":null,"facility_description":null,"facility":null,"abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}","rule_category":"控制面TAU成功率低","abnormal_type":"信令指标异常"}],"1558908000.0":[{"result":null,"facility_description":null,"facility":null,"abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}","rule_category":"控制面TAU成功率低","abnormal_type":"信令指标异常"}],"1558908900.0":[{"result":null,"facility_description":null,"facility":null,"abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}","rule_category":"控制面TAU成功率低","abnormal_type":"信令指标异常"}],"1558909800.0":[{"result":null,"facility_description":null,"facility":null,"abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}","rule_category":"控制面TAU成功率低","abnormal_type":"信令指标异常"}],"1558910700.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": \"\", \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": \"\", \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558911600.0":[{"result":null,"facility_description":null,"facility":null,"abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}","rule_category":"控制面TAU成功率低","abnormal_type":"信令指标异常"}],"1558912500.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 34.19632761688793, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 484.02, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 2, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558913400.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 34.01176159640545, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 188.01, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558914300.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": \"\", \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": \"\", \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558915200.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 31.06160164271047, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 66.05, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558916100.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 28.90735385530121, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 205.01999999999998, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558917900.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 32.97868209955679, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 228.02999999999997, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558918800.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 30.040634236623298, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 238.03999999999996, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558919700.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 30.57386198476833, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 84.02, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558920600.0":[{"result":null,"facility_description":null,"facility":null,"abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}","rule_category":"控制面TAU成功率低","abnormal_type":"信令指标异常"}],"1558921500.0":[{"result":null,"facility_description":null,"facility":null,"abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}","rule_category":"控制面TAU成功率低","abnormal_type":"信令指标异常"}],"1558922400.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 30.02046783625731, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 45.04, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558923300.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 37.07038123167154, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 2.0799999999999987, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558924200.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 33.06869009584664, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 11.06, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558925100.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 27.048565121412803, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 7.059999999999999, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 2, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 0.5}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558926000.0":[{"result":null,"facility_description":null,"facility":null,"abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}","rule_category":"控制面TAU成功率低","abnormal_type":"信令指标异常"}],"1558926900.0":[{"result":null,"facility_description":null,"facility":null,"abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}","rule_category":"控制面TAU成功率低","abnormal_type":"信令指标异常"}],"1558927800.0":[{"result":"无线问题","facility_description":"cell_id","facility":"黄龙山五期FG-1,  宝鼎路四期LF-2,  ","abnormal_detail":"{\"20981,20952\": 2}","rule_category":"乒乓TAU","abnormal_type":"信令指标异常"}],"1558928700.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 33.629629629629626, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 9.04, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558929600.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 35.03174603174603, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 19.05, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558930500.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 35.0, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 12.03, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558931400.0":[{"result":null,"facility_description":null,"facility":null,"abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}","rule_category":"控制面TAU成功率低","abnormal_type":"信令指标异常"}],"1558932300.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 35.41220972304454, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 79.01, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558933200.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": \"\", \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": \"\", \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558934100.0":[{"result":null,"facility_description":null,"facility":null,"abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}","rule_category":"控制面TAU成功率低","abnormal_type":"信令指标异常"}],"1558935000.0":[{"result":null,"facility_description":null,"facility":null,"abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}","rule_category":"控制面TAU成功率低","abnormal_type":"信令指标异常"}],"1558935900.0":[{"result":null,"facility_description":null,"facility":null,"abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}","rule_category":"控制面TAU成功率低","abnormal_type":"信令指标异常"}],"1558936200.0":[{"result":"无线问题","facility_description":"cell_id","facility":"黄龙山五期FG-1,  上坊佘村二期LF-2,  ","abnormal_detail":"{\"20981,20952\": 2}","rule_category":"乒乓TAU","abnormal_type":"信令指标异常"}],"1558936320.0":[{"result":"无线问题","facility_description":"cell_id","facility":"黄龙山五期FG-1,  天云阁三期LF-2,  ","abnormal_detail":"{\"20981,20952\": 2}","rule_category":"乒乓TAU","abnormal_type":"信令指标异常"}],"1558936560.0":[{"result":"无线问题","facility_description":"cell_id","facility":"黄龙山五期FG-1,  上坊佘村二期LF-2,  ","abnormal_detail":"{\"20981,20952\": 2}","rule_category":"乒乓TAU","abnormal_type":"信令指标异常"}],"1558936800.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 52.61319206088644, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 232.05, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 6, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558937160.0":[{"result":"无线问题","facility_description":"cell_id","facility":"佘村北五期FG-3,  黄龙山五期FG-1,  天云阁三期LF-2,  窑岗村搬迁二期LF-3,  ","abnormal_detail":"{\"20952,20981\": 3}","rule_category":"乒乓TAU","abnormal_type":"信令指标异常"}],"1558937700.0":[{"result":null,"facility_description":null,"facility":null,"abnormal_detail":"{\"\\u7528\\u6237TAU\\u8bf7\\u6c42\\u6210\\u529f\\u7387\": 1.0, \"\\u9519\\u8bef\\u7801\\u63cf\\u8ff0\": null}","rule_category":"控制面TAU成功率低","abnormal_type":"信令指标异常"}],"1558939800.0":[{"result":"无线问题","facility_description":"cell_id","facility":"黄龙山五期FG-1,  天云阁三期LF-2,  ","abnormal_detail":"{\"20981,20952\": 2}","rule_category":"乒乓TAU","abnormal_type":"信令指标异常"}],"1558940400.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": \"\", \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": \"\", \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 1, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558943100.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 58.13507894867099, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 148.07, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 4, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 0.75}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558944000.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": \"\", \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": \"\", \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 2, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 0.5}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558944900.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 374.36328626444157, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 359.09999999999997, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 6, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558944960.0":[{"result":"无线问题","facility_description":"cell_id","facility":"黄龙山五期FG-1,  天云阁三期LF-2,  ","abnormal_detail":"{\"20981,20952\": 5}","rule_category":"乒乓TAU","abnormal_type":"信令指标异常"}],"1558945800.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 259.42897261497006, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 241.12, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 6, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558946700.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 206.63515240007303, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 240.16000000000003, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 6, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 0.8333333333333334}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558947000.0":[{"result":"无线问题","facility_description":"cell_id","facility":"黄龙山五期FG-1,  上坊佘村二期LF-2,  天云阁三期LF-2,  ","abnormal_detail":"{\"20981,20952\": 9}","rule_category":"乒乓TAU","abnormal_type":"信令指标异常"}],"1558947120.0":[{"result":"无线问题","facility_description":"cell_id","facility":"天云阁三期LF-2,  黄龙山五期FG-1,  上坊佘村二期LF-2,  ","abnormal_detail":"{\"20952,20981\": 3}","rule_category":"乒乓TAU","abnormal_type":"信令指标异常"}],"1558947600.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 50.8624168768631, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 83.24, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 8, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558948500.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 52.52709359605912, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 5.169999999999999, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 6, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 0.8333333333333334}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558949400.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 109.08204768583452, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 75.03, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 4, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 1.0}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}],"1558950300.0":[{"result":"终端问题","facility_description":"","facility":null,"abnormal_detail":"{\"\\u7528\\u6237TCP23\\u6b21\\u63e1\\u624b\\u65f6\\u5ef6\": 59.320209973753286, \"TCP 2\\u6b21\\u63e1\\u624b\\u6b21\\u6570\": 16.049999999999997, \"\\u7528\\u623715\\u5206\\u949f\\u5185\\u6240\\u7ecf\\u8fc7\\u7684\\u5c0f\\u533a\\u6570\": 6, \"\\u7528\\u6237\\u6307\\u6807\\u5f02\\u5e38\\u7684\\u5c0f\\u533a\\u6bd4\\u4f8b\": 0.8333333333333334}","rule_category":"TCP23次握手时延长","abnormal_type":"信令指标异常"}]}

    var mark_r = [];
    var mark_b = true;
    var mark_c = '';
            //console.log(respone);
            for (var item in responsed) {
                if(responsed[item].length > 0){
                    var timestamps = null;
                    timestamps = add15(parseInt(item) * 1000);
                    //验证的值
                    var confirmTime1 = confirmTime(new Date(parseInt(item) * 1000));
                    
                    // 将时间格式加15分钟
                    var h = parseInt(item) * 1000 + 900000;
                    var addResult = add15(h);
                    if(confirmTime1 == "上午" || confirmTime1 == "下午" || confirmTime1 == "晚间"){
                        $('.bDiv').eq(2).find('.abnomal').show();
                        $('.bDiv').eq(2).find('.module').eq(0).find('.title i').addClass('show');
                    }else{
                        continue;
                    }

                    var elem1 = $('.performance').find('.abnomal').find('.tables-one');
                    var elem2 = $('.performance').find('.abnomal').find('.tables-two');
                    var elem3 = $('.performance').find('.abnomal').find('.tables-three');
                    for (var k = 0; k < responsed[item].length; k++) {
                        mark_b = true;
                        for(var m=0; m < mark_r.length; m++){
                            if(mark_r[m][0] == responsed[item][k].result){
                                mark_b = false;
                                mark_c = mark_r[m][1];
                                break;
                            }
                        }
                        if(mark_b){
                            mark_r.push([responsed[item][k].result,'r'+Number(mark_r.length+1)])
                            mark_c = mark_r[mark_r.length-1][1];
                        }
                        str = "<div class='tab-total "+mark_c+"'><table><thead><tr><th>故障类别</th><th>故障时间</th><th>异常类型</th><th>异常原因</th><th style='width:20%'>指标详情</th><th>" + abnormalTimeResult(responsed[item][0].result) + "</th></tr></thead><tbody></tbody></table></div>";
                        if (confirmTime1 == "上午") {
                            if(elem1.find('table').length < 1){
                                elem1.html('');
                                $('.performance').find('.abnomal .userTab span').eq(0).removeClass().addClass('abnormal')
                            } 
                            if(elem1.find('.'+mark_c).length < 1){
                                elem1.append(str);
                            }
                        } else if (confirmTime1 == "下午") {
                            if(elem2.find('table').length < 1){
                                elem2.html('');
                                $('.performance').find('.abnomal .userTab span').eq(1).removeClass().addClass('abnormal')
                            }
                            if(elem2.find('.'+mark_c).length < 1){
                                elem2.append(str);
                            }
                        } else if (confirmTime1 == "晚间") {
                            if(elem3.find('table').length < 1){
                                elem3.html('');
                                $('.performance').find('.abnomal .userTab span').eq(2).removeClass().addClass('abnormal')
                            }
                            if(elem3.find('.'+mark_c).length < 1){
                                elem3.append(str);
                            }
                        }
                    }
                    if(elem1.length < 1 && elem2.length < 1 && elem3.length < 1){
                        $('.performance').find('.abnomal').prev('.title').find('p').html('异常<em>0</em>');
                    }
                    for (var j = 0; j < responsed[item].length; j++) {
                        var detailCont = '',tsc='';
                        var num,parent,elem,fTime,eTime,rowspan;
                        if(responsed[item][j].abnormal_detail.indexOf('{') != -1 && responsed[item][j].abnormal_detail.indexOf('}') != -1){
                            var detail = JSON.parse(responsed[item][j].abnormal_detail);
                            for(var itm in detail){
                                if(typeof detail[itm] == 'number'){
                                    var number = detail[itm] + '';
                                    if(number.indexOf('.') != -1){
                                        if(performanceUnit(itm) == '%'){
                                            detail[itm] = (detail[itm] * 100).toFixed(2) + performanceUnit(itm);
                                        }else if(performanceUnit(itm) == '-'){
                                            detail[itm] = (detail[itm]);
                                        }else{
                                            detail[itm] = detail[itm].toFixed(2) + performanceUnit(itm);
                                        }
                                    }else{
                                        if(performanceUnit(itm) == '%'){
                                            detail[itm] = (detail[itm] * 100).toFixed(2) + performanceUnit(itm);
                                        }else if(performanceUnit(itm) == '-'){
                                            detail[itm] = (detail[itm]);
                                        }else{
                                            detail[itm] = detail[itm].toFixed(2) + performanceUnit(itm);
                                        }
                                    }
                                }
                            }
                            for(var itm in detail){
                                detailCont += itm + ':' + detail[itm] + '，';
                            }
                            detailCont = detailCont.substring(0,detailCont.length-1)
                        }else{
                            detailCont = responsed[item][j].abnormal_detail
                        }
                        // 拼接追加的字符串
                        if(!responsed[item][j].facility){
                            responsed[item][j].facility = ''
                        }
                        for(var n = 0;n < mark_r.length; n++){
                            if(mark_r[n][0] == responsed[item][j].result){
                                tsc = mark_r[n][1]
                            }
                        }
                        if (confirmTime1 == "上午") {
                            elem = $('.performance').find('.abnomal .tables-one .'+tsc).find('table tbody tr');
                            parent = $('.performance').find('.abnomal .tables-one .'+tsc).find('table tbody');
                        } else if (confirmTime1 == "下午") {
                            elem = $('.performance').find('.abnomal .tables-two .'+tsc).find('table tbody tr');
                            parent = $('.performance').find('.abnomal .tables-two .'+tsc).find('table tbody');
                        } else if (confirmTime1 == "晚间") {
                            elem = $('.performance').find('.abnomal .tables-three .'+tsc).find('table tbody tr');
                            parent = $('.performance').find('.abnomal .tables-three .'+tsc).find('table tbody');
                        }
                            
                        
                        if(elem.length == 0){
                            str = "<tr><td>"+responsed[item][j].result+"</td><td><div class='time'><p><em>起</em>"+timestamps+"</p><p><em>止</em>"+addResult+"</p></div></td><td>"+responsed[item][j].abnormal_type+"</td><td>" + responsed[item][j].rule_category + "</td><td><div class='txt'>" + detailCont + "</div></td><td>" + responsed[item][j].facility + "</td></tr>";
                            parent.append(str);
                            num = Number($('.performance').find('.abnomal').prev('.title').find('p em').text());
                            $('.performance').find('.abnomal').prev('.title').find('p').html('异常<em>'+(num+1)+'</em>');
                            parent.parents('.tables').show();
                            var oTr = parent.find('tr').eq(parent.find('tr').length-1).find('div.txt');
                            var LH = parseFloat(oTr.css('line-height'));
                            var HT = parseFloat(oTr.css('height'));
                            if(HT > 2.5*LH){
                                oTr.addClass('txt active');
                                oTr.css('overflow','hidden');
                                oTr.parent().append('<p class="alt">'+detailCont+'</p>');
                                var oHp = oTr.parent().find('p').height();
                                var oTop = oTr.parent().offset().top;
                                var oLeft = oTr.parent().find('p').width() - oTr.parent().width();
                                if(oHp > oTop){
                                    oTr.parent().find('p').css({'top':oTr.parent().height() + 25 + 'px','left':-oLeft + 'px'})
                                }else{
                                    oTr.parent().find('p').css({'top': -oHp+'px','left':-oLeft + 'px'})
                                }
                                oTr.on('mouseover',function(){
                                    if($(this).parent().find('p').css('display') == 'none'){
                                        $(this).parent().find('p').show()
                                    }
                                });
                                oTr.parents('td').on('mouseout',function(){
                                    $(this).find('p').hide()
                                })
                            }
                            parent.parents('.tables').removeAttr('style');
                        }else{
                            var rowBool = false;
                            var rowI = 0;
                            for(var i = 0;i<elem.length;i++){
                                fTime = elem.eq(i).find('td').eq(1).find('p:first-child').text();
                                eTime = elem.eq(i).find('td').eq(1).find('p:last-child').text();
                                if(fTime == timestamps && eTime == addResult){
                                    rowBool = true;
                                    rowI = i;
                                    break;
                                }
                            }
                            if(rowBool){
                                rowspan = Number(elem.eq(rowI).find('td').eq(1).attr('rowspan'));
                                if(Boolean(rowspan)){
                                    elem.eq(rowI).find('td').eq(0).attr('rowspan',rowspan+1);
                                    elem.eq(rowI).find('td').eq(1).attr('rowspan',rowspan+1);
                                    str = "<tr><td>"+responsed[item][j].abnormal_type+"</td><td>" + responsed[item][j].rule_category + "</td><td><div class='txt'>" + detailCont + "</div></td><td>" + responsed[item][j].facility + "</td></tr>";
                                    elem.eq(rowI).after(str);
                                }else{
                                    elem.eq(rowI).find('td').eq(0).attr('rowspan','2');
                                    elem.eq(rowI).find('td').eq(1).attr('rowspan','2');
                                    str = "<tr><td>"+responsed[item][j].abnormal_type+"</td><td>" + responsed[item][j].rule_category + "</td><td><div class='txt'>" + detailCont + "</div></td><td>" + responsed[item][j].facility + "</td></tr>";
                                    elem.eq(rowI).after(str);
                                }
                                parent.parents('.tables').show();
                                var oTr = parent.find('tr').eq(rowI+1).find('div.txt');
                                var LH = parseFloat(oTr.css('line-height'));
                                var HT = parseFloat(oTr.css('height'));
                                if(HT > 2.5*LH){
                                    oTr.addClass('txt active');
                                    oTr.css('overflow','hidden');
                                    oTr.parent().append('<p class="alt">'+detailCont+'</p>');
                                    var oHp = oTr.parent().find('p').height();
                                    var oTop = oTr.parent().offset().top;
                                    var oLeft = oTr.parent().find('p').width() - oTr.parent().width();
                                    if(oHp > oTop){
                                        oTr.parent().find('p').css({'top':oTr.parent().height() + 25 + 'px','left':-oLeft + 'px'})
                                    }else{
                                        oTr.parent().find('p').css({'top': -oHp+'px','left':-oLeft + 'px'})
                                    }
                                    oTr.on('mouseover',function(){
                                        if($(this).parent().find('p').css('display') == 'none'){
                                            $(this).parent().find('p').show()
                                        }
                                    });
                                    oTr.parents('td').on('mouseout',function(){
                                        $(this).find('p').hide()
                                    })
                                }
                                parent.parents('.tables').removeAttr('style');
                            }else{
                                str = "<tr><td>"+responsed[item][j].result+"</td><td><div class='time'><p><em>起</em>"+timestamps+"</p><p><em>起</em>"+addResult+"</p></div></td><td>"+responsed[item][j].abnormal_type+"</td><td>" + responsed[item][j].rule_category + "</td><td><div class='txt'>" + detailCont + "</div></td><td>" + responsed[item][j].facility + "</td></tr>";
                                parent.append(str);
                                num = Number($('.performance').find('.abnomal').prev('.title').find('p em').text());
                                $('.performance').find('.abnomal').prev('.title').find('p').html('异常<em>'+(num+1)+'</em>');
                                parent.parents('.tables').show();
                                var oTr = parent.find('tr').eq(parent.find('tr').length-1).find('div.txt');
                                var LH = parseFloat(oTr.css('line-height'));
                                var HT = parseFloat(oTr.css('height'));
                                if(HT > 2.5*LH){
                                    oTr.addClass('txt active');
                                    oTr.css('overflow','hidden');
                                    oTr.parent().append('<p class="alt">'+detailCont+'</p>');
                                    var oHp = oTr.parent().find('p').height();
                                    var oTop = oTr.parent().offset().top;
                                    var oLeft = oTr.parent().find('p').width() - oTr.parent().width();
                                    if(oHp > oTop){
                                        oTr.parent().find('p').css({'top':oTr.parent().height() + 25 + 'px','left':-oLeft + 'px'})
                                    }else{
                                        oTr.parent().find('p').css({'top': -oHp+'px','left':-oLeft + 'px'})
                                    }
                                    oTr.on('mouseover',function(){
                                        if($(this).parent().find('p').css('display') == 'none'){
                                            $(this).parent().find('p').show()
                                        }
                                    });
                                    oTr.parents('td').on('mouseout',function(){
                                        $(this).find('p').hide()
                                    })
                                }
                                parent.parents('.tables').removeAttr('style');
                            }
                        }
                        //对应用户面和控制面的选项样式更改
                        $('.performance').find('.userTab').each(function(key){
                            if(key == 0){
                                return true
                            }
                            if(performanAbnormal(responsed[item][j].rule_category)){
                                $(this).find('span').each(function(){
                                    var thsText = $(this).text();
                                    if(performanAbnormal(responsed[item][j].rule_category) == thsText){
                                        if($(this).get(0).className.indexOf('abnormal') == -1){
                                            $(this).addClass('abnormal')
                                        }
                                    }
                                })
                            }
                        })
                    }
                }
            }
    $('.performance').find('.abnomal .userTab span').each(function(){
        if($(this).get(0).className != 'disabled'){
            $(this).addClass('active');
            $(this).parents('.cont').find('.tables').eq($(this).index()).addClass('table-active');
            return false;
        }
    });
    var basisTwoName;
    if(window.localStorage){
        basisTwoName = localStorage.getItem('basis_two_name');
    }else{
        basisTwoName = getCookie('basis_two_name');
    };
    if(Boolean(basisTwoName)){
        $('.bDiv').eq(2).find('.userTab').eq(1).find('span').each(function() {
            if($(this).text() == basisTwoName){
                $(window).scrollTop($('.bDiv').eq(2).find('.module').eq(1).offset().top);
            }
        })
        $('.bDiv').eq(2).find('.userTab').eq(2).find('span').each(function() {
            if($(this).text() == basisTwoName){
                $(window).scrollTop($('.bDiv').eq(2).find('.module').eq(2).offset().top);
            }
        })
    }
}
//用户数据定界-接口请求渲染页面
function userDataDelimit(){
    var respone = {"p_form":[{"title":["TAU"],"value":[2],"msg":{"10":1,"40":1}},{"title":["Initial context setup"],"value":[1],"msg":{"255":1}},{"title":["Sevice request"],"value":[1],"msg":{"255":1}}],"u_p_data":{"code_list":[{"title":"微信","value":[12],"msg":{"65535":12},"time":12},{"title":"腾讯公共流量","value":[2],"msg":{"65535":2},"time":2},{"title":"微信1","value":[12],"msg":{"65535":12},"time":12},{"title":"快手","value":[46],"msg":{"65535":46},"time":46},{"title":"腾讯公共流量1","value":[2],"msg":{"65535":2},"time":2},{"title":"其他HTTP","value":[1],"msg":{"65535":1},"time":1},{"title":"微信2","value":[12],"msg":{"65535":12},"time":12},{"title":"腾讯公共流量2","value":[2],"msg":{"65535":2},"time":2},{"title":"vivo官方网站","value":[8],"msg":{"65535":8},"time":8},{"title":"腾讯DNSPOD","value":[4],"msg":{"65535":4},"time":4},{"title":"微信3","value":[12],"msg":{"65535":12},"time":12}],"time_list":[{"title":"快手","value":[9]},{"title":"Mob官网--移动开发服务平台","value":[2]},{"title":"微信4","value":[7]},{"title":"腾讯公共类服务器","value":[1]},{"title":"腾讯公共流量3","value":[2]},{"title":"其他HTTP","value":[3]}]}};
    var pForm = respone.p_form;
    if(pForm == ''){
        $('.userData').find('.module').eq(0).find('.controlNood .no-chart-pie').show();
        $('.userData').find('.module').eq(0).find('.controlNood .statistical').hide();
    }else{
        var xVal = [],
            yName = [],
            pieVal = [];
        for(var i=0;i<pForm.length;i++){
            xVal.push(pForm[i].value[0]);
            yName.push(pForm[i].title[0]);
            pieVal.push(pForm[i].msg)
        }
        barChart('ssl',yName,xVal,pieVal)
    }
    //HTTP响应码>=400-and-HTTP响应时延>=500
    window.codeTimeBar = respone.u_p_data;
}
//用户数据定界-两个数据表格
function userDataForm(pagenum,name){
    var respone = {"http_form":[{"开始时间":"2019-02-27 13:14:19","结束时间":"2019-02-27 13:14:20","SGW-IP":"SUZSAEGW02Ber","TAC":"20507","ECI":40537474,"小区名称":"苏州相城区欧菲光科技有限公司1L（M）_2","业务小类名称":"快手","访问服务器IP":"103.107.217.2","域名":"103.107.217.2","URL":"http://103.107.217.2/rest/n/feed/hot?isp=CMCC&mod=vivo%28vivo%20Y67A%29&lon=120.555838&country_code=cn&kpf=ANDROID_PHONE&extId=0012947292c7e8040fc42627d798c105&did=ANDROID_6b46d1b169378954&kpn=KUAISHOU&net=LTE&app=0&oc=VIVO&ud=1110338032&hotfix_ver=&c=VIVO&sys=ANDROID_6.0&appver=6.1.1.8096&ftt=&language=zh-cn&iuid=&lat=31.44961&did_gt=1545218555215&ver=6.1&max_memory=128","HTTP响应码":200,"HTTP响应时延":535},{"开始时间":"2019-02-27 13:14:20","结束时间":"2019-02-27 13:14:22","SGW-IP":"SUZSAEGW02Ber","TAC":"20507","ECI":40537474,"小区名称":"苏州相城区欧菲光科技有限公司1L（M）_2","业务小类名称":"快手","访问服务器IP":"103.107.217.2","域名":"103.107.217.2","URL":"http://103.107.217.2/rest/n/feed/hot?isp=CMCC&mod=vivo%28vivo%20Y67A%29&lon=120.555838&country_code=cn&kpf=ANDROID_PHONE&extId=0012947292c7e8040fc42627d798c105&did=ANDROID_6b46d1b169378954&kpn=KUAISHOU&net=LTE&app=0&oc=VIVO&ud=1110338032&hotfix_ver=&c=VIVO&sys=ANDROID_6.0&appver=6.1.1.8096&ftt=&language=zh-cn&iuid=&lat=31.44961&did_gt=1545218555215&ver=6.1&max_memory=128","HTTP响应码":200,"HTTP响应时延":565},{"开始时间":"2019-02-27 13:15:59","结束时间":"2019-02-27 13:15:59","SGW-IP":"SUZSAEGW02Ber","TAC":"20507","ECI":40537474,"小区名称":"苏州相城区欧菲光科技有限公司1L（M）_2","业务小类名称":"快手","访问服务器IP":"112.25.105.140","域名":"txcm.a.etoote.com","URL":"http://txcm.a.etoote.com/uhead/AB/2018/08/23/14/BMjAxODA4MjMxNDU1NDVfMzQ2NTM4NjA5XzJfaGQ1NjRfMTY0_s.jpg","HTTP响应码":65535,"HTTP响应时延":0},{"开始时间":"2019-02-27 13:15:59","结束时间":"2019-02-27 13:15:59","SGW-IP":"SUZSAEGW02Ber","TAC":"20507","ECI":40537474,"小区名称":"苏州相城区欧菲光科技有限公司1L（M）_2","业务小类名称":"快手","访问服务器IP":"112.25.105.140","域名":"txcm.a.etoote.com","URL":"http://txcm.a.etoote.com/uhead/AB/2018/08/23/14/BMjAxODA4MjMxNDU1NDVfMzQ2NTM4NjA5XzJfaGQ1NjRfMTY0_s.jpg","HTTP响应码":65535,"HTTP响应时延":0},{"开始时间":"2019-02-27 13:16:58","结束时间":"2019-02-27 13:16:58","SGW-IP":"SUZSAEGW02Ber","TAC":"20507","ECI":40537474,"小区名称":"苏州相城区欧菲光科技有限公司1L（M）_2","业务小类名称":"快手","访问服务器IP":"112.25.105.140","域名":"txcm.a.etoote.com","URL":"http://txcm.a.etoote.com/upic/2019/02/26/14/BMjAxOTAyMjYxNDA4NDNfODMwNzg3MTdfMTEwMzQ2NjU0MjVfMV8z_540p_Ba503381069be82e7ca3cc48c33aaddcb.kpg?tag=1-1551244460-h-0-iruwc6gbs3-e95360a5c9245987","HTTP响应码":65535,"HTTP响应时延":0},{"开始时间":"2019-02-27 13:16:58","结束时间":"2019-02-27 13:17:04","SGW-IP":"SUZSAEGW02Ber","TAC":"20507","ECI":40537474,"小区名称":"苏州相城区欧菲光科技有限公司1L（M）_2","业务小类名称":"快手","访问服务器IP":"103.107.217.2","域名":"103.107.217.2","URL":"http://103.107.217.2/rest/n/feed/hot?isp=CMCC&mod=vivo%28vivo%20Y67A%29&lon=120.555856&country_code=cn&kpf=ANDROID_PHONE&extId=0012947292c7e8040fc42627d798c105&did=ANDROID_6b46d1b169378954&kpn=KUAISHOU&net=LTE&app=0&oc=VIVO&ud=1110338032&hotfix_ver=&c=VIVO&sys=ANDROID_6.0&appver=6.1.1.8096&ftt=&language=zh-cn&iuid=&lat=31.449532&did_gt=1545218555215&ver=6.1&max_memory=128","HTTP响应码":200,"HTTP响应时延":569},{"开始时间":"2019-02-27 13:17:21","结束时间":"2019-02-27 13:17:21","SGW-IP":"SUZSAEGW02Ber","TAC":"20507","ECI":40537474,"小区名称":"苏州相城区欧菲光科技有限公司1L（M）_2","业务小类名称":"快手","访问服务器IP":"112.25.105.140","域名":"txcm.a.etoote.com","URL":"http://txcm.a.etoote.com/uhead/AB/2019/02/23/03/BMjAxOTAyMjMwMzQzMTFfMzIwOTU3NTMxXzJfaGQ3MDhfNjQ=_s.jpg","HTTP响应码":65535,"HTTP响应时延":0},{"开始时间":"2019-02-27 13:25:34","结束时间":"2019-02-27 13:25:34","SGW-IP":"SUZSAEGW02Ber","TAC":"20507","ECI":40537474,"小区名称":"苏州相城区欧菲光科技有限公司1L（M）_2","业务小类名称":"快手","访问服务器IP":"36.156.19.102","域名":"txcm.a.etoote.com","URL":"http://txcm.a.etoote.com/uhead/AB/2019/01/31/23/BMjAxOTAxMzEyMzQ0NDRfODc3ODcwNDEzXzJfaGQ1OTlfODcx_s.jpg","HTTP响应码":65535,"HTTP响应时延":0},{"开始时间":"2019-02-27 13:25:34","结束时间":"2019-02-27 13:25:34","SGW-IP":"SUZSAEGW02Ber","TAC":"20507","ECI":40537474,"小区名称":"苏州相城区欧菲光科技有限公司1L（M）_2","业务小类名称":"快手","访问服务器IP":"36.156.19.103","域名":"txcm.a.etoote.com","URL":"http://txcm.a.etoote.com/uhead/AB/2019/01/31/23/BMjAxOTAxMzEyMzQ0NDRfODc3ODcwNDEzXzJfaGQ1OTlfODcx_s.jpg","HTTP响应码":65535,"HTTP响应时延":0},{"开始时间":"2019-02-27 19:28:30","结束时间":"2019-02-27 19:28:30","SGW-IP":"SUZSAEGW05BHW","TAC":"20507","ECI":40433286,"小区名称":"苏州相城区通天府大酒店SLF_4","业务小类名称":"微信","访问服务器IP":"36.152.4.31","域名":"wx.qlogo.cn","URL":"http://wx.qlogo.cn/mmhead/ver_1/BW56ibZnjdcr8k2vTmVd8vsXXPSkTCRDzuQtfHIBOlhviaT4qfZlicTiaDzdE5PP5nReOXibDiavmvuBfA0V7PtCqDCAia8SgwwEbAlIMmib9AkP57w/132","HTTP响应码":65535,"HTTP响应时延":0},{"开始时间":"2019-02-27 19:28:36","结束时间":"2019-02-27 19:28:36","SGW-IP":"SUZSAEGW05BHW","TAC":"20507","ECI":40433286,"小区名称":"苏州相城区通天府大酒店SLF_4","业务小类名称":"微信","访问服务器IP":"183.192.195.143","域名":"minorshort.weixin.qq.com","URL":"http://minorshort.weixin.qq.com/mmtls/0f500a4e","HTTP响应码":65535,"HTTP响应时延":0},{"开始时间":"2019-02-27 22:43:40","结束时间":"2019-02-27 22:43:40","SGW-IP":"SUZSAEGW12Ber","TAC":"20507","ECI":172589931,"小区名称":"","业务小类名称":"微信","访问服务器IP":"183.192.195.144","域名":"short.weixin.qq.com","URL":"http://short.weixin.qq.com/mmtls/7d63552d","HTTP响应码":200,"HTTP响应时延":598},{"开始时间":"2019-02-28 03:26:03","结束时间":"2019-02-28 03:26:03","SGW-IP":"SUZSAEGW03Ber","TAC":"20507","ECI":161651074,"小区名称":"苏州东区黄埭西FDD_B","业务小类名称":"微信","访问服务器IP":"183.192.196.38","域名":"dns.weixin.qq.com","URL":"http://dns.weixin.qq.com:8080/cgi-bin/micromsg-bin/newgetdns?uin=2236937802&clientversion=654312250&scene=0&net=2&md5=aa5490adc1590d2376e47c84f02ef4c4&devicetype=android-23&lan=zh_CN&sigver=2","HTTP响应码":65535,"HTTP响应时延":0},{"开始时间":"2019-02-28 03:26:03","结束时间":"2019-02-28 03:26:03","SGW-IP":"SUZSAEGW03Ber","TAC":"20507","ECI":161651074,"小区名称":"苏州东区黄埭西FDD_B","业务小类名称":"微信","访问服务器IP":"117.184.242.100","域名":"short.weixin.qq.com","URL":"http://short.weixin.qq.com/mmtls/7fceae62","HTTP响应码":65535,"HTTP响应时延":0},{"开始时间":"2019-02-28 06:56:24","结束时间":"2019-02-28 06:57:12","SGW-IP":"SUZSAEGW05BHW","TAC":"20507","ECI":172589899,"小区名称":"","业务小类名称":"vivo官方网站","访问服务器IP":"223.111.194.152","域名":"weather.vivo.com.cn","URL":"http://weather.vivo.com.cn/getweather/?imei=865320035745617&model=vivoY67A&elapsedtime=962703&city=%CF%E0%B3%C7&ver=2.5.1&st1=241930780&st2=241928732&sn1=46002%2C46002&sn2=46002&ms=3&nt=cmnet_LTE","HTTP响应码":65535,"HTTP响应时延":0},{"开始时间":"2019-02-28 06:58:41","结束时间":"2019-02-28 06:58:41","SGW-IP":"SUZSAEGW05BHW","TAC":"20507","ECI":172589931,"小区名称":"","业务小类名称":"vivo官方网站","访问服务器IP":"223.111.194.152","域名":"weather.vivo.com.cn","URL":"http://weather.vivo.com.cn/getweather/?imei=865320035745617&model=vivoY67A&elapsedtime=962703&city=%CF%E0%B3%C7&ver=2.5.1&st1=241930780&st2=241928732&sn1=46002%2C46002&sn2=46002&ms=3&nt=cmnet_LTE","HTTP响应码":65535,"HTTP响应时延":0},{"开始时间":"2019-02-28 07:00:13","结束时间":"2019-02-28 07:00:13","SGW-IP":"SUZSAEGW05BHW","TAC":"20507","ECI":172589931,"小区名称":"","业务小类名称":"vivo官方网站","访问服务器IP":"223.111.194.152","域名":"weather.vivo.com.cn","URL":"http://weather.vivo.com.cn/getweather/?imei=865320035745617&model=vivoY67A&elapsedtime=962703&city=%CF%E0%B3%C7&ver=2.5.1&st1=241930780&st2=241928732&sn1=46002%2C46002&sn2=46002&ms=3&nt=cmnet_LTE","HTTP响应码":65535,"HTTP响应时延":0},{"开始时间":"2019-02-28 07:04:40","结束时间":"2019-02-28 07:04:40","SGW-IP":"SUZSAEGW05BHW","TAC":"20507","ECI":172589931,"小区名称":"","业务小类名称":"vivo官方网站","访问服务器IP":"223.111.194.152","域名":"weather.vivo.com.cn","URL":"http://weather.vivo.com.cn/getweather/?imei=865320035745617&model=vivoY67A&elapsedtime=962703&city=%CF%E0%B3%C7&ver=2.5.1&st1=241930780&st2=241928732&sn1=46002%2C46002&sn2=46002&ms=3&nt=cmnet_LTE","HTTP响应码":65535,"HTTP响应时延":0},{"开始时间":"2019-02-28 07:15:56","结束时间":"2019-02-28 07:16:42","SGW-IP":"SUZSAEGW05BHW","TAC":"20507","ECI":40433285,"小区名称":"苏州相城区通天府大酒店SLF_3","业务小类名称":"vivo官方网站","访问服务器IP":"223.111.194.149","域名":"weather.vivo.com.cn","URL":"http://weather.vivo.com.cn/getweather/?imei=865320035745617&model=vivoY67A&elapsedtime=962703&latitude=31.4405&longitude=120.541002&city=%CF%E0%B3%C7&ver=2.5.1&st1=243145660&st2=243143612&sn1=46002%2C46002&sn2=46002&ms=3&nt=cmnet_LTE","HTTP响应码":65535,"HTTP响应时延":0},{"开始时间":"2019-02-28 07:20:41","结束时间":"2019-02-28 07:20:41","SGW-IP":"SUZSAEGW05BHW","TAC":"20507","ECI":219992068,"小区名称":"苏州黄埭医院L(M)_1_iSON1","业务小类名称":"vivo官方网站","访问服务器IP":"223.111.194.149","域名":"weather.vivo.com.cn","URL":"http://weather.vivo.com.cn/getweather/?imei=865320035745617&model=vivoY67A&elapsedtime=962703&latitude=31.4405&longitude=120.541002&city=%CF%E0%B3%C7&ver=2.5.1&st1=243145660&st2=243143612&sn1=46002%2C46002&sn2=46002&ms=3&nt=cmnet_LTE","HTTP响应码":65535,"HTTP响应时延":0},{"开始时间":"2019-02-28 07:23:12","结束时间":"2019-02-28 07:23:12","SGW-IP":"SUZSAEGW05BHW","TAC":"20507","ECI":219992068,"小区名称":"苏州黄埭医院L(M)_1_iSON1","业务小类名称":"vivo官方网站","访问服务器IP":"223.111.194.149","域名":"weather.vivo.com.cn","URL":"http://weather.vivo.com.cn/getweather/?imei=865320035745617&model=vivoY67A&elapsedtime=962703&latitude=31.4405&longitude=120.541002&city=%CF%E0%B3%C7&ver=2.5.1&st1=243145660&st2=243143612&sn1=46002%2C46002&sn2=46002&ms=3&nt=cmnet_LTE","HTTP响应码":65535,"HTTP响应时延":0},{"开始时间":"2019-02-28 07:26:41","结束时间":"2019-02-28 07:26:41","SGW-IP":"SUZSAEGW05BHW","TAC":"20507","ECI":219992068,"小区名称":"苏州黄埭医院L(M)_1_iSON1","业务小类名称":"vivo官方网站","访问服务器IP":"223.111.194.149","域名":"weather.vivo.com.cn","URL":"http://weather.vivo.com.cn/getweather/?imei=865320035745617&model=vivoY67A&elapsedtime=962703&latitude=31.4405&longitude=120.541002&city=%CF%E0%B3%C7&ver=2.5.1&st1=243145660&st2=243143612&sn1=46002%2C46002&sn2=46002&ms=3&nt=cmnet_LTE","HTTP响应码":65535,"HTTP响应时延":0},{"开始时间":"2019-02-28 07:39:31","结束时间":"2019-02-28 07:39:31","SGW-IP":"SUZSAEGW05BHW","TAC":"20507","ECI":219992068,"小区名称":"苏州黄埭医院L(M)_1_iSON1","业务小类名称":"微信","访问服务器IP":"36.152.4.34","域名":"wx.qlogo.cn","URL":"http://wx.qlogo.cn/mmhead/Q3auHgzwzM50ZU1SK705RvXzNacWprNvkq6aKSPtWrG4YV5faYlyuw/132","HTTP响应码":65535,"HTTP响应时延":0},{"开始时间":"2019-02-28 07:39:56","结束时间":"2019-02-28 07:39:56","SGW-IP":"SUZSAEGW05BHW","TAC":"20507","ECI":219992068,"小区名称":"苏州黄埭医院L(M)_1_iSON1","业务小类名称":"微信","访问服务器IP":"36.152.4.34","域名":"wx.qlogo.cn","URL":"http://wx.qlogo.cn/mmhead/ver_1/jfeIHLvCBYiacYcCPib6snCAiciajDqicDpxBAkGyBD4t7cFTWWHVliaAarLlvnEFg0oENXOkiaqxzLDmiapnoic1fyvgp9pe7mibTDwibkS39rzmicDmNA/96","HTTP响应码":65535,"HTTP响应时延":0},{"开始时间":"2019-02-28 08:30:49","结束时间":"2019-02-28 08:30:50","SGW-IP":"SUZSAEGW05BHW","TAC":"20507","ECI":219992068,"小区名称":"苏州黄埭医院L(M)_1_iSON1","业务小类名称":"微信","访问服务器IP":"183.192.195.142","域名":"short.weixin.qq.com","URL":"http://short.weixin.qq.com/mmtls/2c269b50","HTTP响应码":200,"HTTP响应时延":501},{"开始时间":"2019-02-28 09:58:54","结束时间":"2019-02-28 09:59:02","SGW-IP":"SUZSAEGW13Ber","TAC":"20507","ECI":172589924,"小区名称":"苏州黄埭西搬迁站LF_3","业务小类名称":"其他HTTP","访问服务器IP":"117.135.167.84","域名":"117.135.167.84","URL":"http://117.135.167.84/a/1/?p=a&v=5&c=g&st=8f3bf724c7dad928ae20de9fd79cc973&sv=5.197&az=android-vivo-wallpaper&id=3997560906585374&sid=32c3cf865ec67444@72-a1.handpet.com","HTTP响应码":206,"HTTP响应时延":2021},{"开始时间":"2019-02-28 09:59:00","结束时间":"2019-02-28 09:59:14","SGW-IP":"SUZSAEGW13Ber","TAC":"20507","ECI":172589924,"小区名称":"苏州黄埭西搬迁站LF_3","业务小类名称":"其他HTTP","访问服务器IP":"117.135.167.84","域名":"117.135.167.84","URL":"http://117.135.167.84/a/1/?p=a&v=5&c=g&st=8f3bf724c7dad928ae20de9fd79cc973&sv=5.197&az=android-vivo-wallpaper&id=3997560906585374&sid=32c3cf865ec67444@72-a1.handpet.com","HTTP响应码":206,"HTTP响应时延":2014},{"开始时间":"2019-02-28 09:59:12","结束时间":"2019-02-28 09:59:14","SGW-IP":"SUZSAEGW13Ber","TAC":"20507","ECI":172589924,"小区名称":"苏州黄埭西搬迁站LF_3","业务小类名称":"其他HTTP","访问服务器IP":"117.135.167.84","域名":"117.135.167.84","URL":"http://117.135.167.84/a/1/?p=a&v=5&c=g&st=8f3bf724c7dad928ae20de9fd79cc973&sv=5.197&az=android-vivo-wallpaper&id=3997560906585374&sid=32c3cf865ec67444@72-a1.handpet.com","HTTP响应码":206,"HTTP响应时延":2014},{"开始时间":"2019-02-28 10:15:58","结束时间":"2019-02-28 10:15:58","SGW-IP":"SUZSAEGW13Ber","TAC":"20507","ECI":172589924,"小区名称":"苏州黄埭西搬迁站LF_3","业务小类名称":"微信","访问服务器IP":"36.152.4.34","域名":"wx.qlogo.cn","URL":"http://wx.qlogo.cn/mmcrhead/vDwntJFbiaft9Jm232iclbsPc5cQGlthsOyvKthx3Q5k950oKuw6u0lEGwVdAGxAVdTmPM5tSc4nnhFNVs5fiakSibGfAtJZOKLT/0","HTTP响应码":65535,"HTTP响应时延":0}],"mme_form":[{"start":"2019-02-27 19:51:12","end":"2019-02-27 19:51:13","xl":"TAU","state":"超时","mme":"SUZMME04Ber","tac":"20507","eci":"172589923","cell_name":"苏州黄埭西搬迁站LF_2","r_reason":"255","f_reason":"255"},{"start":"2019-02-27 19:51:21","end":"2019-02-27 19:51:22","xl":"TAU","state":"失败","mme":"SUZMME04Ber","tac":"20507","eci":"172589899","cell_name":"","r_reason":"255","f_reason":"Implicitly detached"},{"start":"2019-02-27 19:52:47","end":"2019-02-27 19:52:47","xl":"PDN connectivity","state":"超时","mme":"SUZMME04Ber","tac":"20507","eci":"172589924","cell_name":"苏州黄埭西搬迁站LF_3","r_reason":"51","f_reason":"255"},{"start":"2019-02-27 19:53:27","end":"2019-02-27 19:53:27","xl":"TAU","state":"失败","mme":"SUZMME04Ber","tac":"20507","eci":"161651074","cell_name":"苏州东区黄埭西FDD_B","r_reason":"255","f_reason":"40"},{"start":"2019-02-28 03:26:04","end":"2019-02-28 03:26:24","xl":"Paging","state":"超时","mme":"SUZMME05Ber","tac":"20507","eci":"4294967295","cell_name":"","r_reason":"255","f_reason":"255"},{"start":"2019-02-28 04:10:24","end":"2019-02-28 04:10:26","xl":"Initial context setup","state":"失败","mme":"SUZMME05Ber","tac":"20507","eci":"172589924","cell_name":"苏州黄埭西搬迁站LF_3","r_reason":"255","f_reason":"255"},{"start":"2019-02-28 04:10:24","end":"2019-02-28 04:10:26","xl":"Sevice request","state":"失败","mme":"SUZMME05Ber","tac":"20507","eci":"172589924","cell_name":"苏州黄埭西搬迁站LF_3","r_reason":"255","f_reason":"255"},{"start":"2019-02-28 04:37:25","end":"2019-02-28 04:37:45","xl":"Paging","state":"超时","mme":"SUZMME05Ber","tac":"20507","eci":"4294967295","cell_name":"","r_reason":"255","f_reason":"255"}]};
    var str = '';
    if(name == 'http'){
        if(respone.http_form == '' && pagenum == 1){
            $('.userData').find('.module').eq(2).find('table.xdr').hide();
            $('.userData').find('.module').eq(2).find('.xdr-page').hide();
            $('.userData').find('.module').eq(2).find('.no-table-xdr').show();
        }else{
            var s_i = (pagenum-1)*10;
            var lng = pagenum * 10;
            lng = lng > respone.http_form.length ? respone.http_form.length : lng;
            $('.userData').find('.module').eq(2).find('tbody').html('');
            for(var i = s_i;i<lng;i++){
                str = '<tr><td><div class="time"><p><em>起</em>'+respone.http_form[i]['开始时间']+'</p><p><em>止</em>'+respone.http_form[i]['结束时间']+'</p></div></td><td>'+respone.http_form[i]['业务小类名称']+'</td><td>'+respone.http_form[i]['域名']+'</td><td>'+respone.http_form[i]['访问服务器IP']+'</td><td>'+respone.http_form[i]['HTTP响应码']+'</td><td>'+respone.http_form[i]['HTTP响应时延']+'</td><td>'+respone.http_form[i]['小区名称']+'</td><td>'+respone.http_form[i]['ECI']+'</td><td>'+respone.http_form[i]['TAC']+'</td><td>'+respone.http_form[i]['SGW-IP']+'</td><td><div class="txt">'+respone.http_form[i]['URL']+'</div></td></tr>';
                $('.userData').find('.module').eq(2).find('tbody').append(str);
                parent = $('.userData').find('.module').eq(2).find('tbody');
                var aTr = parent.find('tr').eq(parent.find('tr').length-1).find('div.txt');
                var aLh = parseFloat(aTr.css('line-height'));
                var aHt = parseFloat(aTr.css('height'));
                if(aHt > 2.5*aLh){
                    var oTp = aTr.parent().get(0).offsetTop;
                    aTr.addClass('txt active');
                    aTr.css('overflow','hidden');
                    aTr.parent().append('<p class="alt">'+respone.http_form[i]['URL']+'</p>');
                    var oHp = aTr.parent().find('p').height();
                    var alft = aTr.parent().find('p').width() - aTr.parent().width();
                    if(oHp > oTp){
                        aTr.parent().find('p').css({'top':aTr.parent().height()+25+'px','left':-alft +'px'})
                    }else{
                        aTr.parent().find('p').css({'top':-oHp  +'px','left':-alft +'px'})
                    }
                    if(aTr.get(0).className.indexOf('active') != -1){
                        aTr.on('mouseover',function(){
                            if($(this).parent().find('p').css('display') == 'none'){
                                $(this).parent().find('p').show()
                            }
                        });
                        aTr.parent().on('mouseout',function(){
                            $(this).find('p').hide()
                        })
                    }
                }
            };
            $('.userData').find('.module').eq(2).find('.page > span').text('共'+respone.http_form.length+'条');
            var page = Math.ceil(respone.http_form.length / 10);
            window.totalPage1 = page;
            pageShow(pagenum,1);
            if(pagenum == 1 && $('.userData').find('.module').eq(1).css('display') == 'block'){
                $('.userData').find('.module').eq(2).hide();
            }
        }
    }else if(name = 'mme'){
        if(respone.mme_form == '' && pagenum == 1){
            $('.userData').find('.module').eq(1).find('table.xdr').hide();
            $('.userData').find('.module').eq(1).find('.xdr-page').hide();
            $('.userData').find('.module').eq(1).find('.no-table-xdr').show();
        }else{
            $('.userData').find('.module').eq(1).find('tbody').html('');
            for(var i = 0;i<respone.mme_form.length;i++){
                str += '<tr><td><div class="time"><p><em>起</em>'+respone.mme_form[i].start+'</p><p><em>止</em>'+respone.mme_form[i].end+'</p></div></td><td>'+respone.mme_form[i].xl+'</td><td>'+respone.mme_form[i].state+'</td><td>'+respone.mme_form[i].mme+'</td><td>'+respone.mme_form[i].tac+'</td><td>'+respone.mme_form[i].eci+'</td><td>'+respone.mme_form[i].cell_name+'</td><td>'+respone.mme_form[i].r_reason+'</td><td>'+respone.mme_form[i].f_reason+'</td></tr>'
            };
            $('.userData').find('.module').eq(1).find('tbody').html(str);
            $('.userData').find('.module').eq(1).find('.page > span').text('共'+respone.mme_form.length+'条');
            var page = Math.ceil(respone.mme_form.length / 10);
            window.totalPage = page;
            pageShow(pagenum,0)
        }
    }
}
function barChart(id,yAry,xAry,childAry) { //用户数据定界-柱状图渲染
    var textTitle = '',mouseCurValue = 0;
    if(id == 'ssl'){
        textTitle = '信令流程频次分布图'
    }
    var curInt = 0,xmax = 0;
    for(var i=0;i<xAry.length;i++){
        if(xAry[i] > xmax){
            xmax = xAry[i]
        }
    }
    xmax++;
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById(id));
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: textTitle,
            x: 'left',
            textStyle: {
                fontSize: 16,
                color: '#5E5E5E',
            }
        },
        xAxis: {
            type: 'value',
            name:'次',
            nameTextStyle:{
                color:'rgba(0,0,0,0.45)',
                padding:[27,0,0,6]
            },
            max:xmax,
            axisLine: {
                show: false
            },
            axisTick: {
                length: 0
            },
            axisLabel: {
                color: 'rgba(0,0,0,0.65)',
            },
            splitLine:{
                lineStyle:{
                    color:'#E9E9E9',
                    type:'dashed'
                }
            }
        },
        yAxis: {
            type: 'category',
            data: yAry,
            axisLine: {
                lineStyle: {
                    color: '#BFBFBF',
                }
            },
            axisTick:{
                length:4,
                alignWithLabel:true,
                lineStyle:{
                    color:'#BFBFBF'
                }
            },
            axisLabel: {
                color: 'rgba(0,0,0,0.65)',
                fontSize: 12,
                formatter:function(value){
                    var result = "";//拼接加\n返回的类目项
                    //var maxLength = 7;//每项显示文字个数
                    //var valLength = value.length;//X轴类目项的文字个数
                    var valLength = value;
                    var rowNumber = valLength.split(' '); //类目项需要换行的行数
                    if (rowNumber.length > 2)//如果文字大于3,
                    {
                        for (var i = 0; i < rowNumber.length ; i++) {
                            //var temp = "";//每次截取的字符串
                            //var start = i * maxLength;//开始截取的位置
                            //var end = start + maxLength;//结束截取的位置
                            //temp = value.substring(start, end) + "\n";
                            if(i == rowNumber.length-1){
                                temp = rowNumber[i];
                            }else if(i >= 1){
                                temp = rowNumber[i] + "\n";
                            }else{
                                temp = rowNumber[i] + " ";
                            }
                            result += temp; //拼接生成最终的字符串
                        }
                        return result ;
                    }
                    else {
                        return value;
                    }
                }
            },
        },
        grid: {
            left: 90
        },
        tooltip: {
            trigger: 'axis',
            triggerOn:'click',
            axisPointer: {
                type:'none',
                label:{
                    show:true,
                    margin:8,
                    padding:[0,0,0,0],
                    color:'#14B8B8',
                    backgroundColor:'#fff',
                    shadowBlur:0,
                    formatter:function(params){
                        var result = "";//拼接加\n返回的类目项
                        //var maxLength = 7;//每项显示文字个数
                        //var valLength = value.length;//X轴类目项的文字个数
                        var valLength = params.value;
                        var rowNumber = valLength.split(' '); //类目项需要换行的行数
                        if (rowNumber.length > 2)//如果文字大于3,
                        {
                            for (var i = 0; i < rowNumber.length ; i++) {
                                //var temp = "";//每次截取的字符串
                                //var start = i * maxLength;//开始截取的位置
                                //var end = start + maxLength;//结束截取的位置
                                //temp = value.substring(start, end) + "\n";
                                if(i == rowNumber.length-1){
                                    temp = rowNumber[i];
                                }else if(i >= 1){
                                    temp = rowNumber[i] + "\n";
                                }else{
                                    temp = rowNumber[i] + " ";
                                }
                                
                                result += temp; //拼接生成最终的字符串
                            }
                            return result ;
                        }
                        else {
                            return params.value;
                        }
                    }
                },
                shadowStyle:{
                    //color:'rgba(43, 209, 197, 0.1797)'
                }
            },
            formatter: function(params, ticket, callback) {
                var htmlStr = '';
                //console.log(params[0])
                var xName = params[0].name; //x轴的名称  
                var index = params[0].dataIndex;  //点击位置索引
                
            }
        },
        series: [{
            type: 'bar',
            barMaxWidth:50,
            barCategoryGap:'30%',
            data: xAry,
            //silent:true,    
            itemStyle: {
                color: function(params){
                    var key = params.dataIndex;
                    if(key === curInt){
                      return '#00766d'
                    }else{
                      return '#2BD1C5'
                    }
                }
            },
            label:{
                show:true,
                color:'#2BD1C5',
                position:'right'
            },
            emphasis:{
                itemStyle:{
                    color:'#00766d'
                }
            }
            //cursor: 'defaut'
        }]
    };
    myChart.setOption(option);
    // 使用刚指定的配置项和数据显示图表
    myChart.on('click', function (params) {
        curInt = params.dataIndex;
        xName = params.name;
        myChart.setOption(option);
        $('#'+id+'1').show();
        var top = (200 / yAry.length) / 2 + (200 / yAry.length) * (yAry.length -1 - curInt);
        $('#'+id+'1').prev('em').css('top',top + 46 + 'px');
        barChart2(id+'1', xName,childAry[curInt]);
    });
    barChart2(id+'1', yAry[0],childAry[0])
    var top = (200 / yAry.length) / 2 + (200 / yAry.length) * (yAry.length -1 - 0);
    $('#'+id+'1').prev('em').css('top',top + 46 + 'px');
};
function barChart2(id, subtitle, ary) {  //用户数据定界-饼状图渲染
    var lDate = [],sDate = [], numberTotal = 0,elem = {}, subText;
    for(var item in ary){
        numberTotal += Number(ary[item])
    }
    for(var item in ary){
        var name_i = item;
        //name_i = name_i.length > 5 ? name_i.slice(0,5) + '...' :name_i;
        item1 = name_i //+' '+ ary[item] +'次 '+ Math.round(100*ary[item]/numberTotal)+'%';
        lDate.push(item1);
        //var pecent = ((ary[item] / numberTotal) * 100).toFixed(2);
        elem = {
            value:ary[item],
            name:item1,
        };
        sDate.push(elem)
    };
    subText = '失败原因比例';
    
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById(id));
    myChart.clear();
    var option = {
        title: {
            text: subText,
            //subtext: subtitle,
            left:30,
            padding:[16,0,0,0],
            textStyle: {
                color:'rgba(0,0,0,0.85)',
                fontSize: 12,
            },
            subtextStyle: {
                fontSize: 16,
                color: '#666',
            }
        },
        tooltip:{
            trigger:'item',
            formatter: '{b}  {c}次  {d}%'
        },
        legend: {
            data: lDate,
            left: 219,
            top:'middle',
            orient:'vertical',
            itemWidth: 6,
            itemHeight: 6,
            //selectedMode: false,
            formatter: function (name) {
                if (!name) return '';
                var name1 = name;
                if (name.split(' ').length > 2) {
                    name1 =  name.name.split(' ')[0] +' '+ name.name.split(' ')[1] + '...' ;
                }else{
                    if(name.length > 20){
                        name1 = name.slice(0,20) + '...'
                    }
                }
                name = name1 +'   ' +ary[name] +'次   '+ Math.round(100*ary[name]/numberTotal)+'%'
                return name;
            },
            textStyle: {
                fontSize: 12,
                color:'rgba(0,0,0,0.45)'
            }
        },
        series: [{
            type: 'pie',
            //silent: true,
            hoverAnimation: false,
            radius: 63,
            cursor: 'defaut',
            center: ['22.8%', '56%'],
            data: sDate,
            label: {
                show: true,
                position: 'inside',
                fontSize: 12,
                color: '#FFF',
                formatter:function(params){
                    var value = params.value;
                    return Math.round(100*value/numberTotal) + '%'
                }
            },
            itemStyle:{
                color:function(params){
                    var colorList = ['#2492FC','#2BD1C5','#FBAC25','#FF599C','#B651F4','#4DC1FF','#59EEE3'];
                    var index = params.dataIndex;
                    if(index > colorList.length-1){
                        index = index - colorList.length + 1
                    }
                    return colorList[index]
                }
            }
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
};
function barChartHoriz(id,xAry,yAry,childAry,move) { //用户数据定界-柱状图渲染
    var textTitle = '',zmStart = null,zmEnd = null,yMax = 0 ,curInt = null,ybl,target;
    if(id == 'yhm'){
        textTitle = 'HTTP响应码>=400';
        ybl = false;
        target = 'axis'
    }else if(id == 'yhs'){
        textTitle = 'HTTP相应时延长>=500';
        ybl = true;
        target = 'nones'
    }
    if(xAry.length > 8){ //每个坐标系最多显示十条信息
        var surplus = xAry.length - 8;
        var s_index = Math.round(surplus*move);
        if(xAry.length - 8 < s_index){
            s_index = xAry.length - 8;
        }
        if(Boolean(move)){
            zmStart = xAry[s_index];
            zmEnd = xAry[s_index+8];
        }else{
            zmStart = xAry[0];
            zmEnd = xAry[7];
        }
            
    }
    for(var i=0;i<yAry.length;i++){ //获取最大值
        if(yAry[i] > yMax){
            yMax = yAry[i]
        }
    }
    yMax = yMax % 10 > 0 ? yMax + 10 - yMax % 10 : yMax; //取最大值的10的整数倍
    yMax = yMax + 10;
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById(id));
    myChart.clear();
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: textTitle,
            left:0,
            top:20,
            textStyle: {
                fontSize: 16,
                color: 'rgba(0,0,0,0.85)',
            }
        },
        grid:{
            top:120,
            left:34,
            right:0
        },
        xAxis: {
            type: 'category',
            data: xAry,
            //triggerEvent:true,
            axisLine: {
                lineStyle:{
                    color:'#BFBFBF'
                }
            },
            axisTick: {
                length: 4,
                alignWithLabel:true,
                lineStyle:{
                    color:'#BFBFBF'
                }
            },
            axisLabel: {
                interval:0,
                color: 'rgba(0,0,0,0.65)',
            },
            axisPointer: {
                type:'none',
                label:{
                    show:true,
                    margin:8,
                    padding:[0,0,0,0],
                    color:'#14B8B8',
                    backgroundColor:'#fff',
                    shadowBlur:0,
                },
                shadowStyle:{
                    color:'rgba(43, 209, 197, 0.1797)'
                }
            },
        },
        yAxis: {
            type: 'value',
            name:'ms',
            max:yMax,
            nameTextStyle:{
                color:'rgba(0,0,0,0.45)',
                fontSize:13,
                padding:[0,30,20,0]
            },
            axisLine: {
                show: false
            },
            axisTick: {
                length: 0
            },
            axisLabel: {
                color: 'rgba(0,0,0,0.65)',
            },
            splitLine:{
                lineStyle:{
                    color:'#E9E9E9',
                    type:'dashed'
                }
            }
        },
        dataZoom:[{
            type:'inside', 
            zoomLock:true,
            startValue:zmStart,
            endValue:zmEnd   
        }],
        tooltip: {
            trigger: target,
            triggerOn:'click',
            position:function(point,params,dom,rect,size){
                //console.log(point);
                if(id != 'yhs'){
                    var oW = size.viewSize[0];
                    var pie = $('#'+id+'1').parent();
                    var piew = pie.width();
                    var pieh = pie.height();
                    if((oW - point[0]) < (piew + 50)){
                        left = point[0] - piew - 50;
                        pie.find('em').addClass('right')
                    }else{
                        left = point[0] + 50;
                        pie.find('em').removeClass('right')
                    }
                    pie.css({'top':point[1] - pieh*2/3 + 'px','left':left + 'px'})
                }
            },
            formatter: function(params, ticket, callback) {
                var htmlStr = '';
                //console.log(params[0])
                var xName = params[0].name; //x轴的名称  
                var index = params[0].dataIndex;  //点击位置索引
                
            }
        },
        series: [{
            type: 'bar',
            barMaxWidth:50,
            data: yAry,
            //cursor: 'pointer',
            silent:ybl, 
            animation:false,
            itemStyle: {
                color: function(params){
                    var key = params.dataIndex;
                    if(key === curInt && id != 'yhs'){
                      return '#00766d'
                    }else{
                      return '#2BD1C5'
                    }
                }
            },
            emphasis:{
                label:{
                    show:true,
                    position:'top',
                    color:'#2BD1C5',
                },
                itemStyle:{
                    color:'#00766d'
                }
            },
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    // 使用刚指定的配置项和数据显示图表。
    myChart.off('click');
    myChart.on('click', function (params) {
        var type = params.componentType;
        var xName = params.name
        curInt = params.dataIndex;
        myChart.setOption(option);
        if(id != 'yhs' && type == "series"){
            $('#'+id+'1').parent().show();
            barChartHoriz2(id+'1', xName,childAry[curInt],move)
        }
    });
    myChart.off('mouseout');
    myChart.on('mouseout',function(params){
        //console.log(params)
        var type = params.componentType;
        if(id != 'yhs' && type == "series"){
            $('.pie').hide();
            curInt = null;
            myChart.setOption(option)
        }
    })
    $('.pie').unbind();
    $('.pie').on('mouseover',function(){
        $('.pie').show();
    })
    
};
function barChartHoriz2(id, subtitle, ary) {  //用户数据定界-饼状图渲染
    var lDate = [],sDate = [], numberTotal = 0,elem = {};
    for(var item in ary){
        numberTotal += Number(ary[item])
    }
    for(var item in ary){
        var name_i = item;
        //name_i = name_i.length > 5 ? name_i.slice(0,5) + '...' :name_i;
        item1 = name_i ;//+'：'+(100*ary[item]/numberTotal).toFixed(2)+'%';
        lDate.push(item1);
        //var pecent = ((ary[item] / numberTotal) * 100).toFixed(2);
        elem = {
            value:ary[item],
            name:item1,
        };
        sDate.push(elem)
    };
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById(id));
    myChart.clear();
    var option = {
        title: {
            text: '响应码>=400',
            left:0,
            padding:[15,0,0,20],
            textStyle: {
                color:'rgba(0,0,0,0.85)',
                fontSize: 12,
            }
        },
        tooltip:{
            trigger:'item',
            formatter: '{b}  {c}次  {d}%'
        },
        legend: {
            data: lDate,
            left: 205,
            top:'middle',
            orient:'vertical',
            itemWidth: 6,
            itemHeight: 6,
            selectedMode: false,
            textStyle: {
                fontSize: 12,
                color:'rgba(0,0,0,0.45)'
            },
            formatter: function (name) {
                if (!name) return '';
                var name1 = name;
                if (name.split(' ').length > 2) {
                    name1 =  name.name.split(' ')[0] +' '+ name.name.split(' ')[1] + '...' ;
                }else{
                    if(name.length > 20){
                        name1 = name.slice(0,20) + '...'
                    }
                }
                name = name1 +'   ' +ary[name] +'次   '+ Math.round(100*ary[name]/numberTotal)+'%'
                return name;
            },
        },
        series: [{
            type: 'pie',
            //silent: true,
            hoverAnimation: false,
            radius: 63,
            cursor: 'defaut',
            center: ['28.89%', '55.34%'],
            data: sDate,
            label: {
                show: true,
                position: 'inside',
                fontSize: 12,
                color: '#FFF',
                formatter:function(params){
                    var value = params.value;
                    return Math.round(100*value/numberTotal) + '%'
                }
            },
            itemStyle:{
                color:function(params){
                    var colorList = ['#2492FC','#2BD1C5','#FBAC25','#FF599C','#B651F4','#4DC1FF','#59EEE3'];
                    var index = params.dataIndex;
                    if(index > colorList.length-1){
                        index = index - colorList.length + 1
                    }
                    return colorList[index]
                }
            }
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
};