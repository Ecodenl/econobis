import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import ProjectFormViewGeneral from './ProjectFormViewGeneral';
import ProjectFormViewLoan from './ProjectFormViewLoan';
import ProjectFormViewObligation from './ProjectFormViewObligation';
import ProjectFormViewPostalcodeLinkCapital from './ProjectFormViewPostalcodeLinkCapital';
import ProjectFormViewCapital from './ProjectFormViewCapital';
import ProjectFormDefaultLoan from '../edit/ProjectFormEdit';

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
        isMembershipRequired,
        isParticipationTransferable,
        administration,
        postalcodeLink,
        requiresContactGroups,
        amountOfLoanNeeded,
        valueCourses,
        participationsDefinitive,
        participationsOptioned,
        amountDefinitive,
        amountOptioned,
    } = props.project;

    return (
        <section
            onClick={
                projectStatus.codeRef === 'concept' || projectStatus.codeRef === 'active' ? props.switchToEdit : null
            }
        >
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

            {projectType && projectType.codeRef === 'loan' ? (
                <ProjectFormViewLoan
                    amountOfLoanNeeded={amountOfLoanNeeded}
                    amountDefinitive={amountDefinitive}
                    amountOptioned={amountOptioned}
                />
            ) : null}

            {projectType && projectType.codeRef === 'obligation' ? (
                <ProjectFormViewObligation
                    participationWorth={participationWorth}
                    totalParticipations={totalParticipations}
                    participationsDefinitive={participationsDefinitive}
                    participationsOptioned={participationsOptioned}
                    powerKwAvailable={powerKwAvailable}
                    minParticipations={minParticipations}
                    maxParticipations={maxParticipations}
                    maxParticipationsYouth={maxParticipationsYouth}
                    isParticipationTransferable={isParticipationTransferable}
                    valueCourses={valueCourses}
                />
            ) : null}

            {(projectType && projectType.codeRef === 'capital') ||
            (projectType && projectType.codeRef === 'postalcode_link_capital') ? (
                <ProjectFormViewCapital
                    participationWorth={participationWorth}
                    totalParticipations={totalParticipations}
                    participationsDefinitive={participationsDefinitive}
                    participationsOptioned={participationsOptioned}
                    powerKwAvailable={powerKwAvailable}
                    minParticipations={minParticipations}
                    maxParticipations={maxParticipations}
                    maxParticipationsYouth={maxParticipationsYouth}
                    isParticipationTransferable={isParticipationTransferable}
                    valueCourses={valueCourses}
                />
            ) : null}

            {projectType && projectType.codeRef === 'postalcode_link_capital' ? (
                <ProjectFormViewPostalcodeLinkCapital
                    postalcodeLink={postalcodeLink}
                    ean={ean}
                    taxReferral={taxReferral}
                    eanManager={eanManager}
                    warrantyOrigin={warrantyOrigin}
                    eanSupply={eanSupply}
                />
            ) : null}
        </section>
    );
};

const mapStateToProps = state => {
    return {
        project: state.projectDetails,
    };
};

export default connect(mapStateToProps)(ProjectFormView);
