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

namespace ChatR.Hubs
{
    public class TextHub : Hub
    {
        private readonly IServiceScopeFactory _scopeFactory;
        public TextHub(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        public async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            await Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId} has joined the group {groupName}.");
        }

        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

            await Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId} has left the group {groupName}.");
        }


        //can't use interface as parameter which would be very convenient :\ 
        public async Task NewMessage(MessageDTO message, string userId)
        {
            using (var scope = _scopeFactory.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<MessageContext>();
                if (UserExists(userId, context))
                {
                    await SaveMessageAsRecord(message);
                    await Clients.User(Context.UserIdentifier).SendAsync("messageReceived", message);
                }
            }
        }

        public async Task NewUser(string userId)
        {
            using (var scope = _scopeFactory.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<MessageContext>();
                //1. Validate user
                if (!UserExists(userId, context))
                {
                    //2. Add user to list
                    await AddNewUser(userId, context);
                    //3. Add to group, need entity for this
                    //4. Send group history
                    var history = await GetHistory(context);
                    await Clients.User(Context.UserIdentifier).SendAsync("ReqHistory", history);
                }
            }
        }
        private async Task AddNewUser(string userId, MessageContext context)
        {
            var user = new User
            {
                Username = userId
            };
            context.Users.Add(user);
            await context.SaveChangesAsync();
        }

        private bool UserExists(string userId, MessageContext context)
        {
            var user = from a in context.Users
                        where a.Username == userId
                        select a;
            if (user.Count() > 0)
                return true;
            return false;
        }

        private async Task<List<MessageDTO>> GetHistory(MessageContext context)
        {
            //Is there a better way to do this?
            var data = await context.Messages.ToListAsync<IMessage>();
            var history = new List<MessageDTO>(); 
            foreach(var record in data)
            {
                var message = new MessageDTO(record);
                history.Add(message);
            }
            return history;
        }
        private async Task SaveMessageAsRecord(IMessage message)
        {
            try
            {
                //Cannot deserialize into interface without custom jsonconverter
                using (var scope = _scopeFactory.CreateScope())
                {
                    var db = scope.ServiceProvider.GetRequiredService<MessageContext>();
                    await PostMessage(message, db);
                }
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
            }
        }


        private async Task PostMessage(IMessage message, MessageContext context)
        {

            var chatMessage = new Message(message);
            //Need a find method call here
            chatMessage.User = context.Users.FirstOrDefault();
            try
            {
                context.Messages.Add(chatMessage);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            await context.SaveChangesAsync();
        }

        public class NotYetImplementedException : Exception
        {
        } 
    }

}
