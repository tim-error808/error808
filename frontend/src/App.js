import Layout from "./components/Layout";
import Public from "./components/Public";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Login from "./features/auth/Login";
import Listing from "./features/listings/Listing";
import ListingsPage from "./features/listings/ListingsPage";
import { AuthProvider } from "./hooks/AuthProvider";
import AuthCallback from "./features/auth/AuthCallback";
import RequireAuth from "./features/auth/RequireAuth";
import Profile from "./features/users/Profile";
import EditProfileForm from "./features/users/EditProfileForm";
import WishlistPage from "./features/wishlist/WishlistPage";
import PublicOnly from "./features/auth/PublicOnly";
import MyListings from "./features/listings/MyListings";
import MakeListingForm from "./features/listings/MakeListingForm";
import ReceivedOffers from "./features/trades/ReceivedOffers";

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
          <Route path="listings">
            <Route index element={<ListingsPage />} />
            <Route path=":id" element={<Listing />} />
            <Route element={<RequireAuth />}>
              <Route path="new" element={<MakeListingForm />} />
              <Route path="my" element={<MyListings />} />
            </Route>
          </Route>
          <Route path="offers">
            <Route index element={<ReceivedOffers />} />
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
