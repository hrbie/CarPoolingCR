using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CarpoolingCR.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "CarpoolinCR";

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Descripción de la App";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Página de Contacto";

            return View();
        }
    }
}
