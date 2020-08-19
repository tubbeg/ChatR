using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ChatR.Models
{ 
 
    public class ChatMessage : IMessage
    {
        public ChatMessage()
        {

        }
        public ChatMessage(IMessage message)
        {
            Author = message.Author;
            Content = message.Content;
            Type = message.Type;
        }

        /*An imperfect solution. It's not good that there are two properties
         * describing the author/user. On the other hand, I might add more
         * properties to the User class later on and I also need a FK to
         * the user entity. This is a design problem. I could simply use
         * a public username (author) and the real name (username). */

        [Key]
        public int Key { get; set; }
        public User User { get; set; }
        public string Author { get; set; }
        public string Content { get; set; }
        public MessageType Type { get; set; }
    }
    public class Message : IMessage
    {
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
