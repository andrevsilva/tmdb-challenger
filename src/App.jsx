import React from 'react';
import { Switch , Route } from 'react-router-dom';

import { Home } from './components/home.jsx'
import { MovieDetails } from './components/MovieDetails.jsx'


export function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/movie/:id" component={MovieDetails} />
      </Switch>
    </main>
  );
}

export default App;
