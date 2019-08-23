import React from 'react';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import Button from 'react-bootstrap/Button';
import Steps from './steps';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MasterForm() {
    const [currentStep, setStep] = React.useState(1);

    function previous() {
        setStep(currentStep <= 2 ? 1 : currentStep - 1);
    }

    function next() {
        setStep(currentStep >= 3 ? 4 : currentStep + 1);
    }

    return (
        <>
            <Row>
                <Col>
                    <div className={'arrow-steps clearfix'}>
                        <div className={`step ${currentStep === 1 ? 'current' : ''}`}>1. Inschrijven</div>
                        <div className={`step ${currentStep === 2 ? 'current' : ''}`}>2. Gegevens</div>
                        <div className={`step ${currentStep === 3 ? 'current' : ''}`}>3. Voorwaarden</div>
                        <div className={`step ${currentStep === 4 ? 'current' : ''}`}>4. Inschrijfformulier</div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>Masterform</Col>
            </Row>
            <Steps currentStep={currentStep} previous={previous} next={next} />
        </>
    );
}

export default MasterForm;
