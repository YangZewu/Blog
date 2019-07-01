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
        //发布页面
        [Authorize]
        public ActionResult Publish()
        {
            return View();
        }
        //发布文章的方法
        [ValidateInput(false)]
        [HttpPost]
        public JsonResult Add(T_Article arcitle)
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
        public ActionResult Action()
        {
            return View("/User/Login");
        }
    }
}