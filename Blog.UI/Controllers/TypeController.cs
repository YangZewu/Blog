using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Blog.BLL;
using Blog.Model;
namespace Blog.UI.Controllers
{
    public class TypeController : Controller
    {
        private TypeServer type = new TypeServer();
        // GET: Type
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult Type()
        {
            List<T_ArticleType> types = type.getType(a => true);
            int total = type.GetCount((a) => true);
            return Json(new { total = total, rows = types}, JsonRequestBehavior.AllowGet);
        }
    }
}