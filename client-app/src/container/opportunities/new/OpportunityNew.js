import React from 'react';
import {connect} from 'react-redux';

import InputSelect from '../../../components/form/InputSelect';
import InputDate from '../../../components/form/InputDate';
import ButtonText from '../../../components/button/ButtonText';
import PanelFooter from "../../../components/panel/PanelFooter";


const OpportunityFormEdit = props => {
    const {contactId, desiredDate, measureId, quotationText, reactionId, statusId, ownedById, registrationId} = props.opportunity;
    return (
        <form className="form-horizontal col-md-12" onSubmit={props.handleSubmit}>

            <div className="row">
                <InputSelect
                    label={"Kans"}
                    size={"col-sm-6"}
                    name={"measureId"}
                    value={measureId}
                    options={props.measures}
                    onChangeAction={props.handleInputChange}
                    required={"required"}
                    error={props.errors.measure}
                />
            </div>

            <div className="row">
                <InputSelect
                    label={"Contact"}
                    size={"col-sm-6"}
                    name={"contactId"}
                    value={contactId}
                    options={props.contacts}
                    onChangeAction={props.handleInputChange}
                    optionName={'fullName'}
                    required={"required"}
                    error={props.errors.contact}
                />
                <InputSelect
                    label={"Reactie"}
                    size={"col-sm-6"}
                    name={"reactionId"}
                    value={reactionId}
                    options={props.reactions}
                    onChangeAction={props.handleInputChange}
                />
            </div>

            <div className="row">
                <InputSelect
                    label={"Aanmelding"}
                    size={"col-sm-6"}
                    name={"registrationId"}
                    value={registrationId}
                    options={props.registrations}
                    onChangeAction={props.handleInputChange}
                />
                <InputSelect
                    label={"Status"}
                    size={"col-sm-6"}
                    name={"statusId"}
                    value={statusId}
                    options={props.status}
                    onChangeAction={props.handleInputChange}
                    required={"required"}
                    error={props.errors.status}
                />
            </div>

            <div className="row">
                <div className='form-group col-sm-12'>
                    <div className="row">
                        <div className="col-sm-3">
                            <label htmlFor="campaignId" className="col-sm-12">Campagne</label>
                        </div>
                        <div className="col-sm-8">
                            <select className='form-control input-sm' name='campaignId' onChange={props.handleInputChange}>
                                <option value=''></option>
                                {props.campaigns.map((option) => {
                                    return <option key={option.id} value={option.id}>{option.name}</option>
                                })}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-sm-12">
                    <div className="row">
                        <div className="col-sm-3">
                            <label htmlFor="quotationText" className="col-sm-12">Offerte tekst</label>
                        </div>
                        <div className="col-sm-8">
                            <textarea name='quotationText' value={quotationText} onChange={props.handleInputChange}
                                      className="form-control input-sm"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <InputDate
                    label={"Gewenste realisatie"}
                    size={"col-sm-6"}
                    name={"desiredDate"}
                    value={desiredDate}
                    onChangeAction={props.handleChangeDesiredDate}
                />
                <InputSelect
                    label={"Verantwoordelijke"}
                    size={"col-sm-6"}
                    name={"ownedById"}
                    value={ownedById}
                    options={props.users}
                    onChangeAction={props.handleInputChange}
                    optionName={'fullName'}
                />
            </div>

            <PanelFooter>
                <div className="pull-right btn-group" role="group">
                    <ButtonText buttonText={"Opslaan"} onClickAction={props.handleSubmit} type={"submit"}
                                value={"Submit"}/>
                </div>
            </PanelFooter>
        </form>
    );
};

const mapStateToProps = (state) => {
    return {
        status: state.systemData.opportunityStatus,
        reactions: state.systemData.opportunityReactions,
        measures: state.systemData.measures,
        campaigns: state.systemData.campaigns,
    }
};

export default connect(mapStateToProps)(OpportunityFormEdit);
