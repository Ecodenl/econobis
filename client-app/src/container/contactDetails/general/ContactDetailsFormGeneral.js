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
        const { typeId } = this.props.contactDetails;

        if(typeId === 'account' && !this.props.permissions.updateAccount) return;
        if(typeId === 'person' && !this.props.permissions.updatePerson) return;

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
                    <div className="col-md-12">
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
                    </div>
                </PanelBody>
            </Panel>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        contactDetails: state.contactDetails,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormGeneral);