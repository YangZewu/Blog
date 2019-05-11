using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Blog.Model;
using System.Linq.Expressions;
namespace Blog.DAL
{
   public class userDal
    {
        private BloggerEntities user = new BloggerEntities();
        //查询
        public List<T_User> GetT_Users(Expression<Func<T_User, bool>> whereLambda)
        {
            return user.T_User.Where(whereLambda).ToList();
        }
        //增加
        public bool Add(T_User u)
        {
            user.T_User.Add(u);
            return user.SaveChanges() > 0;
        }
        //更新
        public bool Updata(T_User u)
        {
            var us = user.T_User.Where(a=>a.UserName==u.UserName).FirstOrDefault();
            us.UserPassword = u.UserPassword;
            return user.SaveChanges() > 0;
        }
        //删除
        public bool Delete(int id)
        {
            var us = new T_User { UserId = id };
            user.T_User.Attach(us);
            user.T_User.Remove(us);
            return user.SaveChanges() > 0;
        }
    }
}
