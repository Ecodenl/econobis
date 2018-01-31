import React, { Component} from 'react';
import {connect} from 'react-redux';

import MailboxDetailsFormGeneralEdit from './MailboxDetailsFormGeneralEdit';
import MailboxDetailsFormGeneralView from './MailboxDetailsFormGeneralView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

class MailboxDetailsFormGeneral extends Component {
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
        this.setState({
            activeDiv: '',
        });
    };

    render() {
        const { permissions = {} } = this.props.meDetails;

        return (
            <div className={this.state.activeDiv} onMouseEnter={() => this.onDivEnter()} onMouseLeave={() => this.onDivLeave()}>
                {
                    this.state.showEdit && this.props.permissions.createMailbox ?
                        <MailboxDetailsFormGeneralEdit switchToView={this.switchToView} />
                        :
                        <MailboxDetailsFormGeneralView switchToEdit={this.switchToEdit}/>
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        mailboxDetails: state.mailboxDetails,
        meDetails: state.meDetails,
        permissions: state.meDetails.permissions
    };
};

export default connect(mapStateToProps)(MailboxDetailsFormGeneral);