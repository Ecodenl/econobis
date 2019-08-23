import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';

function StepOne({ next }) {
    return (
        <div>
            Stap één
            <Row className="justify-content-center justify-content-md-end">
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
