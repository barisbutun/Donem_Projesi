using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DataTransferObject
{
    public abstract record CustomerDtoForManipulation
    {
        [Required(ErrorMessage ="Name is required field")]
        [MinLength(2,ErrorMessage ="Name must consist of at least 2 characters")]
        [MaxLength(50,ErrorMessage ="Name must consist of at maximum 50 characters")]

        public string Name { get; init; }
        [Required(ErrorMessage = "Surname is required field")]
        [MinLength(2, ErrorMessage = "Surname must consist of at least 2 characters")]
        [MaxLength(50, ErrorMessage = "Surname must consist of at maximum 50 characters")]

        public String Surname { get; init; }

        [Required(ErrorMessage = "Phone number is a required field")]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Phone number must be exactly 10 digits and only contain numbers")]
        public string Phone { get; init; }

        [Required(ErrorMessage = "Password is required field")]
        [MinLength(2, ErrorMessage = "Password must consist of at least 2 characters")]
        [MaxLength(50, ErrorMessage = "Password must consist of at maximum 50 characters")]
        public string Password { get; init; }

        [Required(ErrorMessage = "Email is required field")]
        [MinLength(1, ErrorMessage = "Email must consist of at least 2 characters")]
        [MaxLength(50, ErrorMessage = "Surname must consist of at maximum 50 characters")]

        public string Email { get; init; }


    }
}
