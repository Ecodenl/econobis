import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import validator from 'validator';

import { updateOrganisation } from '../../../../actions/contact/ContactDetailsActions';
import OrganisationAPI from '../../../../api/contact/OrganisationAPI';
import InputText from '../../../../components/form/InputText';
import InputSelect from '../../../../components/form/InputSelect';
import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from '../../../../components/panel/PanelFooter';
import * as ibantools from 'ibantools';
import InputToggle from '../../../../components/form/InputToggle';

class ContactDetailsFormOrganisationEdit extends Component {
    constructor(props) {
        super(props);

        const {
            number,
            organisation,
            status,
            iban,
            ibanAttn,
            createdAt,
            newsletter,
            didAgreeAvg,
        } = props.contactDetails;

        this.state = {
            organisation: {
                id: organisation.id,
                number: number,
                createdAt: createdAt.date,
                name: organisation.name,
                chamberOfCommerceNumber: organisation.chamberOfCommerceNumber,
                vatNumber: organisation.vatNumber,
                industryId: organisation.industryId ? organisation.industryId : '',
                website: organisation.website,
                iban: iban,
                ibanAttn: ibanAttn ? ibanAttn : '',
                newsletter: newsletter,
                didAgreeAvg: didAgreeAvg,
            },
            errors: {
                name: false,
                iban: false,
            },
        };
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            organisation: {
                ...this.state.organisation,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { organisation } = this.state;

        let errors = {};
        let hasErrors = false;

        if (organisation.iban && !validator.isEmpty(organisation.iban + '')) {
            if (!ibantools.isValidIBAN(organisation.iban)) {
                errors.iban = true;
                hasErrors = true;
            }
        }

        if (validator.isEmpty(organisation.name + '')) {
            errors.name = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
            OrganisationAPI.updateOrganisation(organisation).then(payload => {
                this.props.updateOrganisation(payload);
                this.props.switchToView();
            });
    };

    render() {
        const {
            number,
            name,
            chamberOfCommerceNumber,
            vatNumber,
            createdAt,
            newsletter,
            didAgreeAvg,
            website,
            iban,
            ibanAttn,
        } = this.state.organisation;

        return (
            <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText
                        label={'Contactnummer'}
                        divSize={'col-xs-12'}
                        name={'number'}
                        value={number}
                        readOnly={true}
                    />
                </div>

                <div className="row">
                    <InputText
                        label={'Gemaakt op'}
                        divSize={'col-xs-12'}
                        name={'createdAt'}
                        value={moment(createdAt).format('DD-MM-Y')}
                        readOnly={true}
                    />
                </div>

                <div className="row">
                    <InputText
                        label="Naam"
                        divSize={'col-xs-12'}
                        name={'name'}
                        value={name}
                        onChangeAction={this.handleInputChange}
                        required={'required'}
                        error={this.state.errors.name}
                    />
                </div>

                <div className="row">
                    <InputText
                        label="KvK"
                        divSize={'col-xs-12'}
                        name="chamberOfCommerceNumber"
                        value={chamberOfCommerceNumber}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        label="Btw nummer"
                        divSize={'col-xs-12'}
                        name="vatNumber"
                        value={vatNumber}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        label="IBAN"
                        divSize={'col-xs-12'}
                        name="iban"
                        value={iban}
                        onChangeAction={this.handleInputChange}
                        error={this.state.errors.iban}
                    />
                </div>

                <div className="row">
                    <InputText
                        label="IBAN t.n.v."
                        divSize={'col-xs-12'}
                        name="ibanAttn"
                        value={ibanAttn}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        label={'Website'}
                        divSize={'col-xs-12'}
                        name={'website'}
                        value={website}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputToggle
                        className={'field-to-be-removed'}
                        label={'Nieuwsbrief'}
                        divSize={'col-xs-12'}
                        name={'newsletter'}
                        value={newsletter}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputToggle
                        label="Akkoord privacybeleid"
                        divSize={'col-xs-12'}
                        name="didAgreeAvg"
                        value={didAgreeAvg}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText
                            buttonClassName={'btn-default'}
                            buttonText={'Annuleren'}
                            onClickAction={this.props.switchToView}
                        />
                        <ButtonText buttonText={'Opslaan'} onClickAction={this.handleSubmit} />
                    </div>
                </PanelFooter>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        contactDetails: state.contactDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    updateOrganisation: id => {
        dispatch(updateOrganisation(id));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactDetailsFormOrganisationEdit);
