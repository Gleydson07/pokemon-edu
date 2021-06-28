import React from 'react';
import { AuthProvider } from './components/hooks/useAuth';
import { Home } from './Home';

import './styles/global.scss'

function App() {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  )
}

export default App;
