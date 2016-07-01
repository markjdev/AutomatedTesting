using DummyApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Caching;
using System.Web;
using System.Web.Http.ModelBinding;
using Newtonsoft.Json;

namespace DummyApi.Controllers
{
    public class ProductsController : ApiController
    {

        private List<Product> products = null;

        public ProductsController()
        {
            if(products == null)
            {
                var cachedList = HttpContext.Current.Cache.Get("products");

                if (cachedList == null)
                {
                    ResetData();

                } else
                {
                    products = cachedList as List<Product>;
                }
            }
        }

        // GET: api/Products
        public IHttpActionResult GetProducts()
        {
            return Ok(new DataResponse<List<Product>>(products));
        }

        // GET: api/Products/5
        public IHttpActionResult Get(int id)
        {
            var product = products.Find(p => p.ProductId == id);

            if (product == null)
                return NotFound();
            else
                return Ok(new DataResponse<Product>(product));
        }

        // POST: api/Products
        public IHttpActionResult Post([FromBody]Product product)
        {
            if(!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors);

                return Content(HttpStatusCode.BadRequest, new ErrorResponse<ModelError>(errors));
            }

            var id = products.Count+1;
            product.ProductId = id;
            products.Add(product);
            CacheProducts();

            return Ok();
        }

        // PUT: api/Products/5
        public IHttpActionResult Put(int id, [FromBody]Product product)
        {
            var oldProduct = products.Find(p => p.ProductId == id);

            if (oldProduct == null)
                return NotFound();


            product.ProductId = id;
            products.Remove(oldProduct);
            products.Add(product);
            CacheProducts();;

            return Ok();
        }

        // DELETE: api/Products/5
        public IHttpActionResult Delete(int id)
        {
            var oldProduct = products.Find(p => p.ProductId == id);

            if (oldProduct == null)
                return NotFound();

            
            products.Remove(oldProduct);
            CacheProducts();

            return Ok();
        }

        private void CacheProducts()
        {
            HttpContext.Current.Cache["products"] = products;
        }

        [HttpGet]
        [Route("api/products/reset")]
        public IHttpActionResult ResetData()
        {
            products = new List<Product>();
            products.Add(new Product { ProductId = 1, Name = "Widget" });
            products.Add(new Product { ProductId = 2, Name = "Sprocket" });
            CacheProducts();

            return Ok();
        }
    }
}
