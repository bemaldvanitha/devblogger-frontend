import React from "react";
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/layout/auth/Login";
import Register from "./components/layout/auth/Register";
import store from "./store";

import './App.css';

const App = () => {
  return (
      <Provider store={store}>
        <Router>
            <>
                <Navbar/>
                <Route exact path={'/'} component={Landing}/>
                <section className={'container'}>
                    <Switch>
                        <Route exact path={'/register'} component={Register}/>
                        <Route exact path={'/login'} component={Login}/>
                    </Switch>
                </section>
            </>
        </Router>
      </Provider>
  );
}

export default App;