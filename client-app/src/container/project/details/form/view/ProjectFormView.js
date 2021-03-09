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
                usesMollie={usesMollie}
                dateStart={dateStart}
                dateEnd={dateEnd}
                dateEntry={dateEntry}
                dateProduction={dateProduction}
                isMembershipRequired={isMembershipRequired}
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
    );
};

const mapStateToProps = state => {
    return {
        project: state.projectDetails,
    };
};

export default connect(mapStateToProps)(ProjectFormView);
