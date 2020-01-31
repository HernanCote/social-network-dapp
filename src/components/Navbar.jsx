import React from 'react';
import { createIdenticonSrc } from '../utils';

const Navbar = ({
    className,
    account
}) => (
        <nav className={`${className} navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow`}>
            <div
                className="navbar-brand col-sm-3 col-md-2 mr-0"
                target="_blank"
                rel="noopener noreferrer"
            >
                DApp Social Network
            </div>
            <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                    <small className="text-secondary">
                        <small id="account">{account}</small>
                    </small>
                    {account && (
                        <img
                            alt="user"
                            className="ml-2"
                            width="30"
                            height="30"
                            src={createIdenticonSrc(account)}
                        />
                    )}
                </li>
            </ul>
        </nav>
    );

export default Navbar;