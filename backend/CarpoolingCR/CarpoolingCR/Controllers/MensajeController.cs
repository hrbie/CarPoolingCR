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
    public class MensajeController : ApiController
    {
        private carpoolingcrEntities db = new carpoolingcrEntities();

        // GET api/Mensaje
        public IEnumerable<Mensaje> GetMensajes()
        {
            //var mensaje = db.Mensaje.Include(m => m.Solicitud);
            //return mensaje.AsEnumerable();
            return db.Mensaje.Select(l => new
            {
                ID_MENSAJE=l.ID_MENSAJE,
                ID_SOLICITUD=l.ID_SOLICITUD,
                ID_USUARIO=l.ID_USUARIO,
                MENSAJE1=l.MENSAJE1
            }).ToList().Select(x => new Mensaje
            {
                ID_MENSAJE = x.ID_MENSAJE,
                ID_SOLICITUD = x.ID_SOLICITUD,
                ID_USUARIO = x.ID_USUARIO,
                MENSAJE1 = x.MENSAJE1
            });
        }

        // GET api/Mensaje/5
        public Mensaje GetMensaje(int id)
        {
            Mensaje mensaje = db.Mensaje.Find(id);
            if (mensaje == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return mensaje;
        }

        // PUT api/Mensaje/5
        public HttpResponseMessage PutMensaje(int id, Mensaje mensaje)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != mensaje.ID_MENSAJE)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(mensaje).State = EntityState.Modified;

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

        // POST api/Mensaje
        public HttpResponseMessage PostMensaje(Mensaje mensaje)
        {
            if (ModelState.IsValid)
            {
                db.Mensaje.Add(mensaje);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, mensaje);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = mensaje.ID_MENSAJE }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Mensaje/5
        public HttpResponseMessage DeleteMensaje(int id)
        {
            Mensaje mensaje = db.Mensaje.Find(id);
            if (mensaje == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Mensaje.Remove(mensaje);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, mensaje);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}