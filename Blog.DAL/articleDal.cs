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
        public List<T_Article> GetListsByPage(int offset, int limit, Expression<Func<T_Article, bool>> whereLambda)
        {
            return article.T_Article.Where(whereLambda).OrderByDescending(a => a.PublishTime).Skip(offset).Take(limit).ToList();
        }
        //增加
        public bool Add(T_Article a)
        {
            article.T_Article.Add(a);
            return article.SaveChanges() > 0;
        }
        //修改
        public bool Updata(int id)
        {
            var ar = article.T_Article.Where(a => a.Id==id).FirstOrDefault();
            ar.ReadPeople++;
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
        public bool Delete(List<int> ids)
        {
            foreach (int id in ids)
            {
                var ar = new T_Article { Id = id };
                article.T_Article.Attach(ar);
                article.T_Article.Remove(ar);

            }

            return article.SaveChanges() > 0;
        }
        public bool Updata(T_Article edit)
        {
            var ar = article.T_Article.Where(a =>a.Id==edit.Id).FirstOrDefault();
            ar.Title = edit.Title;
            ar.Content = edit.Content;
            return article.SaveChanges() > 0;
        }
    }
}
