import React, { Component } from 'react';
import { connect } from 'react-redux';

import RegistrationMeasureTakenAPI from '../../../../api/registration/RegistrationMeasureTakenAPI';
import { newRegistrationMeasureTaken } from '../../../../actions/registration/RegistrationDetailsActions';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from "../../../../components/form/InputSelect";
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

class RegistrationMeasuresTakenNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            measureTaken: {
                addressId: this.props.id,
                measureId: '',
                measureDate: '',
                energyLabelId: '',
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

    handleSubmit = event => {
        event.preventDefault();

        const { measureTaken } = this.state;

        RegistrationMeasureTakenAPI.newRegistrationMeasureTaken(measureTaken).then((payload) => {
            this.props.newRegistrationMeasureTaken(payload);
            this.props.toggleShowNew();
        })
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
                            />

                            <InputText
                                label={"Gerealiseerd datum"}
                                size={"col-sm-6"}
                                name={"measureDate"}
                                value={measureDate}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label={"Energie label"}
                                size={"col-sm-6"}
                                name={"energyLabelId"}
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
        id: state.registrationDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    newRegistrationMeasureTaken: (id) => {
        dispatch(newRegistrationMeasureTaken(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationMeasuresTakenNew);