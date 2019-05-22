using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Blog.Model;
using System.Linq.Expressions;
namespace Blog.DAL
{
   public class articleDal
    {
        private BloggerEntities article = new BloggerEntities();
        //按照条件查询文章
        public List<T_Article> GetList(Expression<Func<T_Article, bool>> whereLambda)
        {
            return article.T_Article.Where(whereLambda).OrderByDescending(a => a.PublishTime).ToList();
        }
        //按发布时间的降序查找全部文章
        //public List<T_Article> GetList()
        //{
        //    return article.T_Article.OrderByDescending(a => a.PublishTime).ToList();
        //}
        //增加
        public bool Add(T_Article a)
        {
            article.T_Article.Add(a);
            return article.SaveChanges() > 0;
        }
        //修改
        public bool Updata(int id)
        {
            var us = article.T_Article.Where(a => a.Id==id).FirstOrDefault();
            us.ReadPeople++;
            return article.SaveChanges() > 0;
        }
        //删除
        public bool Delete(int id)
        {
            var ar = new T_Article{Id=id};
            article.T_Article.Attach(ar);
            article.T_Article.Remove(ar);
            return article.SaveChanges() > 0;
        }
    }
}
