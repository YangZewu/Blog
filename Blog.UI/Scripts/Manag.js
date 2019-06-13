
$(function () {

    //1.初始化Table
    var oTable = new TableInit();
    oTable.Init();

    //2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();

    //初始化Layui
    var form = layui.form
        , layer = layui.layer;

});


var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#tb_article').bootstrapTable({
            url: '/Manag/GetArticle',         //请求后台的URL（*）
            method: 'get',                      //请求方式（*）
            toolbar: '#toolbar',                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: false,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
            queryParams: oTableInit.queryParams,//传递参数（*）
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 5,                       //每页的记录行数（*）
            pageList: [3, 10, 25, 50, 100],        //可供选择的每页的行数（*）
            search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            strictSearch: true,
            showColumns: true,                  //是否显示所有的列
            showRefresh: true,                  //是否显示刷新按钮
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "Id",                     //每一行的唯一标识，一般为主键列
            showToggle: true,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            columns: [{
                checkbox: true
            }, {
                field: 'Title',
                title: '文章标题'
            }, {
                field: 'Content',
                title: '文章内容'
            }, {
                field: 'PublishTime',
                title: '发布时间'
            }, {
                field: 'ReadPeople',
                title: '阅读数量'
            },
            {
                field: 'ArticleTypeId',
                title: '文章类型'
                },
                {
                    field: 'PublishName',
                    title:'发布人',
                }
            ]
        });
    };

    //得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            limit: params.limit,   //页面大小
            offset: params.offset,  //(页码-1)*页面大小         
        };
        return temp;
    };
    return oTableInit;
};


var ButtonInit = function () {
    var id = 0;
    var oInit = new Object();
    var postdata = {};

    oInit.Init = function () {
        //弹出新增窗体
        $("#btnAdd").click(function () {
            $("#myModalLabel").text("新增文章");
            $("#myModal").find(".form-control").val("");
            loadSelectData();
            $("#myModal").modal();

            id = 0;
        });
        //新增文章方法

        //弹出修改窗体
        $("#btnEdit").click(function () {
            var editselect = $("#tb_article").bootstrapTable('getSelections');
            if (editselect.length > 1) {
                layer.msg("只能选择一条记录编辑");
                return;
            }
            else if (editselect.length <= 0) {
                layer.msg("请选择一条记录编辑");
                return;
            }
            else {
                $("#myModalLabel").text("修改文章");
                $("#txtTitle").val(editselect[0].Title);
               // $("#txtContent").val(editselect[0].Content);
                CKEDITOR.instances['txtContent'].setData(editselect[0].Content);
                id = editselect[0].Id;
                $("#myModal").modal();
            }
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
                    return false;
                }
            });
        }
        //修改方法
        $("#btnSubmit").click(function () {
            $.ajax({
                url: "/Manag/Edit",
                type: "post",
                data: ({
                    "Title": $("#txtTitle").val(),
                    "Content": CKEDITOR.instances['txtContent'].getData(),
                    "ArticleTypeId": $("#slectType option:selected").text(),
                    "Id": id
                }),
                success: function (data) {
                    if (data.success) {
                        layer.msg("提交成功");
                        $("#myModal").modal("hide");
                        //刷新表格
                        $("#tb_article").bootstrapTable('refresh');
                    }
                    else {
                        layer.msg("提交失败");
                    }
                },
            });
        });
        //删除单条
        $("#btnDelete").click(function () {
            var arr = $("#tb_article").bootstrapTable('getSelections');
            if (arr.length == 0) {
                layer.msg("请选择要删除的记录");
                return;
            }
            else if (arr.length > 1) {
                layer.msg("选择的记录不能超过1条");
                return;
            }
            layer.confirm('是否删除该记录', { icon: 3, btn: ['确定', '取消'], title: '提示' }, function () {
                $.ajax({
                    url: "/Manag/Delete",
                    type: "post",
                    data: { "id": arr[0].Id },
                    success: function (data) {
                        if (data.success) {
                            layer.msg("删除成功");
                            //刷新表格
                            $("#tb_article").bootstrapTable('refresh');
                        }
                        else {
                            layer.msg("删除失败");
                        }
                    }
                });
            });
        });
        //批量删除
        $("#btnDeleteAll").click(function () {
            var arr = $("#tb_article").bootstrapTable('getSelections');
            if (arr.length == 0) {
                layer.msg("请选择要删除的记录");
                return;
            }
            layer.confirm('是否批量删除记录', { icon: 3, btn: ['确定', '取消'], title: '提示' }, function () {
                var ids = "";
                for (var i = 0; i < arr.length; i++) {
                    ids += arr[i].Id + ",";
                }
                ids = ids.substring(0, ids.length - 1);
                $.ajax({
                    url: "/Manag/DeleteAll",
                    type: "post",
                    data: { "ids": ids },
                    success: function (data) {
                        if (data.success) {
                            layer.msg("批量删除成功");
                            //刷新表格
                            $("#tb_article").bootstrapTable('refresh');
                        }
                        else {
                            layer.msg("批量删除失败");
                        }
                    }
                });
            });
        });
    };

    return oInit;
};