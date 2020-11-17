import React from 'react';
import { connect } from 'react-redux';
import ViewText from '../../../../../components/form/ViewText';
import moment from 'moment';

const ProjectFormViewGeneral = ({
    name,
    code,
    description,
    projectStatus,
    projectType,
    postalCode,
    address,
    city,
    dateStartRegistrations,
    dateEndRegistrations,
    ownedBy,
    administration,
    dateStart,
    dateEnd,
    dateEntry,
    contactGroupIds,
    dateProduction,
    isMembershipRequired,
    administrations,
    hasPaymentInvoices,
    requiresContactGroups,
    documentTemplateAgreement,
    emailTemplateAgreement,
    linkAgreeTerms,
    linkUnderstandInfo,
    showQuestionAboutMembership,
    questionAboutMembershipGroup,
    textIsMember,
    textIsNoMember,
    textBecomeMember,
    memberGroup,
    textBecomeNoMember,
    noMemberGroup,
}) => (
    <React.Fragment>
        <h4>Algemeen</h4>
        <div className="row">
            <ViewText label={'Project'} value={name} />
            <ViewText label={'Projectcode'} value={code} />
        </div>

        <div className="row">
            <ViewText label={'Type project'} value={projectType ? projectType.name : ''} />
            <ViewText label={'Status'} value={projectStatus ? projectStatus.name : ''} />
        </div>

        <div className="row">
            <div className="col-sm-3">
                <label htmlFor="description" className="col-sm-12">
                    Omschrijving
                </label>
            </div>
            <div className="col-sm-9" id="description">
                {description}
            </div>
        </div>

        <div className="row">
            <ViewText label={'Postcode'} value={postalCode} />
            <ViewText label={'Adres'} value={address} />
        </div>

        <div className="row">
            <ViewText label={'Plaats'} value={city} />
        </div>

        <div className="row">
            <ViewText
                label={'Start inschrijving'}
                value={dateStartRegistrations ? moment(dateStartRegistrations).format('L') : ''}
            />
            <ViewText label={'Verantwoordelijke'} value={ownedBy ? ownedBy.fullName : ''} />
        </div>

        <div className="row">
            <ViewText
                label={'Eind inschrijving'}
                value={dateEndRegistrations ? moment(dateEndRegistrations).format('L') : ''}
            />

            <ViewText label={'Administratie'} value={administration ? administration.name : ''} />
        </div>

        <div className="row">
            <ViewText label={'Start project'} value={dateStart ? moment(dateStart).format('L') : ''} />
            <ViewText label={'Deelname aan groep verplicht'} value={isMembershipRequired ? 'Ja' : 'Nee'} />
        </div>

        <div className="row">
            <ViewText label={'Einde project'} value={dateEnd ? moment(dateEnd).format('L') : ''} />
            {isMembershipRequired ? (
                <ViewText
                    label={'Onderdeel van groep'}
                    value={
                        requiresContactGroups &&
                        requiresContactGroups.map(requiresContactGroup => requiresContactGroup.name).join(', ')
                    }
                />
            ) : null}
        </div>

        <div className="row">
            <ViewText label={'Start productie'} value={dateProduction ? moment(dateProduction).format('L') : ''} />
            <ViewText label={'Standaard ingangsdatum mutatie'} value={dateEntry ? moment(dateEntry).format('L') : ''} />
        </div>

        <h4>Contacten portal instellingen</h4>
        <div className="row">
            <ViewText label={'Voorwaarden link'} value={linkAgreeTerms} />
        </div>
        <div className="row">
            <ViewText label={'Projectinformatie link'} value={linkUnderstandInfo} />
        </div>
        <div className="row">
            <ViewText
                label={'Document template inschrijfformulier'}
                value={documentTemplateAgreement ? documentTemplateAgreement.name : ''}
            />
        </div>
        <div className="row">
            <ViewText
                label={'Email template inschrijfbevestiging'}
                value={emailTemplateAgreement ? emailTemplateAgreement.name : ''}
            />
        </div>

        <hr />
        <div className="row">
            <ViewText label={'Vragen over lid worden aan of uit?'} value={showQuestionAboutMembership ? 'Ja' : 'Nee'} />
        </div>
        {showQuestionAboutMembership == true && (
            <>
                <div className={'row'}>
                    <ViewText
                        label={'Leden groep'}
                        value={questionAboutMembershipGroup ? questionAboutMembershipGroup.name : ''}
                    />
                </div>
                <hr />
                <div className={'row'}>
                    <ViewText label={'Regel tekst bij leden'} value={textIsMember} />
                </div>
                <hr />
                <div className={'row'}>
                    <ViewText label={'Regel tekst bij niet leden'} value={textIsNoMember} />
                </div>
                <div className={'row'}>
                    <ViewText label={'Keuzetekst (1) bij niet leden'} value={textBecomeMember} />
                </div>
                <div className={'row'}>
                    <ViewText
                        label={'Contacten die keuze 1 maken toevoegen aan'}
                        value={memberGroup ? memberGroup.name : ''}
                    />
                </div>
                <div className={'row'}>
                    <ViewText label={'Keuzetekst (2) bij niet leden'} value={textBecomeNoMember} />
                </div>
                <div className={'row'}>
                    <ViewText
                        label={'Contacten die keuze 2 maken toevoegen aan'}
                        value={noMemberGroup ? noMemberGroup.name : ''}
                    />
                </div>
            </>
        )}
    </React.Fragment>
);

const mapStateToProps = state => {
    return {
        administrations: state.meDetails.administrations,
        users: state.systemData.users,
    };
};

export default connect(mapStateToProps)(ProjectFormViewGeneral);
