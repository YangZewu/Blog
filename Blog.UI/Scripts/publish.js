$(function () {
    $("#publish").click(function () {
        $("#myModalLabel").text("发布文章");
        $("#myModal").find(".form-control").val("");
        loadSelectData();
        $("#myModal").modal();
    });
    $("#btnPublish").click(function () {
        $.ajax({
            url: "/Publish/Publish",
            type: "post",
            data: ({
                "Title": $("#txtTitle").val(),
                "Content": $("#txtContent").val(),
                "ArticleTypeId": $("#slectType option:selected").text()
            }),
            success: function (data) {
                if (data.success) {
                    layer.msg("发布成功");
                    $("#myModal").modal("hide");
                    $("#content").html('refresh');
                }
                else {
                    layer.msg("发布成功");
                }
            },
        });
    });
    function loadSelectData() {
        $("#slectType").empty();
        $.ajax({
            type: 'get',
            url: "/Type/Type",
            dataType: 'json',
            success: function (datas) {//返回list数据并循环获取
                var select = $("#slectType");
                for (var i = 0; i < datas.rows.length; i++) { select.append("<option value='" + datas.rows[i].ArticleTypeId + "'>" + datas.rows[i].ArticleTypeName + "</option>"); }
                $("#slectType").selectpicker('val', '');
                $("#slectType").selectpicker('refresh');
            }
        });
    }
});
