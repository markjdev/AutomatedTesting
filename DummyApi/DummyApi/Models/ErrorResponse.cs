using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DummyApi.Models
{
    public class ErrorResponse<T>
    {
        public IEnumerable<T> Errors { get; }

        public ErrorResponse(IEnumerable<T> errors)
        {
            this.Errors = errors;
        }
    }
}