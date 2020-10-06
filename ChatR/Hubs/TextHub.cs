using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatR.Models;
using ChatR.Data;
using ChatR.Controllers;
using System.Security.Claims;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Operations;

namespace ChatR.Hubs
{
    public class TextHub : Hub
    {
        private readonly IServiceScopeFactory _scopeFactory;
        public TextHub(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        //can't use interface as parameter which would be very convenient :\ 
        public async Task AddMessage(MessageDTO message)
        {
            using (var scope = _scopeFactory.CreateScope())
            {
                message.Date = DateTime.UtcNow;
                var context = scope.ServiceProvider.GetRequiredService<MessageContext>();
                //Cannot deserialize into interface without custom jsonconverter
                var hasSavedMessage = await PostMessage(message, context); 
                if (hasSavedMessage)
                    await Clients.All.SendAsync("messageReceived", message);
            }
        }
        private async Task<bool> PostMessage(IMessage message, MessageContext context)
        {
            var chatMessage = new Message(message);
            try
            {
                var user = await FindUser(context, message.Author);
                if (user == null)
                {    
                    user = new User { Username = message.Author };
                    context.Users.Add(user);
                }
                chatMessage.User = user;
                context.Messages.Add(chatMessage);
                await context.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return false;
        }

        private async Task<User> FindUser(MessageContext context, string userName)
        {
            var listOfUsers = await context.Users.ToListAsync();
            var usersWithMatchingNames = from u in listOfUsers
                                         where u.Username == userName
                                         select u;
            if (!usersWithMatchingNames.Any())
                return null;
            return usersWithMatchingNames.First();
        }
    }

}
