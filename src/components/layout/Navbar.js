import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import { checkIsAuthenticated, logoutUser } from "../../actions/authAction";

const Navbar = (props) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuth);

    useEffect(() => {
        dispatch(checkIsAuthenticated());
    },[]);

    const logoutUserHandler = () => {
        dispatch(logoutUser());
    }

    return(
        <nav className="navbar bg-dark">
            <h1>
                <Link to={isAuthenticated ? '/dashboard' : '/'}><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            <ul>
                <li><Link to="/developers">Developers</Link></li>
                {!isAuthenticated && <li><Link to="/register">Register</Link></li>}
                {!isAuthenticated && <li><Link to="/login">Login</Link></li>}
                {isAuthenticated && <li><Link to="/profile">Profile</Link></li>}
                {isAuthenticated && <li onClick={logoutUserHandler}><Link to="/">Logout</Link></li>}
            </ul>
        </nav>
    )
}

export default Navbar;