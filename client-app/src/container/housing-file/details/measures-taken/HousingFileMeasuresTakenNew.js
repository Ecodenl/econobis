import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import validator from 'validator';

import IntakeDetailsAPI from '../../../../api/intake/IntakeDetailsAPI';
import { newIntakeMeasureRequested } from '../../../../actions/intake/IntakeDetailsActions';
import InputDate from '../../../../components/form/InputDate';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from "../../../../components/form/InputSelect";
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

class HousingFileMeasuresTakenNew extends Component {
    constructor(props) {
        super(props);



        this.state = {
            measureRequested: {
                intakeId: this.props.intakeId,
                measureId: '',

            },
            errors: {
                measureId: false,
            },
        }
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            measureRequested: {
                ...this.state.measureRequested,
                [name]: value
            },
        });
    };


    handleSubmit = event => {
        event.preventDefault();

        const {measureRequested} = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(measureRequested.measureId)) {
            errors.measureId = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors })

        !hasErrors &&
            IntakeDetailsAPI.newIntakeMeasureRequested(measureRequested.intakeId, measureRequested.measureId).then((payload) => {
                this.props.newIntakeMeasureRequested(payload.data.data);
                this.props.toggleShowNew();
            }).catch(function (error) {
                alert(error.response.data.message);
            });
    };

    render() {
        const { measureId} = this.state.measureRequested;

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
        intakeId: state.intakeDetails.id,
        addressId: state.intakeDetails.address.id,
    };
};

const mapDispatchToProps = dispatch => ({
    newIntakeMeasureRequested: (intakeId, measureId) => {
        dispatch(newIntakeMeasureRequested(intakeId, measureId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HousingFileMeasuresTakenNew);