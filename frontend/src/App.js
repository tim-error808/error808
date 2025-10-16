import Layout from "./components/Layout";
import Public from "./components/Public";
import UsersList from "./features/users/UsersList";
import "./index.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        {/* Public routes */}
        <Route index element={<Public />} />
        {}
        {/* test za fetch */}
        <Route path="users" element={<UsersList />} />
      </Route>
    </Routes>
  );
}

export default App;
