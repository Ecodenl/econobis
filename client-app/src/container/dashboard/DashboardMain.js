import React, { Component } from 'react';

import DashboardChartOpportunities from "./DashboardChartOpportunities";
import Panel from "../../components/panel/Panel";
import PanelBody from "../../components/panel/PanelBody";

class DashboardMain extends Component {
    render() {
        return (
                <Panel className="col-md-6">
                    <PanelBody>
                        <DashboardChartOpportunities />
                    </PanelBody>
                </Panel>
        )
    }
}

export default DashboardMain;