using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Blog.Model;
using Blog.BLL;
using System.Web.Security;

namespace Blog.UI.Controllers
{
    public class UserController : Controller
    {
        private userServer user = new userServer();
        // GET: User
        public ActionResult Index()
        {
            return View();
        }
        //注册页
        public ActionResult Reg()
        {
            return View();
        }
        [HttpPost]
        //注册方法
        public JsonResult Add(T_User u)//, HttpPostedFileBase image
        {
            //u.Image = new byte[image.ContentLength];
           // image.InputStream.Read(u.Image, 0, image.ContentLength);
            u.RegTime = System.DateTime.Now.ToString();
            u.UserState = "1";
            if (user.Add(u))
            {
                return Json(new { msg = "添加成功", success = true });
            }
            else
            {
                return Json(new { msg = "添加失败", success = false });
            }
        }
        //登录页
        public ActionResult Login()
        {
            return View();
        }
        //登录方法
        [HttpPost]
        public JsonResult GetUser(string userName,string password)
        {

            T_User us= user.CheckLogin(userName,password);
            if(us!=null)
            {
                FormsAuthentication.SetAuthCookie(userName,false);
                Session["userName"] = userName;
                return Json(new { msg = "登录成功", success = true });
            }
            else
            {
                return Json(new { msg = "登录失败", success = false });
            }
        }
        //找回方法
        [HttpPost]
        public JsonResult Edit(T_User u)
        {
            if(user.Updata(u))
            {
                return Json(new { msg = "找回成功", success = true });
            }
            else
            {
                return Json(new { msg = "找回失败", success = false });
            }
        }
       public ActionResult CheckName(T_User u)
        {
            if (user.GetLists(a => a.UserName == u.UserName).Count>0)
                return Json(new { valid = false });
            else
                return Json(new { valid = true });
        }
    }
}