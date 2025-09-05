import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import moment from 'moment';

import ContactGroupAPI from '../../../../api/contact-group/ContactGroupAPI';
import UsersAPI from '../../../../api/user/UsersAPI';
import { updateContactGroupDetails } from '../../../../actions/contact-group/ContactGroupDetailsActions';
import InputText from '../../../../components/form/InputText';
import InputDate from '../../../../components/form/InputDate';
import ButtonText from '../../../../components/button/ButtonText';
import InputToggle from '../../../../components/form/InputToggle';
import InputSelect from '../../../../components/form/InputSelect';
import { fetchSystemData } from '../../../../actions/general/SystemDataActions';
import InputReactSelect from '../../../../components/form/InputReactSelect';
import EmailTemplateAPI from '../../../../api/email-template/EmailTemplateAPI';
import Modal from '../../../../components/modal/Modal';

class ContactGroupDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        const {
            dateStarted,
            dateFinished,
            responsibleUserId,
            showPortal,
            editPortal,
            showContactForm,
            contactGroupComposedType,
            type,
            dynamicFilterType,
            sendEmailNewContactLink,
            emailTemplateIdNewContactLink,
            includeIntoExportGroupReport,
            portalSortOrder,
            inspectionPersonType,
        } = props.contactGroupDetails;

        this.state = {
            showConfirmValidatePeriodOverlap: false,
            contactsWithPermission: [],
            contactGroups: [],
            emailTemplates: [],
            oldName: props.contactGroupDetails.name ? props.contactGroupDetails.name : '',
            oldType: props.contactGroupDetails.type ? props.contactGroupDetails.type : '',
            contactGroup: {
                ...props.contactGroupDetails,
                dateStarted: dateStarted ? moment(dateStarted).format('Y-MM-DD') : '',
                dateFinished: dateFinished ? moment(dateFinished).format('Y-MM-DD') : '',
                responsibleUserId: responsibleUserId ? responsibleUserId : '',
                showPortal: showPortal ? showPortal : false,
                editPortal: editPortal ? editPortal : false,
                showContactForm: showContactForm ? showContactForm : false,
                contactGroupComposedType: contactGroupComposedType ? contactGroupComposedType : 'one',
                type: type.id,
                dynamicFilterType: dynamicFilterType ? dynamicFilterType : 'and',
                sendEmailNewContactLink: sendEmailNewContactLink ? sendEmailNewContactLink : false,
                emailTemplateIdNewContactLink: emailTemplateIdNewContactLink ? emailTemplateIdNewContactLink : '',
                includeIntoExportGroupReport: includeIntoExportGroupReport ? includeIntoExportGroupReport : false,
                portalSortOrder: portalSortOrder ? portalSortOrder : null,
                inspectionPersonTypeId: inspectionPersonType ? inspectionPersonType.id : '',
            },
            errors: {
                name: false,
                emailTemplateIdNewContactLink: false,
            },
            peekLoading: {
                emailTemplates: true,
            },
        };
        this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
    }

    componentDidMount() {
        const { permissions } = this.props;
        UsersAPI.fetchUsersWithPermission(permissions.find(permission => permission.name === 'manage_group').id).then(
            payload => {
                this.setState({ contactsWithPermission: payload });
            }
        );

        ContactGroupAPI.peekContactGroups().then(payload => {
            this.setState({ contactGroups: payload });
        });

        EmailTemplateAPI.fetchEmailTemplatesPeek().then(emailTemplates =>
            this.setState({
                emailTemplates,
                peekLoading: {
                    ...this.state.peekLoading,
                    emailTemplates: false,
                },
            })
        );
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            contactGroup: {
                ...this.state.contactGroup,
                [name]: value,
            },
        });
    };

    handleReactSelectChange(selectedOption, name) {
        this.setState({
            ...this.state,
            contactGroup: {
                ...this.state.contactGroup,
                [name]: selectedOption,
            },
        });
    }

    setShowConfirmDynamicToStatic() {
        this.setState({
            ...this.state,
            showConfirmDynamicToStatic: true,
        });
    }
    closeDynamicToStatic = () => {
        this.setState({
            ...this.state,
            showConfirmDynamicToStatic: false,
        });
    };
    confirmDynamicToStatic = () => {
        this.doUpdateContactGroup();
    };

    handleSubmit = event => {
        event.preventDefault();

        const { contactGroup } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;
        let errorMessage = false;

        if (validator.isEmpty(contactGroup.name)) {
            errors.name = true;
            hasErrors = true;
        }

        let nameNotUnique = false;
        this.state.contactGroups.map(
            existingContactGroup => existingContactGroup.name == contactGroup.name && (nameNotUnique = true)
        );

        if (nameNotUnique && contactGroup.name !== this.state.oldName) {
            errorMessage = 'Naam moet uniek zijn.';
            errors.name = true;
            hasErrors = true;
        }

        if (contactGroup.sendEmailNewContactLink == true) {
            if (!contactGroup.emailTemplateIdNewContactLink) {
                errors.emailTemplateIdNewContactLink = true;
                hasErrors = true;
            }
        }

        this.setState({ ...this.state, errors, errorMessage });

        //check if type has changed and is now static
        let typeChanged = false;

        if (contactGroup.type !== this.state.oldType.id && contactGroup.type == 'static') {
            typeChanged = true;
        }

        // If no errors send form
        if (!hasErrors) {
            if (typeChanged) {
                this.setShowConfirmDynamicToStatic();
            } else {
                this.doUpdateContactGroup();
            }
        }
    };

    doUpdateContactGroup = () => {
        const { contactGroup } = this.state;
        ContactGroupAPI.updateContactGroup(contactGroup).then(payload => {
            this.props.updateContactGroupDetails(payload);
            this.props.fetchSystemData();
            this.props.switchToView();
        });
    };

    handleChangeStartedDate = date => {
        const formattedDate = date ? moment(date).format('Y-MM-DD') : '';

        this.setState({
            ...this.state,
            contactGroup: {
                ...this.state.contactGroup,
                dateStarted: formattedDate,
            },
        });
    };

    handleChangeFinishedDate = date => {
        const formattedDate = date ? moment(date).format('Y-MM-DD') : '';

        this.setState({
            ...this.state,
            contactGroup: {
                ...this.state.contactGroup,
                dateFinished: formattedDate,
            },
        });
    };

    handleChangeComposedGroupType = type => {
        this.setState({
            ...this.state,
            contactGroup: {
                ...this.state.contactGroup,
                contactGroupComposedType: type,
            },
        });
    };

    handleChangeDynamicFilterType = type => {
        this.setState({
            ...this.state,
            contactGroup: {
                ...this.state.contactGroup,
                dynamicFilterType: type,
            },
        });
    };

    render() {
        const {
            name,
            description,
            responsibleUserId,
            closed,
            dateStarted,
            dateFinished,
            createdAt,
            showPortal,
            editPortal,
            showContactForm,
            type,
            sendEmailNewContactLink,
            isUsedInLaposta,
            lapostaListId,
            lapostaListCreatedAt,
            emailTemplateIdNewContactLink,
            includeIntoExportGroupReport,
            portalSortOrder,
            numberOfContacts,
            inspectionPersonTypeId,
        } = this.state.contactGroup;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText
                        label="Naam"
                        name={'name'}
                        value={name}
                        onChangeAction={this.handleInputChange}
                        required={'required'}
                        error={this.state.errors.name}
                    />
                    {this.props.contactGroupDetails.type.id === 'composed' && (
                        <div className={'col-xs-6'}>
                            <div className={'row'}>
                                <div className={'col-xs-6'}>
                                    <input
                                        onChange={() => this.handleChangeComposedGroupType('one')}
                                        type="radio"
                                        name="composedGroupType"
                                        value="one"
                                        id="one"
                                        defaultChecked={
                                            this.props.contactGroupDetails.contactGroupComposedType === 'one'
                                        }
                                    />{' '}
                                    <label htmlFor="one">In één van de groepen</label>
                                </div>
                                <div className={'col-xs-6'}>
                                    <input
                                        onChange={() => this.handleChangeComposedGroupType('all')}
                                        type="radio"
                                        name="composedGroupType"
                                        value="all"
                                        id="all"
                                        defaultChecked={
                                            this.props.contactGroupDetails.contactGroupComposedType === 'all'
                                        }
                                    />{' '}
                                    <label htmlFor="all"> In alle groepen</label>
                                </div>
                            </div>
                        </div>
                    )}
                    {this.props.contactGroupDetails.type.id === 'dynamic' && (
                        <div className={'col-xs-6'}>
                            <div className={'row'}>
                                <div className={'col-xs-6'}>
                                    <input
                                        onChange={() => this.handleChangeDynamicFilterType('and')}
                                        type="radio"
                                        name="dynamicFilterType"
                                        value="and"
                                        id="and"
                                        defaultChecked={this.props.contactGroupDetails.dynamicFilterType === 'and'}
                                    />
                                    <label htmlFor="and">Alle extra filters zijn "EN"</label>
                                </div>
                                <div className={'col-xs-6'}>
                                    <input
                                        onChange={() => this.handleChangeDynamicFilterType('or')}
                                        type="radio"
                                        name="dynamicFilterType"
                                        value="or"
                                        id="or"
                                        defaultChecked={this.props.contactGroupDetails.dynamicFilterType === 'or'}
                                    />
                                    <label htmlFor="or">Alle extra filters zijn "OF"</label>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="row">
                    <div className="form-group col-sm-12">
                        <div className="row">
                            <div className="col-sm-3">
                                <label htmlFor="description" className="col-sm-12">
                                    Omschrijving
                                </label>
                            </div>
                            <div className="col-sm-9">
                                <textarea
                                    name="description"
                                    value={description}
                                    onChange={this.handleInputChange}
                                    className="form-control input-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-sm-6">
                        <label htmlFor="responsibleUserId" className="col-sm-6">
                            Verantwoordelijke
                        </label>
                        <div className={'col-sm-6'}>
                            <select
                                className="form-control input-sm"
                                id="responsibleUserId"
                                name="responsibleUserId"
                                value={responsibleUserId}
                                onChange={this.handleInputChange}
                            >
                                <option value="" />
                                {this.state.contactsWithPermission.map(option => {
                                    return (
                                        <option key={option.id} value={option.id}>
                                            {option.fullName}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <InputToggle
                        label={'Gesloten'}
                        name={'closed'}
                        value={closed}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputDate
                        label="Startdatum"
                        size={'col-sm-6'}
                        name="dateStarted"
                        value={dateStarted}
                        onChangeAction={this.handleChangeStartedDate}
                    />
                    <InputDate
                        label="Datum gereed"
                        size={'col-sm-6'}
                        name="dateFinished"
                        value={dateFinished}
                        onChangeAction={this.handleChangeFinishedDate}
                    />
                </div>

                <div className="row">
                    <InputToggle
                        label={'Zichtbaar op portaal'}
                        name={'showPortal'}
                        value={showPortal}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputToggle
                        label={'Veranderen op portaal'}
                        name={'editPortal'}
                        value={editPortal}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                {type === 'static' && showPortal ? (
                    <div className="row">
                        <InputText
                            label={'Volgorde op portaal'}
                            name={'portalSortOrder'}
                            value={portalSortOrder}
                            onChangeAction={this.handleInputChange}
                        />
                    </div>
                ) : null}

                <div className="row">
                    <InputToggle
                        label={'Zichtbaar bij contact'}
                        name={'showContactForm'}
                        value={showContactForm}
                        onChangeAction={this.handleInputChange}
                    />
                    {this.props.contactGroupDetails.type.id === 'dynamic' ? (
                        <InputSelect
                            label="Type"
                            name={'type'}
                            value={type}
                            options={[
                                { id: 'dynamic', name: 'Dynamisch' },
                                { id: 'static', name: 'Statisch' },
                            ]}
                            onChangeAction={this.handleInputChange}
                        />
                    ) : (
                        <InputText
                            label={'Type'}
                            name={'type'}
                            value={this.props.contactGroupDetails.type.name}
                            readOnly={true}
                        />
                    )}
                </div>

                {this.props.contactGroupDetails.type.id === 'static' && (
                    <>
                        <div className="row">
                            <InputToggle
                                label={'Verstuur e-mail bij nieuwe contactkoppeling'}
                                name={'sendEmailNewContactLink'}
                                value={sendEmailNewContactLink}
                                onChangeAction={this.handleInputChange}
                            />
                            {sendEmailNewContactLink == true && (
                                <InputReactSelect
                                    label={'Template email nieuwe contactkoppeling'}
                                    divSize={'col-sm-6'}
                                    name={'emailTemplateIdNewContactLink'}
                                    options={this.state.emailTemplates}
                                    value={emailTemplateIdNewContactLink}
                                    onChangeAction={this.handleReactSelectChange}
                                    isLoading={this.state.peekLoading.emailTemplates}
                                    required={sendEmailNewContactLink ? 'required' : ''}
                                    error={this.state.errors.emailTemplateIdNewContactLink}
                                />
                            )}
                        </div>
                        <div className="row">
                            {/*todo WM: check of filter op static er niet af kan/moet voor Meenemen in export groep rapportage? Voorlopig niet */}
                            <InputToggle
                                label={'Meenemen in export groep rapportage'}
                                name={'includeIntoExportGroupReport'}
                                value={includeIntoExportGroupReport}
                                onChangeAction={this.handleInputChange}
                                size={'col-sm-5'}
                                textToolTip={`Als je deze optie op "AAN" zet zal deze groep getoond worden in de export groepen rapportage op de "groepen beheer" pagina.`}
                            />
                            <InputReactSelect
                                label={'Rol in buurtaanpak'}
                                divSize={'col-sm-6'}
                                name={'inspectionPersonTypeId'}
                                options={this.props.inspectionPersonTypes}
                                value={inspectionPersonTypeId}
                                onChangeAction={this.handleReactSelectChange}
                                clearable={true}
                                disabled={numberOfContacts > 0}
                                size={'col-sm-5'}
                                textToolTip={`Contact die worden toegevoegd aan deze groep krijgen dezelfde waarde als Rol in buurtaanpak`}
                            />
                        </div>
                    </>
                )}

                <div className="row">
                    <InputText
                        label={'Gemaakt op'}
                        name={'createdAt'}
                        value={moment(createdAt).format('DD-MM-Y')}
                        readOnly={true}
                    />
                    <InputText
                        label={'Gemaakt door'}
                        name={'createdBy'}
                        value={this.props.meDetails.fullName}
                        readOnly={true}
                    />
                </div>

                {isUsedInLaposta && (
                    <div className="row">
                        <InputText
                            label="Laposta lijst id"
                            name={'lapostaListId'}
                            value={lapostaListId}
                            readOnly={true}
                        />
                        <InputText
                            label={'Gemaakt in Laposta op'}
                            name={'lapostaListCreatedAt'}
                            value={lapostaListCreatedAt && moment(lapostaListCreatedAt).format('DD-MM-Y')}
                            readOnly={true}
                        />
                    </div>
                )}

                {this.state.errorMessage && (
                    <div className={'row'}>
                        <div className="col-sm-10 col-md-offset-1 alert alert-danger">{this.state.errorMessage}</div>
                    </div>
                )}

                <div className="panel-footer">
                    <div className="pull-right btn-group" role="group">
                        <ButtonText
                            buttonClassName={'btn-default'}
                            buttonText={'Sluiten'}
                            onClickAction={this.props.switchToView}
                        />
                        <ButtonText buttonText={'Opslaan'} onClickAction={this.handleSubmit} />
                    </div>
                </div>

                {this.state.showConfirmDynamicToStatic && (
                    <Modal
                        buttonConfirmText="Bevestigen"
                        buttonClassName={'btn-danger'}
                        closeModal={this.closeDynamicToStatic}
                        confirmAction={() => this.confirmDynamicToStatic()}
                        title="Bevestig groep type aanpassing"
                    >
                        <>
                            Weet je zeker dat je het groepstype van deze groep wilt wijzigen naar "statisch"? De filters
                            die zijn ingesteld voor deze groep komen te vervallen. De groep wordt dan niet meer
                            dynamisch bijgewerkt op basis van de filters.
                        </>
                    </Modal>
                )}
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        meDetails: state.meDetails,
        contactGroupDetails: state.contactGroupDetails,
        permissions: state.systemData.permissions,
        inspectionPersonTypes: state.systemData.inspectionPersonTypes,
    };
};

const mapDispatchToProps = dispatch => ({
    updateContactGroupDetails: payload => {
        dispatch(updateContactGroupDetails(payload));
    },
    fetchSystemData: () => {
        dispatch(fetchSystemData());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactGroupDetailsFormGeneralEdit);
