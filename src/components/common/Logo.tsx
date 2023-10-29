import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo/logo_white.png'

const Logo = () => {
    return (
        <div className='logoArea'>
            <Link to="/">
                <img src={logo} alt="" />
            </Link>
        </div>
    );
};

export default Logo;