import React from 'react';
import { connect } from 'react-redux';

import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from "../../../../components/form/InputSelect";
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

const RegistrationMeasuresTakenEdit = props => {
    const { measureId, measureDate, energyLabelId } = props.measureTaken;

    return (
        <form className="form-horizontal" onSubmit={props.handleSubmit}>
            <Panel className={'panel-grey'}>
                <PanelBody>
                    <div className="row">
                        <InputSelect
                            label={"Maatregel"}
                            size={"col-sm-6"}
                            name={"measureId"}
                            options={props.measures}
                            value={measureId}
                            onChangeAction={props.handleInputChange}
                        />

                        <InputText
                            label={"Gerealiseerd datum"}
                            size={"col-sm-6"}
                            name={"measureDate"}
                            value={measureDate}
                            onChangeAction={props.handleInputChange}
                        />
                    </div>

                    <div className="row">
                        <InputText
                            label={"Energie label"}
                            size={"col-sm-6"}
                            name={"energyLabelId"}
                            value={energyLabelId}
                            onChangeAction={props.handleInputChange}
                        />
                    </div>

                    <div className="pull-right btn-group" role="group">
                        <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"} onClickAction={props.toggleShowNew}/>
                        <ButtonText buttonText={"Opslaan"} onClickAction={props.handleSubmit} type={"submit"} value={"Submit"}/>
                    </div>
                </PanelBody>
            </Panel>
        </form>
    );
};

const mapStateToProps = (state) => {
    return {
    measures: state.systemData.measures
};
};

export default connect(mapStateToProps, null)(RegistrationMeasuresTakenEdit);