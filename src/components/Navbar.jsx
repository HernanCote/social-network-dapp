import React from 'react';
import Identicon from 'identicon.js';


const createIdenticonSrc = (account) => {
    return `data:image/png;base64,${new Identicon(account, 30).toString()}`;
}

const Navbar = ({
    className,
    account
}) => (
        <nav className={`${className} navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow`}>
            <a
                className="navbar-brand col-sm-3 col-md-2 mr-0"
                href="http://www.dappuniversity.com/bootcamp"
                target="_blank"
                rel="noopener noreferrer"
            >
                Dapp University
            </a>
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

export {
    createIdenticonSrc,
};