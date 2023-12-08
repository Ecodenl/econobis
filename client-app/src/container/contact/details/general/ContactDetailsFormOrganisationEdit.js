import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import validator from 'validator';

import { updateOrganisation } from '../../../../actions/contact/ContactDetailsActions';
import OrganisationAPI from '../../../../api/contact/OrganisationAPI';
import InputText from '../../../../components/form/InputText';
import InputDate from '../../../../components/form/InputDate';
import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from '../../../../components/panel/PanelFooter';
import * as ibantools from 'ibantools';
import InputToggle from '../../../../components/form/InputToggle';
import ErrorModal from '../../../../components/modal/ErrorModal';
import ViewText from '../../../../components/form/ViewText';
// import InputSelect from '../../../../components/form/InputSelect';

class ContactDetailsFormOrganisationEdit extends Component {
    constructor(props) {
        super(props);

        const {
            number,
            organisation,
            iban,
            ibanAttn,
            createdAt,
            didAgreeAvg,
            dateDidAgreeAvg,
            isCollectMandate,
            collectMandateCode,
            collectMandateSignatureDate,
            collectMandateFirstRunDate,
            collectMandateCollectionSchema,
            inspectionPersonType,
        } = props.contactDetails;

        this.state = {
            organisation: {
                id: organisation.id,
                number: number,
                createdAt: createdAt,
                name: organisation.name,
                statutoryName: organisation.statutoryName,
                chamberOfCommerceNumber: organisation.chamberOfCommerceNumber,
                vatNumber: organisation.vatNumber,
                industryId: organisation.industryId ? organisation.industryId : '',
                website: organisation.website,
                iban: iban,
                ibanAttn: ibanAttn ? ibanAttn : '',
                didAgreeAvg: didAgreeAvg,
                dateDidAgreeAvg: dateDidAgreeAvg ? moment(dateDidAgreeAvg).format('Y-MM-DD') : '',
                isCollectMandate,
                inspectionPersonTypeId: inspectionPersonType ? inspectionPersonType.id : '',
                collectMandateCode: collectMandateCode ? collectMandateCode : '',
                collectMandateSignatureDate: collectMandateSignatureDate
                    ? moment(collectMandateSignatureDate).format('Y-MM-DD')
                    : '',
                collectMandateFirstRunDate: collectMandateFirstRunDate
                    ? moment(collectMandateFirstRunDate).format('Y-MM-DD')
                    : '',
                collectMandateCollectionSchema: collectMandateCollectionSchema
                    ? collectMandateCollectionSchema
                    : 'core',
            },
            errors: {
                name: false,
                iban: false,
                collectMandateCode: false,
                collectMandateSignatureDate: false,
                collectMandateFirstRunDate: false,
            },
            showErrorModal: false,
            modalErrorMessage: '',
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

    handleInputChangeDate = (value, name) => {
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

        if (organisation.isCollectMandate) {
            if (validator.isEmpty(organisation.iban)) {
                errors.iban = true;
                hasErrors = true;
            }

            if (validator.isEmpty(organisation.collectMandateCode)) {
                errors.collectMandateCode = true;
                hasErrors = true;
            }

            if (validator.isEmpty(organisation.collectMandateSignatureDate)) {
                errors.collectMandateSignatureDate = true;
                hasErrors = true;
            }

            if (validator.isEmpty(organisation.collectMandateFirstRunDate)) {
                errors.collectMandateFirstRunDate = true;
                hasErrors = true;
            }
        }

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
            OrganisationAPI.updateOrganisation(organisation)
                .then(payload => {
                    this.props.updateOrganisation(payload.data.data);
                    this.props.switchToView();
                })
                .catch(error => {
                    // let errorObject = JSON.parse(JSON.stringify(error));
                    let errorMessage = 'Er is iets misgegaan bij opslaan. Probeer het opnieuw.';

                    if (error.response.status !== 500) {
                        errorMessage = error.response.data.message;
                    }

                    this.setState({
                        showErrorModal: true,
                        modalErrorMessage: errorMessage,
                    });
                });
    };

    closeErrorModal = () => {
        this.setState({ showErrorModal: false, modalErrorMessage: '' });
    };

    render() {
        const {
            number,
            name,
            statutoryName,
            chamberOfCommerceNumber,
            vatNumber,
            createdAt,
            didAgreeAvg,
            dateDidAgreeAvg,
            website,
            iban,
            ibanAttn,
            isCollectMandate,
            collectMandateCode,
            collectMandateSignatureDate,
            collectMandateFirstRunDate,
            collectMandateCollectionSchema,
            inspectionPersonTypeId,
        } = this.state.organisation;

        return (
            <React.Fragment>
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
                            label="Statutaire naam"
                            divSize={'col-xs-12'}
                            name={'statutoryName'}
                            value={statutoryName}
                            onChangeAction={this.handleInputChange}
                            error={this.state.errors.statutoryName}
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
                            required={isCollectMandate ? 'required' : ''}
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
                        {!didAgreeAvg ? (
                            <InputToggle
                                label="Akkoord privacybeleid"
                                divSize={'col-xs-12'}
                                name="didAgreeAvg"
                                value={didAgreeAvg}
                                onChangeAction={this.handleInputChange}
                            />
                        ) : (
                            <ViewText
                                label="Akkoord privacybeleid"
                                id={'didAgreeAvg'}
                                className={'form-group col-md-12'}
                                value={
                                    didAgreeAvg ? (
                                        <span>
                                            Ja{' '}
                                            <em>
                                                (
                                                {dateDidAgreeAvg
                                                    ? moment(dateDidAgreeAvg).format('L')
                                                    : moment().format('L')}
                                                )
                                            </em>
                                        </span>
                                    ) : (
                                        'Nee'
                                    )
                                }
                            />
                        )}
                    </div>

                    {/* vooralsnog alleen bij persons, organisations kunnen al gekoppeld worden aan kansactie */}
                    {/*<div className="row">*/}
                    {/*<InputSelect*/}
                    {/*    label={'Rol in buurtaanpak'}*/}
                    {/*    size={'col-xs-12'}*/}
                    {/*    name={'inspectionPersonTypeId'}*/}
                    {/*    options={this.props.inspectionPersonTypes}*/}
                    {/*    value={inspectionPersonTypeId}*/}
                    {/*    onChangeAction={this.handleInputChange}*/}
                    {/*    readOnly={Boolean(isInInspectionPersonTypeGroup)}*/}
                    {/*/>*/}
                    {/*</div>*/}

                    <div className="row">
                        <InputToggle
                            divSize={'col-xs-12'}
                            label={'Ingesteld op incasso'}
                            name={'isCollectMandate'}
                            value={isCollectMandate}
                            onChangeAction={this.handleInputChange}
                        />
                    </div>

                    {isCollectMandate ? (
                        <React.Fragment>
                            <div className="row">
                                <InputText
                                    divSize={'col-xs-12'}
                                    label={'Machtigingskenmerk'}
                                    name={'collectMandateCode'}
                                    value={collectMandateCode}
                                    onChangeAction={this.handleInputChange}
                                    required={'required'}
                                    error={this.state.errors.collectMandateCode}
                                />
                            </div>
                            <div className="row">
                                <InputDate
                                    divSize={'col-xs-12'}
                                    label={'Datum van ondertekening'}
                                    name={'collectMandateSignatureDate'}
                                    value={collectMandateSignatureDate}
                                    onChangeAction={this.handleInputChangeDate}
                                    required={'required'}
                                    error={this.state.errors.collectMandateSignatureDate}
                                />
                            </div>
                            <div className="row">
                                <InputDate
                                    divSize={'col-xs-12'}
                                    label={'Datum eerste incassoronde'}
                                    name={'collectMandateFirstRunDate'}
                                    value={collectMandateFirstRunDate}
                                    onChangeAction={this.handleInputChangeDate}
                                    required={'required'}
                                    error={this.state.errors.collectMandateFirstRunDate}
                                />
                            </div>
                            <div className="row">
                                <InputText
                                    type={'hidden'}
                                    name={'collectMandateCollectionSchema'}
                                    value={collectMandateCollectionSchema}
                                />
                            </div>
                        </React.Fragment>
                    ) : null}

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

                {this.state.showErrorModal && (
                    <ErrorModal
                        closeModal={this.closeErrorModal}
                        title={'Fout bij opslaan'}
                        errorMessage={this.state.modalErrorMessage}
                    />
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        contactDetails: state.contactDetails,
        // inspectionPersonTypes: state.systemData.inspectionPersonTypes,
    };
};

const mapDispatchToProps = dispatch => ({
    updateOrganisation: id => {
        dispatch(updateOrganisation(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsFormOrganisationEdit);
