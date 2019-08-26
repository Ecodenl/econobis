import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function StepThree({ previous, next }) {
    const field = {value: 0};

    return (
        <div>
            <div className="w-row">
                <div className="w-col w-col-6">
                    <p>
                        Om deel te kunnen nemen dien je akkoord te gaan met de algemene voorwaarden en dien je te bevestigen dat je de projectinformatie hebt gelezen en begrepen.
                    </p>
                    <label className="w-checkbox checkbox-fld">
                        <input
                            type="checkbox"
                            {...field}
                            id="did_agree_avg"
                            checked={field.value}
                            className="w-checkbox-input checkbox"
                        />
                        <span htmlFor="did_agree_avg" className="checkbox-label w-form-label">
                                        Ik ga akkoord met de <a href='#'>voorwaarden</a>
                                                    </span>
                    </label>

                    <label className="w-checkbox checkbox-fld">
                        <input
                            type="checkbox"
                            {...field}
                            id="did_agree_avg"
                            checked={field.value}
                            className="w-checkbox-input checkbox"
                        />
                        <span htmlFor="did_agree_avg" className="checkbox-label w-form-label">
                                        Ik heb de <a href='#'>projectinformatie</a> (inclusief de daarin beschreven risico’s) behorende bij het project gelezen en begrepen
                                                    </span>
                    </label>
                </div>
            </div>
            <Row className="justify-content-end justify-content-sm-end">
                <ButtonGroup aria-label="Steps">
                    <Button className={'w-button'} size="sm" onClick={previous}>
                        Terug
                    </Button>
                    <Button className={'w-button'} size="sm" onClick={next}>
                        Ga naar inschrijfformulier
                    </Button>
                </ButtonGroup>
            </Row>
        </div>
    );
}

export default StepThree;
