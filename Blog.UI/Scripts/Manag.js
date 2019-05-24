
$(function () {

    //1.初始化Table
    var oTable = new TableInit();
    oTable.Init();

    //2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();

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
            pageSize: 3,                       //每页的记录行数（*）
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
            }]
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
    var oInit = new Object();
    var postdata = {};

    oInit.Init = function () {
        //弹出新增窗体
        $("#btnAdd").click(function () {
            $("#myModalLabel").text("新增文章");
            $("#myModal").find(".form-control").val("");
            $("#myModal").modal();

            postdata.DEPARTMENT_ID = "";
        });
        //新增文章方法
        $("#btnSubmit").click(function () {
            $.ajax({
                url: "/Manag/Add",
                type: "post",
                data: ({
                    "Title": $("#txtTitle").val(),
                    "Content": $("#txtContent").val(),
                    "Type": $("#slectType").val()
                }),
                success: function (data) {
                    if (data.success) {
                        alert("添加成功");
                        $("#myModal").modal("hide");
                        //刷新表格
                        $("#tb_departments").bootstrapTable('refresh');
                    }
                    else {
                        alert("添加失败");
                    }
                },
            });
        });
        //弹出修改窗体
        $("#btnEdit").click(function () {
            var editselect = $("#tb_article").bootstrapTable('getSelections');
            if (editselect.length > 1) {
                alert("只能选择一条记录编辑");
                return;
            }
            else if (editselect.length <= 0) {
                alert("请选择一条记录编辑");
                return;
            }
            else {
                $("#myModalLabel").text("修改文章");
                $("#txtTitle").val(editselect[0].Title);
                $("#txtContent").val(editselect[0].Content);
                id = editselect[0].Id;
                $("#myModal").modal();
            }
        });
        //修改方法
        $("#btnSubmit").click(function () {
            $.ajax({
                url: "/Manag/Edit",
                type: "post",
                data: ({
                    "Title": $("#txtTitle").val(),
                    "Content": $("#txtContent").val(),
                    "Type": $("#slectType").val()
                }),
                success: function (data) {
                    if (data.success) {
                        alert("修改成功");
                        $("#myModal").modal("hide");
                        //刷新表格
                        $("#tb_departments").bootstrapTable('refresh');
                    }
                    else {
                        alert("修改失败");
                    }
                },
            });
        });
        //删除单条
        $("#btnDelete").click(function () {
            var arr = $("#tb_article").bootstrapTable('getSelections');
            if (arr.length == 0) {
                alert("请选择要修改的记录");
                return;
            }
            else if (arr.length > 1) {
                alert("选择的记录不能超过1条");
                return;
            }
            if (confirm("你是否要删除该记录？")) {
                $.ajax({
                    url: "/Manag/Delete",
                    type: "post",
                    data: { "id": arr[0].Id },
                    success: function (data) {
                        if (data.success) {
                            alert("删除成功");
                            //刷新表格
                            $("#tb_article").bootstrapTable('refresh');
                        }
                        else {
                            alert("删除失败");
                        }
                    }
                });
            }
        });
        //批量删除
        $("#btnDeleteAll").click(function () {
            var arr = $("#tb_article").bootstrapTable('getSelections');
            if (arr.length == 0) {
                alert("请选择要修改的记录");
                return;
            }
            if (confirm("你是否要批量删除这些记录")) {
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
                            alert("批量删除成功");
                            //刷新表格
                            $("#tb_article").bootstrapTable('refresh');
                        }
                        else {
                            alert("批量删除失败");
                        }
                    }
                });
            }
        });
    };

    return oInit;
};