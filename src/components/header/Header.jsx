import React from 'react';
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from '../../services/AuthServices';
import './Header.scss';

const Header = () => {
    const [user] = useAuthState(auth);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Holiday Photos</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        {!user ? (
                            <>
                            <li className="nav-item">
                            <Link to="/reset" className="nav-link">Reset</Link>
                            </li>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">Prisijungti</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link">Registruotis</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/profile" className="nav-link">Profilis</Link>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link btn" onClick={logout}>Atsijungti</button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;

