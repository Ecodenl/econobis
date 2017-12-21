import React from 'react';
import { connect } from 'react-redux';

import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from "../../../../components/form/InputSelect";
import InputCheckbox from "../../../../components/form/InputCheckbox";
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

const ContactDetailsFormPhoneEdit = props => {
    const { number, typeId, primary } = props.phoneNumber;

    return (
        <form className="form-horizontal" onSubmit={props.handleSubmit}>
            <Panel className={'panel-grey'}>
                <PanelBody>
                    <div className="row">
                        <InputText
                            label={"Nummer"}
                            id={"nummer"}
                            size={"col-sm-6"}
                            name={"number"}
                            value={number}
                            onChangeAction={props.handleInputChange}
                            required={"required"}
                            error={props.numberError}
                        />

                        <InputSelect
                            label={"Type"}
                            id="type"
                            size={"col-sm-6"}
                            name={"typeId"}
                            options={props.phoneNumberTypes}
                            value={typeId}
                            onChangeAction={props.handleInputChange}
                            required={"required"}
                            error={props.typeIdError}
                        />
                    </div>

                    <div className="row">
                        <InputCheckbox
                            label={"Primair telefoonnummer"}
                            name={"primary"}
                            checked={primary}
                            onChangeAction={props.handleInputChange}
                        />
                    </div>

                    <div className="pull-right btn-group" role="group">
                        <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"} onClickAction={props.cancelEdit}/>
                        <ButtonText buttonText={"Opslaan"} onClickAction={props.handleSubmit} type={"submit"} value={"Submit"}/>
                    </div>
                </PanelBody>
            </Panel>
        </form>
    );
};

const mapStateToProps = (state) => {
    return {
        phoneNumberTypes: state.systemData.phoneNumberTypes
    };
};

export default connect(mapStateToProps, null)(ContactDetailsFormPhoneEdit);