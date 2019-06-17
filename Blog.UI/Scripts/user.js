$(function () {
    //找回
    $("#btnEdit").click(function () {
        $.ajax({
            url: "/User/Edit",
            type: "Post",
            data: {
                "UserName": $("#inputEUName").val(),
                "UserPassword": $("#inputEPwd").val()
            },
            success: function (data) {
                if (data.success) {
                    layer.msg("找回成功");
                    $("#myModal").modal("hide");
                }
                else {
                    layer.msg("找回失败");
                }
            }
        });
    }),
    //弹出窗口
    $("#btnUp").click(function () {
        $("#myModal").modal();
    }),
    //登录
    $("#btnLog").click(function () {
        $.ajax({
            url: "/User/GetUser",
            type: "Post",
            data: {
                "userName": $("#inputUName").val(),
                "password": $("#inputUPwd").val()
            },
            success: function (data) {
                if (data.success) {
                    //window.location = "/Article/Index";
                    layer.msg('登录成功', { time: 1000 }, function () {
                        
                        //do something
                        window.location = "/Article/Index";
                    }); 
                }
                else {
                    layer.msg("登录失败");
                }
            }
        });
    }),
    //注册
        

        $("#btnReg").click(function () {
            $('#userForm').data('bootstrapValidator').validate();//启用验证
            if ($('#userForm').data('bootstrapValidator').isValid())
            {
                $.ajax({
                    url: "/User/Add",
                    type: "Post",
                    data: {
                        "UserName": $("#inputUName").val(),
                        "UserPet": $("#inputUPet").val(),
                        "UserPassword": $("#inputUPwd").val(),
                        "UserSex": $("#USex").val(),
                        "UserBirthday": $("#inputUBr").val(),
                        "UserBirthplace": $("#inputUAdders").val(),
                        "UserMailbox": $("#inputEmail").val(),
                        "UserQQ": $("#inputQQ").val(),
                        "UserSig": $("#inputUserSig").val()
                    },
                    //data: formdata,
                    //contentType: false, //不设置内容类型
                    //processData: false, //不处理数据
                    success: function (data) {
                        if (data.success) {
                            /* window.location = "/User/Login";
                             layer.msg("注册成功");*/
                            layer.msg('注册成功', { time: 1000 }, function () {
                                //do something
                                window.location = "/User/Login";
                            });
                        }
                        else {
                            layer.msg("注册失败");
                        }
                    }
                });
            }

        });
});