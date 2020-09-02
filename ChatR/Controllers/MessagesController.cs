using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ChatR.Data;
using ChatR.Models;

namespace ChatR.Controllers
{
    public class MessagesController : Controller
    {
        private readonly MessageContext _context;

        public MessagesController(MessageContext context)
        {
            _context = context;
        }

        // GET: Messages
        public async Task<IActionResult> Index()
        {
            var messagesDTO = new List<MessageDTO>();
            var messages = await _context.Messages.ToListAsync();
            foreach (var message in messages)
            {
                var newMessage = new MessageDTO(message);
                messagesDTO.Add(newMessage);
            }
            return View(messagesDTO);
        }

    }
}
