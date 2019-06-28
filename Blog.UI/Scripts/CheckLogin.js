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
                validators: {
                    notEmpty: {
                        message: '用户名不能为空！'
                    }
                }
            },
            UserPassword: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空！'
                    }
                }
            }
        }
    })
});
$(function () {
    $("#edit").bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            UserName: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空！'
                    }
                }
            },
            UserPassword: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空！'
                    }
                }
            }
        }
    })
});