import React from 'react';
import { connect } from 'react-redux';

import SidebarMenu from './SidebarMenu';

const Sidebar = (props) => {
    const sidebarClass = (props.toggleSidebar ? 'sidebar open' : 'sidebar');

    return (
        <div className={ sidebarClass }>
            <SidebarMenu/>
        </div>
    )
};

function mapStateToProps(state) {
    return { toggleSidebar: state.toggleSidebar };
}

export default connect(mapStateToProps)(Sidebar);
