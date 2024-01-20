using DotNetAuth.Helpers;
using DotNetAuth.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DotNetAuth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly UserContext _userContext;
        public UserController(IConfiguration config, UserContext userContext)
        {
            _config = config;
            _userContext = userContext;
        }
        [HttpPost("CreateUser")]
        public async Task<IActionResult> Create(User user)
        {
            //Console.WriteLine(user);
            var existingUser = await _userContext.Users.FirstOrDefaultAsync(u => u.Email == user.Email);

            if (existingUser != null)
            {
                return Conflict("UserExists");
            }
            user.pswd = PasswordHasher.HashPassword(user.pswd);

            _userContext.Users.Add(user);
            await _userContext.SaveChangesAsync();

            return Ok("UserCreated");
        }


        [HttpPost("LoginUser")]
        public async Task<IActionResult> Login(Login user)
        {
            //Console.WriteLine(user);
            //var existingUser = await _userContext.Users.FirstOrDefaultAsync(u => u.Email == user.Email  && u.pswd == user.Password);
            var userD = await _userContext.Users
               .FirstOrDefaultAsync(x => x.Email == user.Email);

            if (user == null)
                return NotFound(new
                {
                    Token = user.Token,
                    Message = "NotFound!"
                });

            if (!PasswordHasher.VerifyPassword(user.Password, userD.pswd))
            {
                return Ok(new
                {
                    //Token = user.Token,
                    Message = "IncorrectPassword!"
                });

            }
            user.Token = CreateJwt(userD);


            return Ok(new
            {
                Token=user.Token,
                Message="LoginSuccess!"
            });
        }
        private string CreateJwt(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysceret.....");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name,$"{user.FirstName}")
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddSeconds(10),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }
    }

    
}
