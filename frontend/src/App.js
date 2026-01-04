import Layout from "./components/Layout";
import Public from "./components/Public";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Login from "./features/auth/Login";
import BoardGame from "./features/board-games/BoardGame";
import { BoardGamesPage } from "./features/board-games/BoardGamesPage";
import { AuthProvider } from "./hooks/AuthProvider";
import AuthCallback from "./features/auth/AuthCallback";
import RequireAuth from "./features/auth/RequireAuth";
import CreateOffer from "./features/board-games/CreateOffer";
import Profile from "./features/users/Profile";
import EditProfileForm from "./features/users/EditProfileForm";
import WishlistPage from "./features/wishlist/WishlistPage";
import PublicOnly from "./features/auth/PublicOnly";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<Layout />}>
          {/*public routes*/}
          <Route index element={<Public />} />
          <Route path="auth">
            <Route element={<PublicOnly />}>
              <Route index element={<Login />} />
            </Route>
            <Route path="callback" element={<AuthCallback />} />
          </Route>
          <Route path="board-games">
            <Route index element={<BoardGamesPage />} />
            <Route path=":id" element={<BoardGame />} />
            <Route element={<RequireAuth />}>
              <Route path="new" element={<CreateOffer />} />
            </Route>
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="profile">
              <Route index element={<Profile />} />
              <Route path="edit" element={<EditProfileForm />} />
            </Route>
            <Route path="wishlist">
              <Route index element={<WishlistPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
