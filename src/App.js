import React from "react";
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/layout/auth/Login";
import Register from "./components/layout/auth/Register";
import Developers from "./components/layout/developers/Developers";
import SingleDeveloper from "./components/layout/single-developer/SingleDeveloper";
import Dashboard from "./components/layout/dashbaord/Dashboard";
import Profile from "./components/layout/profile/Profile";
import AddExperience from "./components/layout/add-experince/AddExperience";
import AddEducation from "./components/layout/add-education/AddEducation";
import AddProfile from "./components/layout/add-profile/AddProfile";
import AddPost from "./components/layout/add-post/AddPost";
import SinglePost from "./components/layout/single-post/SinglePost";
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
                        <Route exact path={'/developers'} component={Developers}/>
                        <Route path={'/developer/:id'} component={SingleDeveloper}/>
                        <Route path={'/dashboard'} component={Dashboard}/>
                        <Route path={'/profile'} component={Profile}/>
                        <Route path={'/add-experince'} component={AddExperience}/>
                        <Route path={'/add-education'} component={AddEducation}/>
                        <Route path={'/add-profile'} component={AddProfile}/>
                        <Route path={'/add-post'} component={AddPost}/>
                        <Route path={'/post/:id'} component={SinglePost}/>
                    </Switch>
                </section>
            </>
        </Router>
      </Provider>
  );
}

export default App;