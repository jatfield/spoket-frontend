import { useState, useCallback, useEffect } from "react"

export const useAuth = () => {

  const [user, setUser] = useState(false);

  const login = useCallback((isLoggedIn, fbId, fbExpiry, fbToken, spoketId) => {
    localStorage.setItem('userData', JSON.stringify({isLoggedIn, fbId, fbExpiry, fbToken, spoketId}));
    setUser({isLoggedIn, fbId, fbExpiry, fbToken, spoketId});
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('userData');
    setUser(false);
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && new Date(storedData.fbExpiry) > new Date()) login(true, storedData.fbId, storedData.fbExpiry, storedData.fbToken, storedData.spoketId);
  }, [login])

  useEffect (() => {
    let logoutTimer;
    if (user && user.fbExpiry) {
      logoutTimer = setTimeout(logout, new Date(user.fbExpiry) - new Date());            
    } else {
      clearTimeout(logoutTimer);
    }
  }, [logout, user]);

  return {user, login, logout}
}