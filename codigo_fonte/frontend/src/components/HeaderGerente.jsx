import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-ufam-icet.png";
import "./Header.css";

export default function HeaderGerente() {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault(); 
    
    try {
      const res = await fetch("http://localhost:5053/user/logout", {
        method: "POST",     
        credentials: "include", 
      });

      const data = await res.json();
      if (data.success) {
        localStorage.removeItem("token");
        navigate("/");                   
      }
    } catch (err) {
      console.error("Erro ao deslogar:", err);
    }
  };

  return (
    <header>
      <a onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        <img src={logo} alt="logo-ufam-icet" id="logo" />
      </a>
      <nav>
        <ul>
          <li>
            <a onClick={handleLogout} style={{ cursor: "pointer" }}>
              Sair
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
