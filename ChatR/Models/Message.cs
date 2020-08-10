using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ChatR.Models
{ 

    public class Message : IMessage
    {
        [Key]
        public int Key { get; set; }
        public string Author { get; set; }
        public string Content { get; set; }
        public MessageType Type { get; set; }
    }

    public interface IMessage
    {
        public string Author { get; set; }
        public string Content { get; set; }
        public MessageType Type { get; set; }
    }

    public enum MessageType
    {
        Image,
        Video,
        Link,
        Text
    }
}
