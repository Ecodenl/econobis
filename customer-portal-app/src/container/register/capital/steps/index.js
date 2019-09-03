import React from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';

function Steps({
    currentStep,
    previous,
    next,
    initialValues,
    energySuppliers,
    project,
    initialRegisterValues,
    handleSubmitRegisterValues,
    initialContact,
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
                    initialValues={initialValues}
                    energySuppliers={energySuppliers}
                    initialContact={initialContact}
                />
            );
        case 3:
            return <StepThree previous={previous} next={next} initialRegisterValues={initialRegisterValues} />;
        case 4:
            return <StepFour previous={previous} />;
        default:
            return;
    }
}

export default Steps;
