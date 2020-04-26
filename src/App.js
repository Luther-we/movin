import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from 'react-router-dom';
import { ThemeProvider } from './utils/theme/ThemeProvider'
import history from './utils/history/history';
import { CreateRoutes } from './utils/routes/routesUtils';
import routes from './utils/routes/mainRoutes'

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <Router
          history={history}
        >
          <CreateRoutes routes={routes}/>
        </Router>
        </ThemeProvider>
    </div>
  );
}

export default App;
