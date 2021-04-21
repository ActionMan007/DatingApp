using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;   //The view will come from our client--Angular 
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  

    public class UsersController : BaseApiController
    {
        //dependancy injection
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;
        }

        //adding 2 endpoints
        //1-to get all users 
        //2-to get specific user
        
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AppUser>>>GetUSers() //returning a list
        {
            return await _context.Users.ToListAsync();  //tolist method is not an async method
        }
        
        
        // api/users/3   this will get the user with id 3
        [Authorize]
        [HttpGet("{id}")] //specifying a route parameter
        public async Task <ActionResult<AppUser>>GetUSer(int id) //returning a specific users
        {
            return await _context.Users.FindAsync(id);

        }
    }
}