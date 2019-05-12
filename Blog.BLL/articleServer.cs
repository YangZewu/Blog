using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Blog.DAL;
using Blog.Model;
using System.Linq.Expressions;
namespace Blog.BLL
{
   public class articleServer
    {
        private articleDal article = new articleDal();
        //按照条件查询文章
        public List<T_Article> GetT_Articles(Expression<Func<T_Article, bool>> whereLambda)
        {
            return article.GetList(whereLambda);
        }
        //按照降序查询文章
        public List<T_Article> GetT_Articles()
        {
            return article.GetList();
        }
        //增加
        public bool Add(T_Article a)
        {
            return article.Add(a);
        }
        //修改
        /*public bool Updata(T_Article)
        {

        }*/
        //删除
        public bool Delete(int id)
        {
            return article.Delete(id);
        }
    }
}
