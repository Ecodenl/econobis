import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchContactDetails } from '../../../../actions/contact/ContactDetailsActions';
import InputSelect from '../../../../components/form/InputSelect';
import InputDate from '../../../../components/form/InputDate';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import validator from 'validator';
import OccupationAPI from '../../../../api/contact/OccupationAPI';
import moment from 'moment/moment';
import InputToggle from '../../../../components/form/InputToggle';
import ContactsAPI from '../../../../api/contact/ContactsAPI';
import InputReactSelect from '../../../../components/form/InputReactSelect';

class ContactDetailsFormOccupationsNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: [],
            occupation: {
                primaryContactId: this.props.id,
                contactId: '',
                occupationId: '',
                startDate: '',
                endDate: '',
                primary: false,
                allowManageInPortal: false,
            },
            errors: {
                contactId: false,
                occupationId: false,
            },
            peekLoading: {
                contacts: true,
            },
        };

        this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
    }

    componentDidMount() {
        ContactsAPI.getContactsPeek().then(payload => {
            this.setState({
                contacts: payload,
                peekLoading: {
                    ...this.state.peekLoading,
                    contacts: false,
                },
            });
        });
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            occupation: {
                ...this.state.occupation,
                [name]: value,
            },
        });
    };

    handleInputChangePrimary = event => {
        const value = event.target.checked;

        let allowManageInPortal = this.state.occupation.allowManageInPortal;

        if (value === true && this.state.occupation.contactId) {
            const selectedContact =
                this.state.contacts.find(contact => contact.id === this.state.occupation.contactId) ?? null;
            if (selectedContact) {
                if (
                    (this.props.currentContactTypeId === 'organisation' && selectedContact.typeId === 'person') ||
                    (this.props.currentContactTypeId === 'person' && selectedContact.typeId === 'organisation')
                ) {
                    allowManageInPortal = true;
                }
            }
        }

        this.setState({
            ...this.state,
            occupation: {
                ...this.state.occupation,
                primary: value,
                allowManageInPortal: allowManageInPortal,
            },
        });
    };

    handleStartDate = date => {
        const formattedDate = date ? moment(date).format('Y-MM-DD') : '';

        this.setState({
            ...this.state,
            occupation: {
                ...this.state.occupation,
                startDate: formattedDate,
            },
        });
    };

    handleEndDate = date => {
        const formattedDate = date ? moment(date).format('Y-MM-DD') : '';

        this.setState({
            ...this.state,
            occupation: {
                ...this.state.occupation,
                endDate: formattedDate,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { occupation } = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(occupation.contactId + '')) {
            errors.contactId = true;
            hasErrors = true;
        }

        if (validator.isEmpty(occupation.occupationId + '')) {
            errors.occupationId = true;
            hasErrors = true;
        }

        if (occupation.contactId === occupation.primaryContactId) {
            errors.contactId = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            OccupationAPI.newOccupation(occupation).then(payload => {
                this.props.fetchContactDetails(this.props.id);
                this.props.toggleShowNew();
            });
    };

    handleReactSelectChange(selectedOption, name) {
        this.setState({
            ...this.state,
            occupation: {
                ...this.state.occupation,
                [name]: selectedOption,
            },
        });
    }

    render() {
        const { contactId, occupationId, startDate, endDate, primary, allowManageInPortal } = this.state.occupation;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputReactSelect
                                label={'Verbonden met'}
                                name={'contactId'}
                                options={this.state.contacts}
                                value={contactId}
                                onChangeAction={this.handleReactSelectChange}
                                optionName={'fullName'}
                                isLoading={this.state.peekLoading.contacts}
                                error={this.state.errors.contactId}
                            />
                            <InputSelect
                                label={'Rol'}
                                size={'col-sm-6'}
                                name={'occupationId'}
                                optionName={'primaryOccupation'}
                                options={this.props.occupations}
                                value={occupationId}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.occupationId}
                            />
                        </div>

                        <div className="row">
                            <InputDate
                                label={'Begindatum'}
                                size={'col-sm-6'}
                                name={'startDate'}
                                value={startDate}
                                onChangeAction={this.handleStartDate}
                            />
                            <InputDate
                                label={'Einddatum'}
                                size={'col-sm-6'}
                                name={'endDate'}
                                value={endDate}
                                onChangeAction={this.handleEndDate}
                            />
                        </div>

                        <div className="row">
                            <InputToggle
                                label={'Primair'}
                                name={'primary'}
                                value={primary}
                                onChangeAction={this.handleInputChangePrimary}
                            />
                            <InputToggle
                                label={'Beheer in portaal'}
                                name={'allowManageInPortal'}
                                value={allowManageInPortal}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Annuleren'}
                                onClickAction={this.props.toggleShowNew}
                            />
                            <ButtonText
                                buttonText={'Opslaan'}
                                onClickAction={this.handleSubmit}
                                type={'submit'}
                                value={'Submit'}
                            />
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        occupations: state.systemData.occupations,
        id: state.contactDetails.id,
        currentContactTypeId: state.contactDetails.typeId,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchContactDetails: id => {
        dispatch(fetchContactDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsFormOccupationsNew);
