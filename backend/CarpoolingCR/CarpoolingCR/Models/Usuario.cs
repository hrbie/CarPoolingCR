//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CarpoolingCR.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Usuario
    {
        public Usuario()
        {
            this.Solicitud = new HashSet<Solicitud>();
            this.Viaje = new HashSet<Viaje>();
        }
    
        public int ID { get; set; }
        public string NOMBRE { get; set; }
        public Nullable<System.DateTime> FECHA_NACIMIENTO { get; set; }
        public string DIRECCION { get; set; }
        public string EMAIL { get; set; }
        public string PASSWORD { get; set; }
    
        public virtual ICollection<Solicitud> Solicitud { get; set; }
        public virtual ICollection<Viaje> Viaje { get; set; }
    }
}
