using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DummyApi.Models
{
    public class DataResponse<T>
    {
        public T Data { get; }

        public DataResponse(T data)
        {
            this.Data = data;
        }
    }
}