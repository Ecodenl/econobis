import React, {Component} from 'react';
import { connect } from 'react-redux';

import AddressAPI from '../../../api/AddressAPI';
import { updateAddress } from '../../../actions/ContactDetailsActions';
import ContactDetailsFormAddressView from './ContactDetailsFormAddressView';
import ContactDetailsFormAddressEdit from './ContactDetailsFormAddressEdit';
import ContactDetailsFormAddressDelete from './ContactDetailsFormAddressDelete';

class ContactDetailFormAddressItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,
            showDelete: false,
            typeIdError: false,
            postalCodeError: false,
            numberError: false,
            address: {
                ...props.address,
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
            address: {...this.props.address},
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
            address: {
                ...this.state.address,
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
                case 'postalCode':
                case 'number':
                    this.state.address[fieldName].length === 0 ?
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
            'postalCode',
        ]);

        const { address } = this.state;

        // Temp solution
        setTimeout(() => {
            !this.state.typeIdError && !this.state.postalCodeError && !this.state.numberError &&
                AddressAPI.updateAddress(address).then((payload) => {
                    this.props.updateAddress(payload);
                    this.closeEdit();
                });
        }, 100);
    };

    render() {
        return (
            <div>
                <ContactDetailsFormAddressView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    openEdit={this.openEdit}
                    toggleDelete={this.toggleDelete}
                    address={this.state.address}
                />
                {
                    this.state.showEdit &&
                    <ContactDetailsFormAddressEdit
                        address={this.state.address}
                        handleInputChange={this.handleInputChange}
                        handleSubmit={this.handleSubmit}
                        typeIdError={this.state.typeIdError}
                        postalCodeError={this.state.postalCodeError}
                        numberError={this.state.numberError}
                        cancelEdit={this.cancelEdit}
                    />
                }
                {
                    this.state.showDelete &&
                    <ContactDetailsFormAddressDelete
                        closeDeleteItemModal={this.toggleDelete}
                        {...this.props.address}
                    />
                }
            </div>
        );
    }
};

const mapDispatchToProps = dispatch => ({
    updateAddress: (id) => {
        dispatch(updateAddress(id));
    },
});

export default connect(null, mapDispatchToProps)(ContactDetailFormAddressItem);
