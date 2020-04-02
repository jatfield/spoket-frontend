import { useState, useCallback, useEffect } from "react"

export const useAuth = () => {

  const [user, setUser] = useState(false);

  const login = useCallback((isLoggedIn, fbId, fbExpiresAt, fbToken, spoketId) => {
    localStorage.setItem('userData', JSON.stringify({isLoggedIn, fbId, fbExpiresAt, fbToken, spoketId}));
    setUser({isLoggedIn, fbId, fbExpiresAt, fbToken, spoketId});
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('userData');
    setUser(false);
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    
    if (storedData && new Date(storedData.fbExpiresAt) > new Date()) login(true, storedData.fbId, storedData.fbExpiresAt, storedData.fbToken, storedData.spoketId);
  }, [login])

  useEffect (() => {
    let logoutTimer;
    if (user && user.fbExpiresAt) {
      logoutTimer = setTimeout(logout, new Date(user.fbExpiresAt).getTime() - Date.now());            
    } else {
      clearTimeout(logoutTimer);
    }
  }, [logout, user]);

  return {user, login, logout}
}