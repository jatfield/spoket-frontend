import { useState, useCallback, useEffect } from "react"

export const useAuth = () => {

  const [user, setUser] = useState(false);

  const login = useCallback((isLoggedIn, fbId, fbExpiresAt, fbToken, spokeToken, spoketId, email) => {
    localStorage.setItem('userData', JSON.stringify({isLoggedIn, fbId, fbExpiresAt, fbToken, spokeToken, spoketId, email}));
    setUser({isLoggedIn, fbId, fbExpiresAt, fbToken, spokeToken, spoketId, email});
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('userData');
    setUser(false);
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    (storedData && new Date(storedData.fbExpiresAt) > new Date()) ? login(true, storedData.fbId, storedData.fbExpiresAt, storedData.fbToken, storedData.spokeToken, storedData.spoketId, storedData.email) : logout();
  }, [login, logout])

  useEffect (() => {
    let logoutTimer;
    if (user && user.fbExpiresAt && new Date(user.fbExpiresAt) > new Date()) {
      logoutTimer = setTimeout(logout, new Date(user.fbExpiresAt).getTime() - Date.now());            
    } else {
      clearTimeout(logoutTimer);
    }
  }, [logout, user]);

  return {user, login, logout}
}