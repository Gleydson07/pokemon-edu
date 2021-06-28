import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './components/hooks/useAuth';
import { PokemonProvider } from './components/hooks/usePokemon';
import Dashboard from './Dashboard';
import { Home } from './Home';

import './styles/global.scss'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PokemonProvider>
            <Switch>
              <Route path="/" exact component={Home}/> 
              <Route path="/dashboard" component={Dashboard}/> 
            </Switch>
        </PokemonProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
