import React, {Component} from 'react';
import {connect} from "react-redux";

import InputText from '../../../../components/form/InputText';
import InputDate from '../../../../components/form/InputDate';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import InputSelect from "../../../../components/form/InputSelect";

class RegistrationMeasuresTakenEdit extends Component {
    constructor(props) {
        super(props);

        const {id, name, measureDate, energyLabelId} = props.measureTaken;

        this.state = {
            measureTaken: {
                id,
                name: name,
                measureDate: measureDate ? measureDate : '',
                energyLabelId: energyLabelId ? energyLabelId : ''
            },
        };
    };

    handleEnergyLabel = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const labelName = target[target.selectedIndex].innerHTML;

        this.setState({
            ...this.state,
            measureTaken: {
                ...this.state.measureTaken,
                energyLabelId: value
            },
        });

        this.props.handleEnergyLabel(value, labelName);
    };

    render() {
        const {name, measureDate, energyLabelId} = this.state.measureTaken;
        return (
            <div>
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <Panel className={'panel-grey'}>
                        <PanelBody>
                            <div className="row">
                                <div className="row">
                                    <InputText
                                        label={"Maatregel"}
                                        size={"col-sm-6"}
                                        name={"name"}
                                        value={name}
                                        readOnly={true}
                                    />
                                    <InputDate
                                        label={"Gerealiseerde datum"}
                                        size={"col-sm-6"}
                                        name={"measureDate"}
                                        value={measureDate.date}
                                        onChangeAction={this.props.handleMeasureDate}
                                    />
                                </div>

                                <div className="row">
                                    <InputSelect
                                        label={"Energie label"}
                                        size={"col-sm-6"}
                                        name={"energyLabelId"}
                                        options={this.props.energyLabels}
                                        value={energyLabelId}
                                        onChangeAction={this.handleEnergyLabel}
                                    />
                                </div>
                            </div>
                            <div className="pull-right btn-group" role="group">
                                <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"}
                                            onClickAction={this.props.cancelEdit}/>
                                <ButtonText buttonText={"Opslaan"} onClickAction={this.props.handleSubmit}
                                            type={"submit"} value={"Submit"}/>
                            </div>
                        </PanelBody>
                    </Panel>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        energyLabels: state.systemData.energyLabels,
    };
};


export default connect(mapStateToProps)(RegistrationMeasuresTakenEdit);

