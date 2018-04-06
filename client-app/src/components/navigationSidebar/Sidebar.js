import React from 'react';

import SidebarMenu from './SidebarMenu';
import SidebarMenuSmall from './SidebarMenuSmall';

const Sidebar = ({menuActive, menuStuck, onMenuEnter, onMenuLeave}) => {
    let sidebarClass = 'sidebar';

    if(menuActive){
        sidebarClass = 'sidebar open';
    }
    if(menuStuck){
        sidebarClass = 'sidebar open sticky';
    }
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
