using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using Blog.BLL;
using Blog.Model;
namespace Blog.UI.Controllers
{
    [Authorize]
    public class ManagController : Controller
    {
        private articleServer article = new articleServer();
        private userServer user = new userServer();
        // GET: Manag
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Manag()
        {
            return View();
        }
        
        //将文章显示在表格上
        public JsonResult GetArticle(int limit, int offset, T_User u)
        {
            string s = Session["userName"].ToString();
            List<T_Article> articles = article.GetListsByPage(offset, limit, (a) => a.userName == s);
            int total = article.GetCount((a) => a.userName == s);
            return Json(new { total = total, rows = articles }, JsonRequestBehavior.AllowGet);
        }
        //新增文章
        //修改文章
        [ValidateInput(false)]
        [HttpPost]
        public JsonResult Edit(T_Article edit)
        {
            string s = Session["userName"].ToString();
            if (edit.Id == 0)
            {
                edit.PublishTime = System.DateTime.Now.ToString();
                edit.userName = s;
                edit.PublishName = user.GetLists(a => a.UserName == s)[0].UserPet;
                if (article.Add(edit))
                {
                    return Json(new { msg = "添加成功", success = true });
                }
                else
                {
                    return Json(new { msg = "添加失败", success = false });
                }
            }
            else
            {
                if (article.Updata(edit))
                {
                    return Json(new { msg = "修改成功", success = true });
                }
                else
                {
                    return Json(new { msg = "修改失败", success = false });
                }
            }
        }
        //删除文章
        [HttpPost]
        public JsonResult Delete(int id)
        {
            if (article.Delete(id))
            {
                //删除成功
                return Json(new { msg = "删除成功", success = true });
            }
            else
            {
                return Json(new { msg = "删除失败", success = true });
            }

        }
        //批量删除
        [HttpPost]
        public JsonResult DeleteAll(string ids)
        {
            List<int> idsLIst = new List<int>();
            var tempList = ids.Split(',');
            foreach (var item in tempList)
            {
                idsLIst.Add(Convert.ToInt32(item));
            }
            if (article.DeleteAll(idsLIst))
            {
                return Json(new { msg = "批量删除成功", success = true });
            }
            else
            {
                return Json(new { msg = "批量删除失败", success = true });
            }
        }
    }
}