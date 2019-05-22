using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Blog.BLL;
using Blog.Model;
using PagedList;
namespace Blog.UI.Controllers
{
    public class ArticleController : Controller
    {
        private articleServer article = new articleServer();
        // GET: Article
        public ActionResult Index(int page = 1)
        {
            IPagedList<T_Article> Page = null;
            Page = article.GetT_Articles(a => true).ToPagedList(page, 4);
            
            return View(Page);
        }
        [HttpGet]
        public ActionResult Show(int Id)
        {
            article.Updata(Id);
            return View(article.GetT_Articles(a=>a.Id==Id).FirstOrDefault());
        }
    }
}