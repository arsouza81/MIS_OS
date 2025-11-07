import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// Ícones removidos
import logo from "../assets/logo-ufam-icet.png";
import { Api } from "../services/Api";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [location]);

  const publicNavigation = [
    { name: "Nova Ordem de Serviço", href: "/" },
    { name: "Consultar Solicitação", href: "/solicitacao" },
    { name: "Acesso Restrito", href: "/login" },
  ];

  const adminNavigation = [
    { name: "Solicitações", href: "/gerente" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      const data = await Api.logout();
      if (data.success) {
        localStorage.removeItem("token");
        navigate("/");
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error("Erro ao deslogar:", err);
    } finally {
      setMobileMenuOpen(false);
    }
  };

  const currentNavigation = isAuthenticated
    ? adminNavigation
    : publicNavigation;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#D9D9D9] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3"
            onClick={() => setMobileMenuOpen(false)}
          >
            <img src={logo} alt="Logo UFAM ICET" className="h-[80px] w-auto" />
          </Link>

          {/* Navegação desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            {currentNavigation.map((item) => {
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "text-[#176073] bg-[#F4F4F4]"
                      : "text-[#222222] hover:text-[#176073] hover:bg-[#F4F4F4]"
                  }`}
                >
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="text-[#222222] hover:text-[#176073] hover:bg-[#F4F4F4] px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              >
                <span>Sair</span>
              </button>
            )}
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#222222] hover:bg-[#F4F4F4] transition-colors"
          >
            {mobileMenuOpen ? "Fechar" : "Menu"}
          </button>
        </div>
      </div>

      {/* Navegação mobile */}
      <motion.div
        initial={false}
        animate={{ height: mobileMenuOpen ? "auto" : 0 }}
        className="md:hidden overflow-hidden bg-white border-t border-[#D9D9D9]"
      >
        <div className="px-4 py-4 space-y-2">
          {currentNavigation.map((item) => {
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-[#F4F4F4] text-[#176073] font-semibold"
                    : "text-[#222222] hover:text-[#176073] hover:bg-[#F4F4F4]"
                }`}
              >
                <span>{item.name}</span>
              </Link>
            );
          })}

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="block px-3 py-3 rounded-lg text-[#222222] hover:text-[#176073] hover:bg-[#F4F4F4] transition-all duration-200 w-full text-left"
            >

              <span>Sair</span>
            </button>
          )}
        </div>
      </motion.div>
    </header>
  );
}