namespace DotNetAuth.Models
{
    public class Login
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string? Token { get; set; }
    }
}
