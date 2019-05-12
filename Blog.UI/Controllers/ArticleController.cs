using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Blog.BLL;
using Blog.Model;

namespace Blog.UI.Controllers
{
    public class ArticleController : Controller
    {
        private articleServer article = new articleServer();
        // GET: Article
        public ActionResult Index()
        {
            return View();
        }
    }
}