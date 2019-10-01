import React from 'react';
import Steps from './steps';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MasterForm({
    project,
    initialRegisterValues,
    handleSubmitRegisterValues,
    initialContact,
    handleSubmitContactValues,
    setSucces,
}) {
    const [currentStep, setStep] = React.useState(1);

    function previous() {
        setStep(currentStep <= 2 ? 1 : currentStep - 1);
    }

    function next() {
        setStep(currentStep >= 4 ? 5 : currentStep + 1);
    }

    return (
        <>
            {currentStep <= 4 ? (
                <Row className={'mb-4'}>
                    <Col>
                        <div className={'arrow-steps clearfix'}>
                            <div className={`step ${currentStep === 1 ? 'current' : ''}`}>1. Inschrijven</div>
                            <div className={`step ${currentStep === 2 ? 'current' : ''}`}>2. Gegevens</div>
                            <div className={`step ${currentStep === 3 ? 'current' : ''}`}>3. Voorwaarden</div>
                            <div className={`step ${currentStep === 4 ? 'current' : ''}`}>4. Inschrijfformulier</div>
                        </div>
                    </Col>
                </Row>
            ) : null}
            <Steps
                currentStep={currentStep}
                previous={previous}
                next={next}
                project={project}
                initialRegisterValues={initialRegisterValues}
                handleSubmitRegisterValues={handleSubmitRegisterValues}
                initialContact={initialContact}
                handleSubmitContactValues={handleSubmitContactValues}
                setSucces={setSucces}
            />
        </>
    );
}

export default MasterForm;
