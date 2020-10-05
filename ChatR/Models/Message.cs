using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ChatR.Models
{ 
 
    public class Message : IMessage
    {
        public Message()
        {

        }
        public Message(IMessage message)
        {
            Author = message.Author;
            Content = message.Content;
            Type = message.Type;
            Date = message.Date;
        }
            /* Update 2020:08:20. Apparently there are DTO objects
             * (data transfer objects). These can be used to protect
             * against overposting attacks among other things.
             * This might not be a perfect solution, but it works.
             * See https://go.microsoft.com/fwlink/?linkid=2123754.
             */

            [Key]
        public int Key { get; set; }
        public User User { get; set; }
        public string Author { get; set; }
        public string Content { get; set; }
        public MessageType Type { get; set; }
        public DateTime Date { get; set; }
    }
    public class MessageDTO : IMessage
    {
        public MessageDTO()
        {

        }
        public MessageDTO(IMessage message)
        {
            Author = message.Author;
            Content = message.Content;
            Type = message.Type;
            Date = message.Date;
        }
        public string Author { get; set; }
        public string Content { get; set; }
        public MessageType Type { get; set; }
        public DateTime Date { get; set; }
    }

    public interface IMessage
    {
        public string Author { get; set; }
        public string Content { get; set; }
        public MessageType Type { get; set; }
        public DateTime Date { get; set; }
    }

    public enum MessageType
    {
        Image,
        Video,
        Link,
        Text
    }
}
