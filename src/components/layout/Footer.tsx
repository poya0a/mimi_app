import React, { useEffect }from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import home from '../../assets/images/icon/home.svg';
import homeActive from '../../assets/images/icon/home_active.svg';
import exploration from '../../assets/images/icon/exploration.svg';
import explorationActive from '../../assets/images/icon/exploration_active.svg';
import edit from '../../assets/images/icon/edit.svg';
import editActive from '../../assets/images/icon/edit_active.svg';
import box from '../../assets/images/icon/box_full.svg';
import boxActive from '../../assets/images/icon/box_full_active.svg';
import user from '../../assets/images/icon/user.svg';
import userActive from '../../assets/images/icon/user_active.svg';

const Footer = () => {

    const { pathname } = useLocation();

    const navPath = ['/home', '/exploration', '/news', '/myPage'];
    const buttonPath = [
        '/auth/terms',
        '/auth/join',
        '/auth/find_id',
        '/auth/find_password',
    ];

    const navData = [
        {
            path: "/home",
            default: home,
            active: homeActive
        },
        {
            path: "/exploration",
            default: exploration,
            active: explorationActive
        },
        {
            path: "",
            default: edit,
            active: editActive
        },
        {
            path: "/news",
            default: box,
            active: boxActive
        },
        {
            path: "/myPage",
            default: user,
            active: userActive
        },
    ]

    useEffect(() => {}, [pathname]);

    return (
        <footer>
            {
                navPath.includes(pathname) && (
                    <nav style={{boxShadow: "2px 2px 6px rgba(137,168,255, .7)"}}>
                        <div className="navList">
                            {navData.map((item, index) => (
                                <NavLink to={item.path} key={index} className="navItem">
                                    {({ isActive }) => (
                                        <img src={isActive ? item.active : item.default}></img>
                                    )}
                                </NavLink>
                            ))}
                        </div>
                    </nav>
                )
            }
            {
                buttonPath.includes(pathname) && 
                <div className="footerButtonWrap">
                    <button>
                        
                    </button>
                </div>
            }
        </footer>
    );
};

export default Footer;