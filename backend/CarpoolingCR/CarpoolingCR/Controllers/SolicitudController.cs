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
    public class SolicitudController : ApiController
    {
        private carpoolingcrEntities db = new carpoolingcrEntities();

        // GET api/Solicitud
        public IEnumerable<Solicitud> GetSolicituds()
        {
            //var solicitud = db.Solicitud.Include(s => s.Viaje).Include(s => s.Usuario);
            //return solicitud.AsEnumerable();
            return db.Solicitud.Select(l => new
            {
                ID_SOLICITUD = l.ID_SOLICITUD,
                ID_USUARIO = l.ID_USUARIO,
                ID_VIAJE = l.ID_VIAJE,
                ESTADO = l.ESTADO,
                COMENTARIO = l.COMENTARIO
            }).ToList().Select(x => new Solicitud
            {
                ID_SOLICITUD = x.ID_SOLICITUD,
                ID_USUARIO = x.ID_USUARIO,
                ID_VIAJE = x.ID_VIAJE,
                ESTADO = x.ESTADO,
                COMENTARIO = x.COMENTARIO
            }); 
        }

        // GET api/Solicitud/5
        public Solicitud GetSolicitud(int id)
        {
            Solicitud solicitud = db.Solicitud.Find(id);
            if (solicitud == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return solicitud;
        }

        // PUT api/Solicitud/5
        public HttpResponseMessage PutSolicitud(int id, Solicitud solicitud)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != solicitud.ID_SOLICITUD)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(solicitud).State = EntityState.Modified;

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

        // POST api/Solicitud
        public HttpResponseMessage PostSolicitud(Solicitud solicitud)
        {
            if (ModelState.IsValid)
            {
                db.Solicitud.Add(solicitud);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, solicitud);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = solicitud.ID_SOLICITUD }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Solicitud/5
        public HttpResponseMessage DeleteSolicitud(int id)
        {
            Solicitud solicitud = db.Solicitud.Find(id);
            if (solicitud == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Solicitud.Remove(solicitud);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, solicitud);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}