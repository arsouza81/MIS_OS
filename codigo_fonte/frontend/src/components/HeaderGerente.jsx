import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-ufam-icet.png";
import "./Header.css";
import { Api } from "../services/Api";

export default function HeaderGerente() {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const data = await Api.logout();
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
