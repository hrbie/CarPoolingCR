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
    public class ViajeMVCController : Controller
    {
        private carpoolingcrEntities db = new carpoolingcrEntities();

        //
        // GET: /ViajeMVC/

        public ActionResult Index()
        {
            var viaje = db.Viaje.Include(v => v.Usuario);
            return View(viaje.ToList());
        }

        //
        // GET: /ViajeMVC/Details/5

        public ActionResult Details(int id = 0)
        {
            Viaje viaje = db.Viaje.Find(id);
            if (viaje == null)
            {
                return HttpNotFound();
            }
            return View(viaje);
        }

        //
        // GET: /ViajeMVC/Create

        public ActionResult Create()
        {
            ViewBag.ID_USUARIO = new SelectList(db.Usuario, "ID", "NOMBRE");
            return View();
        }

        //
        // POST: /ViajeMVC/Create

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Viaje viaje)
        {
            if (ModelState.IsValid)
            {
                db.Viaje.Add(viaje);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ID_USUARIO = new SelectList(db.Usuario, "ID", "NOMBRE", viaje.ID_USUARIO);
            return View(viaje);
        }

        //
        // GET: /ViajeMVC/Edit/5

        public ActionResult Edit(int id = 0)
        {
            Viaje viaje = db.Viaje.Find(id);
            if (viaje == null)
            {
                return HttpNotFound();
            }
            ViewBag.ID_USUARIO = new SelectList(db.Usuario, "ID", "NOMBRE", viaje.ID_USUARIO);
            return View(viaje);
        }

        //
        // POST: /ViajeMVC/Edit/5

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Viaje viaje)
        {
            if (ModelState.IsValid)
            {
                db.Entry(viaje).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ID_USUARIO = new SelectList(db.Usuario, "ID", "NOMBRE", viaje.ID_USUARIO);
            return View(viaje);
        }

        //
        // GET: /ViajeMVC/Delete/5

        public ActionResult Delete(int id = 0)
        {
            Viaje viaje = db.Viaje.Find(id);
            if (viaje == null)
            {
                return HttpNotFound();
            }
            return View(viaje);
        }

        //
        // POST: /ViajeMVC/Delete/5

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Viaje viaje = db.Viaje.Find(id);
            db.Viaje.Remove(viaje);
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