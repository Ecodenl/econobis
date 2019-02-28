import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');
import validator from 'validator';

import ParticipantProjectDetailsAPI from '../../../../api/participant-project/ParticipantProjectDetailsAPI';

import { fetchParticipantProjectDetails } from '../../../../actions/participants-project/ParticipantProjectDetailsActions';
import ContactsAPI from '../../../../api/contact/ContactsAPI';
import * as ibantools from 'ibantools';
import { browserHistory } from 'react-router';
import ParticipantFormDefaultGeneral from '../../form-default/ParticipantFormDefaultGeneral';

class ParticipantFormEdit extends Component {
    constructor(props) {
        super(props);

        const {
            id,
            contact,
            statusId,
            project,
            dateRegister,
            participationsRequested,
            participationsDefinitive,
            participationsSold,
            participationsRestSale,
            participationsDefinitiveWorth,
            dateContractSend,
            dateContractRetour,
            datePayed,
            didAcceptAgreement,
            giftedByContactId,
            ibanPayout,
            legalRepContactId,
            ibanPayoutAttn,
            updatedAt,
            dateEnd,
            typeId,
            powerKwhConsumption,
        } = props.participation;

        this.state = {
            contacts: [],
            participation: {
                id,
                contactName: contact.fullName,
                statusId,
                projectName: project.name,
                projectAdministrationName: project.administration ? project.administration.name : '',
                dateRegister: dateRegister ? dateRegister : '',
                participationsRequested: participationsRequested ? participationsRequested : '',
                participationsDefinitive: participationsDefinitive ? participationsDefinitive : '',
                participationsSold: participationsSold ? participationsSold : '',
                participationsRestSale: participationsRestSale ? participationsRestSale : '',
                participationsDefinitiveWorth: participationsDefinitiveWorth ? participationsDefinitiveWorth : '',
                dateContractSend: dateContractSend ? dateContractSend : '',
                dateContractRetour: dateContractRetour ? dateContractRetour : '',
                datePayed: datePayed ? datePayed : '',
                didAcceptAgreement: !!didAcceptAgreement,
                giftedByContactId: giftedByContactId ? giftedByContactId : '',
                ibanPayout: ibanPayout ? ibanPayout : '',
                legalRepContactId: legalRepContactId ? legalRepContactId : '',
                ibanPayoutAttn: ibanPayoutAttn ? ibanPayoutAttn : '',
                updatedAt: updatedAt ? updatedAt : '',
                dateEnd: dateEnd ? dateEnd : '',
                typeId,
                powerKwhConsumption: powerKwhConsumption ? powerKwhConsumption : '',
            },
            errors: {
                contactId: false,
                statusId: false,
                projectId: false,
                typeId: false,
                ibanPayout: false,
            },
        };
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    }

    componentDidMount() {
        ContactsAPI.getContactsPeek().then(payload => {
            this.setState({
                contacts: payload,
            });
        });
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            participation: {
                ...this.state.participation,
                [name]: value,
            },
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            participation: {
                ...this.state.participation,
                [name]: value,
            },
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        const { participation } = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(participation.contactId + '')) {
            errors.contactId = true;
            hasErrors = true;
        }
        if (validator.isEmpty(participation.statusId + '')) {
            errors.statusId = true;
            hasErrors = true;
        }
        if (validator.isEmpty(participation.projectId + '')) {
            errors.projectId = true;
            hasErrors = true;
        }
        if (validator.isEmpty(participation.typeId + '')) {
            errors.typeId = true;
            hasErrors = true;
        }
        if (!validator.isEmpty(participation.ibanPayout)) {
            if (!ibantools.isValidIBAN(participation.ibanPayout)) {
                errors.ibanPayout = true;
                hasErrors = true;
            }
        }

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
            ParticipantProjectDetailsAPI.updateParticipantProject(participation.id, participation).then(payload => {
                this.props.fetchParticipantProjectDetails(participation.id);
                this.props.switchToView();
            });
    };

    render() {
        return (
            <ParticipantFormDefaultGeneral
                editForm={true}
                participation={this.state.participation}
                errors={this.state.errors}
                contacts={this.state.contacts}
                handleInputChange={this.handleInputChange}
                handleInputChangeDate={this.handleInputChangeDate}
                handleCancel={this.props.switchToView}
                handleSubmit={this.handleSubmit}
                participationWorth={this.props.participation.project.participationWorth}
                valueCourses={this.props.participation.project.valueCourses}
                handleProjectChange={this.handleProjectChange}
                projectTypeCodeRef={this.props.participation.project.projectType.codeRef}
            />
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchParticipantProjectDetails: id => {
        dispatch(fetchParticipantProjectDetails(id));
    },
});

const mapStateToProps = state => {
    return {
        participation: state.participantProjectDetails,
        participantProjectStatuses: state.systemData.participantProjectStatus,
        participantProjectPayoutTypes: state.systemData.participantProjectPayoutTypes,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ParticipantFormEdit);
