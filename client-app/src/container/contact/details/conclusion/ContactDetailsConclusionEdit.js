import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import validator from 'validator';

import InputText from '../../../../components/form/InputText';
import InputSelect from '../../../../components/form/InputSelect';
import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from '../../../../components/panel/PanelFooter';

import ContactDetailsAPI from '../../../../api/contact/ContactDetailsAPI';

import { fetchContactDetails } from '../../../../actions/contact/ContactDetailsActions';
import InputDate from '../../../../components/form/InputDate';

class ContactDetailsConclusionEdit extends Component {
    constructor(props) {
        super(props);
        const { id, createdBy = {}, updatedBy = {}, createdAt = {}, updatedAt = {}, owner = {} } = props.contact;

        this.state = {
            contact: {
                id,
                updatedBy: updatedBy ? updatedBy.fullName : '',
                createdBy: createdBy ? createdBy.fullName : '',
                ownedById: owner ? owner.id : '',
                createdAt: createdAt ? createdAt : '',
                updatedAt: updatedAt ? updatedAt : '',
            },
            errors: {
                ownedBy: false,
            },
        };
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            contact: {
                ...this.state.contact,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { contact } = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty('' + contact.ownedById)) {
            errors.ownedBy = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
            ContactDetailsAPI.updateContactOwner(contact.id, contact.ownedById).then(payload => {
                this.props.fetchContactDetails(contact.id);
                this.props.switchToView();
            });
    };

    render() {
        const { createdBy, updatedBy, ownedById, createdAt, updatedAt } = this.state.contact;

        return (
            <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputSelect
                        label={'Eigenaar'}
                        size={'col-sm-6'}
                        name={'ownedById'}
                        options={this.props.users}
                        value={ownedById}
                        optionName={'fullName'}
                        onChangeAction={this.handleInputChange}
                        error={this.state.errors.ownedBy}
                    />
                </div>
                <div className="row">
                    <InputText label={'Gemaakt door'} name={'createdBy'} value={createdBy} readOnly={true} />
                    <InputText label={'Laatste update door'} name={'updatedBy'} value={updatedBy} readOnly={true} />
                </div>
                <div className="row">
                    <InputDate
                        label={'Gemaakt op'}
                        size={'col-sm-6'}
                        name={'createdAt'}
                        value={createdAt ? moment(createdAt.date).format('LL') : 'Onbekend'}
                        readOnly={true}
                    />
                    <InputDate
                        label={'Laatste update op'}
                        size={'col-sm-6'}
                        name={'updatedAt'}
                        value={updatedAt ? moment(updatedAt.date).format('LL') : 'Onbekend'}
                        readOnly={true}
                    />
                </div>
                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText
                            buttonClassName={'btn-default'}
                            buttonText={'Annuleren'}
                            onClickAction={this.props.switchToView}
                        />
                        <ButtonText
                            buttonText={'Opslaan'}
                            onClickAction={this.handleSubmit}
                            type={'submit'}
                            value={'Submit'}
                        />
                    </div>
                </PanelFooter>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchContactDetails: id => {
        dispatch(fetchContactDetails(id));
    },
});

const mapStateToProps = state => {
    return {
        contact: state.contactDetails,
        users: state.systemData.users,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactDetailsConclusionEdit);
