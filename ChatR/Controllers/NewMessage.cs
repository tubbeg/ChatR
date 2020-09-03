using ChatR.Data;
using ChatR.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatR.Controllers
{
    public class NewMessageViewComponent : ViewComponent
    {
        private readonly MessageContext _context;

        public NewMessageViewComponent(MessageContext context)
        {
            _context = context;
        }
        public async Task<IViewComponentResult> InvokeAsync()
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
