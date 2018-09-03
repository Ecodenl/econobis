import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
moment.locale('nl');
import InputSelect from '../../../components/form/InputSelect';
import InputDate from '../../../components/form/InputDate';
import ButtonText from '../../../components/button/ButtonText';
import PanelFooter from "../../../components/panel/PanelFooter";
import InputText from "../../../components/form/InputText";
import InputToggle from "../../../components/form/InputToggle";
import PanelHeader from "../../../components/panel/PanelHeader";
import InputMultiSelect from "../../../components/form/InputMultiSelect";

const ProductionProjectNew = props => {
    const {name, code, description, ownedById, productionProjectStatusId, dateStart,
        dateProduction, dateStartRegistrations, dateEndRegistrations, productionProjectTypeId, postalCode, address,
        city, ean, eanManager, warrantyOrigin, eanSupply,
        participationWorth, powerKwAvailable, maxParticipations, taxReferral, maxParticipationsYouth,
        totalParticipations, minParticipations, isMembershipRequired, isParticipationTransferable, administrationId, postalcodeLink, contactGroupIds} = props.productionProject;
    return (
        <form className="form-horizontal col-md-12" onSubmit={props.handleSubmit}>
            <div className="row">
                <InputText
                    label={"Naam"}
                    name={"name"}
                    value={name}
                    onChangeAction={props.handleInputChange}
                    required={"required"}
                    error={props.errors.name}
                />
                <InputText
                    label={"Projectcode"}
                    name={"code"}
                    value={code}
                    onChangeAction={props.handleInputChange}
                    required={"required"}
                    error={props.errors.code}
                />
            </div>

            <div className="row">
                <div className="form-group col-sm-12">
                    <div className="row">
                        <div className="col-sm-3">
                            <label htmlFor="description" className="col-sm-12">Omschrijving</label>
                        </div>
                        <div className="col-sm-8">
                                <textarea name='description' value={description} onChange={props.handleInputChange}
                                          className="form-control input-sm"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <InputSelect
                    label={"Verantwoordelijke"}
                    name={"ownedById"}
                    options={props.users}
                    optionName={'fullName'}
                    value={ownedById}
                    onChangeAction={props.handleInputChange}
                    required={"required"}
                    error={props.errors.ownedById}
                />
                <InputSelect
                    label={"Status"}
                    name={"productionProjectStatusId"}
                    options={props.productionProjectStatus}
                    value={productionProjectStatusId}
                    onChangeAction={props.handleInputChange}
                />
            </div>

            <div className="row">
                <InputDate
                    label={"Start project"}
                    name={"dateStart"}
                    value={dateStart }
                    onChangeAction={props.handleInputChangeDate}
                />
                <InputDate
                    label={"Datum productie"}
                    name={"dateProduction"}
                    value={ dateProduction }
                    onChangeAction={props.handleInputChangeDate}
                />
            </div>

            <div className="row">
                <InputDate
                    label={"Start inschrijving"}
                    name={"dateStartRegistrations"}
                    value={ dateStartRegistrations }
                    onChangeAction={props.handleInputChangeDate}
                />
                <InputDate
                    label={"Eind inschrijving"}
                    name={"dateEndRegistrations"}
                    value={ dateEndRegistrations }
                    onChangeAction={props.handleInputChangeDate}
                />
            </div>

            <div className="row">
                <InputSelect
                    label={"Type"}
                    name={"productionProjectTypeId"}
                    options={props.productionProjectTypes}
                    value={productionProjectTypeId}
                    onChangeAction={props.handleInputChange}
                />
                <InputSelect
                    label={"Administratie"}
                    name={"administrationId"}
                    options={props.administrations}
                    value={administrationId}
                    onChangeAction={props.handleInputChange}
                />
            </div>

            <div className="row">
                <InputText
                    label={"Postcode"}
                    name={"postalCode"}
                    value={postalCode}
                    onChangeAction={props.handleInputChange}
                    error={props.errors.postalCode}
                />
                <InputText
                    label={"Adres"}
                    name={"address"}
                    value={address}
                    onChangeAction={props.handleInputChange}
                />
            </div>

            <div className="row">
                <InputText
                    label={"Plaats"}
                    name={"city"}
                    value={city}
                    onChangeAction={props.handleInputChange}
                />
            </div>

            <PanelHeader>
                <div className="row" onClick={props.toggleShowPostalCodeLinkFields}>
                    {
                        props.showPostalCodeLinkFields ?
                            <span className="glyphicon glyphicon-menu-down"/>
                            :
                            <span className="glyphicon glyphicon-menu-right" />
                    }
                    <span className="h5">Postcoderoos velden</span>
                </div>
            </PanelHeader>
            {
                props.showPostalCodeLinkFields &&
               <div className="margin-20-bottom">
                   <div className="row">
                       <InputText
                           label={"EAN"}
                           name={"ean"}
                           value={ean}
                           onChangeAction={props.handleInputChange}
                       />
                       <InputText
                           label={"EAN Netbeheer"}
                           name={"eanManager"}
                           value={eanManager}
                           onChangeAction={props.handleInputChange}
                       />
                   </div>

                   <div className="row">
                       <InputText
                           label={"Garantie van oorsprong"}
                           name={"warrantyOrigin"}
                           value={warrantyOrigin}
                           onChangeAction={props.handleInputChange}
                       />
                       <InputText
                           label={"EAN Levering"}
                           name={"eanSupply"}
                           value={eanSupply}
                           onChangeAction={props.handleInputChange}
                       />
                   </div>

                   <div className="row">
                       <InputText
                           label={"Aanwijzing belastingdienst"}
                           name={"taxReferral"}
                           value={taxReferral}
                           onChangeAction={props.handleInputChange}
                       />
                       <InputText
                           label={"Postcoderoos"}
                           name={"postalcodeLink"}
                           value={postalcodeLink}
                           onChangeAction={props.handleInputChange}
                       />
                   </div>
                </div>
            }



            <div className="row">
                <InputText
                    type={"number"}
                    label={"Waarde per participatie"}
                    name={"participationWorth"}
                    value={participationWorth}
                    onChangeAction={props.handleInputChange}
                />
                <InputText
                    type={"number"}
                    label={"Opgesteld vermogen kW"}
                    name={"powerKwAvailable"}
                    value={powerKwAvailable}
                    onChangeAction={props.handleInputChange}
                />
            </div>

            <div className="row">
                <InputText
                    type={"number"}
                    label={"Max aantal part. p/p"}
                    name={"maxParticipations"}
                    value={maxParticipations}
                    onChangeAction={props.handleInputChange}
                />
                <InputText
                    type={"number"}
                    label={"Totaal aantal participaties"}
                    name={"totalParticipations"}
                    value={totalParticipations}
                    onChangeAction={props.handleInputChange}
                />
            </div>

            <div className="row">
                <InputText
                    type={"number"}
                    label={"Max aantal part. jeugd"}
                    name={"maxParticipationsYouth"}
                    value={maxParticipationsYouth}
                    onChangeAction={props.handleInputChange}
                />
                <InputText
                    type={"number"}
                    label={"Min. aantal part. p/p"}
                    name={"minParticipations"}
                    value={minParticipations}
                    onChangeAction={props.handleInputChange}
                />
            </div>

            <div className="row">
                <InputToggle
                    label={"Deelname aan groep verplicht"}
                    name={"isMembershipRequired"}
                    value={isMembershipRequired}
                    onChangeAction={props.handleInputChange}
                />
                <InputToggle
                    label={"Participaties overdraagbaar"}
                    name={"isParticipationTransferable"}
                    value={isParticipationTransferable}
                    onChangeAction={props.handleInputChange}
                />
            </div>

            {isMembershipRequired == true &&
            <div className={'row'}>
                <InputMultiSelect
                    label={"Onderdeel van groep"}
                    name={"contactGroupsIds"}
                    options={props.contactGroups}
                    value={contactGroupIds}
                    onChangeAction={props.handleContactGroupIds}
                />
            </div>
            }

            <PanelFooter>
                <div className="pull-right btn-group" role="group">
                    <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"}
                                onClickAction={props.switchToView}/>
                    <ButtonText buttonText={"Opslaan"} onClickAction={props.handleSubmit} type={"submit"}
                                value={"Submit"}/>
                </div>
            </PanelFooter>
        </form>
    );
};

const mapStateToProps = (state) => {
    return {
        users: state.systemData.users,
        productionProjectStatus: state.systemData.productionProjectStatus,
        productionProjectTypes: state.systemData.productionProjectTypes,
    }
};

export default connect(mapStateToProps)(ProductionProjectNew);
