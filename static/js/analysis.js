$.ajax({
    type: 'get',
    url: '/common/click_xlsx/',
    data: '',
    dataType: 'json',
    success: function(data) {
        var cityClickhtml = '';
        var val = Number(1);
        for (var i = 0; i < data.length; i++) {
            cityClickhtml += '<tr><td>' + val + '</td><td>' + data[i].city + '</td><td>' + data[i].avg + '</td>';
            var count = data[i].month.length;
            var str = "<tr><th rowspan='2'>序号</th><th rowspan='2'>地市</th><th rowspan='2'>累计点击量</th><th colspan='" + data[i].month.length + "'>月点击总量</th></tr><tr>";
            for (var j = 1; j < count + 1; j++) {
                str += "<th>" + j + "月</th>";
            }
            str += "</tr>";
            $('.cityClicktable thead').html(str);
            for (var k = 0; k < data[i].month.length; k++) {
                cityClickhtml += '<td>' + data[i].month[k] + '</td>';
            }
            val++;
            cityClickhtml += '</tr>';
        };
        $('.cityClicktable tbody').html(cityClickhtml);
        $('.cityClicktable thead tr:nth-child(1)').children('th:nth-child(1)').css('width', '4%');
        $('.cityClicktable thead tr:nth-child(1)').children('th:nth-child(2)').css('width', '5%');
        $('.cityClicktable thead tr:nth-child(1)').children('th:nth-child(3)').css('width', '8%');
    }
});

// $(function() {
//     $('#container6').hide();
//     var yearArr = [];
//     var monthArr = [];
//     for (var i = 1990; i < 2099; i++) {
//         yearArr.push(i + "年");
//         $(".laydate-box-one #yearList").append('<option value="' + (i + "年") + '">' + i + "年" + "</option>")
//     }
//     for (var j = 1; j < 13; j++) {
//         monthArr.push(j + "月");
//         $(".laydate-box-one #monthList").append('<option value="' + (j + "月") + '">' + j + "月" + "</option>")
//     }
//     var d = new Date();
//     var currYear = d.getFullYear();
//     var currMonth = (d.getMonth() + 1);
//     var currDate = d.getDate();
//     $(".laydate-box-one #laydateInput").val(currYear + " - " + currMonth + " - " + (d.getDate() - 1));
//     $(".laydate-box-one #yearList").val(currYear + "年");
//     $(".laydate-box-one #monthList").val(currMonth + "月");
//     $(".laydate-box-one .reback").eq(0).click(function() {
//         var d = new Date();
//         var currYear = d.getFullYear();
//         var currMonth = (d.getMonth() + 1);
//         $(".laydate-box-one #yearList").val(currYear + "年");
//         $(".laydate-box-one #monthList").val(currMonth + "月");
//         $(".laydate-box-one #laydateInput").val(currYear + " - " + currMonth + " - " + (d.getDate() - 1));
//         ergodicDate(currYear, currMonth);
//         getSelectDate(currYear + " - " + currMonth + " - " + d.getDate());
//         ajaxchart($(".laydate-box-one #laydateInput").val());
//         $('.laydate-box-one .curdate span').eq(0).text($("#laydateInput").val());
//     });
//     $('.laydate-box-one .curdate span').eq(0).text(currYear + " 年 " + currMonth + " 月 " + (d.getDate() - 1) + '日');
//     var currN = 0;
//     var currK = 0;
//     ergodicDate(currYear, currMonth);

//     function ergodicDate(year, month) {
//         var preMonth = month - 1;
//         var preYear = year;
//         if (preMonth < 1) {
//             preMonth = 12;
//             preYear - 1
//         }
//         var preMonthLength = getMonthLength(preYear, preMonth);
//         $(".laydate-box-one .day-tabel").eq(0).empty();
//         var date1 = new Date(year + "/" + month + "/" + 1).getDay();

//         function getMonthLength(year, month) {
//             function isLeapYear(year) { return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0) }
//             if (month == 4 || month == 6 || month == 9 || month == 11) { month = 30; return month } else { if (month == 2) { if (isLeapYear == true) { month = 29; return month } else { month = 28; return month } } else { month = 31; return month } }
//         }
//         var dayLength = getMonthLength(year, month);
//         var dayArr = [];
//         for (var m = 1; m < dayLength + 1; m++) { dayArr.push(m) }
//         var flag = false;
//         for (var k = 0; k < 6; k++) {
//             var li1 = $('<li class="tabel-line"></li>');
//             var ul2 = $('<ul class="tabel-ul"></ul>');
//             for (var n = 0; n < 7; n++) {
//                 if (k == 0 && n < date1) {
//                     if (currDate < 7 && (preMonthLength - date1 + n + 1) == (currDate - 1)) {
//                         if (n == 6) {
//                             ul2.append('<li class="tabel-li preDays active weekColor">' + (preMonthLength - date1 + n + 1) + "</li>")
//                         } else {
//                             ul2.append('<li class="tabel-li preDays active">' + (preMonthLength - date1 + n + 1) + "</li>")
//                         }
//                     } else {
//                         if (n == 6) {
//                             ul2.append('<li class="tabel-li preDays weekColor">' + (preMonthLength - date1 + n + 1) + "</li>")
//                         } else { ul2.append('<li class="tabel-li preDays">' + (preMonthLength - date1 + n + 1) + "</li>") }
//                     }
//                 } else {
//                     if (k == 0) {
//                         if (currDate < 7 && (dayArr[n - date1]) == (currDate - 1)) {
//                             if (n == 6) {
//                                 ul2.append('<li class="tabel-li active weekColor">' + dayArr[n - date1] + "</li>")
//                             } else { ul2.append('<li class="tabel-li active">' + dayArr[n - date1] + "</li>") }
//                         } else {
//                             if (n == 6) {
//                                 ul2.append('<li class="tabel-li weekColor">' + dayArr[n - date1] + "</li>")
//                             } else { ul2.append('<li class="tabel-li">' + dayArr[n - date1] + "</li>") }
//                         }
//                     } else {
//                         if ((k * 7 - date1 + n + 1) > dayArr.length) { break } else {
//                             if (currDate >= 2 && (k * 7 - date1 + n + 1) == (currDate - 1)) {
//                                 if (n == 0 || n == 6) {
//                                     ul2.append('<li class="tabel-li active weekColor">' + (k * 7 - date1 + n + 1) + "</li>")
//                                 } else { ul2.append('<li class="tabel-li active">' + (k * 7 - date1 + n + 1) + "</li>") }
//                             } else {
//                                 if (n == 0 || n == 6) {
//                                     ul2.append('<li class="tabel-li weekColor">' + (k * 7 - date1 + n + 1) + "</li>")
//                                 } else { ul2.append('<li class="tabel-li">' + (k * 7 - date1 + n + 1) + "</li>") }
//                             }
//                             if ((k * 7 - date1 + n + 1) == dayArr.length) {
//                                 flag = true;
//                                 currN = n;
//                                 currK = k
//                             }
//                         }
//                     }
//                 }
//             }
//             li1.append(ul2);
//             $(".laydate-box-one .day-tabel").eq(0).append(li1);
//             if (flag == true) {
//                 for (var q = 0; q < 6 - currN; q++) {
//                     $(".laydate-box-one .tabel-line").eq(currK).children().append('<li class="tabel-li nextDay">' + (q + 1) + "</li>")
//                 }
//                 break
//             }
//         }
//     }
//     $(".laydate-box-one #yearList,.laydate-box-one #monthList, .laydate-box-one .reback").on("click", function(e) { e.stopPropagation() });
//     $(".laydate-box-one #yearList,.laydate-box-one #monthList").on("change", function(e) {
//         ergodicDate($(".laydate-box-one #yearList").val().split("年")[0], $(".laydate-box-one #monthList").val().split("月")[0]);
//         $(".laydate-box-one #laydateInput").val($(".laydate-box-one #yearList").val().split("年")[0] + " - " + $(".laydate-box-one #monthList").val().split("月")[0] + " - " + (currDate - 1));
//         getSelectDate($(".laydate-box-one #yearList").val().split("年")[0] + " - " + $(".laydate-box-one #monthList").val().split("月")[0] + " - " + (currDate - 1))
//         ajaxchart($(".laydate-box-one #laydateInput").val());
//         $('.laydate-box-one .curdate span').eq(0).text($(".laydate-box-one #laydateInput").val());
//         var year = $("#laydateInput").val().split('-')[0];
//         var mon = $("#laydateInput").val().split('-')[1];
//         var day = $("#laydateInput").val().split('-')[2];
//         $('.txt .biaoti span').eq(0).text(year + '年' + mon + '月' + day + '日');
//         $('.txtMon .biaoti span').eq(0).text(year + '年' + mon + '月');
//     });
//     $(".laydate-box-one .day-tabel").on("click", ".tabel-li", function(e) {
//         e.stopPropagation();
//         $(this).addClass("showClick").siblings().removeClass("showClick").parent().parent().siblings().find(".tabel-li").removeClass("showClick");
//         var parentIndex = $(this).parent().parent().index();
//         var thisIndex = $(this).index();
//         if (parentIndex == 0 && $(this).html() > 7) {
//             var selectDate;
//             if (($(".laydate-box-one #monthList").val().split("月")[0] - 1) > 0) {
//                 selectDate = $(".laydate-box-one #yearList").val().split("年")[0] + " - " + ($(".laydate-box-one #monthList").val().split("月")[0] - 1) + " - " + $(this).html();
//                 ergodicDate($(".laydate-box-one #yearList").val().split("年")[0], ($(".laydate-box-one #monthList").val().split("月")[0] - 1));
//                 $(".laydate-box-one #yearList").val($(".laydate-box-one #yearList").val().split("年")[0] + "年");
//                 $(".laydate-box-one #monthList").val(($(".laydate-box-one #monthList").val().split("月")[0] - 1) + "月")
//             } else {
//                 selectDate = ($(".laydate-box-one #yearList").val().split("年")[0] - 1) + " - " + 12 + " - " + $(this).html();
//                 ergodicDate(($(".laydate-box-one #yearList").val().split("年")[0] - 1), 12);
//                 $(".laydate-box-one #yearList").val(($(".laydate-box-one #yearList").val().split("年")[0] - 1) + "年");
//                 $(".laydate-box-one #monthList").val(12 + "月")
//             }
//         } else {
//             if (parentIndex == currK && $(this).html() < 7) {
//                 if (parseInt($(".laydate-box-one #monthList").val().split("月")[0]) + 1 > 12) {
//                     selectDate = (parseInt($(".laydate-box-one #yearList").val().split("年")[0]) + 1) + " - " + 1 + " - " + $(this).html();
//                     ergodicDate($(".laydate-box-one #yearList").val().split("年")[0], ($(".laydate-box-one #monthList").val().split("月")[0] - 1));
//                     $(".laydate-box-one #yearList").val((parseInt($(".laydate-box-one #yearList").val().split("年")[0]) + 1) + "年");
//                     $(".laydate-box-one #monthList").val(1 + "月")
//                 } else {
//                     selectDate = ($(".laydate-box-one #yearList").val().split("年")[0]) + " - " + (parseInt($(".laydate-box-one #monthList").val().split("月")[0]) + 1) + " - " + $(this).html();
//                     ergodicDate(($(".laydate-box-one #yearList").val().split("年")[0]), (parseInt($(".laydate-box-one #monthList").val().split("月")[0]) + 1));
//                     $(".laydate-box-one #yearList").val(($(".laydate-box-one #yearList").val().split("年")[0]) + "年");
//                     $(".laydate-box-one #monthList").val((parseInt($(".laydate-box-one #monthList").val().split("月")[0]) + 1) + "月")
//                 }
//             } else { selectDate = $(".laydate-box-one #yearList").val().split("年")[0] + " - " + $(".laydate-box-one #monthList").val().split("月")[0] + " - " + $(this).html() }
//         }
//         $(".laydate-box-one #laydateInput").val(selectDate);
//         var getDate = $(".laydate-box-one #yearList").val().split("年")[0] + " - " + $(".laydate-box-one #monthList").val().split("月")[0] + " - " + $(this).html();
//         getSelectDate(getDate);
//         ajaxchart($(".laydate-box-one #laydateInput").val());
//         $('.laydate-box-one .curdate span').eq(0).text($(".laydate-box-one #laydateInput").val());
//         var year = $("#laydateInput").val().split('-')[0];
//         var mon = $("#laydateInput").val().split('-')[1];
//         var day = $("#laydateInput").val().split('-')[2];
//         $('.txt .biaoti span').eq(0).text(year + '年' + mon + '月' + day + '日');
//         $('.txtMon .biaoti span').eq(0).text(year + '年' + mon + '月');
//     });
//     var ajaxdata = 0;
//     var nowdata = '';

//     function downloadFile(url, timeString) {
//         var form = $("<form>"); //定义form表单,通过表单发送请求
//         form.attr("style", "display:none"); //设置为不显示
//         form.attr("target", "");
//         form.attr("method", "post"); //设置请求类型  
//         form.attr("action", url); //设置请求路径
//         var input1 = $('<input>');
//         input1.attr('type', 'hidden');
//         input1.attr('name', 'now');
//         input1.attr('value', timeString);
//         $('body').append(form); //将表单放置在web中
//         form.append(input1); //将查询参数控件提交到表单上
//         form.submit(); //表单提交
//     }
//     $('button.loadd').click(function() {
//         var loadDate = '';
//         loadDate = $("#laydateInput").val();
//         downloadFile('/common/download_daily/', loadDate);
//     });
//     var year = $("#laydateInput").val().split('-')[0];
//     var mon = $("#laydateInput").val().split('-')[1];
//     var day = $("#laydateInput").val().split('-')[2];
//     $('.txt .biaoti span').eq(0).text(year + '年' + mon + '月' + day + '日');
//     $('.txtMon .biaoti span').eq(0).text(year + '年' + mon + '月');

//     function ajaxchart(nowdata) {
//         $('#container6').hide();
//         // 第2部分表格
//         var normalTimeMi = [];
//         var normalValMi = [];
//         var timeoutTimeMi = [];
//         var timeoutValMi = [];
//         var errorTimeMi = [];
//         var errorValMi = [];

//         var normalTimeSe = [];
//         var normalValSe = [];
//         var timeoutTimeSe = [];
//         var timeoutValSe = [];
//         var errorTimeSe = [];
//         var errorValSe = [];
//         var daily_errorX = [];
//         var daily_errorY = [];
//         var cityhtml = '';

//         var srecv = [];
//         var recv = [];
//         var serror = [];
//         var error = [];
//         var stimeout = [];
//         var timeout = [];

//         $.ajax({
//             type: 'post',
//             url: '/common/day_chart/',
//             data: { "now": nowdata },
//             dataType: 'json',
//             success: function(data) {
//                 if (data.msg == '0') {
//                     $('.laydate-box').siblings().hide();
//                     alert('此时该功能还未上线');
//                     $('button.loadd').hide();
//                 } else if (data.msg == '1') {
//                     $('.laydate-box').siblings().hide();
//                     alert('此时数据还未统计');
//                     $('button.loadd').hide();
//                 } else {
//                     $('.laydate-box').siblings().show();
//                     $('button.loadd').show();
//                     var countTotal = 0;
//                     for (var i = 0; i < data.city5G.length; i++) {
//                         for (var j in data.city5G[i]) {
//                             cityhtml += '<tr><td>' + j + '</td><td>' + data.city5G[i][j] + '</td></tr>';
//                             countTotal += data.city5G[i][j];
//                         }
//                     }
//                     cityhtml += '<tr><td>总计</td><td>' + countTotal + '</td></tr>';
//                     $('.citytable tbody').html(cityhtml);
//                     // 第1个表
//                     recv = data.recv_time;
//                     for (var i = 0; i < recv.length; i++) {
//                         for (var j in recv[i]) {
//                             normalTimeMi.push(j);
//                             normalValMi.push(recv[i][j]);
//                         }
//                     }
//                     error = data.error_time;
//                     for (var i = 0; i < error.length; i++) {
//                         for (var j in error[i]) {
//                             errorTimeMi.push(j);
//                             errorValMi.push(error[i][j]);
//                         }
//                     }
//                     // 第2个表
//                     srecv = data.s_recv_time;
//                     serror = data.s_error_time;
//                     // 第3个表
//                     recv = data.recv_time;
//                     timeout = data.timeout_time;
//                     // 第4个表
//                     srecv = data.s_recv_time;
//                     stimeout = data.s_timeout_time;
//                     // 第5个表
//                     for (var i = 0; i < data.daily_error.length; i++) {
//                         for (var j in data.daily_error[i]) {
//                             daily_errorX.push(j);
//                             daily_errorY.push(data.daily_error[i][j]);
//                         }
//                     };
//                     var str = '';
//                     str += "<p>工单总数为" + data.total_form + "</p></n>";
//                     str += "<p>异常工单总数为" + data.error_form + ",占比" + data.error_form_rate + "</p></n>";
//                     str += "<p>超时工单总数为" + data.timeout_form + ",占比" + data.timeout_form_rate + "</p></n>";
//                     str += "<p>已完成工单总数为" + data.finish_form + "</p></n>";
//                     str += "<p>终端问题总数为" + data.terminal_problem + ",占比" + data.terminal_problem_rate + "</p></n>";
//                     str += "<p>用户签约数据问题总数为" + data.sign_problem + ",占比" + data.sign_problem_rate + "</p></n>";
//                     str += "<p>无用户数据总数为" + data.nodata_problem + ",占比" + data.nodata_problem_rate + "</p></n>";
//                     str += "<p>核心网问题总数为" + data.corenet_problem + ",占比" + data.corenet_problem_rate + "</p></n>";
//                     str += "<p>业务sp问题总数为" + data.sp_problem + ",占比" + data.sp_problem_rate + "</p></n>";
//                     str += "<p>用户终端业务问题总数为" + data.user_terminal_problem + ",占比" + data.user_terminal_problem_rate + "</p></n>";
//                     str += "<p>无线问题总数为" + data.wireless_problem + ",占比" + data.wireless_problem_rate + "</p></n>";
//                     str += "<p>定界无异常总数为" + data.no_error_problem + ",占比" + data.no_error_problem_rate + "</p></n>";
//                     $('.txt .ptot').html(str);

//                     var str1 = '';
//                     str1 += "<p>工单总数为" + data.month_total_form + "</p></n>";
//                     str1 += "<p>异常工单总数为" + data.month_error_form + ",占比" + data.month_error_form_rate + "</p></n>";
//                     str1 += "<p>超时工单总数为" + data.month_timeout_form + ",占比" + data.month_timeout_form_rate + "</p></n>";
//                     str1 += "<p>已完成工单总数为" + data.month_finish_form + "</p></n>";
//                     str1 += "<p>终端问题总数为" + data.month_terminal_problem + ",占比" + data.month_terminal_problem_rate + "</p></n>";
//                     str1 += "<p>用户签约数据问题总数为" + data.month_sign_problem + ",占比" + data.month_sign_problem_rate + "</p></n>";
//                     str1 += "<p>无用户数据总数为" + data.month_nodata_problem + ",占比" + data.month_nodata_problem_rate + "</p></n>";
//                     str1 += "<p>核心网问题总数为" + data.month_corenet_problem + ",占比" + data.month_corenet_problem_rate + "</p></n>";
//                     str1 += "<p>业务sp问题总数为" + data.month_sp_problem + ",占比" + data.month_sp_problem_rate + "</p></n>";
//                     str1 += "<p>用户终端业务问题总数为" + data.month_user_terminal_problem + ",占比" + data.month_user_terminal_problem_rate + "</p></n>";
//                     str1 += "<p>无线问题总数为" + data.month_wireless_problem + ",占比" + data.month_wireless_problem_rate + "</p></n>";
//                     str1 += "<p>定界无异常总数为" + data.month_no_error_problem + ",占比" + data.month_no_error_problem_rate + "</p></n>";
//                     $('.txtMon .ptot').html(str1);
//                     // 点击更多
//                     var myChart1 = echarts.init(document.getElementById('container1'));
//                     var option1 = {
//                         title: {
//                             text: '异常情况',
//                             subtext: ''
//                         },
//                         legend: {
//                             data: ['提交工单数', '异常数'],
//                             right: "5%",
//                             top: '3%',
//                         },
//                         tooltip: {
//                             trigger: 'axis'
//                         },
//                         xAxis: {
//                             type: 'category',
//                             name: '时间/min',
//                             nameLocation: 'end',
//                             splitLine: {
//                                 show: true,
//                                 interval: '0.5'
//                             },
//                             nameGap: 25,
//                             data: normalTimeMi,
//                             axisLabel: {
//                                 show: true,
//                                 inside: false,
//                                 rotate: 60,
//                                 margin: 5,
//                             },
//                         },
//                         yAxis: {
//                             name: '数量',
//                             nameLocation: 'end',
//                             splitNumber: 10,
//                             splitLine: {
//                                 show: true,
//                                 interval: '0.5'
//                             },
//                         },
//                         grid: {
//                             bottom: "20%"
//                         },
//                         toolbox: {
//                             feature: {
//                                 saveAsImage: {
//                                     type: 'png',
//                                     show: true,
//                                 }
//                             },
//                             top: 10,
//                         },
//                         dataZoom: [{
//                             type: 'inside',
//                             id: '',
//                             disabled: false,
//                             xAxisIndex: null,
//                             yAxisIndex: null,
//                             radiusAxisIndex: null,
//                             angleAxisIndex: null,
//                             filterMode: 'filter',
//                             start: 0,
//                             end: 100,
//                             startValue: null,
//                             endValue: null,
//                             minSpan: null,
//                             maxSpan: null,
//                             minValueSpan: null,
//                             maxValueSpan: null,
//                             orient: null,
//                             zoomLock: false,
//                             throttle: 100,
//                             rangeMode: ['percent', 'percent'],
//                             zoomOnMouseWheel: true,
//                             moveOnMouseMove: true,
//                             moveOnMouseWheel: true,
//                             preventDefaultMouseMove: true,
//                         }],
//                         series: [{
//                             name: '提交工单数',
//                             type: 'bar',
//                             symbol: 'circle',
//                             visualMap: [{
//                                 outOfRange: {
//                                     color: ['#121122', 'rgba(3,4,5,0.4)', 'red'],
//                                     symbolSize: [30, 100]
//                                 }
//                             }],
//                             itemStyle: {
//                                 color: '#5B9BD5'
//                             },
//                             data: normalValMi,
//                             markPoint: {
//                                 data: [
//                                     { type: 'max', name: '最大值' },
//                                 ],
//                                 label: { formatter: '{b}\n{c}' },
//                                 symbolSize: 65,
//                             },
//                         }, {
//                             name: '异常数',
//                             type: 'bar',
//                             data: errorValMi,
//                             markPoint: {
//                                 data: [
//                                     { type: 'max', name: '最大值' },
//                                 ],
//                                 label: { formatter: '{b}\n{c}' },
//                                 symbolSize: 65,
//                             },
//                         }],
//                     };
//                     myChart1.setOption(option1);
//                     if (data.daily_error.length == 0) {
//                         var str = '<div class="p">系统无异常!</div>';
//                         $('#container5').html(str);
//                     } else {
//                         // 第5个表
//                         var myChart5 = echarts.init(document.getElementById('container5'));
//                         // 指定图表的配置项和数据
//                         var option5 = {
//                             //--------------    标题 title  ----------------   
//                             title: {
//                                 text: '异常统计',
//                                 textStyle: { //---主标题内容样式    
//                                     color: 'black'
//                                 },
//                                 top: '0',
//                                 subtext: '', //---副标题内容样式
//                                 subtextStyle: {
//                                     color: '#bbb'
//                                 },
//                                 padding: [0, 0, 0, 100] //---标题位置,因为图形是是放在一个dom中,因此用padding属性来定位
//                             },
//                             //----------------   图例 legend  -----------------
//                             legend: {
//                                 type: 'plain', //----图例类型，默认为'plain'，当图例很多时可使用'scroll'
//                                 right: "5%",
//                                 top: '3%',
//                                 selected: {
//                                     '数量': true, //----图例选择,图形加载出来会显示选择的图例，默认为true
//                                 },
//                                 textStyle: { //----图例内容样式
//                                     color: '#666', //---所有图例的字体颜色
//                                     //backgroundColor:'black',  //---所有图例的字体背景色
//                                 },
//                                 tooltip: { //图例提示框，默认不显示
//                                     show: true,
//                                     color: 'red',
//                                 },
//                                 data: [ //----图例内容
//                                     {
//                                         name: '数量',
//                                         icon: 'roundRect', //----图例的外框样式
//                                         textStyle: {
//                                             color: '#666', //----单独设置某一个图例的颜色
//                                             //backgroundColor:'black',//---单独设置某一个图例的字体背景色
//                                         }
//                                     }
//                                 ],
//                             },
//                             //-------------  grid区域  ----------------
//                             grid: {
//                                 show: false, //---是否显示直角坐标系网格
//                                 top: 80, //---相对位置，top\bottom\left\right  
//                                 containLabel: false, //---grid 区域是否包含坐标轴的刻度标签
//                                 tooltip: { //---鼠标焦点放在图形上，产生的提示框
//                                     show: true,
//                                     trigger: 'item', //---触发类型
//                                     textStyle: {
//                                         color: '#666',
//                                     },
//                                 },
//                                 bottom: "20%"
//                             },
//                             tooltip: {
//                                 trigger: 'axis',
//                                 tooltip: {
//                                     trigger: 'axis',
//                                     textStyle: {
//                                         color: '#fff'
//                                     }
//                                 },
//                             },
//                             //-------------   x轴   -------------------
//                             xAxis: {
//                                 show: true, //---是否显示
//                                 position: 'bottom', //---x轴位置
//                                 offset: 0, //---x轴相对于默认位置的偏移
//                                 type: 'category', //---轴类型，默认'category'
//                                 name: '异常原因分类', //---轴名称
//                                 nameLocation: 'end', //---轴名称相对位置
//                                 nameTextStyle: { //---坐标轴名称样式
//                                     color: "#666",
//                                     padding: [5, 0, 0, -5], //---坐标轴名称相对位置
//                                 },
//                                 nameGap: 15, //---坐标轴名称与轴线之间的距离
//                                 // nameRotate: 270, //---坐标轴名字旋转

//                                 axisLine: { //---坐标轴 轴线
//                                     show: true, //---是否显示

//                                     //------------------- 箭头 -------------------------
//                                     symbol: ['none', 'arrow'], //---是否显示轴线箭头
//                                     symbolSize: [8, 8], //---箭头大小
//                                     symbolOffset: [0, 7], //---箭头位置

//                                     //------------------- 线 -------------------------
//                                     lineStyle: {
//                                         color: '#666',
//                                         width: 1,
//                                         type: 'solid',
//                                     },
//                                 },
//                                 axisTick: { //---坐标轴 刻度
//                                     show: true, //---是否显示
//                                     inside: true, //---是否朝内
//                                     lengt: 3, //---长度
//                                     lineStyle: {
//                                         //color:'red',          //---默认取轴线的颜色
//                                         width: 1,
//                                         type: 'solid',
//                                     },
//                                 },
//                                 axisLabel: { //---坐标轴 标签
//                                     show: true, //---是否显示
//                                     inside: false, //---是否朝内
//                                     rotate: 0, //---旋转角度   
//                                     margin: 5, //---刻度标签与轴线之间的距离
//                                     color: 'black', //---默认取轴线的颜色
//                                 },
//                                 splitLine: { //---grid 区域中的分隔线
//                                     show: false, //---是否显示，'category'类目轴不显示，此时我的X轴为类目轴，splitLine属性是无意义的
//                                     lineStyle: {
//                                         //color:'red',
//                                         //width:1,
//                                         //type:'solid',
//                                     },
//                                 },
//                                 splitArea: { //--网格区域
//                                     show: false, //---是否显示，默认false
//                                 },
//                                 data: daily_errorX, //内容
//                             },

//                             //----------------------  y轴  ------------------------
//                             yAxis: {
//                                 show: true, //---是否显示
//                                 position: 'left', //---y轴位置
//                                 offset: 0, //---y轴相对于默认位置的偏移
//                                 type: 'value', //---轴类型，默认'category'
//                                 name: '数量', //---轴名称
//                                 nameLocation: 'end', //---轴名称相对位置value
//                                 nameTextStyle: { //---坐标轴名称样式
//                                     color: "#666",
//                                     // padding: [5, 0, 0, 5], //---坐标轴名称相对位置
//                                     padding: [5, 0, 0, 5],
//                                 },
//                                 nameGap: 15, //---坐标轴名称与轴线之间的距离
//                                 //nameRotate:270,           //---坐标轴名字旋转

//                                 axisLine: { //---坐标轴 轴线
//                                     show: true, //---是否显示

//                                     //------------------- 箭头 -------------------------
//                                     symbol: ['none', 'arrow'], //---是否显示轴线箭头
//                                     symbolSize: [8, 8], //---箭头大小
//                                     symbolOffset: [0, 7], //---箭头位置

//                                     //------------------- 线 -------------------------
//                                     lineStyle: {
//                                         color: '#666',
//                                         width: 1,
//                                         type: 'solid',
//                                     },
//                                 },
//                                 axisTick: { //---坐标轴 刻度
//                                     show: true, //---是否显示
//                                     inside: true, //---是否朝内
//                                     lengt: 3, //---长度
//                                     lineStyle: {
//                                         //color:'red',          //---默认取轴线的颜色
//                                         width: 1,
//                                         type: 'solid',
//                                     },
//                                 },
//                                 axisLabel: { //---坐标轴 标签
//                                     show: true, //---是否显示
//                                     inside: false, //---是否朝内
//                                     rotate: 0, //---旋转角度   
//                                     margin: 8, //---刻度标签与轴线之间的距离
//                                     color: 'black', //---默认取轴线的颜色
//                                 },
//                                 splitLine: { //---grid 区域中的分隔线
//                                     show: true, //---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
//                                     lineStyle: {
//                                         color: '#666',
//                                         width: 1,
//                                         type: 'dashed', //---类型
//                                     },
//                                 },
//                                 splitArea: { //--网格区域
//                                     show: false, //---是否显示，默认false
//                                 }
//                             },
//                             toolbox: {
//                                 feature: {
//                                     saveAsImage: {
//                                         type: 'png',
//                                         show: true,
//                                     }
//                                 },
//                                 top: 10,
//                             },
//                             //------------ 内容数据  -----------------
//                             series: [{
//                                 name: '数量', //---系列名称
//                                 type: 'bar', //---类型
//                                 legendHoverLink: true, //---是否启用图例 hover 时的联动高亮
//                                 label: { //---图形上的文本标签
//                                     normal: {
//                                         show: true,
//                                         position: 'top',
//                                         color: 'black',
//                                     }
//                                 },
//                                 itemStyle: { //---图形形状
//                                     color: '#888',
//                                 },
//                                 barWidth: '60', //---柱形宽度
//                                 barCategoryGap: '20%', //---柱形间距
//                                 data: daily_errorY
//                             }]
//                         };

//                         // 使用刚指定的配置项和数据显示图表。
//                         myChart5.setOption(option5);
//                         myChart5.on('click', function(params) {
//                             if (params.dataIndex == 0) {
//                                 $('#container6').show();
//                                 var arr = [];
//                                 for (k in data.error_time_type) {
//                                     if (data.error_time_type[k] != 0) {
//                                         arr.push({ name: k, value: data.error_time_type[k] });
//                                     }
//                                 }
//                                 // 饼图
//                                 var x = params.point.x;
//                                 var y = params.point.y;
//                                 $('#container6').css({ 'left': x, 'top': y });
//                                 var myChart6 = echarts.init(document.getElementById('container6'));
//                                 var option6 = {
//                                     title: {
//                                         text: '失败原因比例',
//                                         x: 'center',
//                                         itemGap: 4,
//                                         textStyle: {
//                                             fontSize: 12,
//                                         },
//                                         subtextStyle: {
//                                             fontSize: 10,
//                                             color: '#666',
//                                         }
//                                     },
//                                     tooltip: {
//                                         trigger: 'axis',
//                                         textStyle: {
//                                             color: '#fff'
//                                         }
//                                     },
//                                     grid: {
//                                         bottom: "20%"
//                                     },
//                                     // legend: {
//                                     //     // bottom: '0',
//                                     //     left: '80',
//                                     //     top: '30',
//                                     //     selectedMode: false,
//                                     //     itemWidth: 5,
//                                     //     itemHeight: 5,
//                                     //     textStyle: {
//                                     //         fontSize: 9
//                                     //     },
//                                     //     // orient: 'vertical',
//                                     // },
//                                     color: ['#BDA29A', '#749F83', '#c23531', '#5B9BD5'],
//                                     series: [{
//                                         type: 'pie',
//                                         silent: true,
//                                         hoverAnimation: false,
//                                         radius: '55%',
//                                         cursor: 'defaut',
//                                         center: ['50%', '56%'],
//                                         data: arr,
//                                     }]
//                                 };
//                                 myChart6.setOption(option6);
//                             } else {
//                                 $('#container6').hide();
//                             }
//                         });

//                     }
//                 }
//             }
//         });


//         $('.classifyTab span').eq(0).click(function() {
//             $('.classifyTab1').show();
//             $('.classifyTab2').hide();
//             $('.classifyTab3').hide();
//             $('.classifyTab4').hide();
//             $('.fenmiaoTab1').show();
//             $('.fenmiaoTab2').hide();
//             $('.fenmiaoTab1 span').eq(0).addClass('activeclick').siblings().removeClass('activeclick');
//             $(this).addClass('activeclick');
//             $(this).siblings().removeClass('activeclick');
//         });
//         $('.fenmiaoTab').each(function() {
//             $(this).find('span').click(function() {
//                 var txt = $(this).text();
//                 var cls = $(this).parent().get(0).className;
//                 if (cls.indexOf('fenmiaoTab1') != -1) {
//                     if (txt == '分') {
//                         $('.classifyTab1').show();
//                         $('.classifyTab2').hide();
//                         $('.classifyTab3').hide();
//                         $('.classifyTab4').hide();
//                     } else if (txt == '秒') {
//                         $('.classifyTab1').hide();
//                         $('.classifyTab2').show();
//                         $('.classifyTab3').hide();
//                         $('.classifyTab4').hide();
//                         for (var i = 0; i < srecv.length; i++) {
//                             for (var j in srecv[i]) {
//                                 normalTimeSe.push(j);
//                                 normalValSe.push(srecv[i][j]);
//                             }
//                         }
//                         for (var i = 0; i < serror.length; i++) {
//                             for (var j in serror[i]) {
//                                 errorTimeSe.push(j);
//                                 errorValSe.push(serror[i][j]);
//                             }
//                         };
//                         var myChart2 = echarts.init(document.getElementById('container2'));
//                         var option2 = {
//                             title: {
//                                 text: '异常情况',
//                                 subtext: ''
//                             },
//                             legend: {
//                                 data: ['提交工单数', '异常数'],
//                                 right: "5%",
//                                 top: '3%',
//                             },
//                             tooltip: {
//                                 trigger: 'axis'
//                             },
//                             xAxis: {
//                                 type: 'category',
//                                 name: '时间/min',
//                                 nameLocation: 'end',
//                                 splitLine: {
//                                     show: true,
//                                     interval: '0.5'
//                                 },
//                                 nameGap: 25,
//                                 data: normalTimeSe,
//                                 axisLabel: {
//                                     show: true,
//                                     inside: false,
//                                     rotate: 60,
//                                     margin: 5,
//                                 },
//                             },
//                             yAxis: {
//                                 name: '数量',
//                                 nameLocation: 'end',
//                                 splitNumber: 10,
//                                 splitLine: {
//                                     show: true,
//                                     interval: '0.5'
//                                 },

//                             },
//                             toolbox: {
//                                 feature: {
//                                     saveAsImage: {
//                                         type: 'png',
//                                         show: true,
//                                     }
//                                 },
//                                 top: 10,
//                             },
//                             grid: {
//                                 bottom: "20%"
//                             },

//                             dataZoom: [{
//                                 type: 'inside',
//                                 id: '',
//                                 disabled: false,
//                                 xAxisIndex: null,
//                                 yAxisIndex: null,
//                                 radiusAxisIndex: null,
//                                 angleAxisIndex: null,
//                                 filterMode: 'filter',
//                                 start: 0,
//                                 end: 100,
//                                 startValue: null,
//                                 endValue: null,
//                                 minSpan: null,
//                                 maxSpan: null,
//                                 minValueSpan: null,
//                                 maxValueSpan: null,
//                                 orient: null,
//                                 zoomLock: false,
//                                 throttle: 100,
//                                 rangeMode: ['percent', 'percent'],
//                                 zoomOnMouseWheel: true,
//                                 moveOnMouseMove: true,
//                                 moveOnMouseWheel: true,
//                                 preventDefaultMouseMove: true,
//                             }],
//                             series: [{
//                                 name: '提交工单数',
//                                 type: 'bar',
//                                 symbol: 'circle',
//                                 visualMap: [{
//                                     outOfRange: {
//                                         color: ['#121122', 'rgba(3,4,5,0.4)', 'red'],
//                                         symbolSize: [30, 100]
//                                     }
//                                 }],
//                                 itemStyle: {
//                                     color: '#5B9BD5'
//                                 },
//                                 data: normalValSe,
//                                 markPoint: {
//                                     data: [
//                                         { type: 'max', name: '最大值' },
//                                     ],
//                                     label: { formatter: '{b}\n{c}' },
//                                     symbolSize: 65,
//                                 },
//                             }, {
//                                 name: '异常数',
//                                 type: 'bar',
//                                 data: errorValSe,
//                                 markPoint: {
//                                     data: [
//                                         { type: 'max', name: '最大值' },
//                                     ],
//                                     label: { formatter: '{b}\n{c}' },
//                                     symbolSize: 65,
//                                 },
//                             }],
//                         };
//                         myChart2.setOption(option2);
//                     }
//                 } else if (cls.indexOf('fenmiaoTab2') != -1) {
//                     if (txt == '分') {
//                         $('.classifyTab1').hide();
//                         $('.classifyTab2').hide();
//                         $('.classifyTab3').show();
//                         $('.classifyTab4').hide();
//                     } else if (txt == '秒') {
//                         $('.classifyTab1').hide();
//                         $('.classifyTab2').hide();
//                         $('.classifyTab3').hide();
//                         $('.classifyTab4').show();
//                         // 第4个表
//                         for (var i = 0; i < srecv.length; i++) {
//                             for (var j in srecv[i]) {
//                                 normalTimeSe.push(j);
//                                 normalValSe.push(srecv[i][j]);
//                             }
//                         }
//                         for (var i = 0; i < stimeout.length; i++) {
//                             for (var j in stimeout[i]) {
//                                 timeoutTimeSe.push(j);
//                                 timeoutValSe.push(stimeout[i][j]);
//                             }
//                         };
//                         var myChart4 = echarts.init(document.getElementById('container4'));
//                         var option4 = {
//                             title: {
//                                 text: '超时情况',
//                                 subtext: ''
//                             },
//                             legend: {
//                                 data: ['提交工单数', '超时数'],
//                                 right: "5%",
//                                 top: '3%',
//                             },
//                             tooltip: {
//                                 trigger: 'axis'
//                             },
//                             xAxis: {
//                                 type: 'category',
//                                 name: '时间/min',
//                                 nameLocation: 'end',
//                                 splitLine: {
//                                     show: true,
//                                     interval: '0.5'
//                                 },
//                                 nameGap: 25,
//                                 data: normalTimeSe,
//                                 axisLabel: {
//                                     show: true,
//                                     inside: false,
//                                     rotate: 60,
//                                     margin: 5,
//                                 },
//                             },
//                             yAxis: {
//                                 name: '数量',
//                                 nameLocation: 'end',
//                                 splitNumber: 10,
//                                 splitLine: {
//                                     show: true,
//                                     interval: '0.5'
//                                 },

//                             },
//                             grid: {
//                                 bottom: "20%"
//                             },
//                             toolbox: {
//                                 feature: {
//                                     saveAsImage: {
//                                         type: 'png',
//                                         show: true,
//                                     }
//                                 },
//                                 top: 10,
//                             },
//                             dataZoom: [{
//                                 type: 'inside',
//                                 id: '',
//                                 disabled: false,
//                                 xAxisIndex: null,
//                                 yAxisIndex: null,
//                                 radiusAxisIndex: null,
//                                 angleAxisIndex: null,
//                                 filterMode: 'filter',
//                                 start: 0,
//                                 end: 100,
//                                 startValue: null,
//                                 endValue: null,
//                                 minSpan: null,
//                                 maxSpan: null,
//                                 minValueSpan: null,
//                                 maxValueSpan: null,
//                                 orient: null,
//                                 zoomLock: false,
//                                 throttle: 100,
//                                 rangeMode: ['percent', 'percent'],
//                                 zoomOnMouseWheel: true,
//                                 moveOnMouseMove: true,
//                                 moveOnMouseWheel: true,
//                                 preventDefaultMouseMove: true,
//                             }],
//                             series: [{
//                                 name: '提交工单数',
//                                 type: 'bar',
//                                 symbol: 'circle',
//                                 visualMap: [{
//                                     outOfRange: {
//                                         color: ['#121122', 'rgba(3,4,5,0.4)', 'red'],
//                                         symbolSize: [30, 100]
//                                     }
//                                 }],
//                                 itemStyle: {
//                                     color: '#5B9BD5'
//                                 },
//                                 data: normalValSe,
//                                 markPoint: {
//                                     data: [
//                                         { type: 'max', name: '最大值' },
//                                     ],
//                                     label: { formatter: '{b}\n{c}' },
//                                     symbolSize: 65,
//                                 }
//                             }, {
//                                 name: '超时数',
//                                 type: 'bar',
//                                 data: timeoutValSe,
//                                 markPoint: {
//                                     data: [
//                                         { type: 'max', name: '最大值' },
//                                     ],
//                                     label: { formatter: '{b}\n{c}' },
//                                     symbolSize: 65,
//                                 }
//                             }],
//                         };
//                         myChart4.setOption(option4);
//                     }
//                 }
//                 $(this).addClass('activeclick').siblings().removeClass('activeclick');
//             })
//         });
//         $('.classifyTab span').eq(1).click(function() {
//             $('.classifyTab1').hide();
//             $('.classifyTab2').hide();
//             $('.classifyTab3').show();
//             $('.classifyTab4').hide();
//             $('.fenmiaoTab1').hide();
//             $('.fenmiaoTab2').show();
//             $('.fenmiaoTab2 span').eq(0).addClass('activeclick').siblings().removeClass('activeclick');
//             $(this).addClass('activeclick');
//             $(this).siblings().removeClass('activeclick');
//             // 第3个表
//             for (var i = 0; i < recv.length; i++) {
//                 for (var j in recv[i]) {
//                     normalTimeMi.push(j);
//                     normalValMi.push(recv[i][j]);
//                 }
//             }
//             for (var i = 0; i < timeout.length; i++) {
//                 for (var j in timeout[i]) {
//                     timeoutTimeMi.push(j);
//                     timeoutValMi.push(timeout[i][j]);
//                 }
//             };
//             var myChart3 = echarts.init(document.getElementById('container3'));
//             var option3 = {
//                 title: {
//                     text: '超时情况',
//                     subtext: ''
//                 },
//                 legend: {
//                     data: ['提交工单数', '超时数'],
//                     right: "5%",
//                     top: '3%',
//                 },
//                 tooltip: {
//                     trigger: 'axis'
//                 },
//                 xAxis: {
//                     type: 'category',
//                     name: '时间/min',
//                     nameLocation: 'end',
//                     splitLine: {
//                         show: true,
//                         interval: '0.5'
//                     },
//                     nameGap: 25,
//                     data: normalTimeMi,
//                     axisLabel: {
//                         show: true,
//                         inside: false,
//                         rotate: 60,
//                         margin: 5,
//                     },
//                 },
//                 yAxis: {
//                     name: '数量',
//                     nameLocation: 'end',
//                     splitNumber: 10,
//                     splitLine: {
//                         show: true,
//                         interval: '0.5'
//                     },

//                 },
//                 toolbox: {
//                     feature: {
//                         saveAsImage: {
//                             type: 'png',
//                             show: true,
//                         }
//                     },
//                     top: 10,
//                 },
//                 grid: {
//                     bottom: "20%"
//                 },
//                 dataZoom: [{
//                     type: 'inside',
//                     id: '',
//                     disabled: false,
//                     xAxisIndex: null,
//                     yAxisIndex: null,
//                     radiusAxisIndex: null,
//                     angleAxisIndex: null,
//                     filterMode: 'filter',
//                     start: 0,
//                     end: 100,
//                     startValue: null,
//                     endValue: null,
//                     minSpan: null,
//                     maxSpan: null,
//                     minValueSpan: null,
//                     maxValueSpan: null,
//                     orient: null,
//                     zoomLock: false,
//                     throttle: 100,
//                     rangeMode: ['percent', 'percent'],
//                     zoomOnMouseWheel: true,
//                     moveOnMouseMove: true,
//                     moveOnMouseWheel: true,
//                     preventDefaultMouseMove: true,
//                 }],
//                 series: [{
//                     name: '提交工单数',
//                     type: 'bar',
//                     symbol: 'circle',
//                     visualMap: [{
//                         outOfRange: {
//                             color: ['#121122', 'rgba(3,4,5,0.4)', 'red'],
//                             symbolSize: [30, 100]
//                         }
//                     }],
//                     itemStyle: {
//                         color: '#5B9BD5'
//                     },
//                     data: normalValMi,
//                     markPoint: {
//                         data: [
//                             { type: 'max', name: '最大值' },
//                         ],
//                         label: { formatter: '{b}\n{c}' },
//                         symbolSize: 65,
//                     }
//                 }, {
//                     name: '超时数',
//                     type: 'bar',
//                     data: timeoutValMi,
//                     markPoint: {
//                         data: [
//                             { type: 'max', name: '最大值' },
//                         ],
//                         label: { formatter: '{b}\n{c}' },
//                         symbolSize: 65,
//                     }
//                 }],
//             };
//             myChart3.setOption(option3);
//         });
//     }

//     ajaxchart('');

//     function getSelectDate(result) {
//         console.log(result);
//     }
//     $("#laydateInput").on('change', function() {
//         ajaxchart($("#laydateInput").val());
//         $('.curdate span').eq(0).text($("#laydateInput").val());
//         var year = $("#laydateInput").val().split('-')[0];
//         var mon = $("#laydateInput").val().split('-')[1];
//         var day = $("#laydateInput").val().split('-')[2];
//         $('.txt .biaoti span').eq(0).text(year + '年' + mon + '月' + day + '日');
//         $('.txtMon .biaoti span').eq(0).text(year + '年' + mon + '月');
//     });
// });
$('.txtMon .biaoti div').click(function() {
    window.open('analysisMonth.html');
});
//假数据,地市点击量统计
var data = [{
    "city": "南京",
    "avg": 13,
    "month": [0, 0, 0, 0, 9, 4],
    "day": [0, 0, 4]
}, {
    "city": "无锡",
    "avg": 8,
    "month": [0, 0, 0, 0, 8, 0],
    "day": [0, 0, 0]
}, {
    "city": "镇江",
    "avg": 0,
    "month": [0, 0, 0, 0, 0, 0],
    "day": [0, 0, 0]
}, {
    "city": "苏州",
    "avg": 14,
    "month": [0, 0, 0, 0, 11, 3],
    "day": [0, 1, 2]
}, {
    "city": "南通",
    "avg": 82,
    "month": [0, 0, 0, 0, 22, 60],
    "day": [0, 0, 60]
}, {
    "city": "扬州",
    "avg": 2,
    "month": [0, 0, 0, 0, 2, 0],
    "day": [0, 0, 0]
}, {
    "city": "盐城",
    "avg": 8,
    "month": [0, 0, 0, 0, 8, 0],
    "day": [0, 0, 0]
}, {
    "city": "徐州",
    "avg": 1,
    "month": [0, 0, 0, 0, 1, 0],
    "day": [0, 0, 0]
}, {
    "city": "淮安",
    "avg": 4,
    "month": [0, 0, 0, 0, 4, 0],
    "day": [0, 0, 0]
}, {
    "city": "连云港",
    "avg": 0,
    "month": [0, 0, 0, 0, 0, 0],
    "day": [0, 0, 0]
}, {
    "city": "常州",
    "avg": 6,
    "month": [0, 0, 0, 0, 6, 0],
    "day": [0, 0, 0]
}, {
    "city": "泰州",
    "avg": 13,
    "month": [0, 0, 0, 0, 13, 0],
    "day": [0, 0, 0]
}, {
    "city": "宿迁",
    "avg": 2,
    "month": [0, 0, 0, 0, 2, 0],
    "day": [0, 0, 0]
}];
var cityClickhtml = '';
var val = Number(1);
for (var i = 0; i < data.length; i++) {
    cityClickhtml += '<tr><td>' + val + '</td><td>' + data[i].city + '</td><td>' + data[i].avg + '</td>';
    var count = data[i].month.length;
    var str = "<tr><th rowspan='2'>序号</th><th rowspan='2'>地市</th><th rowspan='2'>累计点击量</th><th colspan='" + data[i].month.length + "'>月点击总量</th></tr><tr>";
    for (var j = 1; j < count + 1; j++) {
        str += "<th>" + j + "月</th>";
    }
    str += "</tr>";
    $('.cityClicktable thead').html(str);
    for (var k = 0; k < data[i].month.length; k++) {
        cityClickhtml += '<td>' + data[i].month[k] + '</td>';
    }
    val++;
    cityClickhtml += '</tr>';
};
$('.cityClicktable tbody').html(cityClickhtml);
$('.cityClicktable thead tr:nth-child(1)').children('th:nth-child(1)').css('width', '4%');
$('.cityClicktable thead tr:nth-child(1)').children('th:nth-child(2)').css('width', '5%');
$('.cityClicktable thead tr:nth-child(1)').children('th:nth-child(3)').css('width', '8%');
//假数据位置
var data = {
    "day": "2019-06-02T00:00:00",
    "total_form": 575,
    "total_form_rate": "111.65%",
    "error_form": 60,
    "error_form_rate": "11.65%",
    "timeout_form": 8,
    "timeout_form_rate": "1.55%",
    "finish_form": 515,
    "finish_form_rate": "100.0%",
    "terminal_problem": 0,
    "terminal_problem_rate": "0.0%",
    "sign_problem": 9,
    "sign_problem_rate": "1.75%",
    "nodata_problem": 85,
    "nodata_problem_rate": "16.5%",
    "corenet_problem": 1,
    "corenet_problem_rate": "0.19%",
    "sp_problem": 11,
    "sp_problem_rate": "2.14%",
    "user_terminal_problem": 0,
    "user_terminal_problem_rate": "0.0%",
    "wireless_problem": 298,
    "wireless_problem_rate": "57.86%",
    "no_error_problem": 111,
    "no_error_problem_rate": "21.55%",
    "daily_error": [{
        "接口异常": 59
    }, {
        "其它异常": 1
    }],
    "error_time": [{
        "10:15": 0
    }, {
        "10:25": 0
    }, {
        "10:30": 0
    }, {
        "10:35": 0
    }, {
        "10:40": 0
    }, {
        "10:45": 0
    }, {
        "10:50": 0
    }, {
        "10:55": 2
    }, {
        "11:00": 0
    }, {
        "11:05": 0
    }, {
        "11:10": 4
    }, {
        "11:15": 0
    }, {
        "11:20": 0
    }, {
        "11:25": 3
    }, {
        "11:30": 0
    }, {
        "11:55": 0
    }, {
        "12:00": 0
    }, {
        "12:05": 0
    }, {
        "12:10": 0
    }, {
        "12:15": 0
    }, {
        "12:20": 0
    }, {
        "12:21": 0
    }, {
        "12:25": 0
    }, {
        "12:30": 0
    }, {
        "12:40": 0
    }, {
        "12:45": 0
    }, {
        "12:55": 0
    }, {
        "13:00": 0
    }, {
        "13:05": 0
    }, {
        "13:10": 0
    }, {
        "13:35": 0
    }, {
        "13:40": 0
    }, {
        "13:50": 0
    }, {
        "15:15": 0
    }, {
        "15:20": 0
    }, {
        "15:25": 0
    }, {
        "15:30": 0
    }, {
        "15:35": 0
    }, {
        "15:45": 0
    }, {
        "15:50": 0
    }, {
        "15:55": 0
    }, {
        "16:00": 0
    }, {
        "16:05": 0
    }, {
        "16:10": 0
    }, {
        "16:50": 0
    }, {
        "16:55": 0
    }, {
        "17:20": 0
    }, {
        "17:25": 0
    }, {
        "18:25": 0
    }, {
        "18:30": 0
    }, {
        "18:40": 0
    }, {
        "18:45": 0
    }, {
        "18:50": 1
    }, {
        "18:55": 0
    }, {
        "19:00": 3
    }, {
        "19:05": 3
    }, {
        "19:06": 1
    }, {
        "19:10": 2
    }, {
        "19:11": 0
    }, {
        "19:15": 3
    }, {
        "19:20": 0
    }, {
        "19:25": 2
    }, {
        "19:30": 3
    }, {
        "19:35": 3
    }, {
        "19:40": 2
    }, {
        "19:45": 3
    }, {
        "19:50": 2
    }, {
        "19:51": 1
    }, {
        "19:55": 1
    }, {
        "19:56": 1
    }, {
        "20:00": 5
    }, {
        "20:05": 4
    }, {
        "20:10": 2
    }, {
        "20:11": 0
    }, {
        "20:15": 4
    }, {
        "20:16": 0
    }, {
        "20:20": 4
    }, {
        "20:25": 0
    }, {
        "20:30": 1
    }],
    "timeout_time": [{
        "10:15": 0
    }, {
        "10:25": 0
    }, {
        "10:30": 0
    }, {
        "10:35": 0
    }, {
        "10:40": 0
    }, {
        "10:45": 0
    }, {
        "10:50": 0
    }, {
        "10:55": 0
    }, {
        "11:00": 0
    }, {
        "11:05": 0
    }, {
        "11:10": 0
    }, {
        "11:15": 0
    }, {
        "11:20": 0
    }, {
        "11:25": 0
    }, {
        "11:30": 0
    }, {
        "11:55": 0
    }, {
        "12:00": 0
    }, {
        "12:05": 0
    }, {
        "12:10": 0
    }, {
        "12:15": 0
    }, {
        "12:20": 0
    }, {
        "12:21": 1
    }, {
        "12:25": 0
    }, {
        "12:30": 0
    }, {
        "12:40": 0
    }, {
        "12:45": 0
    }, {
        "12:55": 0
    }, {
        "13:00": 0
    }, {
        "13:05": 0
    }, {
        "13:10": 0
    }, {
        "13:35": 0
    }, {
        "13:40": 0
    }, {
        "13:50": 0
    }, {
        "15:15": 0
    }, {
        "15:20": 0
    }, {
        "15:25": 0
    }, {
        "15:30": 0
    }, {
        "15:35": 0
    }, {
        "15:45": 0
    }, {
        "15:50": 0
    }, {
        "15:55": 0
    }, {
        "16:00": 0
    }, {
        "16:05": 0
    }, {
        "16:10": 0
    }, {
        "16:50": 0
    }, {
        "16:55": 0
    }, {
        "17:20": 0
    }, {
        "17:25": 0
    }, {
        "18:25": 0
    }, {
        "18:30": 0
    }, {
        "18:40": 0
    }, {
        "18:45": 1
    }, {
        "18:50": 0
    }, {
        "18:55": 0
    }, {
        "19:00": 0
    }, {
        "19:05": 1
    }, {
        "19:06": 0
    }, {
        "19:10": 0
    }, {
        "19:11": 0
    }, {
        "19:15": 0
    }, {
        "19:20": 1
    }, {
        "19:25": 0
    }, {
        "19:30": 1
    }, {
        "19:35": 1
    }, {
        "19:40": 0
    }, {
        "19:45": 1
    }, {
        "19:50": 0
    }, {
        "19:51": 0
    }, {
        "19:55": 0
    }, {
        "19:56": 0
    }, {
        "20:00": 0
    }, {
        "20:05": 0
    }, {
        "20:10": 1
    }, {
        "20:11": 0
    }, {
        "20:15": 0
    }, {
        "20:16": 0
    }, {
        "20:20": 0
    }, {
        "20:25": 0
    }, {
        "20:30": 0
    }],
    "recv_time": [{
        "10:15": 1
    }, {
        "10:25": 1
    }, {
        "10:30": 5
    }, {
        "10:35": 1
    }, {
        "10:40": 9
    }, {
        "10:45": 3
    }, {
        "10:50": 4
    }, {
        "10:55": 14
    }, {
        "11:00": 1
    }, {
        "11:05": 9
    }, {
        "11:10": 17
    }, {
        "11:15": 4
    }, {
        "11:20": 4
    }, {
        "11:25": 6
    }, {
        "11:30": 2
    }, {
        "11:55": 4
    }, {
        "12:00": 11
    }, {
        "12:05": 19
    }, {
        "12:10": 8
    }, {
        "12:15": 13
    }, {
        "12:20": 10
    }, {
        "12:21": 9
    }, {
        "12:25": 3
    }, {
        "12:30": 7
    }, {
        "12:40": 7
    }, {
        "12:45": 5
    }, {
        "12:55": 4
    }, {
        "13:00": 10
    }, {
        "13:05": 5
    }, {
        "13:10": 6
    }, {
        "13:35": 2
    }, {
        "13:40": 1
    }, {
        "13:50": 2
    }, {
        "15:15": 3
    }, {
        "15:20": 6
    }, {
        "15:25": 2
    }, {
        "15:30": 7
    }, {
        "15:35": 6
    }, {
        "15:45": 2
    }, {
        "15:50": 12
    }, {
        "15:55": 1
    }, {
        "16:00": 9
    }, {
        "16:05": 5
    }, {
        "16:10": 1
    }, {
        "16:50": 1
    }, {
        "16:55": 1
    }, {
        "17:20": 6
    }, {
        "17:25": 1
    }, {
        "18:25": 1
    }, {
        "18:30": 2
    }, {
        "18:40": 4
    }, {
        "18:45": 4
    }, {
        "18:50": 16
    }, {
        "18:55": 13
    }, {
        "19:00": 18
    }, {
        "19:05": 19
    }, {
        "19:06": 1
    }, {
        "19:10": 18
    }, {
        "19:11": 1
    }, {
        "19:15": 16
    }, {
        "19:20": 7
    }, {
        "19:25": 7
    }, {
        "19:30": 8
    }, {
        "19:35": 18
    }, {
        "19:40": 15
    }, {
        "19:45": 15
    }, {
        "19:50": 16
    }, {
        "19:51": 1
    }, {
        "19:55": 12
    }, {
        "19:56": 11
    }, {
        "20:00": 15
    }, {
        "20:05": 15
    }, {
        "20:10": 10
    }, {
        "20:11": 6
    }, {
        "20:15": 16
    }, {
        "20:16": 1
    }, {
        "20:20": 17
    }, {
        "20:25": 1
    }, {
        "20:30": 1
    }],
    "s_error_time": [{
        "10:15:08": 0
    }, {
        "10:25:06": 0
    }, {
        "10:30:15": 0
    }, {
        "10:30:16": 0
    }, {
        "10:30:17": 0
    }, {
        "10:35:07": 0
    }, {
        "10:40:26": 0
    }, {
        "10:40:27": 0
    }, {
        "10:45:11": 0
    }, {
        "10:45:12": 0
    }, {
        "10:50:20": 0
    }, {
        "10:55:31": 0
    }, {
        "10:55:33": 0
    }, {
        "10:55:37": 0
    }, {
        "10:55:38": 1
    }, {
        "10:55:39": 1
    }, {
        "10:55:40": 0
    }, {
        "10:55:41": 0
    }, {
        "10:55:42": 0
    }, {
        "11:00:04": 0
    }, {
        "11:05:21": 0
    }, {
        "11:05:26": 0
    }, {
        "11:05:27": 0
    }, {
        "11:05:29": 0
    }, {
        "11:10:42": 0
    }, {
        "11:10:44": 0
    }, {
        "11:10:49": 0
    }, {
        "11:10:50": 0
    }, {
        "11:10:51": 0
    }, {
        "11:10:52": 2
    }, {
        "11:10:53": 1
    }, {
        "11:10:54": 0
    }, {
        "11:10:55": 1
    }, {
        "11:15:15": 0
    }, {
        "11:15:16": 0
    }, {
        "11:15:17": 0
    }, {
        "11:15:18": 0
    }, {
        "11:20:12": 0
    }, {
        "11:20:14": 0
    }, {
        "11:25:17": 1
    }, {
        "11:25:18": 0
    }, {
        "11:25:19": 1
    }, {
        "11:25:20": 1
    }, {
        "11:25:21": 0
    }, {
        "11:30:09": 0
    }, {
        "11:30:11": 0
    }, {
        "11:55:13": 0
    }, {
        "11:55:14": 0
    }, {
        "12:00:37": 0
    }, {
        "12:00:40": 0
    }, {
        "12:00:41": 0
    }, {
        "12:00:42": 0
    }, {
        "12:05:37": 0
    }, {
        "12:05:41": 0
    }, {
        "12:05:42": 0
    }, {
        "12:05:43": 0
    }, {
        "12:05:44": 0
    }, {
        "12:05:49": 0
    }, {
        "12:10:19": 0
    }, {
        "12:10:20": 0
    }, {
        "12:10:22": 0
    }, {
        "12:10:24": 0
    }, {
        "12:10:25": 0
    }, {
        "12:15:32": 0
    }, {
        "12:15:33": 0
    }, {
        "12:15:35": 0
    }, {
        "12:15:36": 0
    }, {
        "12:15:37": 0
    }, {
        "12:15:38": 0
    }, {
        "12:15:40": 0
    }, {
        "12:20:53": 0
    }, {
        "12:20:54": 0
    }, {
        "12:21:00": 0
    }, {
        "12:21:03": 0
    }, {
        "12:21:04": 0
    }, {
        "12:21:05": 0
    }, {
        "12:25:15": 0
    }, {
        "12:25:17": 0
    }, {
        "12:30:18": 0
    }, {
        "12:30:24": 0
    }, {
        "12:30:25": 0
    }, {
        "12:40:22": 0
    }, {
        "12:40:24": 0
    }, {
        "12:40:27": 0
    }, {
        "12:40:28": 0
    }, {
        "12:45:16": 0
    }, {
        "12:45:17": 0
    }, {
        "12:45:20": 0
    }, {
        "12:45:21": 0
    }, {
        "12:55:13": 0
    }, {
        "12:55:14": 0
    }, {
        "12:55:17": 0
    }, {
        "13:00:25": 0
    }, {
        "13:00:29": 0
    }, {
        "13:00:31": 0
    }, {
        "13:00:33": 0
    }, {
        "13:00:34": 0
    }, {
        "13:00:35": 0
    }, {
        "13:05:17": 0
    }, {
        "13:05:19": 0
    }, {
        "13:10:21": 0
    }, {
        "13:10:24": 0
    }, {
        "13:10:25": 0
    }, {
        "13:35:08": 0
    }, {
        "13:35:09": 0
    }, {
        "13:40:07": 0
    }, {
        "13:50:13": 0
    }, {
        "15:15:19": 0
    }, {
        "15:15:20": 0
    }, {
        "15:20:13": 0
    }, {
        "15:20:14": 0
    }, {
        "15:20:15": 0
    }, {
        "15:25:09": 0
    }, {
        "15:30:23": 0
    }, {
        "15:30:24": 0
    }, {
        "15:30:25": 0
    }, {
        "15:35:17": 0
    }, {
        "15:35:18": 0
    }, {
        "15:45:16": 0
    }, {
        "15:45:17": 0
    }, {
        "15:50:33": 0
    }, {
        "15:50:35": 0
    }, {
        "15:50:36": 0
    }, {
        "15:50:37": 0
    }, {
        "15:55:07": 0
    }, {
        "16:00:34": 0
    }, {
        "16:00:35": 0
    }, {
        "16:00:36": 0
    }, {
        "16:05:12": 0
    }, {
        "16:05:14": 0
    }, {
        "16:05:16": 0
    }, {
        "16:10:07": 0
    }, {
        "16:50:07": 0
    }, {
        "16:55:07": 0
    }, {
        "17:20:13": 0
    }, {
        "17:20:14": 0
    }, {
        "17:20:15": 0
    }, {
        "17:25:05": 0
    }, {
        "18:25:06": 0
    }, {
        "18:30:08": 0
    }, {
        "18:40:12": 0
    }, {
        "18:40:13": 0
    }, {
        "18:45:12": 0
    }, {
        "18:45:13": 0
    }, {
        "18:45:14": 0
    }, {
        "18:50:31": 0
    }, {
        "18:50:32": 0
    }, {
        "18:50:33": 1
    }, {
        "18:50:34": 0
    }, {
        "18:50:35": 0
    }, {
        "18:50:36": 0
    }, {
        "18:55:31": 0
    }, {
        "18:55:34": 0
    }, {
        "18:55:35": 0
    }, {
        "18:55:37": 0
    }, {
        "18:55:38": 0
    }, {
        "19:00:37": 2
    }, {
        "19:00:39": 0
    }, {
        "19:00:40": 1
    }, {
        "19:00:41": 0
    }, {
        "19:00:43": 0
    }, {
        "19:00:44": 0
    }, {
        "19:00:45": 0
    }, {
        "19:00:47": 0
    }, {
        "19:05:45": 0
    }, {
        "19:05:49": 1
    }, {
        "19:05:50": 2
    }, {
        "19:05:52": 0
    }, {
        "19:05:53": 0
    }, {
        "19:05:55": 0
    }, {
        "19:05:56": 0
    }, {
        "19:05:58": 0
    }, {
        "19:06:00": 1
    }, {
        "19:10:45": 0
    }, {
        "19:10:50": 1
    }, {
        "19:10:51": 0
    }, {
        "19:10:52": 1
    }, {
        "19:10:57": 0
    }, {
        "19:10:58": 0
    }, {
        "19:10:59": 0
    }, {
        "19:11:00": 0
    }, {
        "19:15:35": 0
    }, {
        "19:15:38": 0
    }, {
        "19:15:39": 3
    }, {
        "19:15:40": 0
    }, {
        "19:15:42": 0
    }, {
        "19:15:45": 0
    }, {
        "19:15:46": 0
    }, {
        "19:20:24": 0
    }, {
        "19:20:29": 0
    }, {
        "19:25:31": 2
    }, {
        "19:25:32": 0
    }, {
        "19:30:33": 0
    }, {
        "19:30:34": 0
    }, {
        "19:30:37": 1
    }, {
        "19:30:38": 2
    }, {
        "19:35:41": 0
    }, {
        "19:35:42": 2
    }, {
        "19:35:43": 0
    }, {
        "19:35:44": 0
    }, {
        "19:35:49": 0
    }, {
        "19:35:51": 1
    }, {
        "19:35:52": 0
    }, {
        "19:35:53": 0
    }, {
        "19:35:54": 0
    }, {
        "19:35:55": 0
    }, {
        "19:40:35": 0
    }, {
        "19:40:41": 0
    }, {
        "19:40:46": 0
    }, {
        "19:40:47": 1
    }, {
        "19:40:48": 1
    }, {
        "19:40:50": 0
    }, {
        "19:45:45": 0
    }, {
        "19:45:49": 0
    }, {
        "19:45:51": 0
    }, {
        "19:45:52": 0
    }, {
        "19:45:54": 0
    }, {
        "19:45:55": 1
    }, {
        "19:45:56": 0
    }, {
        "19:45:57": 2
    }, {
        "19:50:52": 0
    }, {
        "19:50:53": 0
    }, {
        "19:50:54": 1
    }, {
        "19:50:55": 0
    }, {
        "19:50:57": 1
    }, {
        "19:50:59": 0
    }, {
        "19:51:00": 1
    }, {
        "19:55:48": 0
    }, {
        "19:55:49": 0
    }, {
        "19:55:51": 0
    }, {
        "19:55:52": 0
    }, {
        "19:55:53": 0
    }, {
        "19:55:54": 0
    }, {
        "19:55:55": 1
    }, {
        "19:56:01": 0
    }, {
        "19:56:06": 0
    }, {
        "19:56:07": 0
    }, {
        "19:56:08": 1
    }, {
        "20:00:44": 1
    }, {
        "20:00:47": 0
    }, {
        "20:00:48": 2
    }, {
        "20:00:50": 1
    }, {
        "20:00:51": 1
    }, {
        "20:00:52": 0
    }, {
        "20:00:53": 0
    }, {
        "20:00:54": 0
    }, {
        "20:00:55": 0
    }, {
        "20:00:56": 0
    }, {
        "20:05:40": 0
    }, {
        "20:05:41": 2
    }, {
        "20:05:42": 0
    }, {
        "20:05:44": 0
    }, {
        "20:05:45": 1
    }, {
        "20:05:46": 0
    }, {
        "20:05:47": 0
    }, {
        "20:05:48": 1
    }, {
        "20:05:49": 0
    }, {
        "20:10:49": 0
    }, {
        "20:10:50": 0
    }, {
        "20:10:52": 1
    }, {
        "20:10:53": 1
    }, {
        "20:10:54": 0
    }, {
        "20:10:56": 0
    }, {
        "20:10:57": 0
    }, {
        "20:11:02": 0
    }, {
        "20:11:03": 0
    }, {
        "20:11:06": 0
    }, {
        "20:11:07": 0
    }, {
        "20:15:33": 0
    }, {
        "20:15:41": 1
    }, {
        "20:15:43": 1
    }, {
        "20:15:46": 1
    }, {
        "20:15:47": 0
    }, {
        "20:15:50": 0
    }, {
        "20:15:57": 0
    }, {
        "20:15:58": 1
    }, {
        "20:15:59": 0
    }, {
        "20:16:00": 0
    }, {
        "20:20:36": 0
    }, {
        "20:20:41": 1
    }, {
        "20:20:42": 0
    }, {
        "20:20:43": 0
    }, {
        "20:20:44": 0
    }, {
        "20:20:45": 0
    }, {
        "20:20:46": 0
    }, {
        "20:20:53": 0
    }, {
        "20:20:59": 3
    }, {
        "20:25:20": 0
    }, {
        "20:30:09": 1
    }],
    "s_timeout_time": [{
        "10:15:08": 0
    }, {
        "10:25:06": 0
    }, {
        "10:30:15": 0
    }, {
        "10:30:16": 0
    }, {
        "10:30:17": 0
    }, {
        "10:35:07": 0
    }, {
        "10:40:26": 0
    }, {
        "10:40:27": 0
    }, {
        "10:45:11": 0
    }, {
        "10:45:12": 0
    }, {
        "10:50:20": 0
    }, {
        "10:55:31": 0
    }, {
        "10:55:33": 0
    }, {
        "10:55:37": 0
    }, {
        "10:55:38": 0
    }, {
        "10:55:39": 0
    }, {
        "10:55:40": 0
    }, {
        "10:55:41": 0
    }, {
        "10:55:42": 0
    }, {
        "11:00:04": 0
    }, {
        "11:05:21": 0
    }, {
        "11:05:26": 0
    }, {
        "11:05:27": 0
    }, {
        "11:05:29": 0
    }, {
        "11:10:42": 0
    }, {
        "11:10:44": 0
    }, {
        "11:10:49": 0
    }, {
        "11:10:50": 0
    }, {
        "11:10:51": 0
    }, {
        "11:10:52": 0
    }, {
        "11:10:53": 0
    }, {
        "11:10:54": 0
    }, {
        "11:10:55": 0
    }, {
        "11:15:15": 0
    }, {
        "11:15:16": 0
    }, {
        "11:15:17": 0
    }, {
        "11:15:18": 0
    }, {
        "11:20:12": 0
    }, {
        "11:20:14": 0
    }, {
        "11:25:17": 0
    }, {
        "11:25:18": 0
    }, {
        "11:25:19": 0
    }, {
        "11:25:20": 0
    }, {
        "11:25:21": 0
    }, {
        "11:30:09": 0
    }, {
        "11:30:11": 0
    }, {
        "11:55:13": 0
    }, {
        "11:55:14": 0
    }, {
        "12:00:37": 0
    }, {
        "12:00:40": 0
    }, {
        "12:00:41": 0
    }, {
        "12:00:42": 0
    }, {
        "12:05:37": 0
    }, {
        "12:05:41": 0
    }, {
        "12:05:42": 0
    }, {
        "12:05:43": 0
    }, {
        "12:05:44": 0
    }, {
        "12:05:49": 0
    }, {
        "12:10:19": 0
    }, {
        "12:10:20": 0
    }, {
        "12:10:22": 0
    }, {
        "12:10:24": 0
    }, {
        "12:10:25": 0
    }, {
        "12:15:32": 0
    }, {
        "12:15:33": 0
    }, {
        "12:15:35": 0
    }, {
        "12:15:36": 0
    }, {
        "12:15:37": 0
    }, {
        "12:15:38": 0
    }, {
        "12:15:40": 0
    }, {
        "12:20:53": 0
    }, {
        "12:20:54": 0
    }, {
        "12:21:00": 1
    }, {
        "12:21:03": 0
    }, {
        "12:21:04": 0
    }, {
        "12:21:05": 0
    }, {
        "12:25:15": 0
    }, {
        "12:25:17": 0
    }, {
        "12:30:18": 0
    }, {
        "12:30:24": 0
    }, {
        "12:30:25": 0
    }, {
        "12:40:22": 0
    }, {
        "12:40:24": 0
    }, {
        "12:40:27": 0
    }, {
        "12:40:28": 0
    }, {
        "12:45:16": 0
    }, {
        "12:45:17": 0
    }, {
        "12:45:20": 0
    }, {
        "12:45:21": 0
    }, {
        "12:55:13": 0
    }, {
        "12:55:14": 0
    }, {
        "12:55:17": 0
    }, {
        "13:00:25": 0
    }, {
        "13:00:29": 0
    }, {
        "13:00:31": 0
    }, {
        "13:00:33": 0
    }, {
        "13:00:34": 0
    }, {
        "13:00:35": 0
    }, {
        "13:05:17": 0
    }, {
        "13:05:19": 0
    }, {
        "13:10:21": 0
    }, {
        "13:10:24": 0
    }, {
        "13:10:25": 0
    }, {
        "13:35:08": 0
    }, {
        "13:35:09": 0
    }, {
        "13:40:07": 0
    }, {
        "13:50:13": 0
    }, {
        "15:15:19": 0
    }, {
        "15:15:20": 0
    }, {
        "15:20:13": 0
    }, {
        "15:20:14": 0
    }, {
        "15:20:15": 0
    }, {
        "15:25:09": 0
    }, {
        "15:30:23": 0
    }, {
        "15:30:24": 0
    }, {
        "15:30:25": 0
    }, {
        "15:35:17": 0
    }, {
        "15:35:18": 0
    }, {
        "15:45:16": 0
    }, {
        "15:45:17": 0
    }, {
        "15:50:33": 0
    }, {
        "15:50:35": 0
    }, {
        "15:50:36": 0
    }, {
        "15:50:37": 0
    }, {
        "15:55:07": 0
    }, {
        "16:00:34": 0
    }, {
        "16:00:35": 0
    }, {
        "16:00:36": 0
    }, {
        "16:05:12": 0
    }, {
        "16:05:14": 0
    }, {
        "16:05:16": 0
    }, {
        "16:10:07": 0
    }, {
        "16:50:07": 0
    }, {
        "16:55:07": 0
    }, {
        "17:20:13": 0
    }, {
        "17:20:14": 0
    }, {
        "17:20:15": 0
    }, {
        "17:25:05": 0
    }, {
        "18:25:06": 0
    }, {
        "18:30:08": 0
    }, {
        "18:40:12": 0
    }, {
        "18:40:13": 0
    }, {
        "18:45:12": 0
    }, {
        "18:45:13": 1
    }, {
        "18:45:14": 0
    }, {
        "18:50:31": 0
    }, {
        "18:50:32": 0
    }, {
        "18:50:33": 0
    }, {
        "18:50:34": 0
    }, {
        "18:50:35": 0
    }, {
        "18:50:36": 0
    }, {
        "18:55:31": 0
    }, {
        "18:55:34": 0
    }, {
        "18:55:35": 0
    }, {
        "18:55:37": 0
    }, {
        "18:55:38": 0
    }, {
        "19:00:37": 0
    }, {
        "19:00:39": 0
    }, {
        "19:00:40": 0
    }, {
        "19:00:41": 0
    }, {
        "19:00:43": 0
    }, {
        "19:00:44": 0
    }, {
        "19:00:45": 0
    }, {
        "19:00:47": 0
    }, {
        "19:05:45": 0
    }, {
        "19:05:49": 0
    }, {
        "19:05:50": 0
    }, {
        "19:05:52": 0
    }, {
        "19:05:53": 0
    }, {
        "19:05:55": 1
    }, {
        "19:05:56": 0
    }, {
        "19:05:58": 0
    }, {
        "19:06:00": 0
    }, {
        "19:10:45": 0
    }, {
        "19:10:50": 0
    }, {
        "19:10:51": 0
    }, {
        "19:10:52": 0
    }, {
        "19:10:57": 0
    }, {
        "19:10:58": 0
    }, {
        "19:10:59": 0
    }, {
        "19:11:00": 0
    }, {
        "19:15:35": 0
    }, {
        "19:15:38": 0
    }, {
        "19:15:39": 0
    }, {
        "19:15:40": 0
    }, {
        "19:15:42": 0
    }, {
        "19:15:45": 0
    }, {
        "19:15:46": 0
    }, {
        "19:20:24": 0
    }, {
        "19:20:29": 1
    }, {
        "19:25:31": 0
    }, {
        "19:25:32": 0
    }, {
        "19:30:33": 0
    }, {
        "19:30:34": 0
    }, {
        "19:30:37": 0
    }, {
        "19:30:38": 1
    }, {
        "19:35:41": 0
    }, {
        "19:35:42": 0
    }, {
        "19:35:43": 0
    }, {
        "19:35:44": 0
    }, {
        "19:35:49": 0
    }, {
        "19:35:51": 0
    }, {
        "19:35:52": 0
    }, {
        "19:35:53": 1
    }, {
        "19:35:54": 0
    }, {
        "19:35:55": 0
    }, {
        "19:40:35": 0
    }, {
        "19:40:41": 0
    }, {
        "19:40:46": 0
    }, {
        "19:40:47": 0
    }, {
        "19:40:48": 0
    }, {
        "19:40:50": 0
    }, {
        "19:45:45": 0
    }, {
        "19:45:49": 0
    }, {
        "19:45:51": 0
    }, {
        "19:45:52": 0
    }, {
        "19:45:54": 0
    }, {
        "19:45:55": 0
    }, {
        "19:45:56": 1
    }, {
        "19:45:57": 0
    }, {
        "19:50:52": 0
    }, {
        "19:50:53": 0
    }, {
        "19:50:54": 0
    }, {
        "19:50:55": 0
    }, {
        "19:50:57": 0
    }, {
        "19:50:59": 0
    }, {
        "19:51:00": 0
    }, {
        "19:55:48": 0
    }, {
        "19:55:49": 0
    }, {
        "19:55:51": 0
    }, {
        "19:55:52": 0
    }, {
        "19:55:53": 0
    }, {
        "19:55:54": 0
    }, {
        "19:55:55": 0
    }, {
        "19:56:01": 0
    }, {
        "19:56:06": 0
    }, {
        "19:56:07": 0
    }, {
        "19:56:08": 0
    }, {
        "20:00:44": 0
    }, {
        "20:00:47": 0
    }, {
        "20:00:48": 0
    }, {
        "20:00:50": 0
    }, {
        "20:00:51": 0
    }, {
        "20:00:52": 0
    }, {
        "20:00:53": 0
    }, {
        "20:00:54": 0
    }, {
        "20:00:55": 0
    }, {
        "20:00:56": 0
    }, {
        "20:05:40": 0
    }, {
        "20:05:41": 0
    }, {
        "20:05:42": 0
    }, {
        "20:05:44": 0
    }, {
        "20:05:45": 0
    }, {
        "20:05:46": 0
    }, {
        "20:05:47": 0
    }, {
        "20:05:48": 0
    }, {
        "20:05:49": 0
    }, {
        "20:10:49": 1
    }, {
        "20:10:50": 0
    }, {
        "20:10:52": 0
    }, {
        "20:10:53": 0
    }, {
        "20:10:54": 0
    }, {
        "20:10:56": 0
    }, {
        "20:10:57": 0
    }, {
        "20:11:02": 0
    }, {
        "20:11:03": 0
    }, {
        "20:11:06": 0
    }, {
        "20:11:07": 0
    }, {
        "20:15:33": 0
    }, {
        "20:15:41": 0
    }, {
        "20:15:43": 0
    }, {
        "20:15:46": 0
    }, {
        "20:15:47": 0
    }, {
        "20:15:50": 0
    }, {
        "20:15:57": 0
    }, {
        "20:15:58": 0
    }, {
        "20:15:59": 0
    }, {
        "20:16:00": 0
    }, {
        "20:20:36": 0
    }, {
        "20:20:41": 0
    }, {
        "20:20:42": 0
    }, {
        "20:20:43": 0
    }, {
        "20:20:44": 0
    }, {
        "20:20:45": 0
    }, {
        "20:20:46": 0
    }, {
        "20:20:53": 0
    }, {
        "20:20:59": 0
    }, {
        "20:25:20": 0
    }, {
        "20:30:09": 0
    }],
    "s_recv_time": [{
        "10:15:08": 1
    }, {
        "10:25:06": 1
    }, {
        "10:30:15": 1
    }, {
        "10:30:16": 2
    }, {
        "10:30:17": 2
    }, {
        "10:35:07": 1
    }, {
        "10:40:26": 1
    }, {
        "10:40:27": 8
    }, {
        "10:45:11": 2
    }, {
        "10:45:12": 1
    }, {
        "10:50:20": 4
    }, {
        "10:55:31": 1
    }, {
        "10:55:33": 1
    }, {
        "10:55:37": 1
    }, {
        "10:55:38": 1
    }, {
        "10:55:39": 4
    }, {
        "10:55:40": 3
    }, {
        "10:55:41": 1
    }, {
        "10:55:42": 2
    }, {
        "11:00:04": 1
    }, {
        "11:05:21": 1
    }, {
        "11:05:26": 3
    }, {
        "11:05:27": 4
    }, {
        "11:05:29": 1
    }, {
        "11:10:42": 1
    }, {
        "11:10:44": 1
    }, {
        "11:10:49": 1
    }, {
        "11:10:50": 2
    }, {
        "11:10:51": 3
    }, {
        "11:10:52": 3
    }, {
        "11:10:53": 3
    }, {
        "11:10:54": 1
    }, {
        "11:10:55": 2
    }, {
        "11:15:15": 1
    }, {
        "11:15:16": 1
    }, {
        "11:15:17": 1
    }, {
        "11:15:18": 1
    }, {
        "11:20:12": 2
    }, {
        "11:20:14": 2
    }, {
        "11:25:17": 1
    }, {
        "11:25:18": 1
    }, {
        "11:25:19": 1
    }, {
        "11:25:20": 2
    }, {
        "11:25:21": 1
    }, {
        "11:30:09": 1
    }, {
        "11:30:11": 1
    }, {
        "11:55:13": 3
    }, {
        "11:55:14": 1
    }, {
        "12:00:37": 2
    }, {
        "12:00:40": 6
    }, {
        "12:00:41": 1
    }, {
        "12:00:42": 2
    }, {
        "12:05:37": 1
    }, {
        "12:05:41": 2
    }, {
        "12:05:42": 4
    }, {
        "12:05:43": 3
    }, {
        "12:05:44": 2
    }, {
        "12:05:49": 7
    }, {
        "12:10:19": 1
    }, {
        "12:10:20": 1
    }, {
        "12:10:22": 1
    }, {
        "12:10:24": 3
    }, {
        "12:10:25": 2
    }, {
        "12:15:32": 1
    }, {
        "12:15:33": 1
    }, {
        "12:15:35": 1
    }, {
        "12:15:36": 2
    }, {
        "12:15:37": 3
    }, {
        "12:15:38": 4
    }, {
        "12:15:40": 1
    }, {
        "12:20:53": 2
    }, {
        "12:20:54": 8
    }, {
        "12:21:00": 2
    }, {
        "12:21:03": 2
    }, {
        "12:21:04": 4
    }, {
        "12:21:05": 1
    }, {
        "12:25:15": 1
    }, {
        "12:25:17": 2
    }, {
        "12:30:18": 1
    }, {
        "12:30:24": 5
    }, {
        "12:30:25": 1
    }, {
        "12:40:22": 1
    }, {
        "12:40:24": 1
    }, {
        "12:40:27": 4
    }, {
        "12:40:28": 1
    }, {
        "12:45:16": 1
    }, {
        "12:45:17": 2
    }, {
        "12:45:20": 1
    }, {
        "12:45:21": 1
    }, {
        "12:55:13": 1
    }, {
        "12:55:14": 1
    }, {
        "12:55:17": 2
    }, {
        "13:00:25": 1
    }, {
        "13:00:29": 1
    }, {
        "13:00:31": 2
    }, {
        "13:00:33": 1
    }, {
        "13:00:34": 4
    }, {
        "13:00:35": 1
    }, {
        "13:05:17": 3
    }, {
        "13:05:19": 2
    }, {
        "13:10:21": 1
    }, {
        "13:10:24": 1
    }, {
        "13:10:25": 4
    }, {
        "13:35:08": 1
    }, {
        "13:35:09": 1
    }, {
        "13:40:07": 1
    }, {
        "13:50:13": 2
    }, {
        "15:15:19": 2
    }, {
        "15:15:20": 1
    }, {
        "15:20:13": 3
    }, {
        "15:20:14": 1
    }, {
        "15:20:15": 2
    }, {
        "15:25:09": 2
    }, {
        "15:30:23": 1
    }, {
        "15:30:24": 1
    }, {
        "15:30:25": 5
    }, {
        "15:35:17": 3
    }, {
        "15:35:18": 3
    }, {
        "15:45:16": 1
    }, {
        "15:45:17": 1
    }, {
        "15:50:33": 2
    }, {
        "15:50:35": 1
    }, {
        "15:50:36": 3
    }, {
        "15:50:37": 6
    }, {
        "15:55:07": 1
    }, {
        "16:00:34": 3
    }, {
        "16:00:35": 5
    }, {
        "16:00:36": 1
    }, {
        "16:05:12": 1
    }, {
        "16:05:14": 3
    }, {
        "16:05:16": 1
    }, {
        "16:10:07": 1
    }, {
        "16:50:07": 1
    }, {
        "16:55:07": 1
    }, {
        "17:20:13": 1
    }, {
        "17:20:14": 2
    }, {
        "17:20:15": 3
    }, {
        "17:25:05": 1
    }, {
        "18:25:06": 1
    }, {
        "18:30:08": 2
    }, {
        "18:40:12": 2
    }, {
        "18:40:13": 2
    }, {
        "18:45:12": 1
    }, {
        "18:45:13": 2
    }, {
        "18:45:14": 1
    }, {
        "18:50:31": 3
    }, {
        "18:50:32": 3
    }, {
        "18:50:33": 3
    }, {
        "18:50:34": 3
    }, {
        "18:50:35": 3
    }, {
        "18:50:36": 1
    }, {
        "18:55:31": 1
    }, {
        "18:55:34": 1
    }, {
        "18:55:35": 8
    }, {
        "18:55:37": 2
    }, {
        "18:55:38": 1
    }, {
        "19:00:37": 2
    }, {
        "19:00:39": 1
    }, {
        "19:00:40": 3
    }, {
        "19:00:41": 2
    }, {
        "19:00:43": 5
    }, {
        "19:00:44": 3
    }, {
        "19:00:45": 1
    }, {
        "19:00:47": 1
    }, {
        "19:05:45": 1
    }, {
        "19:05:49": 4
    }, {
        "19:05:50": 6
    }, {
        "19:05:52": 1
    }, {
        "19:05:53": 1
    }, {
        "19:05:55": 1
    }, {
        "19:05:56": 1
    }, {
        "19:05:58": 4
    }, {
        "19:06:00": 1
    }, {
        "19:10:45": 1
    }, {
        "19:10:50": 6
    }, {
        "19:10:51": 3
    }, {
        "19:10:52": 1
    }, {
        "19:10:57": 1
    }, {
        "19:10:58": 5
    }, {
        "19:10:59": 1
    }, {
        "19:11:00": 1
    }, {
        "19:15:35": 1
    }, {
        "19:15:38": 2
    }, {
        "19:15:39": 7
    }, {
        "19:15:40": 1
    }, {
        "19:15:42": 2
    }, {
        "19:15:45": 2
    }, {
        "19:15:46": 1
    }, {
        "19:20:24": 1
    }, {
        "19:20:29": 6
    }, {
        "19:25:31": 3
    }, {
        "19:25:32": 4
    }, {
        "19:30:33": 1
    }, {
        "19:30:34": 1
    }, {
        "19:30:37": 1
    }, {
        "19:30:38": 5
    }, {
        "19:35:41": 1
    }, {
        "19:35:42": 6
    }, {
        "19:35:43": 1
    }, {
        "19:35:44": 2
    }, {
        "19:35:49": 1
    }, {
        "19:35:51": 1
    }, {
        "19:35:52": 2
    }, {
        "19:35:53": 1
    }, {
        "19:35:54": 1
    }, {
        "19:35:55": 2
    }, {
        "19:40:35": 1
    }, {
        "19:40:41": 1
    }, {
        "19:40:46": 4
    }, {
        "19:40:47": 5
    }, {
        "19:40:48": 1
    }, {
        "19:40:50": 3
    }, {
        "19:45:45": 1
    }, {
        "19:45:49": 1
    }, {
        "19:45:51": 1
    }, {
        "19:45:52": 7
    }, {
        "19:45:54": 1
    }, {
        "19:45:55": 1
    }, {
        "19:45:56": 1
    }, {
        "19:45:57": 2
    }, {
        "19:50:52": 1
    }, {
        "19:50:53": 3
    }, {
        "19:50:54": 5
    }, {
        "19:50:55": 2
    }, {
        "19:50:57": 1
    }, {
        "19:50:59": 4
    }, {
        "19:51:00": 1
    }, {
        "19:55:48": 1
    }, {
        "19:55:49": 1
    }, {
        "19:55:51": 1
    }, {
        "19:55:52": 1
    }, {
        "19:55:53": 2
    }, {
        "19:55:54": 3
    }, {
        "19:55:55": 3
    }, {
        "19:56:01": 1
    }, {
        "19:56:06": 1
    }, {
        "19:56:07": 3
    }, {
        "19:56:08": 6
    }, {
        "20:00:44": 1
    }, {
        "20:00:47": 1
    }, {
        "20:00:48": 2
    }, {
        "20:00:50": 1
    }, {
        "20:00:51": 1
    }, {
        "20:00:52": 4
    }, {
        "20:00:53": 1
    }, {
        "20:00:54": 1
    }, {
        "20:00:55": 2
    }, {
        "20:00:56": 1
    }, {
        "20:05:40": 1
    }, {
        "20:05:41": 4
    }, {
        "20:05:42": 1
    }, {
        "20:05:44": 1
    }, {
        "20:05:45": 2
    }, {
        "20:05:46": 1
    }, {
        "20:05:47": 2
    }, {
        "20:05:48": 1
    }, {
        "20:05:49": 2
    }, {
        "20:10:49": 1
    }, {
        "20:10:50": 1
    }, {
        "20:10:52": 2
    }, {
        "20:10:53": 1
    }, {
        "20:10:54": 3
    }, {
        "20:10:56": 1
    }, {
        "20:10:57": 1
    }, {
        "20:11:02": 1
    }, {
        "20:11:03": 1
    }, {
        "20:11:06": 1
    }, {
        "20:11:07": 3
    }, {
        "20:15:33": 1
    }, {
        "20:15:41": 1
    }, {
        "20:15:43": 5
    }, {
        "20:15:46": 1
    }, {
        "20:15:47": 2
    }, {
        "20:15:50": 1
    }, {
        "20:15:57": 1
    }, {
        "20:15:58": 3
    }, {
        "20:15:59": 1
    }, {
        "20:16:00": 1
    }, {
        "20:20:36": 1
    }, {
        "20:20:41": 3
    }, {
        "20:20:42": 2
    }, {
        "20:20:43": 2
    }, {
        "20:20:44": 1
    }, {
        "20:20:45": 1
    }, {
        "20:20:46": 1
    }, {
        "20:20:53": 1
    }, {
        "20:20:59": 5
    }, {
        "20:25:20": 1
    }, {
        "20:30:09": 1
    }],
    "error_type": {
        "查询限制": 0,
        "连接超时": 54,
        "连接中断": 2,
        "其他错误": 0
    },
    "city5G": [{
        "南京": 41
    }, {
        "南通": 11
    }, {
        "宿迁": 3
    }, {
        "常州": 16
    }, {
        "徐州": 10
    }, {
        "扬州": 2
    }, {
        "无锡": 23
    }, {
        "泰州": 1
    }, {
        "淮安": 5
    }, {
        "盐城": 2
    }, {
        "苏州": 2
    }, {
        "连云港": 8
    }, {
        "镇江": 1
    }],
    "month_total_form": 1108,
    "month_total_form_rate": "105.93%",
    "month_error_form": 62,
    "month_error_form_rate": "5.93%",
    "month_timeout_form": 9,
    "month_timeout_form_rate": "0.86%",
    "month_finish_form": 1046,
    "month_finish_form_rate": "100.0%",
    "month_terminal_problem": 0,
    "month_terminal_problem_rate": "0.0%",
    "month_sign_problem": 22,
    "month_sign_problem_rate": "2.1%",
    "month_nodata_problem": 216,
    "month_nodata_problem_rate": "20.65%",
    "month_corenet_problem": 3,
    "month_corenet_problem_rate": "0.29%",
    "month_sp_problem": 21,
    "month_sp_problem_rate": "2.01%",
    "month_user_terminal_problem": 0,
    "month_user_terminal_problem_rate": "0.0%",
    "month_wireless_problem": 567,
    "month_wireless_problem_rate": "54.21%",
    "month_no_error_problem": 217,
    "month_no_error_problem_rate": "20.75%"
};
//假数据,最上面左1,
var str = '';
str += "<p>工单总数为" + data.total_form + "</p></n>";
str += "<p>异常工单总数为" + data.error_form + ",占比" + data.error_form_rate + "</p></n>";
str += "<p>超时工单总数为" + data.timeout_form + ",占比" + data.timeout_form_rate + "</p></n>";
str += "<p>已完成工单总数为" + data.finish_form + "</p></n>";
str += "<p>终端问题总数为" + data.terminal_problem + ",占比" + data.terminal_problem_rate + "</p></n>";
str += "<p>用户签约数据问题总数为" + data.sign_problem + ",占比" + data.sign_problem_rate + "</p></n>";
str += "<p>无用户数据总数为" + data.nodata_problem + ",占比" + data.nodata_problem_rate + "</p></n>";
str += "<p>核心网问题总数为" + data.corenet_problem + ",占比" + data.corenet_problem_rate + "</p></n>";
str += "<p>业务sp问题总数为" + data.sp_problem + ",占比" + data.sp_problem_rate + "</p></n>";
str += "<p>用户终端业务问题总数为" + data.user_terminal_problem + ",占比" + data.user_terminal_problem_rate + "</p></n>";
str += "<p>无线问题总数为" + data.wireless_problem + ",占比" + data.wireless_problem_rate + "</p></n>";
str += "<p>定界无异常总数为" + data.no_error_problem + ",占比" + data.no_error_problem_rate + "</p></n>";
$('.txt .ptot').html(str);
//假数据,最上面左2,
var str1 = '';
str1 += "<p>工单总数为" + data.month_total_form + "</p></n>";
str1 += "<p>异常工单总数为" + data.month_error_form + ",占比" + data.month_error_form_rate + "</p></n>";
str1 += "<p>超时工单总数为" + data.month_timeout_form + ",占比" + data.month_timeout_form_rate + "</p></n>";
str1 += "<p>已完成工单总数为" + data.month_finish_form + "</p></n>";
str1 += "<p>终端问题总数为" + data.month_terminal_problem + ",占比" + data.month_terminal_problem_rate + "</p></n>";
str1 += "<p>用户签约数据问题总数为" + data.month_sign_problem + ",占比" + data.month_sign_problem_rate + "</p></n>";
str1 += "<p>无用户数据总数为" + data.month_nodata_problem + ",占比" + data.month_nodata_problem_rate + "</p></n>";
str1 += "<p>核心网问题总数为" + data.month_corenet_problem + ",占比" + data.month_corenet_problem_rate + "</p></n>";
str1 += "<p>业务sp问题总数为" + data.month_sp_problem + ",占比" + data.month_sp_problem_rate + "</p></n>";
str1 += "<p>用户终端业务问题总数为" + data.month_user_terminal_problem + ",占比" + data.month_user_terminal_problem_rate + "</p></n>";
str1 += "<p>无线问题总数为" + data.month_wireless_problem + ",占比" + data.month_wireless_problem_rate + "</p></n>";
str1 += "<p>定界无异常总数为" + data.month_no_error_problem + ",占比" + data.month_no_error_problem_rate + "</p></n>";
$('.txtMon .ptot').html(str1);
//假数据,试点区域用户统计
var countTotal = 0;
for (var i = 0; i < data.city5G.length; i++) {
    for (var j in data.city5G[i]) {
        cityhtml += '<tr><td>' + j + '</td><td>' + data.city5G[i][j] + '</td></tr>';
        countTotal += data.city5G[i][j];
    }
}
cityhtml += '<tr><td>总计</td><td>' + countTotal + '</td></tr>';
$('.citytable tbody').html(cityhtml);
//假数据,异常与超时
//假数据,异常统计
var normalTimeMi = [];
var normalValMi = [];
var timeoutTimeMi = [];
var timeoutValMi = [];
var errorTimeMi = [];
var errorValMi = [];

var normalTimeSe = [];
var normalValSe = [];
var timeoutTimeSe = [];
var timeoutValSe = [];
var errorTimeSe = [];
var errorValSe = [];
var daily_errorX = [];
var daily_errorY = [];
var cityhtml = '';

var srecv = [];
var recv = [];
var serror = [];
var error = [];
var stimeout = [];
var timeout = [];

recv = data.recv_time;
for (var i = 0; i < recv.length; i++) {
    for (var j in recv[i]) {
        normalTimeMi.push(j);
        normalValMi.push(recv[i][j]);
    }
}
error = data.error_time;
for (var i = 0; i < error.length; i++) {
    for (var j in error[i]) {
        errorTimeMi.push(j);
        errorValMi.push(error[i][j]);
    }
}
// 第2个表
srecv = data.s_recv_time;
serror = data.s_error_time;
// 第3个表
recv = data.recv_time;
timeout = data.timeout_time;
// 第4个表
srecv = data.s_recv_time;
stimeout = data.s_timeout_time;
// 第5个表
for (var i = 0; i < data.daily_error.length; i++) {
    for (var j in data.daily_error[i]) {
        daily_errorX.push(j);
        daily_errorY.push(data.daily_error[i][j]);
    }
};
// 点击更多
var myChart1 = echarts.init(document.getElementById('container1'));
var option1 = {
    title: {
        text: '异常情况',
        subtext: ''
    },
    legend: {
        data: ['提交工单数', '异常数'],
        right: "5%",
        top: '3%',
    },
    tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        type: 'category',
        name: '时间/min',
        nameLocation: 'end',
        splitLine: {
            show: true,
            interval: '0.5'
        },
        nameGap: 25,
        data: normalTimeMi,
        axisLabel: {
            show: true,
            inside: false,
            rotate: 60,
            margin: 5,
        },
    },
    yAxis: {
        name: '数量',
        nameLocation: 'end',
        splitNumber: 10,
        splitLine: {
            show: true,
            interval: '0.5'
        },
    },
    grid: {
        bottom: "20%"
    },
    toolbox: {
        feature: {
            saveAsImage: {
                type: 'png',
                show: true,
            }
        },
        top: 10,
    },
    dataZoom: [{
        type: 'inside',
        id: '',
        disabled: false,
        xAxisIndex: null,
        yAxisIndex: null,
        radiusAxisIndex: null,
        angleAxisIndex: null,
        filterMode: 'filter',
        start: 0,
        end: 100,
        startValue: null,
        endValue: null,
        minSpan: null,
        maxSpan: null,
        minValueSpan: null,
        maxValueSpan: null,
        orient: null,
        zoomLock: false,
        throttle: 100,
        rangeMode: ['percent', 'percent'],
        zoomOnMouseWheel: true,
        moveOnMouseMove: true,
        moveOnMouseWheel: true,
        preventDefaultMouseMove: true,
    }],
    series: [{
        name: '提交工单数',
        type: 'bar',
        symbol: 'circle',
        visualMap: [{
            outOfRange: {
                color: ['#121122', 'rgba(3,4,5,0.4)', 'red'],
                symbolSize: [30, 100]
            }
        }],
        itemStyle: {
            color: '#5B9BD5'
        },
        data: normalValMi,
        markPoint: {
            data: [
                { type: 'max', name: '最大值' },
            ],
            label: { formatter: '{b}\n{c}' },
            symbolSize: 65,
        },
    }, {
        name: '异常数',
        type: 'bar',
        data: errorValMi,
        markPoint: {
            data: [
                { type: 'max', name: '最大值' },
            ],
            label: { formatter: '{b}\n{c}' },
            symbolSize: 65,
        },
    }],
};
myChart1.setOption(option1);
if (data.daily_error.length == 0) {
    var str = '<div class="p">系统无异常!</div>';
    $('#container5').html(str);
} else {
    // 第5个表
    var myChart5 = echarts.init(document.getElementById('container5'));
    // 指定图表的配置项和数据
    var option5 = {
        //--------------    标题 title  ----------------   
        title: {
            text: '异常统计',
            textStyle: { //---主标题内容样式    
                color: 'black'
            },
            top: '0',
            subtext: '', //---副标题内容样式
            subtextStyle: {
                color: '#bbb'
            },
            padding: [0, 0, 0, 100] //---标题位置,因为图形是是放在一个dom中,因此用padding属性来定位
        },
        //----------------   图例 legend  -----------------
        legend: {
            type: 'plain', //----图例类型，默认为'plain'，当图例很多时可使用'scroll'
            right: "5%",
            top: '3%',
            selected: {
                '数量': true, //----图例选择,图形加载出来会显示选择的图例，默认为true
            },
            textStyle: { //----图例内容样式
                color: '#666', //---所有图例的字体颜色
                //backgroundColor:'black',  //---所有图例的字体背景色
            },
            tooltip: { //图例提示框，默认不显示
                show: true,
                color: 'red',
            },
            data: [ //----图例内容
                {
                    name: '数量',
                    icon: 'roundRect', //----图例的外框样式
                    textStyle: {
                        color: '#666', //----单独设置某一个图例的颜色
                        //backgroundColor:'black',//---单独设置某一个图例的字体背景色
                    }
                }
            ],
        },
        //-------------  grid区域  ----------------
        grid: {
            show: false, //---是否显示直角坐标系网格
            top: 80, //---相对位置，top\bottom\left\right  
            containLabel: false, //---grid 区域是否包含坐标轴的刻度标签
            tooltip: { //---鼠标焦点放在图形上，产生的提示框
                show: true,
                trigger: 'item', //---触发类型
                textStyle: {
                    color: '#fff',
                },
            },
            bottom: "20%"
        },
        tooltip: {
            trigger: 'axis',
            tooltip: {
                trigger: 'axis',
                textStyle: {
                    color: '#fff'
                }
            },
        },
        //-------------   x轴   -------------------
        xAxis: {
            show: true, //---是否显示
            position: 'bottom', //---x轴位置
            offset: 0, //---x轴相对于默认位置的偏移
            type: 'category', //---轴类型，默认'category'
            name: '异常原因分类', //---轴名称
            nameLocation: 'end', //---轴名称相对位置
            nameTextStyle: { //---坐标轴名称样式
                color: "#666",
                padding: [5, 0, 0, -5], //---坐标轴名称相对位置
            },
            nameGap: 15, //---坐标轴名称与轴线之间的距离
            // nameRotate: 270, //---坐标轴名字旋转

            axisLine: { //---坐标轴 轴线
                show: true, //---是否显示

                //------------------- 箭头 -------------------------
                symbol: ['none', 'arrow'], //---是否显示轴线箭头
                symbolSize: [8, 8], //---箭头大小
                symbolOffset: [0, 7], //---箭头位置

                //------------------- 线 -------------------------
                lineStyle: {
                    color: '#666',
                    width: 1,
                    type: 'solid',
                },
            },
            axisTick: { //---坐标轴 刻度
                show: true, //---是否显示
                inside: true, //---是否朝内
                lengt: 3, //---长度
                lineStyle: {
                    //color:'red',          //---默认取轴线的颜色
                    width: 1,
                    type: 'solid',
                },
            },
            axisLabel: { //---坐标轴 标签
                show: true, //---是否显示
                inside: false, //---是否朝内
                rotate: 0, //---旋转角度   
                margin: 5, //---刻度标签与轴线之间的距离
                color: 'black', //---默认取轴线的颜色
            },
            splitLine: { //---grid 区域中的分隔线
                show: false, //---是否显示，'category'类目轴不显示，此时我的X轴为类目轴，splitLine属性是无意义的
                lineStyle: {
                    //color:'red',
                    //width:1,
                    //type:'solid',
                },
            },
            splitArea: { //--网格区域
                show: false, //---是否显示，默认false
            },
            data: daily_errorX, //内容
        },

        //----------------------  y轴  ------------------------
        yAxis: {
            show: true, //---是否显示
            position: 'left', //---y轴位置
            offset: 0, //---y轴相对于默认位置的偏移
            type: 'value', //---轴类型，默认'category'
            name: '数量', //---轴名称
            nameLocation: 'end', //---轴名称相对位置value
            nameTextStyle: { //---坐标轴名称样式
                color: "#666",
                // padding: [5, 0, 0, 5], //---坐标轴名称相对位置
                padding: [5, 0, 0, 5],
            },
            nameGap: 15, //---坐标轴名称与轴线之间的距离
            //nameRotate:270,           //---坐标轴名字旋转

            axisLine: { //---坐标轴 轴线
                show: true, //---是否显示

                //------------------- 箭头 -------------------------
                symbol: ['none', 'arrow'], //---是否显示轴线箭头
                symbolSize: [8, 8], //---箭头大小
                symbolOffset: [0, 7], //---箭头位置

                //------------------- 线 -------------------------
                lineStyle: {
                    color: '#666',
                    width: 1,
                    type: 'solid',
                },
            },
            axisTick: { //---坐标轴 刻度
                show: true, //---是否显示
                inside: true, //---是否朝内
                lengt: 3, //---长度
                lineStyle: {
                    //color:'red',          //---默认取轴线的颜色
                    width: 1,
                    type: 'solid',
                },
            },
            axisLabel: { //---坐标轴 标签
                show: true, //---是否显示
                inside: false, //---是否朝内
                rotate: 0, //---旋转角度   
                margin: 8, //---刻度标签与轴线之间的距离
                color: 'black', //---默认取轴线的颜色
            },
            splitLine: { //---grid 区域中的分隔线
                show: true, //---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
                lineStyle: {
                    color: '#666',
                    width: 1,
                    type: 'dashed', //---类型
                },
            },
            splitArea: { //--网格区域
                show: false, //---是否显示，默认false
            }
        },
        toolbox: {
            feature: {
                saveAsImage: {
                    type: 'png',
                    show: true,
                }
            },
            top: 10,
        },
        //------------ 内容数据  -----------------
        series: [{
            name: '数量', //---系列名称
            type: 'bar', //---类型
            legendHoverLink: true, //---是否启用图例 hover 时的联动高亮
            label: { //---图形上的文本标签
                normal: {
                    show: true,
                    position: 'top',
                    color: 'black',
                }
            },
            itemStyle: { //---图形形状
                color: '#888',
            },
            barWidth: '60', //---柱形宽度
            barCategoryGap: '20%', //---柱形间距
            data: daily_errorY
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart5.setOption(option5);
    myChart5.on('click', function(params) {
        if (params.dataIndex == 0) {
            $('#container6').show();
            var arr = [];
            for (k in data.error_time_type) {
                if (data.error_time_type[k] != 0) {
                    arr.push({ name: k, value: data.error_time_type[k] });
                }
            }
            // 饼图
            var x = params.point.x;
            var y = params.point.y;
            $('#container6').css({ 'left': x, 'top': y });
            var myChart6 = echarts.init(document.getElementById('container6'));
            var option6 = {
                title: {
                    text: '失败原因比例',
                    x: 'center',
                    itemGap: 4,
                    textStyle: {
                        fontSize: 12,
                    },
                    subtextStyle: {
                        fontSize: 10,
                        color: '#666',
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    textStyle: {
                        color: '#666'
                    }
                },
                grid: {
                    bottom: "20%"
                },
                // legend: {
                //     // bottom: '0',
                //     left: '80',
                //     top: '30',
                //     selectedMode: false,
                //     itemWidth: 5,
                //     itemHeight: 5,
                //     textStyle: {
                //         fontSize: 9
                //     },
                //     // orient: 'vertical',
                // },
                color: ['#BDA29A', '#749F83', '#c23531', '#5B9BD5'],
                series: [{
                    type: 'pie',
                    silent: true,
                    hoverAnimation: false,
                    radius: '55%',
                    cursor: 'defaut',
                    center: ['50%', '56%'],
                    data: arr,
                }]
            };
            myChart6.setOption(option6);
        } else {
            $('#container6').hide();
        }
    });

};
$('.classifyTab span').eq(0).click(function() {
    $('.classifyTab1').show();
    $('.classifyTab2').hide();
    $('.classifyTab3').hide();
    $('.classifyTab4').hide();
    $('.fenmiaoTab1').show();
    $('.fenmiaoTab2').hide();
    $('.fenmiaoTab1 span').eq(0).addClass('activeclick').siblings().removeClass('activeclick');
    $(this).addClass('activeclick');
    $(this).siblings().removeClass('activeclick');
});
$('.fenmiaoTab').each(function() {
    $(this).find('span').click(function() {
        var txt = $(this).text();
        var cls = $(this).parent().get(0).className;
        if (cls.indexOf('fenmiaoTab1') != -1) {
            if (txt == '分') {
                $('.classifyTab1').show();
                $('.classifyTab2').hide();
                $('.classifyTab3').hide();
                $('.classifyTab4').hide();
            } else if (txt == '秒') {
                $('.classifyTab1').hide();
                $('.classifyTab2').show();
                $('.classifyTab3').hide();
                $('.classifyTab4').hide();
                for (var i = 0; i < srecv.length; i++) {
                    for (var j in srecv[i]) {
                        normalTimeSe.push(j);
                        normalValSe.push(srecv[i][j]);
                    }
                }
                for (var i = 0; i < serror.length; i++) {
                    for (var j in serror[i]) {
                        errorTimeSe.push(j);
                        errorValSe.push(serror[i][j]);
                    }
                };
                var myChart2 = echarts.init(document.getElementById('container2'));
                var option2 = {
                    title: {
                        text: '异常情况',
                        subtext: ''
                    },
                    legend: {
                        data: ['提交工单数', '异常数'],
                        right: "5%",
                        top: '3%',
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        type: 'category',
                        name: '时间/min',
                        nameLocation: 'end',
                        splitLine: {
                            show: true,
                            interval: '0.5'
                        },
                        nameGap: 25,
                        data: normalTimeSe,
                        axisLabel: {
                            show: true,
                            inside: false,
                            rotate: 60,
                            margin: 5,
                        },
                    },
                    yAxis: {
                        name: '数量',
                        nameLocation: 'end',
                        splitNumber: 10,
                        splitLine: {
                            show: true,
                            interval: '0.5'
                        },

                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {
                                type: 'png',
                                show: true,
                            }
                        },
                        top: 10,
                    },
                    grid: {
                        bottom: "20%"
                    },

                    dataZoom: [{
                        type: 'inside',
                        id: '',
                        disabled: false,
                        xAxisIndex: null,
                        yAxisIndex: null,
                        radiusAxisIndex: null,
                        angleAxisIndex: null,
                        filterMode: 'filter',
                        start: 0,
                        end: 100,
                        startValue: null,
                        endValue: null,
                        minSpan: null,
                        maxSpan: null,
                        minValueSpan: null,
                        maxValueSpan: null,
                        orient: null,
                        zoomLock: false,
                        throttle: 100,
                        rangeMode: ['percent', 'percent'],
                        zoomOnMouseWheel: true,
                        moveOnMouseMove: true,
                        moveOnMouseWheel: true,
                        preventDefaultMouseMove: true,
                    }],
                    series: [{
                        name: '提交工单数',
                        type: 'bar',
                        symbol: 'circle',
                        visualMap: [{
                            outOfRange: {
                                color: ['#121122', 'rgba(3,4,5,0.4)', 'red'],
                                symbolSize: [30, 100]
                            }
                        }],
                        itemStyle: {
                            color: '#5B9BD5'
                        },
                        data: normalValSe,
                        markPoint: {
                            data: [
                                { type: 'max', name: '最大值' },
                            ],
                            label: { formatter: '{b}\n{c}' },
                            symbolSize: 65,
                        },
                    }, {
                        name: '异常数',
                        type: 'bar',
                        data: errorValSe,
                        markPoint: {
                            data: [
                                { type: 'max', name: '最大值' },
                            ],
                            label: { formatter: '{b}\n{c}' },
                            symbolSize: 65,
                        },
                    }],
                };
                myChart2.setOption(option2);
            }
        } else if (cls.indexOf('fenmiaoTab2') != -1) {
            if (txt == '分') {
                $('.classifyTab1').hide();
                $('.classifyTab2').hide();
                $('.classifyTab3').show();
                $('.classifyTab4').hide();
            } else if (txt == '秒') {
                $('.classifyTab1').hide();
                $('.classifyTab2').hide();
                $('.classifyTab3').hide();
                $('.classifyTab4').show();
                // 第4个表
                for (var i = 0; i < srecv.length; i++) {
                    for (var j in srecv[i]) {
                        normalTimeSe.push(j);
                        normalValSe.push(srecv[i][j]);
                    }
                }
                for (var i = 0; i < stimeout.length; i++) {
                    for (var j in stimeout[i]) {
                        timeoutTimeSe.push(j);
                        timeoutValSe.push(stimeout[i][j]);
                    }
                };
                var myChart4 = echarts.init(document.getElementById('container4'));
                var option4 = {
                    title: {
                        text: '超时情况',
                        subtext: ''
                    },
                    legend: {
                        data: ['提交工单数', '超时数'],
                        right: "5%",
                        top: '3%',
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        type: 'category',
                        name: '时间/min',
                        nameLocation: 'end',
                        splitLine: {
                            show: true,
                            interval: '0.5'
                        },
                        nameGap: 25,
                        data: normalTimeSe,
                        axisLabel: {
                            show: true,
                            inside: false,
                            rotate: 60,
                            margin: 5,
                        },
                    },
                    yAxis: {
                        name: '数量',
                        nameLocation: 'end',
                        splitNumber: 10,
                        splitLine: {
                            show: true,
                            interval: '0.5'
                        },

                    },
                    grid: {
                        bottom: "20%"
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {
                                type: 'png',
                                show: true,
                            }
                        },
                        top: 10,
                    },
                    dataZoom: [{
                        type: 'inside',
                        id: '',
                        disabled: false,
                        xAxisIndex: null,
                        yAxisIndex: null,
                        radiusAxisIndex: null,
                        angleAxisIndex: null,
                        filterMode: 'filter',
                        start: 0,
                        end: 100,
                        startValue: null,
                        endValue: null,
                        minSpan: null,
                        maxSpan: null,
                        minValueSpan: null,
                        maxValueSpan: null,
                        orient: null,
                        zoomLock: false,
                        throttle: 100,
                        rangeMode: ['percent', 'percent'],
                        zoomOnMouseWheel: true,
                        moveOnMouseMove: true,
                        moveOnMouseWheel: true,
                        preventDefaultMouseMove: true,
                    }],
                    series: [{
                        name: '提交工单数',
                        type: 'bar',
                        symbol: 'circle',
                        visualMap: [{
                            outOfRange: {
                                color: ['#121122', 'rgba(3,4,5,0.4)', 'red'],
                                symbolSize: [30, 100]
                            }
                        }],
                        itemStyle: {
                            color: '#5B9BD5'
                        },
                        data: normalValSe,
                        markPoint: {
                            data: [
                                { type: 'max', name: '最大值' },
                            ],
                            label: { formatter: '{b}\n{c}' },
                            symbolSize: 65,
                        }
                    }, {
                        name: '超时数',
                        type: 'bar',
                        data: timeoutValSe,
                        markPoint: {
                            data: [
                                { type: 'max', name: '最大值' },
                            ],
                            label: { formatter: '{b}\n{c}' },
                            symbolSize: 65,
                        }
                    }],
                };
                myChart4.setOption(option4);
            }
        }
        $(this).addClass('activeclick').siblings().removeClass('activeclick');
    })
});
$('.classifyTab span').eq(1).click(function() {
    $('.classifyTab1').hide();
    $('.classifyTab2').hide();
    $('.classifyTab3').show();
    $('.classifyTab4').hide();
    $('.fenmiaoTab1').hide();
    $('.fenmiaoTab2').show();
    $('.fenmiaoTab2 span').eq(0).addClass('activeclick').siblings().removeClass('activeclick');
    $(this).addClass('activeclick');
    $(this).siblings().removeClass('activeclick');
    // 第3个表
    for (var i = 0; i < recv.length; i++) {
        for (var j in recv[i]) {
            normalTimeMi.push(j);
            normalValMi.push(recv[i][j]);
        }
    }
    for (var i = 0; i < timeout.length; i++) {
        for (var j in timeout[i]) {
            timeoutTimeMi.push(j);
            timeoutValMi.push(timeout[i][j]);
        }
    };
    var myChart3 = echarts.init(document.getElementById('container3'));
    var option3 = {
        title: {
            text: '超时情况',
            subtext: ''
        },
        legend: {
            data: ['提交工单数', '超时数'],
            right: "5%",
            top: '3%',
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            name: '时间/min',
            nameLocation: 'end',
            splitLine: {
                show: true,
                interval: '0.5'
            },
            nameGap: 25,
            data: normalTimeMi,
            axisLabel: {
                show: true,
                inside: false,
                rotate: 60,
                margin: 5,
            },
        },
        yAxis: {
            name: '数量',
            nameLocation: 'end',
            splitNumber: 10,
            splitLine: {
                show: true,
                interval: '0.5'
            },

        },
        toolbox: {
            feature: {
                saveAsImage: {
                    type: 'png',
                    show: true,
                }
            },
            top: 10,
        },
        grid: {
            bottom: "20%"
        },
        dataZoom: [{
            type: 'inside',
            id: '',
            disabled: false,
            xAxisIndex: null,
            yAxisIndex: null,
            radiusAxisIndex: null,
            angleAxisIndex: null,
            filterMode: 'filter',
            start: 0,
            end: 100,
            startValue: null,
            endValue: null,
            minSpan: null,
            maxSpan: null,
            minValueSpan: null,
            maxValueSpan: null,
            orient: null,
            zoomLock: false,
            throttle: 100,
            rangeMode: ['percent', 'percent'],
            zoomOnMouseWheel: true,
            moveOnMouseMove: true,
            moveOnMouseWheel: true,
            preventDefaultMouseMove: true,
        }],
        series: [{
            name: '提交工单数',
            type: 'bar',
            symbol: 'circle',
            visualMap: [{
                outOfRange: {
                    color: ['#121122', 'rgba(3,4,5,0.4)', 'red'],
                    symbolSize: [30, 100]
                }
            }],
            itemStyle: {
                color: '#5B9BD5'
            },
            data: normalValMi,
            markPoint: {
                data: [
                    { type: 'max', name: '最大值' },
                ],
                label: { formatter: '{b}\n{c}' },
                symbolSize: 65,
            }
        }, {
            name: '超时数',
            type: 'bar',
            data: timeoutValMi,
            markPoint: {
                data: [
                    { type: 'max', name: '最大值' },
                ],
                label: { formatter: '{b}\n{c}' },
                symbolSize: 65,
            }
        }],
    };
    myChart3.setOption(option3);
});