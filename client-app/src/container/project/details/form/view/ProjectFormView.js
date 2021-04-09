import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import ProjectFormViewGeneral from './ProjectFormViewGeneral';
import ProjectFormViewLoan from './ProjectFormViewLoan';
import ProjectFormViewObligation from './ProjectFormViewObligation';
import ProjectFormViewPostalcodeLinkCapital from './ProjectFormViewPostalcodeLinkCapital';
import ProjectFormViewCapital from './ProjectFormViewCapital';

const ProjectFormView = props => {
    const {
        name,
        code,
        description,
        ownedBy,
        projectStatus,
        dateStart,
        dateEnd,
        dateEntry,
        dateProduction,
        dateStartRegistrations,
        dateEndRegistrations,
        projectType,
        isSceProject,
        baseProjectCodeRefWithName,
        checkDoubleAddresses,
        subsidyProvided,
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
        totalParticipations,
        minParticipations,
        isMembershipRequired,
        visibleForAllContacts,
        textInfoProjectOnlyMembers,
        isParticipationTransferable,
        administration,
        usesMollie,
        postalcodeLink,
        requiresContactGroups,
        amountOfLoanNeeded,
        minAmountLoan,
        maxAmountLoan,
        valueCourses,
        participationsDefinitive,
        participationsGranted,
        participationsOptioned,
        participationsInteressed,
        amountDefinitive,
        amountGranted,
        amountOptioned,
        amountInteressed,
        documentTemplateAgreement,
        emailTemplateAgreement,
        linkAgreeTerms,
        linkUnderstandInfo,
        linkProjectInfo,
        showQuestionAboutMembership,
        questionAboutMembershipGroup,
        textIsMember,
        textIsNoMember,
        textBecomeMember,
        memberGroup,
        textBecomeNoMember,
        noMemberGroup,
        textAgreeTerms,
        textLinkAgreeTerms,
        textLinkUnderstandInfo,
        textAcceptAgreement,
        textAcceptAgreementQuestion,
        textRegistrationFinished,
        textTransactionCosts,
        transactionCostsCodeRef,
        transactionCostsCodeRefWithName,
        transactionCostsAmountMin,
        transactionCostsAmountMax,
        transactionCostsAmount,
        transactionCostsPercentage,
        transactionCostsAmount2,
        transactionCostsPercentage2,
        transactionCostsAmount3,
        transactionCostsPercentage3,
    } = props.project;

    // Benodigd aantal deelnemers: is opgesteld vermogen delen door Deelnemers per kWp van soort project
    //  zonne-energieprojecten: Minimaal één deelnemer per 5 kWp vermogen;
    //  windprojecten: minimaal één deelnemer per 2 kWp vermogen;
    //	waterkracht: mimimaal één deelnemer per 1 kWp vermogen;
    let requiredParticipations = 0;

    if (baseProjectCodeRefWithName) {
        switch (baseProjectCodeRefWithName.id) {
            case 'solar-energy':
                requiredParticipations = Math.ceil(powerKwAvailable / 5);
                break;
            case 'wind':
                requiredParticipations = Math.ceil(powerKwAvailable / 2);
                break;
            case 'hydropower':
                requiredParticipations = Math.ceil(powerKwAvailable);
                break;
        }
    }
    const numberOfParticipantsStillNeeded = requiredParticipations;

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
                isSceProject={isSceProject}
                baseProjectCodeRefWithName={baseProjectCodeRefWithName}
                powerKwAvailable={powerKwAvailable}
                checkDoubleAddresses={checkDoubleAddresses}
                postalcodeLink={postalcodeLink}
                subsidyProvided={subsidyProvided}
                requiredParticipations={requiredParticipations}
                numberOfParticipantsStillNeeded={numberOfParticipantsStillNeeded}
                address={address}
                postalCode={postalCode}
                city={city}
                dateStartRegistrations={dateStartRegistrations}
                dateEndRegistrations={dateEndRegistrations}
                ownedBy={ownedBy}
                administration={administration}
                usesMollie={usesMollie}
                dateStart={dateStart}
                dateEnd={dateEnd}
                dateEntry={dateEntry}
                dateProduction={dateProduction}
                isMembershipRequired={isMembershipRequired}
                visibleForAllContacts={visibleForAllContacts}
                textInfoProjectOnlyMembers={textInfoProjectOnlyMembers}
                requiresContactGroups={requiresContactGroups}
                documentTemplateAgreement={documentTemplateAgreement}
                emailTemplateAgreement={emailTemplateAgreement}
                linkAgreeTerms={linkAgreeTerms}
                linkUnderstandInfo={linkUnderstandInfo}
                linkProjectInfo={linkProjectInfo}
                showQuestionAboutMembership={showQuestionAboutMembership}
                questionAboutMembershipGroup={questionAboutMembershipGroup}
                textIsMember={textIsMember}
                textIsNoMember={textIsNoMember}
                textBecomeMember={textBecomeMember}
                memberGroup={memberGroup}
                textBecomeNoMember={textBecomeNoMember}
                noMemberGroup={noMemberGroup}
                textAgreeTerms={textAgreeTerms}
                textLinkAgreeTerms={textLinkAgreeTerms}
                textLinkUnderstandInfo={textLinkUnderstandInfo}
                textAcceptAgreement={textAcceptAgreement}
                textAcceptAgreementQuestion={textAcceptAgreementQuestion}
                textRegistrationFinished={textRegistrationFinished}
                textTransactionCosts={textTransactionCosts}
                transactionCostsCodeRef={transactionCostsCodeRef}
                transactionCostsCodeRefWithName={transactionCostsCodeRefWithName}
                transactionCostsAmountMin={transactionCostsAmountMin}
                transactionCostsAmountMax={transactionCostsAmountMax}
                transactionCostsAmount={transactionCostsAmount}
                transactionCostsPercentage={transactionCostsPercentage}
                transactionCostsAmount2={transactionCostsAmount2}
                transactionCostsPercentage2={transactionCostsPercentage2}
                transactionCostsAmount3={transactionCostsAmount3}
                transactionCostsPercentage3={transactionCostsPercentage3}
            />

            {projectType && projectType.codeRef === 'loan' ? (
                <ProjectFormViewLoan
                    amountOfLoanNeeded={amountOfLoanNeeded}
                    minAmountLoan={minAmountLoan}
                    maxAmountLoan={maxAmountLoan}
                    amountDefinitive={amountDefinitive}
                    amountGranted={amountGranted}
                    amountOptioned={amountOptioned}
                    amountInteressed={amountInteressed}
                />
            ) : null}

            {projectType && projectType.codeRef === 'obligation' ? (
                <ProjectFormViewObligation
                    participationWorth={participationWorth}
                    totalParticipations={totalParticipations}
                    participationsDefinitive={participationsDefinitive}
                    participationsGranted={participationsGranted}
                    participationsOptioned={participationsOptioned}
                    participationsInteressed={participationsInteressed}
                    minParticipations={minParticipations}
                    maxParticipations={maxParticipations}
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
                    participationsGranted={participationsGranted}
                    participationsOptioned={participationsOptioned}
                    participationsInteressed={participationsInteressed}
                    minParticipations={minParticipations}
                    maxParticipations={maxParticipations}
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
