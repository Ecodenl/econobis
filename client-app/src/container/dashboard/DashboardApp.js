import React, { Component } from 'react';

import DashboardButtons from "./DashboardButtons";
import DashboardMain from "./DashboardMain";

class DashboardApp extends Component {
    render() {
        return (
            <div>
                <DashboardButtons />
                <DashboardMain/>
            </div>
        )
    }
}

export default DashboardApp;