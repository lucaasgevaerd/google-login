import { createContext, useState } from 'react';
import './App.css';
import AppRouter from './AppRouter';
import { profile } from './types/profile';

export const ProfileContext = createContext({
  state: {
    email: '',
    familyName: '',
    givenName: '',
    googleId: '',
    imageUrl: '',
    name: '',
  }, setState: (state: profile) => { }
})

function App() {

  const [state, setState] = useState<profile>({
    email: '',
    familyName: '',
    givenName: '',
    googleId: '',
    imageUrl: '',
    name: '',
  })

  return (
    <ProfileContext.Provider value={{ state, setState }}>
      <div className="app-container">
        <AppRouter />
      </div>
    </ProfileContext.Provider>
  );
}

export default App;
