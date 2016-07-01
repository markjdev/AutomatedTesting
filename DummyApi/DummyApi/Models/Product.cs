using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace DummyApi.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public String Name { get; set; }
    }
}