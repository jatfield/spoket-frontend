import { useState, useCallback, useEffect } from "react"

export const useAuth = () => {

  const [user, setUser] = useState(false);

  const login = useCallback((isLoggedIn, fbId, fbExpiresIn, fbToken, spoketId) => {
    localStorage.setItem('userData', JSON.stringify({isLoggedIn, fbId, fbExpiresIn, fbToken, spoketId}));
    setUser({isLoggedIn, fbId, fbExpiresIn, fbToken, spoketId});
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('userData');
    setUser(false);
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.fbExpiresIn > 0) login(true, storedData.fbId, storedData.fbExpiresIn, storedData.fbToken, storedData.spoketId);
  }, [login])

  useEffect (() => {
    let logoutTimer;
    if (user && user.fbExpiry) {
      logoutTimer = setTimeout(logout, user.fbExpiresIn * 1000);            
    } else {
      clearTimeout(logoutTimer);
    }
  }, [logout, user]);

  return {user, login, logout}
}