import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import _ from 'lodash';

import {
    fetchContactGroupDetails,
    attachComposedGroup,
} from '../../../../actions/contact-group/ContactGroupDetailsActions';
import GroupAPI from '../../../../api/contact-group/ContactGroupAPI';
import Modal from '../../../../components/modal/Modal';
import InputSelect from '../../../../components/form/InputSelect';

class ContactGroupComposedGroupAddGroup extends Component {
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
        GroupAPI.peekActiveContactGroups().then(payload => {
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
            this.props.attachComposedGroup(this.props.contactGroupId, this.state.contactGroupToAttachId);
            this.props.fetchContactGroupDetails(this.props.contactGroupId);
            this.props.toggleAddGroup();
        }
    };

    render() {
        let contactGroupOptions = this.state.contactGroups;

        this.props.composedGroups.map(composedGroup => {
            _.remove(contactGroupOptions, contactGroupOption => {
                return contactGroupOption.id === composedGroup.id;
            });
        });

        return (
            <Modal
                buttonConfirmText="Toevoegen"
                closeModal={this.props.toggleAddGroup}
                confirmAction={this.handleSubmit}
                title="Groep koppelen"
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
        composedGroups: state.contactGroupDetails.composedGroups,
    };
};

const mapDispatchToProps = dispatch => ({
    attachComposedGroup: (contactGroupId, contactGroupToAttachId) => {
        dispatch(attachComposedGroup(contactGroupId, contactGroupToAttachId));
    },
    fetchContactGroupDetails: id => {
        dispatch(fetchContactGroupDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactGroupComposedGroupAddGroup);
