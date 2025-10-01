import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import DetalhesSolicitacao from "./pages/DetalhesSolicitacao";
import Solicitacoes from "./pages/Solicitacoes";
import IndexGerente from "./pages/IndexGerente";
import Solicitacao from "./pages/Solicitacao";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Páginas públicas */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/solicitacao/:protocolo" element={<Solicitacao />} />

        {/* Páginas protegidas */}
        <Route
          path="/gerente"
          element={
            <PrivateRoute>
              <IndexGerente />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/selecionar_data"
          element={
            <PrivateRoute>
              <Solicitacoes />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/detalhes_solicitacao/:id"
          element={
            <PrivateRoute>
              <DetalhesSolicitacao />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
