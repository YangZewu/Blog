$(function () {
    $("#Myform").bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            UserPet: {
                validators: {
                    notEmpty: {
                        message: '昵称不能为空！'
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '昵称长度必须在2到6位之间！'
                    },
                    regexp: {
                        regexp: /^[\u4e00-\u9fa5_a-zA-Z0-9_]+$/,
                        message: '昵称应使用中文、大写、小写、数字和下划线！'
                    }
                }
            },
            UserMailbox: {
                validators: {
                    notEmpty: {
                        message: '邮箱不能为空！'
                    },
                    emailAddress: {
                        message: '邮箱格式有误！'
                    }
                }
            },
            UserBirthday: {
                validators: {
                    notEmpty: {
                        message: '请选择日期！'
                    }
                }
            },
            UserBirthplace: {
                validators: {
                    notEmpty: {
                        message: '地址不能为空！'
                    },
                    regexp: {
                        regexp: /^[\u4e00-\u9fa5_0-9]+$/,
                        message: '地址格式不正确！'
                    }
                }
            },
            UserQQ: {
                validators: {
                    notEmpty: {
                        message: 'QQ不能为空！'
                    },
                    stringLength: {
                        min: 7,
                        max: 10,
                        message: 'QQ长度必须在7到10位之间！'
                    }
                }
            },
            UserSex: {
                validators: {
                    notEmpty: {
                        message:'性别不能为空！'
                    },
                    regexp: {
                        regexp: /^[\u7537\u5973]+$/,
                        message: '只能是男或女！'
                    }
                }
            }
        }
    });
});
$(function () {
        //修改个人信息
    $("#btnEdit").click(function () {
            $('#Myform').data('bootstrapValidator').validate();//启用验证
            if ($('#Myform').data('bootstrapValidator').isValid()) {
                $.ajax({
                    url: "/Manag/Editself",
                    type: "Post",
                    data: {
                        "UserName": $("#inputName").val(),
                        "UserPet": $("#inputPet").val(),
                        "UserSex": $("#inputSex").val(),
                        "UserBirthday": $("#inputBri").val(),
                        "UserBirthplace": $("#inputAdd").val(),
                        "UserMailbox": $("#inputEmail").val(),
                        "UserQQ": $("#inputQQ").val(),
                        "UserSig": $("#textSig").val()
                    },
                    //data: formdata,
                    //contentType: false, //不设置内容类型
                    //processData: false, //不处理数据
                    success: function (data) {
                        if (data.success) {
                            /* window.location = "/User/Login";
                             layer.msg("注册成功");*/
                            layer.msg('修改成功！', { time: 1000 }, function () {
                                //do something
                                window.location = "/Manag/Myself";
                            });
                        }
                        else {
                            layer.msg("修改失败！");
                        }
                    }
                });
            }

        });
});




