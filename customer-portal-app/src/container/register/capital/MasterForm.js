import React from 'react';
import Steps from './steps';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MasterForm({ initialValues, energySuppliers, project }) {
    const [currentStep, setStep] = React.useState(1);

    function previous() {
        setStep(currentStep <= 2 ? 1 : currentStep - 1);
    }

    function next() {
        setStep(currentStep >= 3 ? 4 : currentStep + 1);
    }

    return (
        <>
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
            <Steps
                currentStep={currentStep}
                previous={previous}
                next={next}
                initialValues={initialValues}
                energySuppliers={energySuppliers}
                project={project}
            />
        </>
    );
}

export default MasterForm;
