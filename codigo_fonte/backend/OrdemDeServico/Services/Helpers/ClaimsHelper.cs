using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using OrdemDeServico.Models;

namespace OrdemDeServico.Services.Helpers;
public static class ClaimsHelper {
    public static ClaimsPrincipal CreateClaimsPrincipal(User user) {
        var claims = new List<Claim> {
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.Name)
        };

        var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        return new ClaimsPrincipal(identity);
    }
}