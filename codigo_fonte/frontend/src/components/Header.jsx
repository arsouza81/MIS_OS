import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo-ufam-icet.png";
import "./Header.css";

export default function Header({ showSearch = true, showRestricted = true }) {
  const [protocolo, setProtocolo] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!protocolo.trim()) return;
    navigate(`/solicitacao/${protocolo}`);
  };

  return (
    <header>
      <Link to="/">
        <img src={logo} alt="logo-ufam-icet" id="logo" />
      </Link>

      {showSearch && (
        <form onSubmit={handleSearch} id="search-form">
          <input
            type="text"
            name="protocolo"
            placeholder="Digite o protocolo"
            value={protocolo}
            onChange={(e) => setProtocolo(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      )}

      {showRestricted && (
        <nav>
          <ul>
            <li>
              <Link to="/login">Acesso Restrito</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
