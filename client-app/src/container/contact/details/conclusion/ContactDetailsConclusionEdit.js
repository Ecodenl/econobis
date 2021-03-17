import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import InputSelect from '../../../../components/form/InputSelect';
import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from '../../../../components/panel/PanelFooter';

import ContactDetailsAPI from '../../../../api/contact/ContactDetailsAPI';

import { fetchContactDetails } from '../../../../actions/contact/ContactDetailsActions';

import ViewText from '../../../../components/form/ViewText';
import moment from 'moment';
moment.locale('nl');

class ContactDetailsConclusionEdit extends Component {
    constructor(props) {
        super(props);
        const {
            id,
            owner = {},
            status = {},
            createdBy = {},
            updatedBy = {},
            createdAt = {},
            updatedAt = {},
            createdWith = {},
            updatedWith = {},
        } = props.contact;

        this.state = {
            contact: {
                id,
                status: status ? status : '',
                updatedBy: updatedBy ? updatedBy.fullName : '',
                createdBy: createdBy ? createdBy.fullName : '',
                ownedById: owner ? owner.id : '',
                createdAt: createdAt ? createdAt : '',
                updatedAt: updatedAt ? updatedAt : '',
                createdWith: createdWith ? createdWith : '',
                updatedWith: updatedWith ? updatedWith : '',
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
        const {
            status,
            createdBy,
            updatedBy,
            ownedById,
            createdAt,
            updatedAt,
            createdWith,
            updatedWith,
        } = this.state.contact;

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
                    <ViewText
                        label={'Gemaakt door'}
                        className={'form-group col-md-6'}
                        value={
                            createdWith == 'portal'
                                ? 'Portaal'
                                : createdWith == 'webform'
                                ? 'Webformulier'
                                : createdBy
                                ? createdBy
                                : 'Onbekend'
                        }
                    />
                    <ViewText
                        label={'Laatste update door'}
                        className={'form-group col-md-6'}
                        value={
                            updatedWith == 'portal'
                                ? 'Portaal'
                                : updatedWith == 'webform'
                                ? 'Webformulier'
                                : updatedBy
                                ? updatedBy
                                : 'Onbekend'
                        }
                    />
                </div>
                <div className="row">
                    <ViewText
                        label={'Gemaakt op'}
                        className={'form-group col-md-6'}
                        value={createdAt ? moment(createdAt).format('L') : 'Onbekend'}
                    />
                    <ViewText
                        label={'Laatste update op'}
                        className={'form-group col-md-6'}
                        value={updatedAt ? moment(updatedAt).format('L') : 'Onbekend'}
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsConclusionEdit);
