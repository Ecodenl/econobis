import React, { Component } from 'react';

import InputText from '../../../../components/form/InputText';
import InputDate from '../../../../components/form/InputDate';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

class IntakeMeasuresRequestedEdit extends Component {
    constructor(props) {
        super(props);

        const { id, name, desiredDate, degreeInterest } = props.measureRequested;

        this.state = {
            measureRequested: {
                id,
                name: name,
                desiredDate: desiredDate ? desiredDate : '',
                degreeInterest: degreeInterest ? degreeInterest : '',
            },
        };
    }

    handleDegreeInterest = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            ...this.state,
            measureRequested: {
                ...this.state.measureRequested,
                degreeInterest: value,
            },
        });

        this.props.handleDegreeInterest(value);
    };

    render() {
        const { name, desiredDate, degreeInterest } = this.state.measureRequested;
        return (
            <div>
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <Panel className={'panel-grey'}>
                        <PanelBody>
                            <div className="row">
                                <div className="row">
                                    <InputText
                                        label={'Maatregel'}
                                        size={'col-sm-6'}
                                        name={'name'}
                                        value={name}
                                        readOnly={true}
                                    />
                                    <InputDate
                                        label={'Gewenste datum'}
                                        size={'col-sm-6'}
                                        name={'desiredDate'}
                                        value={desiredDate.date}
                                        onChangeAction={this.props.handleDesiredDate}
                                    />
                                </div>

                                <div className="row">
                                    <InputText
                                        type={'number'}
                                        label={'Mate van interesse'}
                                        size={'col-sm-6'}
                                        name={'degreeInterest'}
                                        value={degreeInterest}
                                        onChangeAction={this.handleDegreeInterest}
                                        min={'1'}
                                        max={'10'}
                                    />
                                </div>
                            </div>
                            <div className="pull-right btn-group" role="group">
                                <ButtonText
                                    buttonClassName={'btn-default'}
                                    buttonText={'Annuleren'}
                                    onClickAction={this.props.cancelEdit}
                                />
                                <ButtonText
                                    buttonText={'Opslaan'}
                                    onClickAction={this.props.handleSubmit}
                                    type={'submit'}
                                    value={'Submit'}
                                />
                            </div>
                        </PanelBody>
                    </Panel>
                </form>
            </div>
        );
    }
}

export default IntakeMeasuresRequestedEdit;
