import React, { Component } from 'react';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import ProductionProjectsAPI from '../../../../api/production-project/ProductionProjectsAPI';
import DashboardChartParticipantsPerProject from '../../diagrams/DashboardChartParticipantsPerProject';
import DashboardChartContactsPerProject from '../../diagrams/DashboardChartContactsPerProject';
import DashboardChartParticipationsPerProject from '../../diagrams/DashboardChartParticipationsPerProject';

class DashboardParticipationsMain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeProductionProjectsIds: [],
        };
    }

    componentWillMount() {
        ProductionProjectsAPI.getActive().then(payload => {
            this.setState({
                activeProductionProjectsIds: payload,
            });
        });
    }

    render() {
        const { activeProductionProjectsIds } = this.state;

        return (
            <div className="row">
                {activeProductionProjectsIds.map(activeProductionProjectsId => {
                    return (
                        <div>
                            <div className="col-md-4">
                                <Panel>
                                    <PanelBody>
                                        <DashboardChartParticipantsPerProject id={activeProductionProjectsId} />
                                    </PanelBody>
                                </Panel>
                            </div>
                            <div className="col-md-4">
                                <Panel>
                                    <PanelBody>
                                        <DashboardChartParticipationsPerProject id={activeProductionProjectsId} />
                                    </PanelBody>
                                </Panel>
                            </div>
                            <div className="col-md-4">
                                <Panel>
                                    <PanelBody>
                                        <DashboardChartContactsPerProject id={activeProductionProjectsId} />
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
