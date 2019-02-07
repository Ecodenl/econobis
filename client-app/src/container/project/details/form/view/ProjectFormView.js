import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import ViewText from '../../../../../components/form/ViewText';
import ProjectFormViewGeneral from './ProjectFormViewGeneral';
import ProjectFormViewLoan from './ProjectFormViewLoan';
import ProjectFormViewObligation from './ProjectFormViewObligation';
import ProjectFormViewPostalcodeLinkCapital from './ProjectFormViewPostalcodeLinkCapital';

const ProjectFormView = props => {
    const {
        name,
        code,
        description,
        ownedBy,
        projectStatus,
        dateStart,
        dateEnd,
        dateProduction,
        dateStartRegistrations,
        dateEndRegistrations,
        projectType,
        postalCode,
        address,
        city,
        ean,
        eanManager,
        warrantyOrigin,
        eanSupply,
        participationWorth,
        powerKwAvailable,
        maxParticipations,
        taxReferral,
        maxParticipationsYouth,
        totalParticipations,
        minParticipations,
        issuedParticipations,
        isMembershipRequired,
        participationsInOption,
        isParticipationTransferable,
        issuableParticipations,
        administration,
        postalcodeLink,
        requiresContactGroups,
        amountOfLoanNeeded,
        valueCourses,
    } = props.project;

    return (
        <section onClick={props.switchToEdit}>
            <ProjectFormViewGeneral
                name={name}
                code={code}
                description={description}
                projectStatus={projectStatus}
                projectType={projectType}
                address={address}
                postalCode={postalCode}
                city={city}
                dateStartRegistrations={dateStartRegistrations}
                dateEndRegistrations={dateEndRegistrations}
                ownedBy={ownedBy}
                administration={administration}
                dateStart={dateStart}
                dateEnd={dateEnd}
                dateProduction={dateProduction}
                isMembershipRequired={isMembershipRequired}
                requiresContactGroups={requiresContactGroups}
            />

            <ProjectFormViewLoan
                amountOfLoanNeeded={amountOfLoanNeeded}
                projectTypeId={projectType && projectType.id}
            />

            <ProjectFormViewObligation
                participationWorth={participationWorth}
                issuedParticipations={issuedParticipations}
                participationsInOption={participationsInOption}
                issuableParticipations={issuableParticipations}
                totalParticipations={totalParticipations}
                powerKwAvailable={powerKwAvailable}
                minParticipations={minParticipations}
                maxParticipations={maxParticipations}
                maxParticipationsYouth={maxParticipationsYouth}
                isParticipationTransferable={isParticipationTransferable}
                valueCourses={valueCourses}
                projectTypeId={projectType.id}
            />

            <ProjectFormViewPostalcodeLinkCapital
                ean={ean}
                taxReferral={taxReferral}
                eanManager={eanManager}
                warrantyOrigin={warrantyOrigin}
                eanSupply={eanSupply}
                projectTypeId={projectType.id}
            />
        </section>
    );
};

const mapStateToProps = state => {
    return {
        project: state.projectDetails,
    };
};

export default connect(mapStateToProps)(ProjectFormView);
