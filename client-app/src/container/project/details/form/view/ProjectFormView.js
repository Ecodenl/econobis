import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import ProjectFormViewGeneral from './ProjectFormViewGeneral';
import ProjectFormViewLoan from './ProjectFormViewLoan';
import ProjectFormViewObligation from './ProjectFormViewObligation';
import ProjectFormViewPostalcodeLinkCapital from './ProjectFormViewPostalcodeLinkCapital';
import ProjectFormViewCapital from './ProjectFormViewCapital';
import RequiredParticipantsHelper from '../../../../../helpers/RequiredParticipantsHelper';

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
        checkPostalcodeLink,
        postalCode,
        address,
        city,
        ean,
        eanManager,
        warrantyOrigin,
        eanSupply,
        participationWorth,
        powerKwAvailable,
        amountOfParticipants,
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
        useTransactionCostsWithMembership,
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

    const requiredParticipants = RequiredParticipantsHelper(
        baseProjectCodeRefWithName ? baseProjectCodeRefWithName.id : '',
        powerKwAvailable
    );

    const numberOfParticipantsStillNeeded = requiredParticipants - amountOfParticipants;

    return (
        <>
            <ProjectFormViewGeneral
                switchToEdit={props.switchToEdit}
                showCustomerPortalSettings={props.showCustomerPortalSettings}
                toggleCustomerPortalSettings={props.toggleCustomerPortalSettings}
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
                checkPostalcodeLink={checkPostalcodeLink}
                requiredParticipants={requiredParticipants}
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
                useTransactionCostsWithMembership={useTransactionCostsWithMembership}
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
            <section
                onClick={
                    projectStatus.codeRef === 'concept' || projectStatus.codeRef === 'active'
                        ? props.switchToEdit
                        : null
                }
            >
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
                        powerKwAvailable={powerKwAvailable}
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
                        powerKwAvailable={powerKwAvailable}
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
        </>
    );
};

const mapStateToProps = state => {
    return {
        project: state.projectDetails,
    };
};

export default connect(mapStateToProps)(ProjectFormView);
