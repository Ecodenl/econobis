import React from 'react';

import SidebarMenu from './SidebarMenu';
import SidebarMenuSmall from './SidebarMenuSmall';

const Sidebar = ({menuActive, menuStuck, onMenuEnter, onMenuLeave}) => {
    const sidebarClass = (menuActive || menuStuck ? 'sidebar open' : 'sidebar');

    return (
        <nav className={ sidebarClass } onMouseEnter={onMenuEnter} onMouseLeave={onMenuLeave} >
            { menuActive || menuStuck ?
                <SidebarMenu  />
                :
                <SidebarMenuSmall />
            }
        </nav>
    )
};

export default Sidebar;
