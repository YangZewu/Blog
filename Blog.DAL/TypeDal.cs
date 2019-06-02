using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Blog.Model;
namespace Blog.DAL
{
   public class TypeDal
    {
        private BloggerEntities type = new BloggerEntities();
        public List<T_ArticleType> getType(Expression<Func<T_ArticleType, bool>> whereLambda)
        {
            return type.T_ArticleType.Where(whereLambda).ToList();
        }
    }
}
