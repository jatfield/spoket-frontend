import { useState, useCallback, useEffect } from "react"


export const useAuth = () => {

  const [user, setUser] = useState({});

  const login = useCallback((isLoggedIn, fbId, fbExpiry, spoketId) => {
    setUser({isLoggedIn, fbId, fbExpiry, spoketId});
    localStorage.setItem('userData', JSON.stringify({isLoggedIn, fbId, fbExpiry, spoketId}));
  }, []);

  const logout = () => {
    window.FB.logout();
    setUser({isLoggedIn: false, fbId: null, fbExpiry: null, spoketId: null});
    localStorage.removeItem('userData');
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.fbExpiry > new Date()) login(true, storedData.fbId, storedData.fbExpiry, storedData.spoketId)
  }, [login])

  return {user, login, logout}
}