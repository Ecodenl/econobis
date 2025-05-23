import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import moment from 'moment';

import UsersAPI from '../../../api/user/UsersAPI';
import ContactGroupAPI from '../../../api/contact-group/ContactGroupAPI';
import InputText from '../../../components/form/InputText';
import InputDate from '../../../components/form/InputDate';
import ButtonText from '../../../components/button/ButtonText';
import InputToggle from '../../../components/form/InputToggle';
import InputMultiSelect from '../../../components/form/InputMultiSelect';
import { fetchSystemData } from '../../../actions/general/SystemDataActions';
import InputReactSelect from '../../../components/form/InputReactSelect';
import EmailTemplateAPI from '../../../api/email-template/EmailTemplateAPI';
import ViewText from '../../../components/form/ViewText';

// Functionele wrapper voor de class component
const ContactGroupNewFormWrapper = props => {
    const navigate = useNavigate();
    return <ContactGroupNewForm {...props} navigate={navigate} />;
};

class ContactGroupNewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contactsWithPermission: [],
            contactGroups: [],
            inspectionPersonTypes: [],
            emailTemplates: [],
            contactGroup: {
                id: '',
                name: '',
                description: '',
                closed: false,
                responsibleUserId: '',
                dateStarted: '',
                dateFinished: '',
                showContactForm: false,
                showPortal: false,
                editPortal: false,
                contactGroupIds: '',
                contactGroupIdsSelected: [],
                contactGroupComposedType: '',
                sendEmailNewContactLink: false,
                emailTemplateIdNewContactLink: '',
                inspectionPersonTypeId: '',
            },
            errors: {
                name: false,
                nameUnique: false,
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

        ContactGroupAPI.peekActiveContactGroups().then(payload => {
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

        if (nameNotUnique) {
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

        // If no errors send form
        !hasErrors &&
            ContactGroupAPI.newContactGroup(contactGroup).then(payload => {
                this.props.fetchSystemData();
                this.props.navigate('/contact-groep/' + payload.id);
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

    handleContactGroupIds = selectedOption => {
        const contactGroupIds = selectedOption ? selectedOption.map(item => item.id).join(',') : '';
        this.setState({
            ...this.state,
            contactGroup: {
                ...this.state.contactGroup,
                contactGroupIds: contactGroupIds,
                contactGroupIdsSelected: selectedOption,
                sendEmailNewContactLink:
                    selectedOption && selectedOption.length > 0
                        ? false
                        : this.state.contactGroup.sendEmailNewContactLink,
                emailTemplateIdNewContactLink:
                    selectedOption && selectedOption.length > 0
                        ? ''
                        : this.state.contactGroup.emailTemplateIdNewContactLink,
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

    render() {
        const {
            name,
            description,
            responsibleUserId,
            closed,
            dateStarted,
            dateFinished,
            showPortal,
            editPortal,
            showContactForm,
            contactGroupIds,
            contactGroupIdsSelected,
            sendEmailNewContactLink,
            emailTemplateIdNewContactLink,
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

                <div className="row">
                    <InputToggle
                        label={'Zichtbaar bij contact'}
                        name={'showContactForm'}
                        value={showContactForm}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputToggle
                        label={'Verstuur e-mail bij nieuwe contactkoppeling'}
                        name={'sendEmailNewContactLink'}
                        value={
                            contactGroupIdsSelected && contactGroupIdsSelected.length > 0
                                ? false
                                : sendEmailNewContactLink
                        }
                        onChangeAction={this.handleInputChange}
                        disabled={contactGroupIdsSelected && contactGroupIdsSelected.length > 0}
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
                    <InputReactSelect
                        label={'Rol in buurtaanpak'}
                        divSize={'col-sm-6'}
                        name={'inspectionPersonTypeId'}
                        options={this.props.inspectionPersonTypes}
                        value={inspectionPersonTypeId}
                        onChangeAction={this.handleReactSelectChange}
                        clearable={true}
                        size={'col-sm-5'}
                        textToolTip={`Contact die worden toegevoegd aan deze groep krijgen dezelfde waarde als Rol in buurtaanpak`}
                    />
                </div>

                <div className="row">
                    <InputText
                        label={'Gemaakt op'}
                        name={'createdAt'}
                        value={moment().format('DD-MM-Y')}
                        readOnly={true}
                    />
                    <InputText
                        label={'Gemaakt door'}
                        name={'createdBy'}
                        value={this.props.meDetails.fullName}
                        readOnly={true}
                    />
                </div>

                <div className={'row'}>
                    <InputMultiSelect
                        label={'Samengesteld uit'}
                        name={'contactGroupsIds'}
                        options={this.state.contactGroups}
                        value={contactGroupIdsSelected}
                        onChangeAction={this.handleContactGroupIds}
                    />
                </div>
                {contactGroupIdsSelected && contactGroupIdsSelected.length > 1 && (
                    <div className={'row'}>
                        <div className={'col-sm-3'}></div>
                        <div className={'col-sm-9'}>
                            <input
                                onChange={() => this.handleChangeComposedGroupType('one')}
                                type="radio"
                                name="composedGroupType"
                                value="one"
                                defaultChecked={true}
                            />{' '}
                            In één van de groepen
                            <br />
                            <input
                                onChange={() => this.handleChangeComposedGroupType('all')}
                                type="radio"
                                name="composedGroupType"
                                value="all"
                            />{' '}
                            In alle groepen
                        </div>
                    </div>
                )}

                {this.state.errorMessage && (
                    <div className={'row'}>
                        <div className="col-sm-10 col-md-offset-1 alert alert-danger">{this.state.errorMessage}</div>
                    </div>
                )}

                <div className="panel-footer">
                    <div className="pull-right btn-group" role="group">
                        <ButtonText buttonText={'Opslaan'} onClickAction={this.handleSubmit} />
                    </div>
                </div>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchSystemData: () => {
        dispatch(fetchSystemData());
    },
});

const mapStateToProps = state => {
    return {
        meDetails: state.meDetails,
        permissions: state.systemData.permissions,
        inspectionPersonTypes: state.systemData.inspectionPersonTypes,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactGroupNewFormWrapper);
