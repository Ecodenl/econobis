import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import validator from 'validator';

import IntakeDetailsAPI from '../../../../api/intake/IntakeDetailsAPI';
import { newIntakeMeasureTaken } from '../../../../actions/intake/IntakeDetailsActions';
import InputDate from '../../../../components/form/InputDate';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from "../../../../components/form/InputSelect";
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

class IntakeMeasuresTakenNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            measureTaken: {
                addressId: this.props.addressId,
                measureId: '',
                measureDate: '',
                energyLabelId: '',
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
            measureTaken: {
                ...this.state.measureTaken,
                [name]: value
            },
        });
    };

    handleChangeMeasureDate = (date) => {
        const formattedDate = (date ? moment(date).format('Y-MM-DD') : '');

        this.setState({
            ...this.state,
            measureTaken: {
                ...this.state.measureTaken,
                measureDate: formattedDate
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { measureTaken } = this.state;

        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(measureTaken.measureId)){
            errors.measureId = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors })

        !hasErrors &&
            IntakeDetailsAPI.newIntakeMeasureTaken(measureTaken).then((payload) => {
                this.props.newIntakeMeasureTaken(payload.data.data);
                this.props.toggleShowNew();
            }).catch(function (error) {
                alert(error.response.data.message);
            });
    };

    render() {
        const { measureId, measureDate, energyLabelId } = this.state.measureTaken;

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

                            <InputDate
                                label={"Gerealiseerd datum"}
                                size={"col-sm-6"}
                                name={"measureDate"}
                                value={measureDate}
                                onChangeAction={this.handleChangeMeasureDate}
                            />
                        </div>

                        <div className="row">
                            <InputSelect
                                label={"Energie label"}
                                size={"col-sm-6"}
                                name={"energyLabelId"}
                                options={this.props.energyLabels}
                                value={energyLabelId}
                                onChangeAction={this.handleInputChange}
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
        addressId: state.intakeDetails.address.id,
    };
};

const mapDispatchToProps = dispatch => ({
    newIntakeMeasureTaken: (id) => {
        dispatch(newIntakeMeasureTaken(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(IntakeMeasuresTakenNew);