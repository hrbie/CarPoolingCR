using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using CarpoolingCR.Models;

namespace CarpoolingCR.Controllers
{
    public class ViajeController : ApiController
    {
        private carpoolingcrEntities db = new carpoolingcrEntities();

        // GET api/Viaje
        public IEnumerable<Viaje> GetViajes()
        {
            //var viaje = db.Viaje.Include(v => v.Usuario);
            //return viaje.AsEnumerable();
            return db.Viaje.Select(l => new
            {
                ID_VIAJE = l.ID_VIAJE,
                ID_USUARIO = l.ID_USUARIO,
                ORIGEN = l.ORIGEN,
                LATITUD_ORIGEN = l.LATITUD_ORIGEN,
                LONGITUD_ORIGEN = l.LONGITUD_ORIGEN,
                DESTINO = l.DESTINO,
                LATITUD_DESTINO = l.LATITUD_DESTINO,
                LONGITUD_DESTINO = l.LONGITUD_DESTINO,
                FECHA = l.FECHA,
                HORA = l.HORA,
                COSTO = l.COSTO,
                ESPACIOS = l.ESPACIOS,
                ESTADO = l.ESTADO
            }).ToList().Select(x => new Viaje
            {
                ID_VIAJE = x.ID_VIAJE,
                ID_USUARIO = x.ID_USUARIO,
                ORIGEN = x.ORIGEN,
                LATITUD_ORIGEN = x.LATITUD_ORIGEN,
                LONGITUD_ORIGEN = x.LONGITUD_ORIGEN,
                DESTINO = x.DESTINO,
                LATITUD_DESTINO = x.LATITUD_DESTINO,
                LONGITUD_DESTINO = x.LONGITUD_DESTINO,
                FECHA = x.FECHA,
                HORA = x.HORA,
                COSTO = x.COSTO,
                ESPACIOS = x.ESPACIOS,
                ESTADO = x.ESTADO
            });
        }
        // GET api/Viaje/5
        public Viaje GetViaje(int id)
        {
            Viaje viaje = db.Viaje.Find(id);
            if (viaje == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return viaje;
        }

        // PUT api/Viaje/5
        public HttpResponseMessage PutViaje(int id, Viaje viaje)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != viaje.ID_VIAJE)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(viaje).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // POST api/Viaje
        public HttpResponseMessage PostViaje(Viaje viaje)
        {
            if (ModelState.IsValid)
            {
                db.Viaje.Add(viaje);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, viaje);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = viaje.ID_VIAJE }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Viaje/5
        public HttpResponseMessage DeleteViaje(int id)
        {
            Viaje viaje = db.Viaje.Find(id);
            if (viaje == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Viaje.Remove(viaje);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, viaje);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}