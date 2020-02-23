import { useState, useCallback, useEffect } from "react"

export const useAuth = () => {

  const [user, setUser] = useState(false);

  const login = useCallback((isLoggedIn, fbId, fbExpiry, fbToken, spoketId) => {
    setUser({isLoggedIn, fbId, fbExpiry, fbToken, spoketId});
    localStorage.setItem('userData', JSON.stringify({isLoggedIn, fbId, fbExpiry, fbToken, spoketId}));
  }, []);

  const logout = () => {
    setUser(false);
    localStorage.removeItem('userData');
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && new Date(storedData.fbExpiry) > new Date()) login(true, storedData.fbId, storedData.fbExpiry, storedData.fbToken, storedData.spoketId)
  }, [login])

  return {user, login, logout}
}