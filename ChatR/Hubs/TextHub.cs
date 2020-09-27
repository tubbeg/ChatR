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


        public async Task<bool> CreateGroup(string groupName)
        {
            using (var scope = _scopeFactory.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<MessageContext>();
                var listOfGroups = await context.Groups.ToListAsync();
                var groupsWithMatchingNames = from grps in listOfGroups
                                              where grps.Name == groupName
                                              select grps;
                if (groupsWithMatchingNames.Count() < 1)
                {
                    var group = new Group()
                    {
                        Name = groupName
                    };
                    context.Groups.Add(group);
                    return true;
                }
                return false;
            }
        }


        //can't use interface as parameter which would be very convenient :\ 
        public async Task AddMessage(MessageDTO message, string groupName)
        {
            using (var scope = _scopeFactory.CreateScope())
            {
                message.Date = DateTime.UtcNow;
                var context = scope.ServiceProvider.GetRequiredService<MessageContext>();
                //Cannot deserialize into interface without custom jsonconverter
                var groupExists = await PostMessage(message, groupName, context);
                if (groupExists)
                    await Clients.Group(groupName).SendAsync("messageReceived", message);
            }
        }
        private async Task<bool> PostMessage(IMessage message, string groupName, MessageContext context)
        {

            var chatMessage = new Message(message);
            try
            {
                chatMessage.Group = await FindGroup(groupName, context);
                context.Messages.Add(chatMessage);
                await AddToGroup(groupName);
                await context.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return false;
        }

        private async Task<Group> FindGroup(string groupName, MessageContext context)
        {
            var listOfGroups = await context.Groups.ToListAsync();
            var groupsWithMatchingNames = from g in listOfGroups
                                          where g.Name == groupName
                                          select g;
            if (!groupsWithMatchingNames.Any())
                throw new NoGroupFoundException();
            return groupsWithMatchingNames.First();
        }

        private class NoGroupFoundException : Exception
        {

        }
    }

}
