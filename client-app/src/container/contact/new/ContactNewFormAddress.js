import React, {Component} from 'react';
import {connect} from 'react-redux';

import InputText from '../../../components/form/InputText';
import InputSelect from "../../../components/form/InputSelect";
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import InputToggle from "../../../components/form/InputToggle";

class ContactNewFormAddress extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        const {street, number, addition, postalCode, city, typeId, primary, countryId} = this.props.address;

        return (
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={"Postcode"}
                                size={"col-sm-4"}
                                name={"postalCode"}
                                value={postalCode}
                                onChangeAction={this.props.handleInputPicoChange}
                                required={"required"}
                                error={this.props.errors.postalCode}
                            />
                            <div className="form-group col-sm-6">
                                <label htmlFor={'number'} className={`col-sm-6 required`}>{"Nummer"}</label>
                                <div className={`col-sm-4`}>
                                    <input
                                        type={'number'}
                                        className={`form-control input-sm ` + (this.props.errors.number ? 'has-error' : '')}
                                        id={"number"}
                                        name={"number"}
                                        value={number}
                                        onChange={this.props.handleInputPicoChange}
                                    />
                                </div>
                                <div className={`col-sm-2`}>
                                    <input
                                        type={'text'}
                                        className={`form-control input-sm`}
                                        id={"addition"}
                                        name={"addition"}
                                        value={addition}
                                        onChange={this.props.handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <InputText
                                label={"Adres"}
                                id={"adres"}
                                size={"col-sm-6"}
                                name={"street"}
                                value={street}
                                onChangeAction={this.props.handleInputChange}
                            />
                            <InputText
                                label={"Plaats"}
                                id={"plaats"}
                                size={"col-sm-6"}
                                name={"city"}
                                value={city}
                                onChangeAction={this.props.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputSelect
                                label={"Type"}
                                id="type"
                                size={"col-sm-6"}
                                name={"typeId"}
                                options={this.props.addressTypes}
                                value={typeId}
                                onChangeAction={this.props.handleInputChange}
                                required={"required"}
                                error={this.props.errors.typeId}
                            />
                            <InputToggle
                                label={"Primair adres"}
                                name={"primary"}
                                value={primary}
                                onChangeAction={this.props.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputSelect
                                label={"Land"}
                                id="countryId"
                                size={"col-sm-6"}
                                name={"countryId"}
                                options={this.props.countries}
                                value={countryId}
                                onChangeAction={this.props.handleInputChange}
                            />
                        </div>

                    </PanelBody>
                </Panel>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        addressTypes: state.systemData.addressTypes,
        countries: state.systemData.countries,
    };
};

export default connect(mapStateToProps)(ContactNewFormAddress);
