using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ChatR.Models
{
    public class User
    {
        [Key]
        public int Key { get; set; }
        //There are MUCH better ways of setting up authentication but this
        //is used for simplicity's sake
        public string Username { get; set; }

        public ICollection<ChatMessage> Messages { get; set; }
    }
}
