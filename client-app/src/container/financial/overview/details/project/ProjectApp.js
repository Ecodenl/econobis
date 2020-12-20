import React, { Component } from 'react';

import ProjectList from './ProjectList';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';
import ProjectNew from './ProjectNew';
import FinancialOverviewDetailsForm from '../FinancialOverviewDetailsForm';

class ProjectApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNew: false,
        };
    }

    toggleShowNew = () => {
        this.setState({
            showNew: !this.state.showNew,
        });
    };
    setShowNewFalse = () => {
        this.setState({
            showNew: false,
        });
    };

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Projecten</span>
                    {this.props.financialOverview && !this.props.financialOverview.definitive && (
                        <a role="button" className="pull-right" onClick={this.toggleShowNew}>
                            <span className="glyphicon glyphicon-plus" />
                        </a>
                    )}
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        {this.state.showNew && (
                            <ProjectNew
                                financialOverview={this.props.financialOverview}
                                toggleShowNew={this.toggleShowNew}
                                callFetchFinancialOverviewDetails={this.props.callFetchFinancialOverviewDetails}
                            />
                        )}
                    </div>
                    <div className="col-md-12">
                        <ProjectList
                            financialOverview={this.props.financialOverview}
                            callFetchFinancialOverviewDetails={this.props.callFetchFinancialOverviewDetails}
                            setShowNewFalse={this.setShowNewFalse}
                        />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

export default ProjectApp;
