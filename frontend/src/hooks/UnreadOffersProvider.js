import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import api from "../api/api";

const UnreadOffersContext = createContext();

export const UnreadOffersProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [unreadOffers, setUnreadOffers] = useState(0);
  const intervalRef = useRef(null);

  const fetchUnreadOffers = () => {
    api
      .get("/trades/unread")
      .then((response) => {
        setUnreadOffers(response.data.count);
      })
      .catch((error) => {
        return;
      });
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setUnreadOffers(0);
      clearInterval(intervalRef.current);
      return;
    }

    fetchUnreadOffers();

    intervalRef.current = setInterval(fetchUnreadOffers, 10000);

    return () => clearInterval(intervalRef.current);
  }, [isAuthenticated]);

  return (
    <UnreadOffersContext.Provider
      value={{
        unreadOffers,
        setUnreadOffers,
      }}
    >
      {children}
    </UnreadOffersContext.Provider>
  );
};

export const useUnreadOffers = () => useContext(UnreadOffersContext);
