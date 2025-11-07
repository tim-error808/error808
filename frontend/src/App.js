import Layout from "./components/Layout";
import Public from "./components/Public";
import UsersList from "./features/users/UsersList";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Login from "./features/auth/Login";
import BoardGame from "./features/board-games/BoardGame";
import { BoardGamesPage } from "./features/board-games/BoardGamesPage";
import { AuthProvider } from "./features/auth/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<Layout />}>
          {/* Public routes */}
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />
          <Route path="board-games">
            <Route index element={<BoardGamesPage />} />
            <Route path=":id" element={<BoardGame />} />
          </Route>
          {/*protected routes start*/}

          {/* test za fetch */}
          <Route path="users" element={<UsersList />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
