import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import IntakeDetailsAPI from '../../../../api/intake/IntakeDetailsAPI';
import { newIntakeMeasureRequested } from '../../../../actions/intake/IntakeDetailsActions';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from "../../../../components/form/InputSelect";
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

class IntakeMeasuresRequestedNew extends Component {
    constructor(props) {
        super(props);



        this.state = {
            measureId: '',
            errors: {
                measureId: false,
            },
        }
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            measureId: value
        });
    };


    handleSubmit = event => {
        event.preventDefault();

        const {measureId} = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(measureId)) {
            errors.measureId = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors })

        !hasErrors &&
            IntakeDetailsAPI.attachMeasureRequested(this.props.intakeId, measureId).then((payload) => {
                this.props.newIntakeMeasureRequested(payload);
                this.props.toggleShowNew();
            }).catch(function (error) {
                alert(error.response.data.message);
            });
    };

    render() {
        const { measureId } = this.state;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputSelect
                                label={"Maatregel"}
                                size={"col-sm-6"}
                                name={"measureId"}
                                options={this.props.measures}
                                value={measureId}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.measureId}
                            />
                        </div>

                        <div className="pull-right btn-group" role="group">
                            <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"} onClickAction={this.props.toggleShowNew}/>
                            <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit} type={"submit"} value={"Submit"}/>
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        measures: state.systemData.measures,
        energyLabels: state.systemData.energyLabels,
        intakeId: state.intakeDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    newIntakeMeasureRequested: (measure) => {
        dispatch(newIntakeMeasureRequested(measure));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(IntakeMeasuresRequestedNew);