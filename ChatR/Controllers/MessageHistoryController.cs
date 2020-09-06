using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ChatR.Data;
using ChatR.Models;

namespace ChatR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageHistoryController : ControllerBase
    {
        private readonly MessageContext _context;

        public MessageHistoryController(MessageContext context)
        {
            _context = context;
        }

        // GET: api/MessagesData
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MessageDTO>>> GetMessages()
        {
            var messagesDTO = new List<MessageDTO>();
            var messages = await _context.Messages.ToListAsync();
            foreach (var message in messages)
            {
                var newMessage = new MessageDTO(message);
                messagesDTO.Add(newMessage);
            }
            return messagesDTO;
        }

    }
}
