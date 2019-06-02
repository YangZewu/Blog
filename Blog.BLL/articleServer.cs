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
        //查询类别
        //按照条件查询文章
        public List<T_Article> GetT_Articles(Expression<Func<T_Article, bool>> whereLambda)
        {
            return article.GetList(whereLambda);
        }
        public List<T_Article> GetListsByPage(int offset, int limit, Expression<Func<T_Article, bool>> whereLambda)
        {
            return article.GetListsByPage(offset, limit, whereLambda);
        }
        public int GetCount(Expression<Func<T_Article, bool>> whereLambda)
        {
            return article.GetList(whereLambda).Count;
        }
        //增加
        public bool Add(T_Article a)
        {
            return article.Add(a);
        }
        //修改
        public bool Updata(int id)
        {
            return article.Updata(id);
        }
        //删除
        public bool Delete(int id)
        {
            return article.Delete(id);
        }
        public bool DeleteAll(List<int> id)
        {
            return article.Delete(id);
        }
        public bool Updata(T_Article edit)
        {
            return article.Updata(edit);
        }
    }
}
