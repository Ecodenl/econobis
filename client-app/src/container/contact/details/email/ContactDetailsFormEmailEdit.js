import React from 'react';
import { connect } from 'react-redux';

import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from "../../../../components/form/InputSelect";
import InputCheckbox from "../../../../components/form/InputCheckbox";
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

const ContactDetailsFormEmailEdit = props => {
    const { email, typeId, primary } = props.emailAddress;

    return (
        <form className="form-horizontal" onSubmit={props.handleSubmit}>
            <Panel className={'panel-grey'}>
                <PanelBody>
                    <div className="row">
                        <InputText
                            label={"Email"}
                            id={"email"}
                            size={"col-sm-6"}
                            name={"email"}
                            value={email}
                            onChangeAction={props.handleInputChange}
                            required={"required"}
                            error={props.emailError}
                        />

                        <InputSelect
                            label={"Type"}
                            id="type"
                            size={"col-sm-6"}
                            name={"typeId"}
                            options={props.emailAddressTypes}
                            value={typeId}
                            onChangeAction={props.handleInputChange}
                            required={"required"}
                            error={props.typeIdError}
                        />
                    </div>

                    <div className="row">
                        <InputCheckbox
                            label={"Primair e-mail adres"}
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
        emailAddressTypes: state.systemData.emailAddressTypes
    };
};

export default connect(mapStateToProps, null)(ContactDetailsFormEmailEdit);