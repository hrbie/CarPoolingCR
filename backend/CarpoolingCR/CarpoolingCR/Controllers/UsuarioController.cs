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
    public class UsuarioController : ApiController
    {
        private carpoolingcrEntities db = new carpoolingcrEntities();

        // GET api/Usuario
        public IEnumerable<Usuario> GetUsuarios()
        {
            return db.Usuario.Select(l => new
            {
                ID = l.ID,
                NOMBRE = l.NOMBRE,
                FECHA_NACIMIENTO = l.FECHA_NACIMIENTO,
                DIRECCION = l.DIRECCION,
                EMAIL = l.EMAIL,
                PASSWORD = l.PASSWORD
            }).ToList().Select(x => new Usuario
            {
                ID = x.ID,
                NOMBRE = x.NOMBRE,
                FECHA_NACIMIENTO = x.FECHA_NACIMIENTO,
                DIRECCION = x.DIRECCION,
                EMAIL = x.EMAIL,
                PASSWORD = x.PASSWORD
            });
        }

        // GET api/Usuario/5
        public Usuario GetUsuario(int id)
        {
            Usuario usuario = db.Usuario.Find(id);
            if (usuario == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return db.Usuario.Select(l => new
            {
                ID = l.ID,
                NOMBRE = l.NOMBRE,
                FECHA_NACIMIENTO = l.FECHA_NACIMIENTO,
                DIRECCION = l.DIRECCION,
                EMAIL = l.EMAIL,
                PASSWORD = l.PASSWORD
            }).ToList().Select(x => new Usuario
            {
                ID = x.ID,
                NOMBRE = x.NOMBRE,
                FECHA_NACIMIENTO = x.FECHA_NACIMIENTO,
                DIRECCION = x.DIRECCION,
                EMAIL = x.EMAIL,
                PASSWORD = x.PASSWORD
            }).Where(i => i.ID == id).FirstOrDefault() ;
        }

        // PUT api/Usuario/5
        public HttpResponseMessage PutUsuario(int id, Usuario usuario)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != usuario.ID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(usuario).State = EntityState.Modified;

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

        // POST api/Usuario
        public HttpResponseMessage PostUsuario(Usuario usuario)
        {
            if (ModelState.IsValid)
            {
                db.Usuario.Add(usuario);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, usuario);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = usuario.ID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Usuario/5
        public HttpResponseMessage DeleteUsuario(int id)
        {
            Usuario usuario = db.Usuario.Find(id);
            if (usuario == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Usuario.Remove(usuario);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, usuario);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}