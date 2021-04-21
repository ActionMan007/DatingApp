using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key; //Only one used to encrypt and decrypt electronic information...Asymetric- to keys( public and private)
        public TokenService(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Tokenkey"]));//create a key as a string and then encode it into a byte array encoding into a byte array (TokenKey is a property)
        }

        public string CreateToken(AppUser user)
        {
            var claims = new List<Claim>//identifying claims we putting into token  ----ADDING CLAIMS
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName)  
            };
            //----------------CREATING Credentials
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature); //take security key and algorithms
            
            //----------------DESCRIBING HOW OUR TOKEN WILL LOOK
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject  = new ClaimsIdentity(claims), //claims identity
                Expires = DateTime.Now.AddDays(7),  //how long is this token going to be valid for 
                SigningCredentials = creds      //need to pass in signing credentials
            };

            //---------NEED TOKEN HANDLER
            var tokenHandler = new JwtSecurityTokenHandler(); 
            
            //--------TOKEN CREATION
            var token = tokenHandler.CreateToken(tokenDescriptor);


            //--------RETURN WRITTEN TOKEN
            return tokenHandler.WriteToken(token); // 
        }
    }
}