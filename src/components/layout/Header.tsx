import React, { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAppSelector } from '../../store/store';
import Logo from '../common/Logo';
import heart from '../../assets/images/icon/heart_border_white.svg';
import messenger from '../../assets/images/icon/paper_plane_white.svg';
import search from '../../assets/images/icon/search.svg';
import menu from '../../assets/images/icon/menu.svg';

const Header = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const { title, pageName } = useAppSelector((state) => state.header);

    const searchPath = ['/exploration','/news','/myPage'];
    const navPath = [
        '/auth/terms',
        '/auth/join',
        '/auth/find_id',
        '/auth/find_password',
    ];

    useEffect(() => {}, [pathname]);

    return (
        <header>
            {
               pathname === '/home' && 
               <div className='headerWrap' style={{backgroundColor: "#89a8ff", boxShadow: "2px 2px 6px rgba(137,168,255, .7)"}}>
                    <div className="logoWrap">
                        <Logo />
                    </div>
                    <div className="rightButtonWrap">
                        <Link to='/news' className='rightButton'><img src={heart} alt="" /></Link>
                        <Link to='/messenger' className='rightButton'><img src={messenger} alt="" /></Link>
                    </div>
               </div>
            }
            {
                searchPath.includes(pathname) &&
                <div className='headerWrap' style={{backgroundColor: pathname === "/myPage" ? "transparent" : "#ffffff"}}>
                    <h3>{title}</h3>
                    <div className="rightButtonWrap">
                        <Link to='/search' className='rightButton'><img src={search} alt="" /></Link>
                        <Link to='/' className='rightButton'><img src={menu} alt="" /></Link>
                    </div>
               </div>
            }
        </header>
    );
};

export default Header;