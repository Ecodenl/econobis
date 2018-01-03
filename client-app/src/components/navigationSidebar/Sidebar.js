import React from 'react';

import SidebarMenu from './SidebarMenu';
import SidebarMenuSmall from './SidebarMenuSmall';

const Sidebar = ({menuActive, onMenuEnter, onMenuLeave}) => {
    const sidebarClass = (menuActive ? 'sidebar open' : 'sidebar');

    return (
        <nav className={ sidebarClass } onMouseEnter={onMenuEnter} onMouseLeave={onMenuLeave} >
            { menuActive ?
                <SidebarMenu  />
                :
                <SidebarMenuSmall />
            }
        </nav>
    )
};

export default Sidebar;
