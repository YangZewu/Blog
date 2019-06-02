using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Blog.BLL;
using Blog.Model;
namespace Blog.UI.Controllers
{
    public class PublishController : Controller
    {
        private TypeServer type = new TypeServer();
        private userServer user = new userServer();
        private publicServer publish = new publicServer();
        // GET: Publish
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult Type()
        {
            List<T_ArticleType> types = type.getType(a => true);
            int total = type.GetCount((a) => true);
            return Json(new { total = total, rows = types }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Publish(T_Article arcitle)
        {
            string name = Session["userName"].ToString();
            arcitle.userName = name;
            arcitle.PublishTime = System.DateTime.Now.ToString();
            arcitle.PublishName = user.GetLists(a => a.UserName == name)[0].UserPet;
            if (publish.Add(arcitle))
            {
                return Json(new { msg = "发布成功", success = true });
            }
            else
            {
                return Json(new { msg = "发布失败", success = false });
            }
        }
    }
}