import React, {Component} from 'react';
import { connect } from 'react-redux';

import PhoneNumberApi from '../../../api/PhoneNumberAPI';
import { updatePhoneNumber } from '../../../actions/ContactDetailsActions';
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
            typeIdError: false,
            numberError: false,
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

    processError(fieldName, value) {
        this.setState({
            [fieldName]: value,
        })
    };

    validateForm(fieldNames) {
        fieldNames.map((fieldName) => {
            switch(fieldName) {
                case 'typeId':
                case 'number':
                    this.state.phoneNumber[fieldName].length === 0 ?
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
            'number',
        ]);

        const { phoneNumber } = this.state;
        // Temp solution
        setTimeout(() => {
            !this.state.typeIdError && !this.state.numberError &&
                PhoneNumberApi.updatePhoneNumber(phoneNumber).then((payload) => {
                    this.props.updatePhoneNumber(payload);
                    this.toggleEdit();
                });
        }, 100);
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
                        typeIdError={this.state.typeIdError}
                        numberError={this.state.numberError}
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

const mapDispatchToProps = dispatch => ({
    updatePhoneNumber: (id) => {
        dispatch(updatePhoneNumber(id));
    },
});

export default connect(null, mapDispatchToProps)(ContactDetailFormPhoneItem);