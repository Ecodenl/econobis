import React, { Component } from 'react';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import { connect } from 'react-redux';
import TeamDetailsContactGroupsList from './TeamDetailsContactGroupsList';
import TeamDetailsContactGroupsNew from './TeamDetailsContactGroupsNew';

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';

class TeamDetailsContactGroups extends Component {
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

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Gekoppelde groepen</span>
                    {this.props.permissions.createTeam && (
                        <a role="button" className="pull-right" onClick={this.toggleShowNew}>
                            <Icon size={14} icon={plus} />
                        </a>
                    )}
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <TeamDetailsContactGroupsList />
                    </div>
                    <div className="col-md-12 margin-10-top">
                        {this.state.showNew && <TeamDetailsContactGroupsNew toggleShowNew={this.toggleShowNew} />}
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(TeamDetailsContactGroups);
