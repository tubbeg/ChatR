using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatR.Hubs
{
    public class TextHub : Hub
    {
        private readonly IServiceScopeFactory _scopeFactory;
        public TextHub(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }
        public async Task NewMessage(IMessage message)
        {
            await Clients.All.SendAsync("messageReceived", message.Author, message.Content);
        }



        public void SaveMessageAsRecord(string jsonObject)
        {

            // Convert BlogSites object to JOSN string format  
            IMessage message = JsonConvert.DeserializeObject<IMessage>(jsonObject);

            using (var scope = _scopeFactory.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<DbContext>();

                // when we exit the using block,
                // the IServiceScope will dispose itself 
                // and dispose all of the services that it resolved.
            }
        }
    }

    public interface IMessage
    {
        public string Author { get; set; }
        public string Content { get; set; }
        public string Type { get; set; }
    }
}
