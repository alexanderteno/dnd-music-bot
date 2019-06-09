import React, { useState } from 'react';
import Icon from '../General/Icon';
import { Link } from 'react-router-dom';
import './Navigation.scss';

const NAV_OPTOINS = [
    ['/', 'Dashboard'],
    ['/songs', 'Songs'],
    ['/playlists', 'Playlists'],
]

const Navigation = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="navigation">
            <div className="title-bar" onClick={() => setCollapsed(!collapsed)}>
                <Icon>{collapsed ? 'close' : 'menu'}</Icon>
                <div className="title">{document.title}</div>
            </div>
            {
                collapsed && (
                    <div className="nav-options">
                        {
                            NAV_OPTOINS.map(([path, label]: [string, string]) => (
                                <Link key={path} to={path} className={"nav-option" + (window.location.pathname === path ? ' active' : '')}>{label}</Link>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Navigation;