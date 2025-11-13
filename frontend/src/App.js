import Layout from "./components/Layout";
import Public from "./components/Public";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Login from "./features/auth/Login";
import BoardGame from "./features/board-games/BoardGame";
import { BoardGamesPage } from "./features/board-games/BoardGamesPage";
import { AuthProvider } from "./features/auth/AuthProvider";
import AuthCallback from "./features/auth/AuthCallback";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<Layout />}>
          {/*public routes*/}
          <Route index element={<Public />} />
          <Route path="auth">
            <Route index element={<Login />} />
            <Route path="callback" element={<AuthCallback />} />
          </Route>
          <Route path="board-games">
            <Route index element={<BoardGamesPage />} />
            <Route path=":id" element={<BoardGame />} />
          </Route>
          {/*protected routes TODO*/}
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
