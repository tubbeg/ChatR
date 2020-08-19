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
        public async Task NewMessage(Message message)
        {
            await SaveMessageAsRecord(message);
            await Clients.All.SendAsync("messageReceived", message);
        }

        public async Task NewUser(string userId)
        {


            var history = await GetHistory();

            await Clients.User(userId).SendAsync("", history);
        }

        //Need to set up one-to-many relationship first
        private async Task<List<ChatMessage>> GetHistory()
        {
            using (var scope = _scopeFactory.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<MessageContext>();
                return await db.Messages.ToListAsync();
            }
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
            var chatMessage = new ChatMessage(message);
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
