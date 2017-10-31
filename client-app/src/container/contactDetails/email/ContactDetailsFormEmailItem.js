import React, {Component} from 'react';
import { connect } from 'react-redux';

import EmailAddressAPI from '../../../api/EmailAddressAPI';
import * as contactDetailsActions from '../../../actions/ContactDetailsActions';
import ContactDetailsFormEmailView from './ContactDetailsFormEmailView';
import ContactDetailsFormEmailEdit from './ContactDetailsFormEmailEdit';
import ContactDetailsFormEmailDelete from './ContactDetailsFormEmailDelete';

class ContactDetailFormEmailItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,
            showDelete: false,
            errorEmail: false,
            errorType: false,
            emailAddress: {
                ...props.emailAddress,
            },
        };
    };

    onLineEnter = () => {
        this.setState({
            showActionButtons: true,
            highlightLine: 'highlight-line',
        });
    };

    onLineLeave = () => {
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
            emailAddress: {...this.props.emailAddress}
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
            emailAddress: {
                ...this.state.emailAddress,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { emailAddress } = this.state;

        EmailAddressAPI.updateEmailAddress(emailAddress).then((payload) => {
            if(payload.status === 422) {
                payload.data.errors.email ? this.setState({errorEmail: true}) : this.setState({errorEmail: false});
                payload.data.errors.type ? this.setState({errorType: true}) : this.setState({errorType: false});
            }else{
                this.props.dispatch(contactDetailsActions.updateEmailAddress(payload));
                this.toggleEdit();
            }
        });
    };

    render() {
        return (
            <div>
                <ContactDetailsFormEmailView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    toggleEdit={this.toggleEdit}
                    toggleDelete={this.toggleDelete}
                    emailAddress={this.state.emailAddress}
                />
                {
                    this.state.showEdit &&
                    <ContactDetailsFormEmailEdit
                        emailAddress={this.state.emailAddress}
                        handleInputChange={this.handleInputChange}
                        handleSubmit={this.handleSubmit}
                        errorType={this.state.errorType}
                        closeEdit={this.closeEdit}
                    />
                }
                {
                    this.state.showDelete &&
                    <ContactDetailsFormEmailDelete
                        closeDeleteItemModal={this.toggleDelete}
                        {...this.props.emailAddress}
                    />
                }
            </div>
        );
    }
};

export default connect()(ContactDetailFormEmailItem);