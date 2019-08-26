import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import AccountInfoForm from '../../../account-info/Form';

function StepTwo({ previous, next, initialValues, energySuppliers }) {
    return (
        <div>
            <AccountInfoForm
                initialValues={initialValues}
                energySuppliers={energySuppliers}
                handleEnergySupplierChange={() => {}}
            />
            <Row className="justify-content-end">
                <ButtonGroup aria-label="Steps">
                    <Button className={'w-button'} size="sm" onClick={previous}>
                        Terug
                    </Button>
                    <Button className={'w-button'} size="sm" onClick={next}>
                        Ga naar voorwaarden
                    </Button>
                </ButtonGroup>
            </Row>
        </div>
    );
}

export default StepTwo;
