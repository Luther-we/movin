import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router, withRouter } from 'react-router-dom';
import { ThemeProvider } from './utils/theme/ThemeProvider'
import history from './utils/history/history';
import { CreateRoutes } from './utils/routes/routesUtils';
import routes from './utils/routes/mainRoutes'
import { TransitionGroup, CSSTransition } from "react-transition-group";

const AnimatedSwitch = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition key={location.key} classNames="slide" timeout={1000}>
    <CreateRoutes routes={routes}/>
    </CSSTransition>
  </TransitionGroup>
));


function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <Router
          history={history}
        >
          {/* <AnimatedSwitch /> */}
          <CreateRoutes routes={routes}/>
        </Router>
        </ThemeProvider>
    </div>
  );
}

export default App;
