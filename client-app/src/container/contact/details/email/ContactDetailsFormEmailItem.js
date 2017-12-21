import React, {Component} from 'react';
import { connect } from 'react-redux';

import EmailAddressAPI from '../../../../api/contact/EmailAddressAPI';
import { updateEmailAddress } from '../../../../actions/contact/ContactDetailsActions';
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
            typeIdError: false,
            emailError: false,
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

    openEdit = () => {
        this.setState({showEdit: true});
    };

    closeEdit = () => {
        this.setState({showEdit: false});
    };

    cancelEdit = () => {
        this.setState({
            ...this.state,
            emailAddress: {...this.props.emailAddress}
        });

        this.closeEdit();
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

    processError(fieldName, value) {
        this.setState({
            [fieldName]: value,
        })
    };

    validateForm(fieldNames) {
        fieldNames.map((fieldName) => {
            switch(fieldName) {
                case 'typeId':
                case 'email':
                    this.state.emailAddress[fieldName].length === 0 ?
                        this.processError(fieldName + 'Error', true)
                        :
                        this.processError(fieldName + 'Error', false)
                    break;
                default:
                    break;
            }
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        this.validateForm([
            'typeId',
            'email',
        ]);

        const { emailAddress } = this.state;

        // Temp solution
        setTimeout(() => {
            !this.state.typeIdError && !this.state.emailError &&
                EmailAddressAPI.updateEmailAddress(emailAddress).then((payload) => {
                    this.props.updateEmailAddress(payload);
                    this.closeEdit();
                });
        }, 100);
    };

    render() {
        return (
            <div>
                <ContactDetailsFormEmailView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    openEdit={this.openEdit}
                    toggleDelete={this.toggleDelete}
                    emailAddress={this.state.emailAddress}
                />
                {
                    this.state.showEdit &&
                    <ContactDetailsFormEmailEdit
                        emailAddress={this.state.emailAddress}
                        handleInputChange={this.handleInputChange}
                        handleSubmit={this.handleSubmit}
                        typeIdError={this.state.typeIdError}
                        emailError={this.state.emailError}
                        cancelEdit={this.cancelEdit}
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

const mapDispatchToProps = dispatch => ({
    updateEmailAddress: (id) => {
        dispatch(updateEmailAddress(id));
    },
});

export default connect(null, mapDispatchToProps)(ContactDetailFormEmailItem);