using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Blog.UI.Controllers
{
    public class ClearController : Controller
    {
        // GET: Clear
        public ActionResult Index()
        {
            return View();
        }
        //退出登录
        public ActionResult logOut()
        {
            FormsAuthentication.SignOut();
            Session["userName"] = null;
            return Content("<script>window.location='/Article/Index';</script>");
        }
    }
}