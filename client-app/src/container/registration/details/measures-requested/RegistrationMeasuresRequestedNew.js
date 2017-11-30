import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import RegistrationDetailsAPI from '../../../../api/registration/RegistrationDetailsAPI';
import { newRegistrationMeasureRequested } from '../../../../actions/registration/RegistrationDetailsActions';
import InputDate from '../../../../components/form/InputDate';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from "../../../../components/form/InputSelect";
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

class RegistrationMeasuresRequestedNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            measureRequested: {
                addressId: this.props.id,
                measureId: '',
                desiredDate: '',
                degreeInterest: '',
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

    handleChangeMeasureDate = (date) => {
        const formattedDate = (date ? moment(date).format('Y-MM-DD') : '');

        this.setState({
            ...this.state,
            person: {
                ...this.state.person,
                memberSince: formattedDate
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { measureRequested } = this.state;

        RegistrationDetailsAPI.newRegistrationMeasureRequested(measureRequested).then((payload) => {
            this.props.newRegistrationMeasureRequested(payload);
            this.props.toggleShowNew();
        })
    };

    render() {
        const { measureId, desiredDate, degreeInterest } = this.state.measureRequested;

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
                            />

                            <InputDate
                                label={"Gewenste datum"}
                                size={"col-sm-6"}
                                name={"desiredDate"}
                                value={desiredDate}
                                onChangeAction={this.handleChangeMeasureDate}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                type={'number'}
                                label={"Mate van interesse"}
                                size={"col-sm-6"}
                                name={"degreeInterest"}
                                value={degreeInterest}
                                onChangeAction={this.handleInputChange}
                                min={'1'}
                                max={'10'}
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
        id: state.registrationDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    newRegistrationMeasureRequested: (id) => {
        dispatch(newRegistrationMeasureRequested(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationMeasuresRequestedNew);