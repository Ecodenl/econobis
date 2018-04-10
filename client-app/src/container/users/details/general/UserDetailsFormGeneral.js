import React, { Component} from 'react';
import {connect} from 'react-redux';

import UserDetailsFormGeneralEdit from './UserDetailsFormGeneralEdit';
import UserDetailsFormGeneralView from './UserDetailsFormGeneralView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

class UserDetailsFormGeneral extends Component {
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
            <Panel className={this.state.activeDiv} onMouseEnter={() => this.onDivEnter()} onMouseLeave={() => this.onDivLeave()}>
                <PanelBody>
                    {
                        this.state.showEdit && permissions.manageUser ?
                            <UserDetailsFormGeneralEdit switchToView={this.switchToView} />
                            :
                            <UserDetailsFormGeneralView switchToEdit={this.switchToEdit}/>
                    }
                </PanelBody>
            </Panel>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        contactDetails: state.contactDetails,
        meDetails: state.meDetails,
    };
};

export default connect(mapStateToProps)(UserDetailsFormGeneral);