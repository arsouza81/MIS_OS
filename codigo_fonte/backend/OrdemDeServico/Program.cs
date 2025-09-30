using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using OrdemDeServico.Data;
using System.IO;
using Microsoft.AspNetCore.Authentication.Cookies;
using OrdemDeServico.Services;


var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("OrdemServicoConnection");

builder.Services.AddDbContext<OrdemContext>(opts =>
    opts.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Adicionar servi�os ao cont�iner
builder.Services.AddControllersWithViews();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// Configurar autentica��o com cookies
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options => {
        options.LoginPath = "/User/Login";
        options.LogoutPath = "/User/Logout";
        options.ExpireTimeSpan = TimeSpan.FromMinutes(30); // Tempo de expira��o do cookie
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});

// Adicionar autoriza��o
builder.Services.AddAuthorization();

//email// Adiciona o servi�o de e-mail
builder.Services.AddSingleton<IEmailSender, EmailSender>();

var app = builder.Build();

// Configurar o pipeline de requisi��es HTTP
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles(); // Servir arquivos est�ticos, como CSS, JS, etc.

app.UseCors("AllowReact");

// Adicionar autentica��o e autoriza��o ao pipeline
app.UseAuthentication();
app.UseAuthorization();

app.UseRouting();

// Configurar o roteamento de controladores
app.MapControllers();

// Configurar a rota padr�o do controlador
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Pagina}/{action=Index}/{id?}");

app.Run();