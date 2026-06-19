import React, { Component } from 'react';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import ProjectsAPI from '../../../../api/project/ProjectsAPI';
import DashboardChartParticipantsPerProject from '../../diagrams/DashboardChartParticipantsPerProject';
import DashboardChartContactsPerProject from '../../diagrams/DashboardChartContactsPerProject';
import DashboardChartParticipationsPerProject from '../../diagrams/DashboardChartParticipationsPerProject';

class DashboardParticipationsMain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeProjectsIds: [],
        };
    }

    UNSAFE_componentWillMount() {
        ProjectsAPI.getActive().then(payload => {
            this.setState({
                activeProjectsIds: payload,
            });
        });
    }

    render() {
        const { activeProjectsIds } = this.state;

        return (
            <div className="row">
                {activeProjectsIds.map(activeProjectsId => {
                    return (
                        <div>
                            <div className="col-md-4">
                                <Panel>
                                    <PanelBody>
                                        <DashboardChartParticipantsPerProject id={activeProjectsId} />
                                    </PanelBody>
                                </Panel>
                            </div>
                            <div className="col-md-4">
                                <Panel>
                                    <PanelBody>
                                        <DashboardChartParticipationsPerProject id={activeProjectsId} />
                                    </PanelBody>
                                </Panel>
                            </div>
                            <div className="col-md-4">
                                <Panel>
                                    <PanelBody>
                                        <DashboardChartContactsPerProject id={activeProjectsId} />
                                    </PanelBody>
                                </Panel>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default DashboardParticipationsMain;
