import React, {Component} from 'react';

import Panel from "../../../../components/panel/Panel";
import PanelBody from "../../../../components/panel/PanelBody";
import DashboardChartContacts from "./../../diagrams/DashboardChartContacts";

class DashboardDefaultMain extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <Panel>
                        <PanelBody>
                            <DashboardChartContacts/>
                        </PanelBody>
                    </Panel>
                </div>
            </div>
        )
    }
}

export default DashboardDefaultMain;