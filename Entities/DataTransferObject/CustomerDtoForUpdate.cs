﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DataTransferObject
{
    public class CustomerDtoForUpdate
    {
        public int Id { get; set; }
        public string Ad { get; set; }
        public string Soyad { get; set; }
        public int Phone { get; set; }
        public string sifre { get; set; }    


        public string Email { get; set; }



    }
}
