import React from 'react';
import { connect } from 'react-redux';

import InputText from '../../../components/form/InputText';
import ButtonText from '../../../components/button/ButtonText';
import InputSelect from "../../../components/form/InputSelect";
import InputCheckbox from "../../../components/form/InputCheckbox";
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

const ContactDetailsFormAddressEdit = props => {
    const { street, number, postalCode, city, typeId, primary } = props.address;

    return (
        <div>
            <form className="form-horizontal" onSubmit={props.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={"Postcode"}
                                id={"postcode"}
                                size={"col-sm-4"}
                                name={"postalCode"}
                                value={postalCode}
                                onChangeAction={ props.handleInputChange }
                                maxLength={"7"}
                                error={props.postalCodeError}
                            />
                            <InputText
                                label={"Nummer"}
                                id={"nummer"}
                                size={"col-sm-3"}
                                name={"number"}
                                value={number}
                                onChangeAction={props.handleInputChange}
                                error={props.numberError}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label={"Adres"}
                                id={"adres"}
                                size={"col-sm-6"}
                                name={"street"}
                                value={street}
                                onChangeAction={props.handleInputChange}
                            />
                            <InputText
                                label={"Plaats"}
                                id={"plaats"}
                                size={"col-sm-6"}
                                name={"city"}
                                value={city}
                                onChangeAction={props.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputSelect
                                label={"Type"}
                                id="type"
                                size={"col-sm-6"}
                                name={"typeId"}
                                options={props.addressTypes}
                                value={typeId}
                                onChangeAction={props.handleInputChange}
                                required={"required"}
                                error={props.typeIdError}
                            />
                            <InputCheckbox
                                label={"Primair adres"}
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
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        addressTypes: state.systemData.addressTypes
    };
};

export default connect(mapStateToProps, null)(ContactDetailsFormAddressEdit);
