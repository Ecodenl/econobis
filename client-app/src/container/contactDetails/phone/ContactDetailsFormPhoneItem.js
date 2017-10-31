import React, {Component} from 'react';
import { connect } from 'react-redux';

import PhoneNumberApi from '../../../api/PhoneNumberAPI';
import * as contactDetailsActions from '../../../actions/ContactDetailsActions';
import ContactDetailsFormPhoneView from './ContactDetailsFormPhoneView';
import ContactDetailsFormPhoneEdit from './ContactDetailsFormPhoneEdit';
import ContactDetailsFormPhoneDelete from './ContactDetailsFormPhoneDelete';

class ContactDetailFormPhoneItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,
            showDelete: false,
            errorNumber: false,
            errorType: false,
            phoneNumber: {
                ...props.phoneNumber,
            },
        };
    };

    onLineEnter = () => {
        this.setState({
            showActionButtons: true,
            highlightLine: 'highlight-line',
        });
    };

    onLineLeave= () => {
        this.setState({
            showActionButtons: false,
            highlightLine: '',
        });
    };

    toggleEdit = () => {
        this.setState({showEdit: !this.state.showEdit});
    };

    closeEdit = () => {
        this.setState({
            ...this.state,
            phoneNumber: {...this.props.phoneNumber}
        });

        this.toggleEdit();
    };

    toggleDelete = () => {
        this.setState({showDelete: !this.state.showDelete});
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            phoneNumber: {
                ...this.state.phoneNumber,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { phoneNumber } = this.state;

        PhoneNumberApi.updatePhoneNumber(phoneNumber).then((payload) => {
            if(payload.status === 422) {
                payload.data.errors.number ? this.setState({errorNumber: true}) : this.setState({errorNumber: false});
                payload.data.errors.type ? this.setState({errorType: true}) : this.setState({errorType: false});
            }else{
                this.props.dispatch(contactDetailsActions.updatePhoneNumber(payload));
                this.toggleEdit();
            }
        });
    };

    render() {
        return (
            <div>
                <ContactDetailsFormPhoneView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    toggleEdit={this.toggleEdit}
                    toggleDelete={this.toggleDelete}
                    phoneNumber={this.state.phoneNumber}
                />
                {
                    this.state.showEdit &&
                    <ContactDetailsFormPhoneEdit
                        phoneNumber={this.state.phoneNumber}
                        handleInputChange={this.handleInputChange}
                        handleSubmit={this.handleSubmit}
                        errorType={this.state.errorType}
                        closeEdit={this.closeEdit}
                    />
                }
                {
                    this.state.showDelete &&
                    <ContactDetailsFormPhoneDelete
                        closeDeleteItemModal={this.toggleDelete}
                        {...this.props.phoneNumber}
                    />
                }
            </div>
        );
    }
};

export default connect()(ContactDetailFormPhoneItem);