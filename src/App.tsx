import { createContext, useEffect, useState } from 'react';
import './App.css';
import AppRouter from './AppRouter';
import { Authentication } from './types/authentication';
import { Profile } from './types/profile';

export const ProfileContext = createContext({
  state: {
    email: '',
    familyName: '',
    givenName: '',
    googleId: '',
    imageUrl: '',
    name: '',
  }, setState: (state: Profile) => { },
})

export const AuthenticationContext = createContext({
  isAuthenticated: {
    value: false
  }, setIsAuthenticated: (isAuthenticated: Authentication) => { }
})

function App() {

  const [state, setState] = useState<Profile>({
    email: '',
    familyName: '',
    givenName: '',
    googleId: '',
    imageUrl: '',
    name: '',
  })

  const [isAuthenticated, setIsAuthenticated] = useState<Authentication>(
    {
      value: JSON.parse(localStorage.getItem('isAuthenticated')!)?.value || false
    }
  );

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated)!)
  })

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('isAuthenticated')!);
    setIsAuthenticated({ value: data.value })
  }, []);

  return (
    <AuthenticationContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <ProfileContext.Provider value={{ state, setState }}>
        <div className="app-container">
          <AppRouter />
        </div>
      </ProfileContext.Provider>
    </AuthenticationContext.Provider>
  );
}

export default App;
