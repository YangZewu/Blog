using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Blog.Model;
using Blog.BLL;
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
        //注册方法
        public JsonResult Add(T_User u)
        {
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
        public JsonResult GetUser(T_User u)
        {
            if (user.GetLists(a => a.UserName == u.UserName && a.UserPassword == u.UserPassword).Count >= 1)
            { 
                return Json(new { msg = "登录成功", success = true });
            }
            else
            {
                return Json(new { msg = "登录失败", success = false });
            }
        }
        //找回方法
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
    }
}