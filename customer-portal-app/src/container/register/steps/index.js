import React from 'react';
import StepOneLoan from './StepOneLoan';
import StepOneObligation from './StepOneObligation';
import StepOneCapital from './StepOneCapital';
import StepOnePcr from './StepOnePcr';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';

function Steps({
    portalSettings,
    currentStep,
    previous,
    next,
    project,
    initialRegisterValues,
    handleSubmitRegisterValues,
    initialContact,
    handleSubmitContactValues,
    setSucces,
}) {
    switch (currentStep) {
        case 1:
            switch (project.projectType.codeRef) {
                case 'loan':
                    return (
                        <StepOneLoan
                            next={next}
                            project={project}
                            initialRegisterValues={initialRegisterValues}
                            handleSubmitRegisterValues={handleSubmitRegisterValues}
                        />
                    );
                case 'obligation':
                    return (
                        <StepOneObligation
                            next={next}
                            project={project}
                            initialRegisterValues={initialRegisterValues}
                            handleSubmitRegisterValues={handleSubmitRegisterValues}
                        />
                    );
                case 'capital':
                    return (
                        <StepOneCapital
                            next={next}
                            project={project}
                            initialRegisterValues={initialRegisterValues}
                            handleSubmitRegisterValues={handleSubmitRegisterValues}
                        />
                    );
                case 'postalcode_link_capital':
                    return (
                        <StepOnePcr
                            next={next}
                            project={project}
                            initialContact={initialContact}
                            initialRegisterValues={initialRegisterValues}
                            handleSubmitRegisterValues={handleSubmitRegisterValues}
                        />
                    );
                default:
                    return null;
            }

        case 2:
            return (
                <StepTwo
                    portalSettings={portalSettings}
                    previous={previous}
                    next={next}
                    project={project}
                    initialContact={initialContact}
                    handleSubmitContactValues={handleSubmitContactValues}
                />
            );
        case 3:
            return (
                <StepThree
                    portalSettings={portalSettings}
                    previous={previous}
                    next={next}
                    initialRegisterValues={initialRegisterValues}
                    handleSubmitRegisterValues={handleSubmitRegisterValues}
                />
            );
        case 4:
            return (
                <StepFour
                    previous={previous}
                    next={next}
                    registerValues={initialRegisterValues}
                    setSucces={setSucces}
                />
            );
        case 5:
            return <StepFive />;
        default:
            return null;
    }
}

export default Steps;
