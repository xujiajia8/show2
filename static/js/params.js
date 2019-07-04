// 参数配置页面开始
var spanIndex = 0;
var clickVal = true;
$(function() {
    var EmosEnterMark = localStorage.getItem('EmosEnterMark');
    //var EmosEnterMark = '0'
    if (EmosEnterMark == '0') {
        $('.top li:last-child').unbind();
        $('.nav li').eq(2).hide();
        $('.top li:last-child').click(function() {
            window.location.href = '/logout/1/';
        })
    } else if (EmosEnterMark == '1') {
        $('.top li:last-child').unbind();
        $('.nav li').eq(1).hide();
        $('.nav li').eq(4).hide();
        $('.top li:last-child').click(function() {
            window.location.href = '/logout/2/';
        })
    }
    $('.nav li:last-child').on('click', function() {
        var bn = $(this).find('div').css('display');
        if (bn == 'block') {
            $(this).find('div').hide()
        } else {
            $(this).find('div').show()
        }
    })
    $('.nav li:last-child').find('div').on('click', function(e) {
            var evt = e || window.event;
            var elem = evt.target;
            if (elem.nodeName == 'A') {
                $(elem).addClass('active').siblings().removeClass('active');
                $('.siled .bDivTotal').eq($(elem).index()).addClass('active').siblings().removeClass('active');
            }
            evt.stopPropagation()
        })
        // 设置弹窗水平垂直
    $(window).resize();
    //把编辑按钮，操作按钮，修改后上传文件按钮隐藏
    // $('.siled td').each(function() {
    //     if ($(this).text() == '编辑') {
    //         $(this).hide();
    //     }
    // });
    // $('.siled .cont table th').each(function() {
    //     if ($(this).text() == '操作') {
    //         $(this).hide();
    //     }
    // });
    // $('.siled .cont table th').each(function() {
    //     if ($(this).text() == '修改后上传文件') {
    //         $(this).hide();
    //     }
    // });
    // $('.siled .cont table td').each(function() {
    //     if ($(this).find('form').length > 0) {
    //         $(this).hide();
    //     }
});
// 刚进入页面就请求第一大页面内容
$.ajax({　　　　　　
        url: '/common/return_threshold/',
        type: 'post',
        dataType: 'json',
        data: {
            spanNumber: spanIndex
        },
        success: function(data) {
            console.log(data);
            //渲染数据接口url配置
            for (var key in data.dataUrl) {
                $("#" + key).text(data.dataUrl[key]);
            }
            //渲染数据接口参数配置
            for (var key in data.dataParam) {
                $("#" + key).text(data.dataParam[key]);
            }
            //渲染性能数据分析阈值
            for (var key in data.dataPerformance) {
                $("#" + key).text(data.dataPerformance[key]);
            }
            //渲染告警配置
            for (var key in data.dataAlarm) {
                $("#" + key).text(data.dataAlarm[key]);
            }
            //渲染网优配置
            for (var key in data.dataNet) {
                $("#" + key).text(data.dataNet[key]);
            };
            // 根据权限判断编辑按钮，操作按钮，修改后上传文件按钮是否隐藏
            if (data.permission.msg == 0) {
                $('.siled td').each(function() {
                    if ($(this).text() == '编辑') {
                        $(this).hide();
                    }
                });
                $('.siled .cont table th').each(function() {
                    if ($(this).text() == '操作') {
                        $(this).hide();
                    }
                });
                $('.siled .cont table th').each(function() {
                    if ($(this).text() == '修改后上传文件') {
                        $(this).hide();
                    }
                });
                $('.siled .cont table td').each(function() {
                    if ($(this).find('form').length > 0) {
                        $(this).hide();
                    }
                });
            } else {
                $('.siled .cont table td').show();
                $('.siled .cont table th').show();
            }
        }　　　　
    })
    // }

// 测试第1个接口
// });
// 让弹框水平垂直居中
$(window).resize(function() {
    $(".popup").css({
        position: "fixed",
        left: ($(window).width() - $(".popup").outerWidth()) / 2,
        top: ($(window).height() - $(".popup").outerHeight()) / 2,
    });
    $(".sucpop").css({
        position: "fixed",
        left: ($(window).width() - $(".sucpop").outerWidth()) / 2,
        top: ($(window).height() - $(".sucpop").outerHeight()) / 2,
    });
    $(".errpop").css({
        position: "fixed",
        left: ($(window).width() - $(".errpop").outerWidth()) / 2,
        top: ($(window).height() - $(".errpop").outerHeight()) / 2,
    });
    $(".delsucpop").css({
        position: "fixed",
        left: ($(window).width() - $(".delsucpop").outerWidth()) / 2,
        top: ($(window).height() - $(".delsucpop").outerHeight()) / 2,
    });
    $(".delerrpop").css({
        position: "fixed",
        left: ($(window).width() - $(".delerrpop").outerWidth()) / 2,
        top: ($(window).height() - $(".delerrpop").outerHeight()) / 2,
    });
    $(".edipopup").css({
        position: "fixed",
        left: ($(window).width() - $(".edipopup").outerWidth()) / 2,
        top: ($(window).height() - $(".edipopup").outerHeight()) / 2,
    });
    $(".uploadpup").css({
        position: "fixed",
        left: ($(window).width() - $(".uploadpup").outerWidth()) / 2,
        top: ($(window).height() - $(".uploadpup").outerHeight()) / 2,
    });
});
// 点击3个大页面,对应小页面显示
$('.tabImport span').click(function() {
    $(this).addClass('active-font').siblings().removeClass('active-font');
    // 切换效果
    $('.bDivTotal').eq($(this).index()).addClass('active').siblings().removeClass('active');
});
// 点击5个小页面，其背景以及下部内容切换
$('.siled .bTab span').click(function() {
        $('.siled .bDivTotal .cont').eq($(this).index()).addClass('active').siblings().removeClass('active');
        $(this).addClass('active-border').siblings().removeClass('active-border');
    })
    // 点击搜索框,模糊查询变橘色
var tds = $('.siled .bDivTotal-one td');
$('.siled .subtitle2 i').click(function() {
    var searchVal = $(this).parent('.subtitle2').children('input').val().trim();
    for (var i = 0; i < tds.length; i++) {
        $(tds[i]).css('backgroundColor', 'transparent');
    };
    if (searchVal.length != 0) {
        for (var i = 0; i < tds.length; i++) {
            console.log(1);
            if ($(tds[i]).text().indexOf(searchVal) != -1) {
                $(tds[i]).css('backgroundColor', 'orange');
            }
        };
    };
    // $('.bDivTotal').each(function() {
    //     if ($(this).hasClass('active')) {
    //         $(this).removeClass('active')
    //     }
    // });
    // $('.bDivTotal_ser').addClass('active');
});
// 搜索框回车,模糊查询变橘色
$('.siled .subtitle2 input').on('keypress', function(event) {
    if (event.keyCode == 13) {
        var searchVal = $(this).parent('.subtitle2').children('input').val().trim();
        for (var i = 0; i < tds.length; i++) {
            $(tds[i]).css('backgroundColor', 'transparent');
        };
        if (searchVal.length != 0) {
            for (var i = 0; i < tds.length; i++) {
                console.log(1);
                if ($(tds[i]).text().indexOf(searchVal) != -1) {
                    $(tds[i]).css('backgroundColor', 'orange');
                }
            };
        };
    }
    // $('.bDivTotal').each(function() {
    //     if ($(this).hasClass('active')) {
    //         $(this).removeClass('active')
    //     }
    // });
    // $('.bDivTotal_ser').addClass('active');
});
$('.bDivTotal_ser .clo').click(function() {
    $('.bDivTotal_ser').removeClass('active');
    $('.bDivTotal-one').addClass('active');
    $('.siled .bTab span').each(function() {
        if ($(this).hasClass('active-border')) {
            $('.siled .bDivTotal .cont').eq($(this).index()).addClass('active').siblings().removeClass('active');
        }
    });
});
// 分别设置表格的每一列宽度
$('.bDivTotal-one .cont:nth-child(2) table').each(function() {
    $(this).find('tr td:last-child').prev().css("fontSize", "10px");
    $(this).find('tr td:last-child').prev().prev().prev().css("width", "25%");
    $(this).find('tr td:last-child').prev().prev().css("width", "15%");
    $(this).find('tr td:last-child').prev().css("width", "50%");
    $(this).find('tr td:last-child').css("width", "10%");
});
$('.bDivTotal-one .cont:nth-child(2) table:last-child tr td:last-child').prev().css("width", "65%");
$('.bDivTotal-one .cont:nth-child(2) table:last-child tr td:last-child').prev().prev().css("width", "25%");
$('.bDivTotal-one .cont:nth-child(3) table').each(function() {
    $(this).find('tr td:last-child').prev().css("fontSize", "10px");
    $(this).find('tr td:last-child').prev().prev().prev().prev().css("width", "15%");
    $(this).find('tr td:last-child').prev().prev().prev().css("width", "20%");
    $(this).find('tr td:last-child').prev().prev().css("width", "10%");
    $(this).find('tr td:last-child').prev().css("width", "45%");
    $(this).find('tr td:last-child').css("width", "10%");
});
$('.bDivTotal-one .cont:nth-child(4) table').each(function() {
    $(this).find('tr td:last-child').prev().css("fontSize", "10px");
    $(this).find('tr td:last-child').prev().prev().prev().prev().css("width", "10%");
    $(this).find('tr td:last-child').prev().prev().prev().css("width", "15%");
    $(this).find('tr td:last-child').prev().prev().css("width", "10%");
    $(this).find('tr td:last-child').prev().css("width", "45%");
    $(this).find('tr td:last-child').css("width", "10%");
});
$('.bDivTotal-one .cont:nth-child(5) table').each(function() {
    $(this).find('tr td:last-child').prev().css("fontSize", "10px");
    $(this).find('tr td:last-child').prev().prev().prev().prev().css("width", "15%");
    $(this).find('tr td:last-child').prev().prev().prev().css("width", "20%");
    $(this).find('tr td:last-child').prev().prev().css("width", "10%");
    $(this).find('tr td:last-child').prev().css("width", "45%");
    $(this).find('tr td:last-child').css("width", "10%");
});
$('.bDivTotal-one .cont:nth-child(6) table').each(function() {
    $(this).find('tr td:last-child').prev().css("fontSize", "10px");
    $(this).find('tr td:last-child').prev().prev().prev().css("width", "15%");
    $(this).find('tr td:last-child').prev().prev().css("width", "30%");
    $(this).find('tr td:last-child').prev().css("width", "35%");
    $(this).find('tr td:last-child').css("width", "20%");
    $(this).find('tr td:last-child').css("text-align", "center");
});
// 点击编辑按钮
var thisEditor;
$('.exit').each(function() {
    $(this).click(function() {
        clickVal = true;
        $('.edipopup').children('input').val(' ');
        // 点击编辑按钮,出现弹框
        $('.edipopup').addClass('active-pop');
        // 点击编辑按钮,背景色变化
        $('.popupOverContainer').addClass('popupOver');
        // 点击编辑按钮,弹框里显示内容
        var inpTextCount = $(this).parent('td').prev().prev().prev().text();
        $('.edipopup p').text(inpTextCount);
        var inpIndex = $(this).parent('td').prev().prev().attr('id');
        $('.edipopup input').val($(this).parent('td').prev().prev().text());
        var litext = $(this).parent('td').prev().text();
        if (litext.indexOf('例') != -1) {
            litext1 = litext.substring(litext.indexOf('例'));
            litext2 = litext.slice(0, litext.indexOf('例'));
            litext = litext2 + '<br>' + litext1;
        }
        $('.edipopup .txt').html("配置说明：" + litext);
        thisEditor = $(this);
        // 判断值在0和1之间  
        $('.edipopup .txt').css('color', '#333');
        $('.edipopup input').css('border-color', '#ccc');
        $('.edipopup input')[0].oninput = function() {
            if (litext.indexOf('【0，1】') != -1) {
                $('.edipopup .warning').text('取值范围：【0，1】');
                if ((Number($('.edipopup input').val()) < 0 || Number($('.edipopup input').val()) > 1)) {
                    $('.edipopup .txt').css('color', 'red');
                    $('.edipopup input').css('border-color', 'red');
                    clickVal = false;
                } else {
                    $('.edipopup .txt').css('color', '#333');
                    $('.edipopup input').css('border-color', '#ccc');
                    clickVal = true;
                }
            };
            if (litext.indexOf('取值范围：【0,+∞】，保留两位小数') != -1) {
                $('.edipopup .warning').text('取值范围：(0，+∞)，保留两位小数');
                if (/^\+?(\d*\.\d{2})$/.test(Number($('.edipopup input').val()))) {
                    $('.edipopup .txt').css('color', '#333');
                    $('.edipopup input').css('border-color', '#ccc');
                    clickVal = true;
                } else {
                    $('.edipopup input').css('border-color', 'red');
                    $('.edipopup input').css('border-color', 'red');
                    clickVal = false;
                }
            };
            if (litext.indexOf('类型是大于0的数字') != -1) {
                $('.edipopup .warning').text('类型是大于0的数字');
                if (/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/.test(Number($('.edipopup input').val()))) {
                    $('.edipopup input').css('border-color', '#ccc');
                    $('.edipopup input').css('border-color', '#ccc');
                    clickVal = true;
                } else {
                    $('.edipopup .txt').css('color', 'red');
                    $('.edipopup input').css('border-color', 'red');
                    clickVal = false;
                }
            };
            if (litext.indexOf('单位：秒') != -1) {
                $('.edipopup .warning').text('单位：秒，默认300秒填300');
                if (Number($('.edipopup input').val()) > 0 || Number($('.edipopup input').val()) == 0) {
                    $('.edipopup .txt').css('color', '#333');
                    $('.edipopup input').css('border-color', '#ccc');
                    clickVal = true;
                } else {
                    $('.edipopup .txt').css('color', 'red');
                    $('.edipopup input').css('border-color', 'red');
                    clickVal = false;
                }
            };
            if (litext.indexOf('单位：小时') != -1) {
                $('.edipopup .warning').text('单位：小时');
                if (Number($('.edipopup input').val()) > 0 || Number($('.edipopup input').val()) == 0) {
                    $('.edipopup .txt').css('color', '#333');
                    $('.edipopup input').css('border-color', '#ccc');
                    clickVal = true;
                } else {
                    $('.edipopup .txt').css('color', 'red');
                    $('.edipopup input').css('border-color', 'red');
                    clickVal = false;
                }
            };
            if (litext.indexOf('取值范围：【0，60】，单位：s(秒)') != -1) {
                $('.edipopup .warning').text('取值范围：【0，60】，单位：s(秒)');
                if ((Number($('.edipopup input').val()) > 0 && Number($('.edipopup input').val()) < 60) || (Number($('.edipopup input').val()) == 0) || (Number($('.edipopup input').val())) == 60) {
                    $('.edipopup .txt').css('color', '#333');
                    $('.edipopup input').css('border-color', '#ccc');
                    clickVal = false;
                } else {
                    $('.edipopup .txt').css('color', 'red');
                    $('.edipopup input').css('border-color', 'red');
                    clickVal = true;
                }
            };
            if (litext.indexOf('类型是0到5之间的数组') != -1) {
                $('.edipopup .warning').text('类型是0到5之间的数组');
                var arrval = JSON.parse($('.edipopup input').val());
                if (arrval instanceof Array) {
                    for (var i = 0; i < arrval.length; i++) {
                        if (arrval[i] < 0 || arrval[i] > 5) {
                            $('.edipopup .txt').css('color', 'red');
                            $('.edipopup input').css('border-color', 'red');
                            clickVal = false;
                        } else {
                            $('.edipopup .txt').css('color', '#333');
                            $('.edipopup input').css('border-color', '#ccc');
                            clickVal = true;
                        }
                    }
                } else {
                    $('.edipopup .txt').css('color', 'red');
                    $('.edipopup input').css('border-color', 'red');
                    clickVal = false;
                }
            };
            if (litext.indexOf('大于0的整数') != -1) {
                $('.edipopup .warning').text('取值应为大于0的整数');
                if (/^\+?[1-9][0-9]*$/.test($('.edipopup input').val())) {
                    $('.edipopup .txt').css('color', '#333');
                    $('.edipopup input').css('border-color', '#ccc');
                    clickVal = true;
                } else {
                    $('.edipopup .txt').css('color', 'red');
                    $('.edipopup input').css('border-color', 'red');
                    clickVal = false;
                }
            } else if (litext.indexOf('大于或等于0的整数') != -1) {
                $('.edipopup .warning').text('取值应为大于或等于0的整数');
                if (/^\d+$/.test($('.edipopup input').val())) {
                    $('.edipopup .txt').css('color', '#333');
                    $('.edipopup input').css('border-color', '#ccc');
                    clickVal = true;
                } else {
                    $('.edipopup .txt').css('color', 'red');
                    $('.edipopup input').css('border-color', 'red');
                    clickVal = false;
                }
            } else if (litext.indexOf('类型为整数，取值范围：【0，60】，单位：min(分钟)') != -1) {
                $('.edipopup .warning').text('类型为整数，取值范围：【0，60】，单位：min(分钟)');
                if (/^(0|[0-5][0-9]?|60)$/.test($('.edipopup input').val())) {
                    $('.edipopup .txt').css('color', '#333');
                    $('.edipopup input').css('border-color', '#ccc');
                    clickVal = true;
                    console.log('正确')
                } else {
                    $('.edipopup .txt').css('color', 'red');
                    $('.edipopup input').css('border-color', 'red');
                    clickVal = false;
                }
            } else if (litext.indexOf('类型为整数，取值范围：【0，该长度与时间片聚合粒度相乘后时长不超过1天】') != -1) {
                $('.edipopup .warning').text('类型为整数，取值范围：【0，该长度与时间片聚合粒度相乘后时长不超过1天】');
                if (/^\d+$/.test($('.edipopup input').val())) {
                    $('.edipopup .txt').css('color', '#333');
                    $('.edipopup input').css('border-color', '#ccc');
                    clickVal = true;
                    console.log('正确')
                } else {
                    $('.edipopup .txt').css('color', 'red');
                    $('.edipopup input').css('border-color', 'red');
                    clickVal = false;
                }
            } else if (litext.indexOf('整数') != -1) {
                $('.edipopup .warning').text('取值应为整数');
                if (/^-?\d+$/.test($('.edipopup input').val())) {
                    $('.edipopup .txt').css('color', '#333');
                    $('.edipopup input').css('border-color', '#ccc');
                    clickVal = true;
                } else {
                    $('.edipopup .txt').css('color', 'red');
                    $('.edipopup input').css('border-color', 'red');
                    clickVal = false;
                }
            }
        };

        // 点击弹框确定按钮
        $('.edipopup button.sure').click(function() {
            if (clickVal) {
                $('.edipopup .warning').text('');
                $('.edipopup .txt').css('color', '#333');
                $('.edipopup input').css('border-color', '#ccc');
                // 点击弹框确定按钮,弹框消失
                $('.edipopup').removeClass('active-pop');
                // 点击弹框确定按钮,背景色变化
                $('.popupOverContainer').removeClass('popupOver');
                // 点击弹框确定按钮,内容替换,
                // 获取弹框里input内容
                var inpPartInpVal = $(this).parent('.edipopup').children('input').val();
                // console.log(inpPartInpVal);
                thisEditor.parent('td').prev().prev().text(inpPartInpVal);
                var returnData = {};
                returnData[inpIndex] = inpPartInpVal;
                $.ajax({　　　　　　
                    url: '/common/change_threshold/',
                    type: 'post',
                    dataType: 'json',
                    data: returnData,
                    success: function(data) {
                        if (data.msg == "OK") {
                            $('.popupOverContainer').addClass('popupOver');
                            $('.sucpop').removeClass('none');
                            $('.sucpop .clo').click(function() {
                                $('.popupOverContainer').removeClass('popupOver');
                                $('.sucpop').addClass('none');
                            });

                            function closuc() {
                                $('.popupOverContainer').removeClass('popupOver');
                                $('.sucpop').addClass('none');
                            };
                            setTimeout("closuc();", 3000);
                        } else if (data.msg == 1) {
                            $('.popupOverContainer').addClass('popupOver');
                            $('.errpop').removeClass('none');
                            $('.errpop .clo').click(function() {
                                $('.popupOverContainer').removeClass('popupOver');
                                $('.errpop').addClass('none');
                            });

                            function cloerr() {
                                $('.popupOverContainer').removeClass('popupOver');
                                $('.errpop').addClass('none');
                            }
                            setTimeout("cloerr();", 3000);
                        }
                    }
                })
            }
            $(this).unbind();
        });
        // 点击弹框取消按钮
        $('.edipopup button.canc').click(function() {
            // 点击弹框确定按钮,弹框消失
            $('.edipopup').removeClass('active-pop');
            // 点击弹框确定按钮,背景色变化
            $('.popupOverContainer').removeClass('popupOver');
            $(this).unbind();
        });
        // 点击关闭按钮
        $('.edipopup .clo').click(function() {
            // 点击弹框确定按钮,弹框消失
            $('.edipopup').removeClass('active-pop');
            // 点击弹框确定按钮,背景色变化
            $('.popupOverContainer').removeClass('popupOver');
            $(this).unbind();
        })
    });
})
var url;
var timeString;
// 下载文件函数
function downloadFile(url, timeString) {
    var form = $("<form>"); //定义form表单,通过表单发送请求
    form.attr("style", "display:none"); //设置为不显示
    form.attr("target", "");
    form.attr("method", "post"); //设置请求类型  
    form.attr("action", url); //设置请求路径
    var input1 = $('<input>');
    input1.attr('type', 'hidden');
    input1.attr('name', 'exportPostTime');
    input1.attr('value', timeString);

    $('body').append(form); //将表单放置在web中
    form.append(input1); //将查询参数控件提交到表单上
    form.submit(); //表单提交
}
// 点击下载
$('.load').each(function() {
    $(this).click(function() {
        timeString = $(this).prev().text();
        console.log(timeString);
        downloadFile('/common/download_file/', timeString);
    });
});
$("#updateFile").click(function() {
    $("#file1").trigger("click");
});
$("#file1").change(function() {
    //获取FileUpload对象
    var x = document.getElementById("file1").files;
    //把获得的文件名放入text里面显示
    $("#updateFile").val(x[0].name);
});
// 点击上传
$('.btnImportOK').each(function() {
    $(this).click(function() {
        var formData = new FormData($(this).parent('.uploadForm')[0]);
        console.log(formData);
        $.ajax({
            type: 'post',
            data: formData,
            url: '/common/upload_ajax/',
            contentType: false,
            processData: false,
        }).success(function(data) {
            if (data.status) {
                alert("上传成功");
            } else {
                alert(data.msg);
            }

        }).error(function(data) {
            alert(data);
        });
    });
});
// 点击长传出现弹框
$('.cliuploadpop').each(function() {
    $(this).click(function() {
        $('.uploadpup').addClass('active');
    });
});

// 分页JS
var pageIndex = Number(0);
var pageTotal = 0;
var pageTotal = Number(14) - 1;
$(function() {
    spanIndex = 1;
    $.ajax({　　　　　　
        url: 'mode.php',
        type: 'post',
        dataType: 'json',
        data: {
            spanNumber: spanIndex
        },
        success: function(data) {
            // data = JSON.parse(data);
            // console.log(data);
            var returnData = {};
            returnData[0] = pageIndex + Number(1);
            returnData[1] = pageTotal;
            // console.log(returnData);
            var html = "";
            for (let i = 0; i < data.length; i++) {
                html += '<div class="inp-part"><div class="inp-text">' +
                    data[i].ModelName + '</div><input type="text" value="' +
                    data[i].ModelValue + '"><input type="submit" value="提交"></div>'
            }
            $(".modelUpdate form").html(html);
        }　　　　
    })
})

// 点击页码，背景色变化,发ajax请求，以及省略号
$('#spanContainer span').click(function() {
    pageIndex = Number($(this).index());
    if ($(this).hasClass('bgcActive') === false) {
        ajaxPagingData();
    }
    $(this).addClass('bgcActive').siblings().removeClass('bgcActive');
    ellipsis();
});
// 点击上一页  
$('.prev').click(function() {
    if (pageIndex != 0) {
        pageIndex = pageIndex - 1;
        ajaxPagingData();
        ellipsis2();
    }
    if (pageIndex > 0 || pageIndex == 0) {
        $('#spanContainer span').eq(pageIndex).addClass('bgcActive').siblings().removeClass('bgcActive');
    } else {
        pageIndex = 0;
    };
});
// 点击下一页
$('.next').click(function() {
    if (pageIndex != pageTotal - 1) {
        pageIndex = pageIndex + 1;
        ajaxPagingData();
        ellipsis();
    }
    if (pageIndex < pageTotal || pageIndex == pageTotal - 1) {
        $('#spanContainer span').eq(pageIndex).addClass('bgcActive').siblings().removeClass('bgcActive');
    } else {
        pageIndex = pageTotal - 1;
    };
});

function ellipsis() {
    // 总页码
    var n = pageTotal; //13个
    // 当前页码
    var c = pageIndex;
    // console.log(c);
    var setp1 = c; //0
    // 总页码和当前页码的差值
    var setp2 = n - c; //后余 13
    // 当总页码大于10时，
    if (n > 5 || n == 5) {
        $('#spanContainer span').eq(n - 2).text('...');
        for (i = 3; i < parseInt(n - 2); i++) {
            $('#spanContainer span').eq(i).hide();
        };
        // 当前页码大于3时
        if (c > 2 || c == 2) {
            $('#spanContainer span').eq(1).text('...');
            $('#spanContainer span').eq(c).text(c + Number(1));
            $('#spanContainer span').eq(c + 1).text(c + Number(2));
            $('#spanContainer span').eq(c + 1).show();
            $('#spanContainer span').eq(c).show();
            // 从第3页到当前页码隐藏
            for (i = 2; i < parseInt(c); i++) {
                $('#spanContainer span').eq(i).hide();
            };
            if (c == n - 2 || c == n - 1) {
                $('#spanContainer span').eq(n - 1).show();
                $('#spanContainer span').eq(n - 2).show();
                $('#spanContainer span').eq(n - 3).show();
                $('#spanContainer span').eq(n - 2).text(n - 1);
            }
        };
    }
};
ellipsis();

function ellipsis2() {
    // 总页码
    var n = pageTotal; //13个
    // 当前页码
    var c = pageIndex;
    // console.log(c);
    var setp1 = c; //0
    // 总页码和当前页码的差值
    var setp2 = n - c; //后余 13
    // 当总页码大于10时，
    if (n > 5 || n == 5) {
        $('#spanContainer span').eq(n - 2).text('...');
        for (i = 3; i < parseInt(n - 2); i++) {
            $('#spanContainer span').eq(i).hide();
        };
        // 当前页码大于3时
        if (c > 2) {
            $('#spanContainer span').eq(1).text('...');
            $('#spanContainer span').eq(c).text(c + Number(1));
            $('#spanContainer span').eq(c + 1).text(c + Number(2));
            $('#spanContainer span').eq(c + 1).show();
            $('#spanContainer span').eq(c).show();
            // 从第3页到当前页码隐藏
            for (i = 2; i < parseInt(c); i++) {
                $('#spanContainer span').eq(i).hide();
            };
            if (c == n - 2 || c == n - 1) {
                $('#spanContainer span').eq(n - 1).show();
                $('#spanContainer span').eq(n - 2).show();
                $('#spanContainer span').eq(n - 3).show();
                $('#spanContainer span').eq(n - 2).text(n - 1);
            }
        };
        if (c == 2) {
            $('#spanContainer span').eq(0).show();
            $('#spanContainer span').eq(1).show();
            $('#spanContainer span').eq(2).show();
            $('#spanContainer span').eq(1).text('2');
        }
    }
};

function ajaxPagingData() {
    var returnData = {};
    returnData[0] = pageIndex + Number(1);
    returnData[1] = pageTotal;
    console.log(returnData);
    $.ajax({
        url: 'mode.php',
        data: returnData,
        type: 'post',
        dataType: 'json',
        success: function(data) {
            // data = JSON.parse(data);
            // console.log(data);
            var html = "";
            for (let i = 0; i < data.length; i++) {
                html += '<div class="inp-part"><div class="inp-text">' +
                    data[i].ModelName + '</div><input type="text" value="' +
                    data[i].ModelValue + '"><input type="submit" value="提交"></div>'
            }
            $(".modelUpdate form").html(html);
        }
    })
};
// 参数配置页面结束
// 权限配置页面开始
//  一进入页面获取页面全部数据 
// 假数据
var data = {
    "count": 3,
    "total_page": 1,
    "user_list": [{ "prov": "\u6c5f\u82cf", "city": "", "username": "jiangsu", "username_cn": "", "phone_num": "", "id": 1 },
        { "prov": "\u6c5f\u82cf", "city": "", "username": "EOMS_wangyiguangsgs", "username_cn": "\u738b\u4e00\u5149", "phone_num": "13905183310", "id": 159 },
        { "prov": "\u6c5f\u82cf", "city": "", "username": "wangyiguang", "username_cn": "", "phone_num": "", "id": 165 }
    ]
};
var str = "";
for (var i = 0; i < data.user_list.length; i++) {
    str += "<tr><td class=" + data.user_list[i].id + ">" + data.user_list[i]['prov'] + "</td><td>" + data.user_list[i].city + "</td><td>" + data.user_list[i].username + "</td><td>" + data.user_list[i].username_cn + "</td><td>" + data.user_list[i].phone_num + "</td>";
};
console.log(str);
$('.bDivTotalRight table tbody').html(str);
// 假数据

function ajaxSerchData(urldata, serchData) {
    $.ajax({　　　　　　
        url: urldata,
        type: 'post',
        dataType: 'json',
        data: serchData,
        success: function(data) {
            var str = "";
            for (var i = 0; i < data.user_list.length; i++) {
                str += "<tr><td class=" + data.user_list[i].id + ">" + data.user_list[i]['prov'] + "</td><td>" + data.user_list[i].city + "</td><td>" + data.user_list[i].username + "</td><td>" + data.user_list[i].username_cn + "</td><td>" + data.user_list[i].phone_num + "</td>";
            };
            // console.log(str);
            $('.bDivTotalRight table tbody').html(str);
            var pagetotalcount1 = 1;
            pagetotalcount1 = data.count;
            console.log(pagetotalcount1);
            var totalPage1 = Math.ceil(pagetotalcount1 / 10);
            page1.find('.t').html(pagetotalcount1);
            page1.find('.tt').html(totalPage1);
        }
    })
};
//  一进入页面获取页面全部数据 
$(function() {
    var pagedata = {};
    pagedata.pagenum = 1;
    $.ajax({　　　　　　
        url: '/common/user_info/',
        type: 'post',
        dataType: 'json',
        data: pagedata,
        success: function(data) {
            var str = "";
            for (var i = 0; i < data.user_list.length; i++) {
                str += "<tr><td class=" + data.user_list[i].id + ">" + data.user_list[i]['prov'] + "</td><td>" + data.user_list[i].city + "</td><td>" + data.user_list[i].username + "</td><td>" + data.user_list[i].username_cn + "</td><td>" + data.user_list[i].phone_num + "</td>";
            };
            console.log(str);
            $('.bDivTotalRight table tbody').html(str);
            var pagetotalcount1 = 1;
            pagetotalcount1 = data.count;
            console.log(pagetotalcount1);
            var totalPage1 = Math.ceil(pagetotalcount1 / 10);

            function request1(page) {
                var pagedata = {};
                pagedata.pagenum = page;
                $.ajax({
                    url: '/common/user_info/',
                    type: 'post',
                    data: pagedata,
                    dataType: "json",
                    success: function(data) {
                        var str = "";
                        for (var i = 0; i < data.user_list.length; i++) {
                            str += "<tr><td>" + data.user_list[i]['prov'] + "</td><td>" + data.user_list[i].city + "</td><td>" + data.user_list[i].username + "</td><td>" + data.user_list[i].username_cn + "</td><td>" + data.user_list[i].phone_num + "</td>";
                        };
                        $('.bDivTotalRight table tbody').html(str);
                    }
                })
            };
            //page
            var page1 = $('.page1');
            var pre1 = $('.page1 .pre');
            var next1 = $('.page1 .next');
            var go1 = $('.page1 .go');
            console.log(pagetotalcount1);
            page1.find('.t').html(pagetotalcount1);
            page1.find('.tt').html(totalPage1);

            pre1.click(function() {
                var thisPge = Number(page1.find('.p').val());
                console.log(thisPge)
                if (thisPge - 1 < 1) {
                    return false
                }
                if (thisPge <= 1) {
                    page1.find('.p').val(1);
                } else {
                    page1.find('.p').val(thisPge - 1);
                    thisPge--;
                }
                request1(thisPge);
            })
            next1.click(function() {
                var thisPge = Number(page1.find('.p').val());
                if (thisPge + 1 > totalPage1) {
                    return false
                }
                if (thisPge >= totalPage1) {
                    page1.find('.p').val(totalPage1);
                } else {
                    page1.find('.p').val(thisPge + 1);
                    thisPge++;
                }
                request1(thisPge);
            })
            go1.click(function() {
                var thisPge = Number(page1.find('.p').val());
                request1(thisPge);
            })
        }
    })
});
// 当下拉框内容改变的时候，相应表格内容变化
$('.bDivTotalRight .sell select').change(function() {
    keyword = $(this).find("option:selected").text();
    var serchData = {};
    serchData.keyword = keyword;
    console.log(keyword);
    ajaxSerchData('/common/keyword_search/', serchData);
});
// 点击搜索框，对应表显示相应内容
$('.bDivTotalRight .subtitle3 i').click(function() {
    keyword = $(this).prev().val().trim();
    var serchData = {};
    serchData.keyword = keyword;
    // console.log(serchData);
    ajaxSerchData('/common/keyword_search/', serchData);
});
// 回车搜索框，对应表显示相应内容
$('.siled .subtitle3 input').on('keypress', function(event) {
    if (event.keyCode == 13) {
        var keyword = $('.bDivTotalRight .subtitle3 input').val().trim();
        var serchData = {};
        serchData.keyword = keyword;
        // console.log(serchData);
        ajaxSerchData('/common/keyword_search/', serchData);
    };
});
// 点击返回按钮，回到原页面
$('.bDivTotalRight .clo').click(function() {
    $('.bDivTotalRight_old').removeClass('none');
    $('.bDivTotalRight_add').addClass('none');
});
// 点击新增按钮，出现新增页面
$('.bDivTotalRight .addbtn').click(function() {
    $('.bDivTotalRight_old').addClass('none');
    $('.bDivTotalRight_add').removeClass('none');
    $('.bDivTotalRight_add tbody').html('');
    $(".bDivTotalRight_add .topp .prov option:selected").text('请选择');
    $(".bDivTotalRight_add .topp .city option:selected").text('请选择');
    $(".bDivTotalRight_add .topp .En option:selected").text('请选择');
    $(".bDivTotalRight_add .topp .Chin option:selected").text('请选择');
    $(".bDivTotalRight_add .topp .phone_num").val('');
    var data = {
        "count": 3,
        "total_page": 1,
        "user_list": [{ "prov": "江苏", "city": "镇江", "username": "zhenjiang", "username_cn": "", "phone_num": "", "id": 12 },
            { "prov": "江苏", "city": "镇江", "username": "EOMS_fuweizj", "username_cn": "付伟", "phone_num": "13952855401", "id": 46 },
            { "prov": "江苏", "city": "镇江", "username": "EOMS_wangjiezj", "username_cn": "汪杰", "phone_num": "13852912752", "id": 47 }
        ]
    };
    var str = " ";
    for (var i = 0; i < data.user_list.length; i++) {
        str += "<tr><td><input type='checkbox' name='addContent'></td><td class=" + data.user_list[i].id + ">" + data.user_list[i].prov + "</td><td>" + data.user_list[i].city + "</td><td>" + data.user_list[i].username + "</td><td>" + data.user_list[i].username_cn + "</td><td>" + data.user_list[i].phone_num + "</td>";
    };
    $('.bDivTotalRight_add tbody').html(str);
    $('.bDivTotalRight_add .btn button').show();
    $('.bDivTotalRight_add .btn').css('margin-top', '15px');
    $.ajax({　　　　　　
        url: '/common/user_info/',
        type: 'post',
        dataType: 'json',
        data: '',
        success: function(data) {
            var str = " ";
            for (var i = 0; i < data.user_list.length; i++) {
                str += "<tr><td><input type='checkbox' name='addContent'></td><td class=" + data.user_list[i].id + ">" + data.user_list[i].prov + "</td><td>" + data.user_list[i].city + "</td><td>" + data.user_list[i].username + "</td><td>" + data.user_list[i].username_cn + "</td><td>" + data.user_list[i].phone_num + "</td>";
            };
            $('.bDivTotalRight_add tbody').html(str);
            $('.bDivTotalRight_add .btn button').show();
            $('.bDivTotalRight_add .btn').css('margin-top', '15px');
            // 页码
            var pagetotalcount2 = 1;
            pagetotalcount2 = data.count;
            console.log(pagetotalcount2);
            var totalPage2 = Math.ceil(pagetotalcount2 / 10);

            function request2(page) {
                var pagedata = {};
                pagedata.pagenum = page;
                $.ajax({
                    url: '/common/user_info/',
                    type: 'post',
                    data: pagedata,
                    dataType: "json",
                    success: function(data) {
                        var str = "";
                        for (var i = 0; i < data.user_list.length; i++) {
                            str += "<tr><td><input type='checkbox' name='addContent'></td><td class=" + data.user_list[i].id + ">" + data.user_list[i].prov + "</td><td>" + data.user_list[i].city + "</td><td>" + data.user_list[i].username + "</td><td>" + data.user_list[i].username_cn + "</td><td>" + data.user_list[i].phone_num + "</td>";
                        };
                        $('.bDivTotalRight_add tbody').html(str);
                        $('.bDivTotalRight_add .btn button').show();
                        $('.bDivTotalRight_add .btn').css('margin-top', '15px');
                    }
                })
            };
            //page2
            var page2 = $('.page2');
            var pre2 = $('.page2 .pre');
            var next2 = $('.page2 .next');
            var go2 = $('.page2 .go');
            page2.find('.t').html(pagetotalcount2);
            page2.find('.tt').html(totalPage2);
            pre2.click(function() {
                var thisPge = Number(page2.find('.p').val());
                console.log(thisPge)
                if (thisPge - 1 < 1) {
                    return false
                }
                if (thisPge <= 1) {
                    page2.find('.p').val(1);
                } else {
                    page2.find('.p').val(thisPge - 1);
                    thisPge--;
                }
                request2(thisPge);
            });
            next2.click(function() {
                var thisPge = Number(page2.find('.p').val());
                if (thisPge + 1 > totalPage2) {
                    return false
                }
                if (thisPge >= totalPage2) {
                    page2.find('.p').val(totalPage2);
                } else {
                    page2.find('.p').val(thisPge + 1);
                    thisPge++;
                }
                request2(thisPge);
            });
            go2.click(function() {
                var thisPge = Number(page2.find('.p').val());
                request2(thisPge);
            });
        }
    });
    // 获取全部英文名称
    $.ajax({　　　　　　
        url: '/common/user_info/',
        type: 'post',
        dataType: 'json',
        data: '',
        success: function(data) {
            var city = "<option>请选择</option>";
            var username = "<option>请选择</option>";
            var username_cn = "<option>请选择</option>";
            for (var i = 0; i < data.user_list.length; i++) {
                city += "<option>" + data.user_list[i].city + "</option>";
                username += "<option>" + data.user_list[i].username + "</option>";
                username_cn += "<option>" + data.user_list[i].username_cn + "</option>";
            };
            // 下拉框
            $("#city").append(city);
            $("#username").append(username);
            $("#username_cn").append(username_cn);
        }
    });
    // 当选择城市时，英文获取相应的
    $('#city').change(function() {
        var serchData = {};
        serchData.cityVal = $(this).find("option:selected").text();
        $.ajax({　　　　　　
            url: '/common/fixed_search/',
            type: 'post',
            dataType: 'json',
            data: serchData,
            success: function(data) {
                var username = "<option>请选择</option>";
                var username_cn = "<option>请选择</option>";
                for (var i = 0; i < data.user_list.length; i++) {
                    city += "<option>" + data.user_list[i].city + "</option>";
                    username += "<option>" + data.user_list[i].username + "</option>";
                    username_cn += "<option>" + data.user_list[i].username_cn + "</option>";
                };
                // 下拉框
                $("#username").html(username);
                $("#username_cn").html(username_cn);
            }
        });
    });
});
// 点击重置按钮，内容清空
$('.bDivTotalRight_add .null').click(function() {
    $(".bDivTotalRight_add .topp .prov option:selected").text('江苏');
    $(".bDivTotalRight_add .topp .city option:selected").text('苏州');
    $(".bDivTotalRight_add .topp .En option:selected").text('请选择');
    $(".bDivTotalRight_add .topp .Chin option:selected").text('请选择');
    $(".bDivTotalRight_add .topp .phone_num").val('');
})
thisDel = $(this);
//点击搜索按钮，出现列表
$('.bDivTotalRight_add .ser').click(function() {
        var prov = $(".bDivTotalRight_add .topp .prov option:selected").text();
        var city = $(".bDivTotalRight_add .topp .city option:selected").text();
        var username = $(".bDivTotalRight_add .topp .En option:selected").text();
        var username_cn = $(".bDivTotalRight_add .topp .Chin option:selected").text();
        var phone_num = $(".bDivTotalRight_add .topp .phone_num").val();
        if (prov == '请选择') {
            prov = '';
        };
        if (city == '请选择') {
            city = '';
        };
        if (username == '请选择') {
            username = '';
        };
        if (username_cn == '请选择') {
            username_cn = '';
        };
        var ajaxPopData = {};
        ajaxPopData.prov = prov;
        ajaxPopData.city = city;
        ajaxPopData.username = username;
        ajaxPopData.username_cn = username_cn;
        ajaxPopData.phone_num = phone_num;
        console.log(ajaxPopData);
        $.ajax({　　　　　　
            url: '/common/fixed_search/',
            type: 'post',
            dataType: 'json',
            data: ajaxPopData,
            success: function(data) {
                if (data.msg == '0') {
                    var str = "";
                    str = "<div class='nullval'><p>啊哦，没有匹配到任何结果，换个条件试试吧</p></div>";
                    $('.bDivTotalRight_add').append(str);
                    $('.bDivTotalRight_add .btn button').hide();
                    $('.bDivTotalRight_add .btn').css('margin-top', '0');
                } else {
                    var str = "";
                    for (var i = 0; i < data.user_list.length; i++) {
                        str += "<tr><td><input type='checkbox' name='addContent'></td><td class=" + data.user_list[i].id + ">" + data.user_list[i].prov + "</td><td>" + data.user_list[i].city + "</td><td>" + data.user_list[i].username + "</td><td>" + data.user_list[i].username_cn + "</td><td>" + data.user_list[i].phone_num + "</td>";
                    }
                    $('.bDivTotalRight_add tbody').html(str);
                    $('.bDivTotalRight_add .btn button').show();
                    $('.bDivTotalRight_add .btn').css('margin-top', '15px');
                    // 页码
                    var pagetotalcount2 = 1;
                    pagetotalcount2 = data.count;
                    console.log(pagetotalcount2);
                    var totalPage2 = Math.ceil(pagetotalcount2 / 10);

                    function request2(page) {
                        var pagedata = {};
                        pagedata.pagenum = page;
                        $.ajax({
                            url: '/common/fixed_search/',
                            type: 'post',
                            data: pagedata,
                            dataType: "json",
                            success: function(data) {
                                var str = "";
                                for (var i = 0; i < data.user_list.length; i++) {
                                    str += "<tr><td><input type='checkbox' name='addContent'></td><td class=" + data.user_list[i].id + ">" + data.user_list[i].prov + "</td><td>" + data.user_list[i].city + "</td><td>" + data.user_list[i].username + "</td><td>" + data.user_list[i].username_cn + "</td><td>" + data.user_list[i].phone_num + "</td>";
                                };
                                $('.bDivTotalRight_add tbody').html(str);
                                $('.bDivTotalRight_add .btn button').show();
                                $('.bDivTotalRight_add .btn').css('margin-top', '15px');
                            }
                        })
                    };
                    //page2
                    var page2 = $('.page2');
                    var pre2 = $('.page2 .pre');
                    var next2 = $('.page2 .next');
                    var go2 = $('.page2 .go');
                    page2.find('.t').html(pagetotalcount2);
                    page2.find('.tt').html(totalPage2);
                    pre2.click(function() {
                        var thisPge = Number(page2.find('.p').val());
                        console.log(thisPge)
                        if (thisPge - 1 < 1) {
                            return false
                        }
                        if (thisPge <= 1) {
                            page2.find('.p').val(1);
                        } else {
                            page2.find('.p').val(thisPge - 1);
                            thisPge--;
                        }
                        request2(thisPge);
                    });
                    next2.click(function() {
                        var thisPge = Number(page2.find('.p').val());
                        if (thisPge + 1 > totalPage2) {
                            return false
                        }
                        if (thisPge >= totalPage2) {
                            page2.find('.p').val(totalPage2);
                        } else {
                            page2.find('.p').val(thisPge + 1);
                            thisPge++;
                        }
                        request2(thisPge);
                    });
                    go2.click(function() {
                        var thisPge = Number(page2.find('.p').val());
                        request2(thisPge);
                    });
                };
            }
        })
    })
    // 点击弹框确定按钮
$('.bDivTotalRight_add .btn button').click(function() {
    $('.bDivTotalRight_old').removeClass('none');
    // 获取选中的内容，添加到表格中
    var trs = $("input:checkbox[name='addContent']:checked").parent();
    $('.bDivTotalRight_add').addClass('none');
    // console.log(trs);
    var addhtml = " ";
    trs.each(function() {  
        console.log($(this).next())    
        addhtml += "<tr><td>" + $(this).next().text() + "</td><td>" + $(this).next().next().text() + "</td><td>" + $(this).next().next().next().text() + "</td><td>" + $(this).next().next().next().next().text() + "</td><td>" + $(this).next().next().next().next().next().text() + "</td></tr>";
    });
    // console.log(addhtml);
    $('.bDivTotalRight_old tbody').append(addhtml);
    var arr = [];
    $('input[name="addContent"]:checked').each(function() {
        var id = $(this).parents('td').next().attr("class");
        arr.push(id);
        var returnData = {};
        returnData.id = JSON.parse(arr);
    });
    $.ajax({　　　　　　
        url: '/common/add_perm/',
        type: 'post',
        dataType: 'json',
        data: returnData,
        success: function(data) {
            if (data.msg == "Success") {
                $('.popupOverContainer').addClass('popupOver');
                $('.addsucpop').removeClass('none');
                $('.addsucpop .clo').click(function() {
                    $('.popupOverContainer').removeClass('popupOver');
                    $('.addsucpop').addClass('none');
                });

                function closuc() {
                    $('.popupOverContainer').removeClass('popupOver');
                    $('.addsucpop').addClass('none');
                };
                setTimeout("closuc();", 3000);
            } else if (data.msg == 'Permission Denied') {
                $('.popupOverContainer').addClass('popupOver');
                $('.adderrpop').removeClass('none');
                $('.adderrpop .clo').click(function() {
                    $('.popupOverContainer').removeClass('popupOver');
                    $('.adderrpop').addClass('none');
                });

                function cloerr() {
                    $('.popupOverContainer').removeClass('popupOver');
                    $('.adderrpop').addClass('none');
                }
                setTimeout("cloerr();", 3000);
            }
        }
    });
    $(this).unbind();
});

function delbth() {
    // 将取消按钮隐藏
    $('.bDivTotalRight_old .delclobtn').hide();
    // 点击删除按钮，表格前加一列多选框
    $('.bDivTotalRight_old .delbtn').click(function() {
        $('.bDivTotalRight_old table tr').each(function() {
            $($(this).children()[0]).before("<td><input type='checkbox' name='addContent'></td>");
        });
        // 首行背景颜色加上
        $($('.bDivTotalRight_old table td')[0]).css('background-color', '#f2f2f2');
        // 取消按钮显示
        $('.bDivTotalRight_old .delclobtn').show();
        // 点击取消按钮去掉一列多选框
        $('.bDivTotalRight_old .delclobtn').click(function() {
            $('.bDivTotalRight_old table tr').each(function() {
                $(this).find("input").remove();
                $(this).find("input").parent().remove();
            });
            $('.bDivTotalRight_old .delbtn').unbind();
            delbth();
        });
        // 去除点击删除按钮，表格前加一列多选框的事件
        $(this).unbind();
        // 重新给删除按钮注册弹框事件，点击删除按钮出现弹框
        $(this).click(function() {
            $('.delpopup').addClass('active-pop');
            $('.popupOverContainer').addClass('popupOver');
        });
    });
}
delbth();
// 点击弹框的确定按钮，本地页面删除，且后端删除
$('.delpopup .sure').click(function() {
    $('.delpopup').removeClass('active-pop');
    $('.popupOverContainer').removeClass('popupOver');
    var arr = [];
    $('input[name="addContent"]:checked').each(function() {
        $(this).parents('tr').remove();
        var id = $(this).parents('td').next().attr("class");
        arr.push(id);
    });
    $.ajax({　　　　　　
        url: '/common/delete_user/',
        type: 'post',
        dataType: 'json',
        data: { 'id': arr },
        success: function(data) {
            if (data.msg == "Success") {
                $('.popupOverContainer').addClass('popupOver');
                $('.delsucpop').removeClass('none');
                $('.delsucpop .clo').click(function() {
                    $('.popupOverContainer').removeClass('popupOver');
                    $('.delsucpop').addClass('none');
                });

                function closuc() {
                    $('.popupOverContainer').removeClass('popupOver');
                    $('.delsucpop').addClass('none');
                };
                setTimeout("closuc();", 3000);
            } else if (data.msg == 'Permission Denied') {
                $('.popupOverContainer').addClass('popupOver');
                $('.delerrpop').removeClass('none');
                $('.delerrpop .clo').click(function() {
                    $('.popupOverContainer').removeClass('popupOver');
                    $('.delerrpop').addClass('none');
                });

                function cloerr() {
                    $('.popupOverContainer').removeClass('popupOver');
                    $('.delerrpop').addClass('none');
                }
                setTimeout("cloerr();", 3000);
            }
        }
    })
});
// 点击弹框的取消按钮，表格复选框全部未选择
$('.delpopup .canc').click(function() {
    $('.delpopup').removeClass('active-pop');
    $('.popupOverContainer').removeClass('popupOver');
    $("input[name='addContent']:checked").each(function() {
        $(this).prop("checked", false);
    });
});



var loc = location.href;
var n1 = loc.length; //地址的总长度
var n2 = loc.indexOf("="); //取得=号的位置
var id = decodeURI(loc.substr(n2 + 1, n1 - n2)); //从=号后面的内容
// 从信息中心跳转回来
if (id.indexOf('.xlsx') != -1) {
    id = id.substring(0, id.length - 5);
    console.log(id);
    console.log(id.indexOf('.xlsx') != -1);
    console.log(id.substring(0, id.length - 5));
    console.log($('#' + id));
    $('#' + id).prev().css('backgroundColor', 'orange');
    $('#' + id).css('backgroundColor', 'orange');
    $('#' + id).nextAll().css('backgroundColor', 'orange');
    $('#' + id).parents('.inp').addClass('active').siblings().removeClass('active');
    var spanIndex = $('.bDivTotal-one .inp').index($('#' + id).parents('.inp'));
    $('.siled .bTab span').eq(spanIndex).addClass('active-border').siblings().removeClass('active-border');
}
// else {
//     $('#' + id).css('backgroundColor', 'orange');
//     $('#' + id).prev().css('backgroundColor', 'orange');
//     $('#' + id).nextAll().css('backgroundColor', 'orange');
//     $('#' + id).parents('.inp').addClass('active').siblings().removeClass('active');
//     var spanIndex = $('.bDivTotal-one .inp').index($('#' + id).parents('.inp'));
//     $('.siled .bTab span').eq(spanIndex).addClass('active-border').siblings().removeClass('active-border');
// }