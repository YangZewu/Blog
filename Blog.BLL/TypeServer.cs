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
   public class TypeServer
    {
        private TypeDal type = new TypeDal();
        public List<T_ArticleType> getType(Expression<Func<T_ArticleType, bool>> whereLambda)
        {
            return type.getType(whereLambda);
        }
        public int GetCount(Expression<Func<T_ArticleType, bool>> whereLambda)
        {
            return type.getType(whereLambda).Count;
        }
    }
}
