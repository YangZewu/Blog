using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Blog.Model;
namespace Blog.DAL
{
   public class publishDal
    {
        private BloggerEntities publish = new BloggerEntities();
        public bool Add(T_Article a)
        {
            publish.T_Article.Add(a);
            return publish.SaveChanges() > 0;
        }
    }
}
