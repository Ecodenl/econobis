import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import { addContactToGroup } from '../../../../actions/contact/ContactGroupsActions';
import { fetchContactDetails } from '../../../../actions/contact/ContactDetailsActions';
import GroupAPI from '../../../../api/contact-group/ContactGroupAPI';
import Modal from '../../../../components/modal/Modal';
import ViewText from '../../../../components/form/ViewText';
import InputSelect from '../../../../components/form/InputSelect';

class AddContactToGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contactGroups: [],
            contactId: props.contactDetails.id,
            groupId: '',
            errors: {
                groupId: false,
            },
        };
    }

    componentDidMount() {
        GroupAPI.peekStaticContactGroups().then(payload => {
            this.setState({ contactGroups: payload });
        });
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const contact = {
            contactId: this.state.contactId,
            groupId: this.state.groupId,
        };

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(contact.groupId)) {
            errors.groupId = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        if (!hasErrors) {
            this.props.addContactToGroup(contact);
            this.props.toggleGroup();
            this.props.fetchContactDetails(contact.contactId);
            this.props.toggleAddGroup();
        }
    };

    render() {
        return (
            <Modal
                buttonConfirmText="Toevoegen"
                closeModal={this.props.toggleAddGroup}
                confirmAction={this.handleSubmit}
                title="Contact toevoegen aan groep"
            >
                <div className="row">
                    <ViewText className={'col-md-12'} label={'Contact'} value={this.props.contactDetails.fullName} />

                    <InputSelect
                        size={'col-md-12'}
                        label={'Groep'}
                        name="groupId"
                        options={this.state.contactGroups}
                        value={this.state.groupId}
                        onChangeAction={this.handleInputChange}
                        required={'required'}
                        error={this.state.errors.groupId}
                    />
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        contactDetails: state.contactDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    addContactToGroup: contact => {
        dispatch(addContactToGroup(contact));
    },
    fetchContactDetails: id => {
        dispatch(fetchContactDetails(id));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddContactToGroup);
