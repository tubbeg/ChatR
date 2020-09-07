using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ChatR.Data;
using ChatR.Models;

namespace ChatR.Controllers
{
    public class MessagesController : Controller
    {
        // GET: Messages
        public IActionResult Index()
        {
            return View();
        }
    }
}
