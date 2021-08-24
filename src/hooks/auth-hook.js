import { useState, useCallback, useEffect } from "react"

export const useAuth = () => {

  const [user, setUser] = useState(false);

  const login = useCallback((isLoggedIn, spokeToken, spoketId, email) => {
    localStorage.setItem('userData', JSON.stringify({isLoggedIn, spokeToken, spoketId, email}));
    setUser({isLoggedIn, spokeToken, spoketId, email});
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('userData');
    setUser(false);
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.email) login(true, storedData.spokeToken, storedData.spoketId, storedData.email);
  }, [login])
  
/* 
  useEffect (() => {
    let logoutTimer;
    if (user && user.fbExpiresAt && new Date(user.fbExpiresAt) > new Date()) {
      logoutTimer = setTimeout(logout, new Date(user.fbExpiresAt).getTime() - Date.now());            
    } else {
      clearTimeout(logoutTimer);
    }
  }, [logout, user]); */

  return {user, login, logout}
}