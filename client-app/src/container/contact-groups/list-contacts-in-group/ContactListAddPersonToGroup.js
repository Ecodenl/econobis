import React, { Component, useState } from 'react';
import { connect } from 'react-redux';

import contactAPI from '../../../api/contact/ContactsAPI';
import Modal from '../../../components/modal/Modal';
import InputReactSelect from '../../../components/form/InputReactSelect';
import AsyncSelectSet from "../../../components/form/AsyncSelectSet";

class ContactListAddPersonToGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            people: [],
            personId: '',
            peekLoading: {
                people: true,
            },
        };
        //this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
    }

    componentDidMount() {
        contactAPI.getPerson(this.props.inspectionPersonTypeId).then(payload => {
            this.setState({
                ...this.state,
                people: payload,
                peekLoading: {
                    ...this.state.peekLoading,
                    people: false,
                },
            });
        });
    }

    // handleReactSelectChange(selectedOption) {
    //     this.setState({
    //         ...this.state,
    //         personId: selectedOption,
    //     });
    // }

    handleInputSearchChange(value) {
        //setSearchTermContact(value);
    }

    render() {
        return (
            <Modal
                buttonConfirmText="Toevoegen"
                closeModal={this.props.closeModalAddToGroup}
                confirmAction={() => this.props.addPersonToGroup(this.state.personId)}
                title={`Contact toevoegen aan groep: ${this.props.groupName}`}
            >
                {this.props.sendEmailNewContactLink ? (
                    <div className="alert alert-danger" role="alert">
                        Na toevoegen zal er automatisch een email verzonden worden naar dit contact.
                    </div>
                ) : null}
                {this.props.inspectionPersonTypeId == 'coach' ? (
                    <div className="alert alert-danger" role="alert">
                        Na toevoegen wordt dit contact automatisch "Is coach".
                    </div>
                ) : null}
                {this.props.inspectionPersonTypeId == 'projectmanager' ? (
                    <div className="alert alert-danger" role="alert">
                        Na toevoegen wordt dit contact automatisch "Is projectleider".
                    </div>
                ) : null}
                {this.props.inspectionPersonTypeId == 'externalparty' ? (
                    <div className="alert alert-danger" role="alert">
                        Na toevoegen wordt dit contact automatisch "Is externe partij".
                    </div>
                ) : null}

                    <form onSubmit={this.handleSubmit}>

                            <AsyncSelectSet
                                label={'Voeg bestaand contact toe'}
                                name={'personId'}
                                value={''}
                                loadOptions={getContactOptions}
                                optionName={'name'}
                                onChangeAction={this.handleInputSearchChange}
                                allowCreate={true}
                                isLoading={isLoadingContact}
                                handleInputChange={this.handleInputSearchChange}
                            />

                    </form>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        id: state.contactDetails.id,
    };
};

const isLoadingContact = state => {
    return false;
};

const setLoadingContact = state => {
    return false;
};

const searchTermContact = state => {
    return false;
};

const setSearchTermContact = state => {
    return '';
};

const getContactOptions = async () => {
    if (searchTermContact.length <= 1) return;

    setLoadingContact(true);

    try {
        const results = await contactAPI.fetchEmailAddressessSearch(searchTermContact);
        setLoadingContact(false);
        return results.data;
    } catch (error) {
        setLoadingContact(false);

        // console.log(error);
    }
};

const mapDispatchToProps = dispatch => ({
    fetchContactDetails: id => {
        dispatch(fetchContactDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactListAddPersonToGroup);
