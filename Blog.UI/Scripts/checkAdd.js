$(function () {
    $("#Add").bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            Title: {
                validators: {
                    notEmpty: {
                        message: '标题不能为空！'
                    }
                }
            },
            Content: {
                validators: {
                    notEmpty: {
                        message: '内容不能为空！'
                    }
                }
            }
        }
    })
});