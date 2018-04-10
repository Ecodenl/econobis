import React, { Component} from 'react';
import {connect} from 'react-redux';

import TeamDetailsFormGeneralEdit from './TeamDetailsFormGeneralEdit';
import TeamDetailsFormGeneralView from './TeamDetailsFormGeneralView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

class TeamDetailsFormGeneral extends Component {
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
        })
    };

    switchToView = () => {
        this.setState({
            showEdit: false,
            activeDiv: '',
        })
    };

    onDivEnter() {
        this.setState({
            activeDiv: 'panel-grey',
        });
    };

    onDivLeave() {
        if(!this.state.showEdit) {
            this.setState({
                activeDiv: '',
            });
        }
    };

    render() {
        const { permissions = {} } = this.props.meDetails;

        return (
            <div className={this.state.activeDiv} onMouseEnter={() => this.onDivEnter()} onMouseLeave={() => this.onDivLeave()}>
                {
                    this.state.showEdit && permissions.createTeam ?
                        <TeamDetailsFormGeneralEdit switchToView={this.switchToView} />
                        :
                        <TeamDetailsFormGeneralView switchToEdit={this.switchToEdit}/>
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        teamDetails: state.teamDetails,
        meDetails: state.meDetails,
        permissions: state.meDetails.permissions
    };
};

export default connect(mapStateToProps)(TeamDetailsFormGeneral);