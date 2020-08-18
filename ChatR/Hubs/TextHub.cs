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

        public async Task NewMessage(string jsonObj)
        {
            await Clients.All.SendAsync("messageReceived", jsonObj);
        }



        public void SaveMessageAsRecord(string jsonObject)
        {
            IMessage message = JsonConvert.DeserializeObject<IMessage>(jsonObject);

            using (var scope = _scopeFactory.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<MessageContext>();

                // when we exit the using block,
                // the IServiceScope will dispose itself 
                // and dispose all of the services that it resolved.
            }
        }
    }

}
