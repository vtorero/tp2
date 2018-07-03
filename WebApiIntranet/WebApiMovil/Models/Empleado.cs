using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace WebApiMovil.Models
{
    [DataContract]
    public class Empleado:Paginacion
    {
        [DataMember]
        public int idEmpleado{ get; set; }

        [DataMember]
        public string Apellidos { get; set; }

        [DataMember]
        public string Nombres { get; set; }


    }
}