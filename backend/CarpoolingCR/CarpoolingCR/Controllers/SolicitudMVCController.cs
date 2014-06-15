using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CarpoolingCR.Models;

namespace CarpoolingCR.Controllers
{
    public class SolicitudMVCController : Controller
    {
        private carpoolingcrEntities db = new carpoolingcrEntities();

        //
        // GET: /SolicitudMVC/

        public ActionResult Index()
        {
            var solicitud = db.Solicitud.Include(s => s.Viaje).Include(s => s.Usuario);
            return View(solicitud.ToList());
        }

        //
        // GET: /SolicitudMVC/Details/5

        public ActionResult Details(int id = 0)
        {
            Solicitud solicitud = db.Solicitud.Find(id);
            if (solicitud == null)
            {
                return HttpNotFound();
            }
            return View(solicitud);
        }

        //
        // GET: /SolicitudMVC/Create

        public ActionResult Create()
        {
            ViewBag.ID_VIAJE = new SelectList(db.Viaje, "ID_VIAJE", "ORIGEN");
            ViewBag.ID_USUARIO = new SelectList(db.Usuario, "ID", "NOMBRE");
            return View();
        }

        //
        // POST: /SolicitudMVC/Create

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Solicitud solicitud)
        {
            if (ModelState.IsValid)
            {
                db.Solicitud.Add(solicitud);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ID_VIAJE = new SelectList(db.Viaje, "ID_VIAJE", "ORIGEN", solicitud.ID_VIAJE);
            ViewBag.ID_USUARIO = new SelectList(db.Usuario, "ID", "NOMBRE", solicitud.ID_USUARIO);
            return View(solicitud);
        }

        //
        // GET: /SolicitudMVC/Edit/5

        public ActionResult Edit(int id = 0)
        {
            Solicitud solicitud = db.Solicitud.Find(id);
            if (solicitud == null)
            {
                return HttpNotFound();
            }
            ViewBag.ID_VIAJE = new SelectList(db.Viaje, "ID_VIAJE", "ORIGEN", solicitud.ID_VIAJE);
            ViewBag.ID_USUARIO = new SelectList(db.Usuario, "ID", "NOMBRE", solicitud.ID_USUARIO);
            return View(solicitud);
        }

        //
        // POST: /SolicitudMVC/Edit/5

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Solicitud solicitud)
        {
            if (ModelState.IsValid)
            {
                db.Entry(solicitud).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ID_VIAJE = new SelectList(db.Viaje, "ID_VIAJE", "ORIGEN", solicitud.ID_VIAJE);
            ViewBag.ID_USUARIO = new SelectList(db.Usuario, "ID", "NOMBRE", solicitud.ID_USUARIO);
            return View(solicitud);
        }

        //
        // GET: /SolicitudMVC/Delete/5

        public ActionResult Delete(int id = 0)
        {
            Solicitud solicitud = db.Solicitud.Find(id);
            if (solicitud == null)
            {
                return HttpNotFound();
            }
            return View(solicitud);
        }

        //
        // POST: /SolicitudMVC/Delete/5

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Solicitud solicitud = db.Solicitud.Find(id);
            db.Solicitud.Remove(solicitud);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}