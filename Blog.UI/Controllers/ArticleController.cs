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
        private userServer user = new userServer();
        // GET: Article
        public ActionResult Index(int page = 1)
        {
            if (Session["userName"] != null)
            {
                string name = Session["userName"].ToString();
                ViewBag.pet = user.GetLists(a => a.UserName == name)[0].UserPet;
                ViewBag.sig = user.GetLists(a => a.UserName == name)[0].UserSig;
            }
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