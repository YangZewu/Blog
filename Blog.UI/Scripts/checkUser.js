$(function () {
    $("#userForm").bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            UserName: {
                message: '用户名验证失败',
                validators: {
                    notEmpty: {
                        message: '用户名不能为空！'
                    },
                    stringLength: {
                        min: 3,
                        max: 8,
                        message: '用户名长度必须在3到8位之间！'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_]+$/,
                        message: '用户名只能包含大写、小写、数字和下划线！'
                    },
                     threshold: 3,
                      remote: {
                          url: "/User/CheckName",
                          message: '用户名已存在，请重新输入!',
                          delay:1000,
  
                      }
                }
            },
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
            UserPassword: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空！'
                    },
                    stringLength: {
                        min: 6,
                        max: 16,
                        message: '密码长度必须在6到16位之间！'
                    },
                    regexp: {
                        regexp: /^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])|(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9])|(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])|(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,16})$/,
                        message: '用户确认密码长度为6至16位,并且需要包含数字、小写字母、大写字母、符号(至少三种)！'
                    }
                }
            },
            userPwd: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空！'
                    },
                    identical: {
                        field: 'UserPassword',
                        message: '两次输入的密码不相符！'
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
            }
        }
    });


    /*手动验证表单，当是普通按钮时。*/
    $('#userForm').data('bootstrapValidator').validate();//启用验证
    var flag = $('#userForm').data('bootstrapValidator').isValid()//验证是否通过true/false
});
        

   
    
