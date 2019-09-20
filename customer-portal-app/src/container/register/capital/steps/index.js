import React from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';

function Steps({
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
            return (
                <StepOne
                    next={next}
                    project={project}
                    initialRegisterValues={initialRegisterValues}
                    handleSubmitRegisterValues={handleSubmitRegisterValues}
                />
            );
        case 2:
            return (
                <StepTwo
                    previous={previous}
                    next={next}
                    initialContact={initialContact}
                    handleSubmitContactValues={handleSubmitContactValues}
                />
            );
        case 3:
            return (
                <StepThree
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
            return;
    }
}

export default Steps;
