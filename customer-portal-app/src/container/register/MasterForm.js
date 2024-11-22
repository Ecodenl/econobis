import React from 'react';
import Steps from './steps';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MasterForm({
    portalSettings,
    project,
    participantId,
    registerType,
    contactProjectData,
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
                            <div className={`step ${currentStep === 1 ? 'current' : ''}`}>
                                1. {registerType === 'verhogen' ? 'Bijschrijven' : 'Inschrijven'}
                            </div>
                            <div className={`step ${currentStep === 2 ? 'current' : ''}`}>2. Gegevens</div>
                            <div className={`step ${currentStep === 3 ? 'current' : ''}`}>3. Voorwaarden</div>
                            <div className={`step ${currentStep === 4 ? 'current' : ''}`}>
                                {project.usesMollie ? <>4. Bevestigen en betalen</> : <>4. Bevestigen</>}
                            </div>
                        </div>
                    </Col>
                </Row>
            ) : null}
            <Steps
                portalSettings={portalSettings}
                currentStep={currentStep}
                previous={previous}
                next={next}
                project={project}
                participantId={participantId}
                registerType={registerType}
                contactProjectData={contactProjectData}
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
