import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import GroupAPI from '../../../api/contact-group/ContactGroupAPI';
import Modal from '../../../components/modal/Modal';
import InputSelect from '../../../components/form/InputSelect';

// Functionele wrapper voor de class component
const ContactListAddContactsToGroupWrapper = props => {
    const navigate = useNavigate();
    return <ContactListAddContactsToGroup {...props} navigate={navigate} />;
};

class ContactListAddContactsToGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactGroups: [],
            groupId: '',
            contactCount: 0,
            contactIds: '',
            errors: {
                groupId: false,
            },
        };
    }

    componentDidMount() {
        GroupAPI.peekStaticContactGroups().then(payload => {
            this.setState({ contactGroups: payload });
        });
        let count = 0;

        this.props.contacts.map(contact => contact.checked === true && count++);
        this.setState({ contactCount: count });
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
        const contactIds = [];

        this.props.contacts.map(contact => contact.checked === true && contactIds.push(contact.id));
        GroupAPI.addManyContactsToGroup(contactIds, this.state.groupId).then(payload => {
            this.props.toggleAddGroup();
            this.props.navigate(`/contacten-in-groep/${this.state.groupId}`);
        });
    };

    render() {
        return (
            <Modal
                buttonConfirmText="Toevoegen"
                closeModal={this.props.toggleAddGroup}
                confirmAction={this.handleSubmit}
                title="Contacten toevoegen aan groep"
            >
                {this.state.contactCount !== 0 ? (
                    <div className="row">
                        <InputSelect
                            size={'col-md-12'}
                            label={`Voeg ${this.state.contactCount} contact(en) toe aan groep:`}
                            name="groupId"
                            options={this.state.contactGroups}
                            value={this.state.groupId}
                            onChangeAction={this.handleInputChange}
                            required={'required'}
                            error={this.state.errors.groupId}
                        />
                    </div>
                ) : (
                    <div>Geen contacten geselecteerd.</div>
                )}
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        contactDetails: state.contactDetails,
        contacts: state.contacts.list.data,
    };
};

export default connect(mapStateToProps, null)(ContactListAddContactsToGroupWrapper);
