import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import _ from 'lodash';

import {
    fetchContactGroupDetails,
    attachComposedExceptGroup,
} from '../../../../../actions/contact-group/ContactGroupDetailsActions';
import GroupAPI from '../../../../../api/contact-group/ContactGroupAPI';
import Modal from '../../../../../components/modal/Modal';
import InputSelect from '../../../../../components/form/InputSelect';

class ContactGroupComposedExceptGroupAddGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contactGroups: [],
            contactGroupToAttachId: '',
            errors: {
                contactGroupToAttachId: false,
            },
        };
    }

    componentDidMount() {
        GroupAPI.peekContactGroups().then(payload => {
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

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(this.state.contactGroupToAttachId)) {
            errors.contactGroupToAttachId = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        if (!hasErrors) {
            this.props.attachComposedExceptGroup(this.props.contactGroupId, this.state.contactGroupToAttachId);
            this.props.fetchContactGroupDetails(this.props.contactGroupId);
            this.props.toggleExceptGroup();
        }
    };

    render() {
        let contactGroupOptions = this.state.contactGroups;

        this.props.composedExceptGroups.map(composedExceptGroup => {
            _.remove(contactGroupOptions, contactGroupOption => {
                return contactGroupOption.id === composedExceptGroup.id;
            });
        });

        return (
            <Modal
                buttonConfirmText="Uitzonderen"
                closeModal={this.props.toggleExceptGroup}
                confirmAction={this.handleSubmit}
                title="Groep uitzonderen"
            >
                <div className="row">
                    <InputSelect
                        size={'col-md-12'}
                        label={'Groep'}
                        name="contactGroupToAttachId"
                        options={contactGroupOptions}
                        value={this.state.contactGroupToAttachId}
                        onChangeAction={this.handleInputChange}
                        required={'required'}
                        error={this.state.errors.contactGroupToAttachId}
                    />
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        composedExceptGroups: state.contactGroupDetails.composedExceptGroups,
    };
};

const mapDispatchToProps = dispatch => ({
    attachComposedExceptGroup: (contactGroupId, contactGroupToAttachId) => {
        dispatch(attachComposedExceptGroup(contactGroupId, contactGroupToAttachId));
    },
    fetchContactGroupDetails: id => {
        dispatch(fetchContactGroupDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactGroupComposedExceptGroupAddGroup);
