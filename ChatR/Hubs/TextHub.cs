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

        private async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }

        private async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }


        //can't use interface as parameter which would be very convenient :\ 
        public async Task AddMessage(MessageDTO message, string groupName)
        {
            using (var scope = _scopeFactory.CreateScope())
            {
                message.Date = DateTime.UtcNow;
                var context = scope.ServiceProvider.GetRequiredService<MessageContext>();
                //Cannot deserialize into interface without custom jsonconverter
                await PostMessage(message, groupName, context);
                await Clients.User(Context.UserIdentifier).SendAsync("messageReceived", message, DateTime.UtcNow);
            }
        }
        private async Task PostMessage(IMessage message, string groupName, MessageContext context)
        {

            var chatMessage = new Message(message);
            try
            {
                chatMessage.Group = FindGroup(groupName, context);
                context.Messages.Add(chatMessage);
                await AddToGroup(groupName);
                await context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

        private Group FindGroup(string groupName, MessageContext context)
        {
            //Need a find method call here
            var listOfGroups = from g in context.Groups
                         where g.Name == groupName
                         select g;
            if (listOfGroups.Count() < 1)
                throw new NoGroupFoundException();
            return listOfGroups.First();
        }

        private class NoGroupFoundException : Exception
        {

        }
    }

}
