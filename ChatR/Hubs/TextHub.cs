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
        public async Task NewMessage(string jsonObj)
        {
            await SaveMessageAsRecord(jsonObj);
            await Clients.All.SendAsync("messageReceived", jsonObj);
        }

        public async Task SaveMessageAsRecord(string jsonObject)
        {
            try
            {
                IMessage message = JsonConvert.DeserializeObject<IMessage>(jsonObject);
                var msg = new Message(message);
                using (var scope = _scopeFactory.CreateScope())
                {
                    var db = scope.ServiceProvider.GetRequiredService<MessageContext>();
                    await PostMessage(msg, db);
                }
            }
            catch(Exception exception)
            {
                Console.WriteLine(exception);
            }

        }

        public async Task PostMessage(Message message, MessageContext context)
        {
            context.Messages.Add(message);
            await context.SaveChangesAsync();
        }
    }

}
