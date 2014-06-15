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
    public class MensajeMVCController : Controller
    {
        private carpoolingcrEntities db = new carpoolingcrEntities();

        //
        // GET: /MensajeMVC/

        public ActionResult Index()
        {
            var mensaje = db.Mensaje.Include(m => m.Solicitud);
            return View(mensaje.ToList());
        }

        //
        // GET: /MensajeMVC/Details/5

        public ActionResult Details(int id = 0)
        {
            Mensaje mensaje = db.Mensaje.Find(id);
            if (mensaje == null)
            {
                return HttpNotFound();
            }
            return View(mensaje);
        }

        //
        // GET: /MensajeMVC/Create

        public ActionResult Create()
        {
            ViewBag.ID_SOLICITUD = new SelectList(db.Solicitud, "ID_SOLICITUD", "COMENTARIO");
            return View();
        }

        //
        // POST: /MensajeMVC/Create

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Mensaje mensaje)
        {
            if (ModelState.IsValid)
            {
                db.Mensaje.Add(mensaje);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ID_SOLICITUD = new SelectList(db.Solicitud, "ID_SOLICITUD", "COMENTARIO", mensaje.ID_SOLICITUD);
            return View(mensaje);
        }

        //
        // GET: /MensajeMVC/Edit/5

        public ActionResult Edit(int id = 0)
        {
            Mensaje mensaje = db.Mensaje.Find(id);
            if (mensaje == null)
            {
                return HttpNotFound();
            }
            ViewBag.ID_SOLICITUD = new SelectList(db.Solicitud, "ID_SOLICITUD", "COMENTARIO", mensaje.ID_SOLICITUD);
            return View(mensaje);
        }

        //
        // POST: /MensajeMVC/Edit/5

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Mensaje mensaje)
        {
            if (ModelState.IsValid)
            {
                db.Entry(mensaje).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ID_SOLICITUD = new SelectList(db.Solicitud, "ID_SOLICITUD", "COMENTARIO", mensaje.ID_SOLICITUD);
            return View(mensaje);
        }

        //
        // GET: /MensajeMVC/Delete/5

        public ActionResult Delete(int id = 0)
        {
            Mensaje mensaje = db.Mensaje.Find(id);
            if (mensaje == null)
            {
                return HttpNotFound();
            }
            return View(mensaje);
        }

        //
        // POST: /MensajeMVC/Delete/5

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Mensaje mensaje = db.Mensaje.Find(id);
            db.Mensaje.Remove(mensaje);
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