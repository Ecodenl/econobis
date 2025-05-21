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
        dateInterestBearing,
        dateInterestBearingRedemption,
        kwhStartHighNextRevenue,
        kwhStartLowNextRevenue,
        dateInterestBearingKwh,
        dateStartRegistrations,
        dateEndRegistrations,
        projectType,
        isSceProject,
        baseProjectCodeRefWithName,
        checkDoubleAddresses,
        checkPostalcodeLink,
        hideWhenNotMatchingPostalCheck,
        disableChangeContactNameOnPortal,
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
        addressNumberSeries,
        requiresContactGroups,
        projectLoanType,
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
        allowIncreaseParticipationsInPortal,
        documentTemplateIncreaseParticipations,
        emailTemplateIncreaseParticipations,
        linkAgreeTerms,
        linkUnderstandInfo,
        linkProjectInfo,
        documentAgreeTerms,
        documentUnderstandInfo,
        documentProjectInfo,
        showQuestionAboutMembership,
        useTransactionCostsWithMembership,
        questionAboutMembershipGroup,
        textRegisterPageHeader,
        textRegisterCurrentBookWorth,
        textRegisterParticipationSingular,
        textRegisterParticipationPlural,
        textIsMember,
        textIsNoMember,
        textBecomeMember,
        memberGroup,
        textBecomeNoMember,
        noMemberGroup,
        textAgreeTerms,
        textLinkAgreeTerms,
        textLinkNameAgreeTerms,
        textLinkUnderstandInfo,
        textLinkNameUnderstandInfo,
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
                addressNumberSeries={addressNumberSeries}
                checkPostalcodeLink={checkPostalcodeLink}
                hideWhenNotMatchingPostalCheck={hideWhenNotMatchingPostalCheck}
                disableChangeContactNameOnPortal={disableChangeContactNameOnPortal}
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
                dateInterestBearingKwh={dateInterestBearingKwh}
                dateInterestBearing={dateInterestBearing}
                dateInterestBearingRedemption={dateInterestBearingRedemption}
                isMembershipRequired={isMembershipRequired}
                visibleForAllContacts={visibleForAllContacts}
                textInfoProjectOnlyMembers={textInfoProjectOnlyMembers}
                requiresContactGroups={requiresContactGroups}
                kwhStartHighNextRevenue={kwhStartHighNextRevenue}
                kwhStartLowNextRevenue={kwhStartLowNextRevenue}
                documentTemplateAgreement={documentTemplateAgreement}
                emailTemplateAgreement={emailTemplateAgreement}
                allowIncreaseParticipationsInPortal={allowIncreaseParticipationsInPortal}
                documentTemplateIncreaseParticipations={documentTemplateIncreaseParticipations}
                emailTemplateIncreaseParticipations={emailTemplateIncreaseParticipations}
                linkAgreeTerms={linkAgreeTerms}
                linkUnderstandInfo={linkUnderstandInfo}
                linkProjectInfo={linkProjectInfo}
                documentAgreeTerms={documentAgreeTerms}
                documentUnderstandInfo={documentUnderstandInfo}
                documentProjectInfo={documentProjectInfo}
                showQuestionAboutMembership={showQuestionAboutMembership}
                useTransactionCostsWithMembership={useTransactionCostsWithMembership}
                questionAboutMembershipGroup={questionAboutMembershipGroup}
                textRegisterPageHeader={textRegisterPageHeader}
                textRegisterCurrentBookWorth={textRegisterCurrentBookWorth}
                textRegisterParticipationSingular={textRegisterParticipationSingular}
                textRegisterParticipationPlural={textRegisterParticipationPlural}
                textIsMember={textIsMember}
                textIsNoMember={textIsNoMember}
                textBecomeMember={textBecomeMember}
                memberGroup={memberGroup}
                textBecomeNoMember={textBecomeNoMember}
                noMemberGroup={noMemberGroup}
                textAgreeTerms={textAgreeTerms}
                textLinkAgreeTerms={textLinkAgreeTerms}
                textLinkNameAgreeTerms={textLinkNameAgreeTerms}
                textLinkUnderstandInfo={textLinkUnderstandInfo}
                textLinkNameUnderstandInfo={textLinkNameUnderstandInfo}
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
                        projectLoanType={projectLoanType}
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
