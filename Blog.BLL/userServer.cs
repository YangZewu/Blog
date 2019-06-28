using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Blog.DAL;
using Blog.Model;
namespace Blog.BLL
{
   public class userServer
    {
        private userDal userdal = new userDal();
        //查询
        public List<T_User> GetLists(Expression<Func<T_User, bool>> whereLambda)
        {
            return userdal.GetT_Users(whereLambda);
        }
        //增加
        public bool Add(T_User u)
        {
            return userdal.Add(u);
        }
        //更新
        public bool Updata(T_User u)
        {
            return userdal.Updata(u);
        }
        //删除
        public bool Delete(int id)
        {
            return userdal.Delete(id);
        }
        public T_User CheckLogin(string name, string password)
        {
            return GetLists(u=>u.UserName==name && u.UserPassword==password).FirstOrDefault();
        }
        public bool Edit(T_User u)
        {
            return userdal.Edit(u);
        }
    }
}
