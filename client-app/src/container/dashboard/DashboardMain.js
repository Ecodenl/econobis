import React, { Component } from 'react';

import DashboardChartMembers from "./DashboardChartMembers";
import DashboardChartLeads from "./DashboardChartLeads";
import DashboardNotifications from "./DashboardNotifications";

class DashboardMain extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <DashboardChartMembers />
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <DashboardChartLeads />
                        </div>

                    </div>

                </div>
                <div className="col-md-3">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <DashboardNotifications/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardMain;