using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ChatR.Models
{
    public class Group
    {
        [Key]
        public int Key { get; set; }
        public string Name { get; set; }
        public IEnumerable<string> Connections { get; set; }
        public IEnumerable<Message> Messages { get; set; }
    }
}
