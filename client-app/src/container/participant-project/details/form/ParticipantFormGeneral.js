import React, { Component } from 'react';
import { connect } from 'react-redux';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

import ParticipantFormEdit from './ParticipantFormEdit';
import ParticipantFormView from './ParticipantFormView';

class ParticipantFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            activeDiv: '',
        };
    }

    switchToEdit = () => {
        this.setState({
            showEdit: true,
        });
    };

    switchToView = () => {
        this.setState({
            showEdit: false,
            activeDiv: '',
        });
    };

    onDivEnter() {
        this.setState({
            activeDiv: 'panel-grey',
        });
    }

    onDivLeave() {
        if (!this.state.showEdit) {
            this.setState({
                activeDiv: '',
            });
        }
    }

    render() {
        const { permissions, participantProject } = this.props;

        const isEnergyCommunity = participantProject?.project?.typeCodeRef === 'energy_community';

        const canManageParticipant = isEnergyCommunity
            ? permissions.manageEnergyCommunity
            : permissions.manageParticipation;

        return (
            <Panel
                className={this.state.activeDiv}
                onMouseEnter={() => this.onDivEnter()}
                onMouseLeave={() => this.onDivLeave()}
            >
                <PanelBody>
                    {this.state.showEdit && canManageParticipant ? (
                        <ParticipantFormEdit switchToView={this.switchToView} />
                    ) : (
                        <ParticipantFormView switchToEdit={this.switchToEdit} />
                    )}
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        participantProject: state.participantProjectDetails,
    };
};

export default connect(mapStateToProps)(ParticipantFormGeneral);
