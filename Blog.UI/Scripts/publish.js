$(function () {
    loadSelectData(); 
    //发布按钮
    $("#btnPublish").click(function () {
        $.ajax({
            url: "/Publish/Add",
            type: "post",
            data: ({
                "Title": $("#publishTitle").val(),
                //"Content": $("#publishContent").val(),
                "Content": CKEDITOR.instances['publishContent'].getData(),
                "ArticleTypeId": $("#publishType option:selected").text()
            }),
            success: function (data) {
                if (data.success) { 
                    layer.msg('发布成功', function () {
                        //do something
                        $("#publishModal").modal("hide");
                        window.location = "/Article/Index";
                    }); 
                }
                else {
                    layer.msg("发布失败");
                }
            },
        });
    });
    //下拉框动态绑定数据
    function loadSelectData() {
        $("#publishType").empty();
        $.ajax({
            type: 'get',
            url: "/Type/Type",
            dataType: 'json',
            success: function (datas) {//返回list数据并循环获取
                var select = $("#publishType");
                for (var i = 0; i < datas.rows.length; i++)
                {
                    select.append("<option value='" + datas.rows[i].ArticleTypeId + "'>"
                        + datas.rows[i].ArticleTypeName + "</option>");
                }
                $("#publishType").selectpicker('val', '');
                $("#publishType").selectpicker('refresh');               
            }
        });
    }
});
