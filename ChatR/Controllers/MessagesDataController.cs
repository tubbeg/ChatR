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
    public class MessagesDataController : ControllerBase
    {
        private readonly MessageContext _context;

        public MessagesDataController(MessageContext context)
        {
            _context = context;
        }

        // GET: api/MessagesData
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessages()
        {
            return await _context.Messages.ToListAsync();
        }


        // GET: api/MessageHistory
        [HttpGet]
        [Route("~/api/history")]
        //[Route("/getHistory")]
        public async Task<ActionResult<IEnumerable<MessageDTO>>> GetHistory()
        {
            var listOfMessages = await _context.Messages.ToListAsync();
            var messagesDTO = from m in listOfMessages
                                 select new MessageDTO(m);
            return messagesDTO.ToList();
        }

        // GET: api/MessagesData/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Message>> GetMessage(int id)
        {
            var message = await _context.Messages.FindAsync(id);

            if (message == null)
            {
                return NotFound();
            }

            return message;
        }

        // PUT: api/MessagesData/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMessage(int id, Message message)
        {
            if (id != message.Key)
            {
                return BadRequest();
            }

            _context.Entry(message).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MessageExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/MessagesData
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Message>> PostMessage(Message message)
        {
            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMessage", new { id = message.Key }, message);
        }

        // DELETE: api/MessagesData/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Message>> DeleteMessage(int id)
        {
            var message = await _context.Messages.FindAsync(id);
            if (message == null)
            {
                return NotFound();
            }

            _context.Messages.Remove(message);
            await _context.SaveChangesAsync();

            return message;
        }

        private bool MessageExists(int id)
        {
            return _context.Messages.Any(e => e.Key == id);
        }
    }
}
