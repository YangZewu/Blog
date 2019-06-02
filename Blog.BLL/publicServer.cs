using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Blog.DAL;
using Blog.Model;
namespace Blog.BLL
{
   public class publicServer
    {
        private publishDal publish = new publishDal();
        public bool Add(T_Article a)
        {
            return publish.Add(a);
        }
    }
}
