import React, { Component } from 'react';

import ProjectList from './ProjectList';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';
import ProjectNew from './ProjectNew';

class ProjectApp extends Component {
    constructor(props) {
        super(props);
        // todo WM: opschonen log regels
        console.log('ProjectApp');
        console.log(props);
        this.state = {
            showNew: false,
        };
    }

    toggleShowNew = () => {
        this.setState({
            showNew: !this.state.showNew,
        });
    };

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Projecten</span>
                    <a role="button" className="pull-right" onClick={this.toggleShowNew}>
                        <span className="glyphicon glyphicon-plus" />
                    </a>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        {this.state.showNew && (
                            <ProjectNew
                                financialOverview={this.props.financialOverview}
                                toggleShowNew={this.toggleShowNew}
                            />
                        )}
                    </div>
                    <div className="col-md-12">
                        <ProjectList financialOverview={this.props.financialOverview} />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

export default ProjectApp;
