import React, { Component} from 'react';
import {connect} from 'react-redux';

import ContactDetailsFormAccountEdit from './ContactDetailsFormAccountEdit';
import ContactDetailsFormAccountView from './ContactDetailsFormAccountView';
import ContactDetailsFormPersonalEdit from './ContactDetailsFormPersonalEdit';
import ContactDetailsFormPersonalView from './ContactDetailsFormPersonalView';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

class ContactDetailsFormGeneral extends Component {
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
        return (
            <Panel className={this.state.activeDiv} onMouseEnter={() => this.onDivEnter()} onMouseLeave={() => this.onDivLeave()}>
                <PanelBody>
                    {
                        this.state.showEdit ?
                            this.props.contactDetails.typeId === 'account' ?
                                <ContactDetailsFormAccountEdit switchToView={this.switchToView} />
                                :
                                <ContactDetailsFormPersonalEdit switchToView={this.switchToView} />
                            :
                            this.props.contactDetails.typeId === 'account' ?
                                <ContactDetailsFormAccountView switchToEdit={this.switchToEdit}/>
                                :
                                <ContactDetailsFormPersonalView switchToEdit={this.switchToEdit}/>
                    }
                </PanelBody>
            </Panel>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        contactDetails: state.contactDetails,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormGeneral);