import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import InputText from '../../../../components/form/InputText';

function StepOne({ next }) {
    const field = null;

    return (
        <div>
            Stap één
            <div className="w-row">
                <div className="w-col w-col-6">
                    <h6 className="heading-content">Minimale aantal participaties</h6>
                    <div className="text-block">1</div>
                    <h6 className="heading-content">Maximale aantal participaties</h6>
                    <div className="text-block">5</div>
                    <h6 className="heading-content">Nominale waarde per participatie</h6>
                    <div className="text-block">€ 500,00</div>
                    <label htmlFor="quantity_requested" className="field-label">
                        Gewenst aantal participaties
                    </label>
                    <InputText field={{...field, value: 4}} id="quantity_requested" />
                    <h6 className="heading-content">Te betalen bedrag</h6>
                    <div className="text-block">€ 2000,00</div>
                </div>
            </div>
            <Row className="justify-content-end justify-content-sm-end">
                <ButtonGroup aria-label="Steps">
                    <Button className={'w-button'} size="sm" onClick={next}>
                        Ga naar gegevens
                    </Button>
                </ButtonGroup>
            </Row>
        </div>
    );
}

export default StepOne;
