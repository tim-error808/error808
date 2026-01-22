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
import PublicOnly from "./features/auth/PublicOnly";
import MyListings from "./features/listings/MyListings";
import MakeListingForm from "./features/listings/MakeListingForm";
import ReceivedOffers from "./features/trades/ReceivedOffers";
import EditListingForm from "./features/listings/EditListingForm";
import MyOffers from "./features/trades/MyOffers";
import ScrollToTop from "./components/ScrollToTop";
import AdminPanel from "./features/users/AdminPanel";
import History from "./features/trades/History";
import { UnreadOffersProvider } from "./hooks/UnreadOffersProvider";

function App() {
  return (
    <AuthProvider>
      <UnreadOffersProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/*" element={<Layout />}>
            <Route index element={<Public />} />
            <Route path="auth">
              <Route element={<PublicOnly />}>
                <Route index element={<Login />} />
              </Route>
              <Route path="callback" element={<AuthCallback />} />
            </Route>
            <Route path="listings">
              <Route index element={<ListingsPage />} />
              <Route path="details/:listingId" element={<Listing />} />
              <Route element={<RequireAuth />}>
                <Route path="new" element={<MakeListingForm />} />
                <Route path="my" element={<MyListings />} />
                <Route path="edit/:id" element={<EditListingForm />} />
              </Route>
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="offers">
                <Route index element={<ReceivedOffers />} />
                <Route path="my" element={<MyOffers />} />
              </Route>
              <Route path="profile">
                <Route index element={<Profile />} />
                <Route path="edit" element={<EditProfileForm />} />
                <Route path="history" element={<History />} />
              </Route>
              <Route path="admin">
                <Route index element={<AdminPanel />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </UnreadOffersProvider>
    </AuthProvider>
  );
}

export default App;
